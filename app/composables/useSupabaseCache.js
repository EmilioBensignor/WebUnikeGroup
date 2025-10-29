export const useSupabaseCache = () => {
    let db = null;
    const DB_NAME = 'UnikeGroupCache';
    const DB_VERSION = 1;
    const STORE_NAME = 'data_cache';

    const initDB = () => {
        if (typeof indexedDB === 'undefined') return null;

        return new Promise((resolve, reject) => {
            const request = indexedDB.open(DB_NAME, DB_VERSION);

            request.onerror = () => reject(request.error);
            request.onsuccess = () => {
                db = request.result;
                resolve(db);
            };

            request.onupgradeneeded = (event) => {
                const database = event.target.result;
                if (!database.objectStoreNames.contains(STORE_NAME)) {
                    database.createObjectStore(STORE_NAME, { keyPath: 'key' });
                }
            };
        });
    };

    const getFromCache = async (key) => {
        try {
            const cachedData = localStorage.getItem(key);
            if (cachedData) {
                const { data, expiry } = JSON.parse(cachedData);
                if (Date.now() <= expiry) {
                    return data;
                }
                localStorage.removeItem(key);
            }

            if (typeof indexedDB !== 'undefined') {
                const database = db || await initDB();
                if (database) {
                    return await new Promise((resolve) => {
                        const transaction = database.transaction(STORE_NAME, 'readonly');
                        const store = transaction.objectStore(STORE_NAME);
                        const request = store.get(key);

                        request.onsuccess = () => {
                            const result = request.result;
                            if (result && Date.now() <= result.expiry) {
                                resolve(result.data);
                            } else if (result) {
                                store.delete(key);
                                resolve(null);
                            } else {
                                resolve(null);
                            }
                        };

                        request.onerror = () => resolve(null);
                    });
                }
            }

            return null;
        } catch (error) {
            console.error('Error al recuperar datos de cache:', error);
            return null;
        }
    };

    const saveToCache = async (key, data, ttlMinutes = 60) => {
        try {
            const expiry = Date.now() + (ttlMinutes * 60 * 1000);
            const cacheData = { data, expiry };

            const dataSize = JSON.stringify(cacheData).length;

            if (dataSize < 102400) {
                localStorage.setItem(key, JSON.stringify(cacheData));
            } else {
                if (typeof indexedDB !== 'undefined') {
                    const database = db || await initDB();
                    if (database) {
                        return new Promise((resolve) => {
                            const transaction = database.transaction(STORE_NAME, 'readwrite');
                            const store = transaction.objectStore(STORE_NAME);
                            const request = store.put({ key, ...cacheData });

                            request.onsuccess = () => resolve();
                            request.onerror = () => {
                                console.error('Error al guardar en IndexedDB');
                                resolve();
                            };
                        });
                    }
                }
            }
        } catch (error) {
            console.error('Error al guardar en cache:', error);
        }
    };

    const cacheAuthSession = (session) => {
        if (!session) return;

        try {
            const sessionData = {
                access_token: session.access_token,
                expires_at: session.expires_at,
                user_id: session.user.id,
                email: session.user.email
            };

            const ttlMinutes = (session.expires_at - Math.floor(Date.now() / 1000)) / 60 * 0.9;
            saveToCache('auth_session_cache', sessionData, ttlMinutes);
        } catch (error) {
            console.error('Error al cachear sesión:', error);
        }
    };

    const getAuthSession = () => {
        return getFromCache('auth_session_cache');
    };

    const clearAuthCache = () => {
        localStorage.removeItem('auth_session_cache');
    };

    return {
        getFromCache,
        saveToCache,
        cacheAuthSession,
        getAuthSession,
        clearAuthCache
    };
};