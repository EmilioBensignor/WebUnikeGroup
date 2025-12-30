export const useWaterplastProductos = () => {
    const supabase = useSupabaseClient()
    const config = useRuntimeConfig()

    const loading = ref(false)
    const productos = ref([])
    const currentProducto = ref(null)
    const error = ref(null)

    const getProductoImageUrl = (imagePath) => {
        if (!imagePath) return null
        if (imagePath.startsWith('http')) return imagePath
        return `${config.public.supabase.url}/storage/v1/object/public/waterplast-productos/${imagePath}`
    }

    const fetchProductos = async () => {
        loading.value = true
        error.value = null

        try {
            const { data, error: supabaseError } = await supabase
                .from('waterplast-productos')
                .select(`
                    *,
                    categoria:categoria_id (
                        id,
                        nombre,
                        slug
                    )
                `)
                .eq('estado', true)
                .order('created_at', { ascending: true })

            if (supabaseError) throw supabaseError

            const productosWithUrls = (data || []).map(producto => ({
                ...producto,
                imagen_principal: producto.imagen_principal ? getProductoImageUrl(producto.imagen_principal) : null,
                imagen_ficha_tecnica: producto.imagen_ficha_tecnica ? getProductoImageUrl(producto.imagen_ficha_tecnica) : null,
                imagenes_galeria: producto.imagenes_galeria ?
                    producto.imagenes_galeria.map((img, index) => ({
                        id: `galeria-${index}`,
                        name: `imagen-galeria-${index + 1}.jpg`,
                        url: getProductoImageUrl(img)
                    })) : [],
                imagenes_galeria_count: producto.imagenes_galeria ? producto.imagenes_galeria.length : 0
            }))

            productos.value = productosWithUrls
        } catch (err) {
            error.value = err.message
            console.error('Error al obtener productos:', err)
        } finally {
            loading.value = false
        }
    }

    const fetchProductosByCategoria = async (categoriaSlug) => {
        loading.value = true
        error.value = null

        try {
            const { data: categoriaData, error: categoriaError } = await supabase
                .from('waterplast-categorias')
                .select('id')
                .eq('slug', categoriaSlug)
                .single()

            if (categoriaError) throw categoriaError

            const { data, error: supabaseError } = await supabase
                .from('waterplast-productos')
                .select(`
                    *,
                    categoria:categoria_id (
                        id,
                        nombre,
                        slug,
                        color
                    ),
                    subcategoria:subcategoria_id (
                        id,
                        nombre,
                        orden
                    )
                `)
                .eq('estado', true)
                .eq('categoria_id', categoriaData.id)
                .order('created_at', { ascending: true })

            if (supabaseError) throw supabaseError

            const productosWithUrls = (data || []).map(producto => ({
                ...producto,
                imagen: producto.imagen ? getProductoImageUrl(producto.imagen) : null,
                imagen_principal: producto.imagen_principal ? getProductoImageUrl(producto.imagen_principal) : (producto.imagen ? getProductoImageUrl(producto.imagen) : null),
                imagen_ficha_tecnica: producto.imagen_ficha_tecnica ? getProductoImageUrl(producto.imagen_ficha_tecnica) : null,
                icono1: producto.icono1 ? getProductoImageUrl(producto.icono1) : null,
                icono2: producto.icono2 ? getProductoImageUrl(producto.icono2) : null,
                icono3: producto.icono3 ? getProductoImageUrl(producto.icono3) : null,
                imagenes_galeria: producto.imagenes_galeria ?
                    producto.imagenes_galeria.map((img, index) => ({
                        id: `galeria-${index}`,
                        name: `imagen-galeria-${index + 1}.jpg`,
                        url: getProductoImageUrl(img)
                    })) : [],
                imagenes_galeria_count: producto.imagenes_galeria ? producto.imagenes_galeria.length : 0
            }))

            productos.value = productosWithUrls
            return productosWithUrls
        } catch (err) {
            error.value = err.message
            console.error('Error al obtener productos por categoría:', err)
            throw err
        } finally {
            loading.value = false
        }
    }

    const fetchProductoBySlug = async (slug) => {
        loading.value = true
        error.value = null
        currentProducto.value = null

        try {
            const { data, error: supabaseError } = await supabase
                .from('waterplast-productos')
                .select(`
                    *,
                    categoria:categoria_id (
                        id,
                        nombre,
                        slug
                    )
                `)
                .eq('slug', slug)
                .single()

            if (supabaseError) throw supabaseError

            const productoWithUrls = {
                ...data,
                imagen_principal: data.imagen_principal ? getProductoImageUrl(data.imagen_principal) : null,
                imagen_ficha_tecnica: data.imagen_ficha_tecnica ? getProductoImageUrl(data.imagen_ficha_tecnica) : null,
                imagenes_galeria: data.imagenes_galeria ?
                    data.imagenes_galeria.map((img, index) => ({
                        id: `galeria-${index}`,
                        name: `imagen-galeria-${index + 1}.jpg`,
                        url: getProductoImageUrl(img)
                    })) : []
            }

            currentProducto.value = productoWithUrls
            return productoWithUrls
        } catch (err) {
            error.value = err.message
            console.error('Error al obtener producto:', err)
            throw err
        } finally {
            loading.value = false
        }
    }

    const fetchProductoByCategoriaAndSlug = async (categoriaSlug, productoSlug) => {
        loading.value = true
        error.value = null
        currentProducto.value = null

        try {
            const { data: categoriaData, error: categoriaError } = await supabase
                .from('waterplast-categorias')
                .select('id')
                .eq('slug', categoriaSlug)
                .single()

            if (categoriaError) throw categoriaError

            const { data, error: supabaseError } = await supabase
                .from('waterplast-productos')
                .select('*')
                .eq('slug', productoSlug)
                .eq('categoria_id', categoriaData.id)
                .single()

            if (supabaseError) throw supabaseError

            const productoWithUrls = {
                ...data,
                imagen_principal: data.imagen_principal ? getProductoImageUrl(data.imagen_principal) : null,
                imagen_ficha_tecnica: data.imagen_ficha_tecnica ? getProductoImageUrl(data.imagen_ficha_tecnica) : null,
                imagenes_galeria: data.imagenes_galeria ?
                    data.imagenes_galeria.map((img, index) => ({
                        id: `galeria-${index}`,
                        name: `imagen-galeria-${index + 1}.jpg`,
                        url: getProductoImageUrl(img)
                    })) : []
            }

            currentProducto.value = productoWithUrls
            return productoWithUrls
        } catch (err) {
            error.value = err.message
            console.error('Error al obtener producto por categoría y slug:', err)
            throw err
        } finally {
            loading.value = false
        }
    }

    const generateCleanName = (nombre) => {
        if (!nombre) return ''

        return nombre
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim('-')
            .substring(0, 20)
            .replace(/-$/, '')
    }

    const fetchProducto3DFromSupabase = async (productoId) => {
        try {
            const { data, error } = await supabase
                .from('waterplast-productos')
                .select('archivo_html, nombre, xr_images_folder, images_folder')
                .eq('id', productoId)
                .single()

            if (error) throw error

            if (data && data.archivo_html) {
                const htmlResponse = await $fetch(data.archivo_html)

                const imagesFolder = data.xr_images_folder || data.images_folder || null
                const processedHTML = await processKeyShotXRHTML(htmlResponse, data.nombre, imagesFolder)

                return {
                    ...data,
                    processed_html: processedHTML,
                    clean_name: generateCleanName(data.nombre)
                }
            }

            return data
        } catch (error) {
            console.error('Error fetching 3D product from Supabase:', error)
            throw error
        }
    }

    const detectImageFolderFromStorage = async (cleanName) => {
        try {
            const { data: files, error } = await supabase.storage
                .from('waterplast-productos')
                .list(`${cleanName}/images`, {
                    limit: 100,
                    offset: 0,
                })

            console.log('[DEBUG] 📂 Explorando estructura de Storage para:', `${cleanName}/images`)

            if (error) {
                console.error('[DEBUG] ❌ Error al listar carpeta:', error)
                return null
            }

            if (!files || files.length === 0) {
                console.warn('[DEBUG] ⚠️ La carpeta está vacía o no existe:', `${cleanName}/images`)

                // Intentar listar el directorio raíz del producto para ver qué hay
                const { data: rootFiles } = await supabase.storage
                    .from('waterplast-productos')
                    .list(cleanName, { limit: 100 })

                if (rootFiles && rootFiles.length > 0) {
                    console.log('[DEBUG] 📁 Contenido del directorio raíz:', rootFiles.map(f => f.name))
                }

                return null
            }

            console.log('[DEBUG] 📋 Archivos/carpetas encontrados:', files.map(f => f.name))

            const hasPngFiles = files.some(item => item.name && item.name.endsWith('.png'))
            if (hasPngFiles) {
                console.log('[DEBUG] ✅ Encontrados archivos PNG directamente en /images')
                return null
            }

            const folders = files.filter(item => {
                if (!item.name || item.name === 'files') return false
                const hasImageExtension = /\.(png|jpg|jpeg|gif|webp|svg)$/i.test(item.name)
                const hasHtmlExtension = /\.html?$/i.test(item.name)
                return !hasImageExtension && !hasHtmlExtension
            })

            if (folders.length > 0) {
                console.log('[DEBUG] 📁 Subcarpeta de imágenes detectada:', folders[0].name)
                return folders[0].name
            }

            console.log('[DEBUG] ⚠️ No se encontró subcarpeta de imágenes')
        } catch (error) {
            console.error('[DEBUG] ❌ Error en detectImageFolderFromStorage:', error)
        }

        return null
    }

    const getImageBaseUrl = (cleanName, imagesFolder = null) => {
        const baseUrl = `${config.public.supabase.url}/storage/v1/object/public/waterplast-productos/${cleanName}/images`

        if (imagesFolder) {
            return `${baseUrl}/${imagesFolder}`
        }

        return baseUrl
    }

    const processKeyShotXRHTML = async (html, productoNombre, imagesFolder = null, cleanNameOverride = null) => {
        if (!html) return ''

        let processedHTML = html
        const cleanName = cleanNameOverride || generateCleanName(productoNombre)

        console.log('[DEBUG] 🔍 Procesando KeyShot XR HTML')
        console.log('[DEBUG] 📦 Producto Nombre:', productoNombre)
        console.log('[DEBUG] 🏷️ Clean Name:', cleanName)
        console.log('[DEBUG] 📁 Images Folder (inicial):', imagesFolder)

        if (!imagesFolder) {
            imagesFolder = await detectImageFolderFromStorage(cleanName)
            console.log('[DEBUG] 📁 Images Folder (detectado):', imagesFolder)
        }

        const baseUrl = import.meta.client ? window.location.origin : (config.public.siteUrl || 'https://unikegroup.com.ar')

        let keyshotContent
        try {
            keyshotContent = await $fetch(`${baseUrl}/lib/keyshot-xr.js`, {
                responseType: 'text',
                headers: {
                    'Accept': 'application/javascript, text/javascript, */*'
                }
            })
        } catch (fetchError) {
            console.error('Error fetching keyshot-xr.js from:', `${baseUrl}/lib/keyshot-xr.js`, fetchError)
            try {
                keyshotContent = await $fetch('/lib/keyshot-xr.js', {
                    responseType: 'text'
                })
            } catch (fallbackError) {
                console.error('Error fetching keyshot-xr.js with relative path:', fallbackError)
                throw new Error('No se pudo cargar el visor 3D')
            }
        }

        const imageBaseUrl = getImageBaseUrl(cleanName, imagesFolder)
        console.log('[DEBUG] 🖼️ Image Base URL:', imageBaseUrl)
        console.log('[DEBUG] 📸 Ejemplo de URL de imagen:', `${imageBaseUrl}/0_0.png`)

        // Verificar si la primera imagen existe
        if (import.meta.client) {
            const testImageUrl = `${imageBaseUrl}/0_0.png`
            fetch(testImageUrl, { method: 'HEAD' })
                .then(response => {
                    if (response.ok) {
                        console.log('[DEBUG] ✅ La imagen de prueba existe y es accesible:', testImageUrl)
                    } else {
                        console.error('[DEBUG] ❌ La imagen de prueba NO es accesible:', testImageUrl, 'Status:', response.status)
                        console.error('[DEBUG] 💡 Posibles causas:')
                        console.error('[DEBUG]    1. Las imágenes están en una subcarpeta diferente')
                        console.error('[DEBUG]    2. El bucket no es público')
                        console.error('[DEBUG]    3. Las imágenes tienen nombres diferentes')
                        console.error('[DEBUG] 🔍 Verifica la estructura en Supabase Storage en: waterplast-productos/' + cleanName)
                    }
                })
                .catch(err => {
                    console.error('[DEBUG] ⚠️ Error al verificar imagen:', err)
                })
        }

        let modified = false

        const vaPattern = /this\.va=function\(b,f\)\{return A\+a\.s\+[^}]+\}/
        const vaMatch = keyshotContent.match(vaPattern)

        console.log('[DEBUG] 🔧 Buscando patrón .va function:', !!vaMatch)

        if (vaMatch) {
            console.log('[DEBUG] ✅ Reemplazando .va function con imageBaseUrl')
            keyshotContent = keyshotContent.replace(
                vaPattern,
                `this.va=function(b,f){return "${imageBaseUrl}/"+parseInt(f)+"_"+parseInt(b)+".png"}`
            )
            modified = true
        }

        if (!modified) {
            console.log('[DEBUG] 🔍 Buscando patrón alternativo parseInt')
            if (keyshotContent.includes('parseInt(f)+"_"+parseInt(b)')) {
                console.log('[DEBUG] ✅ Reemplazando patrón alternativo parseInt')
                keyshotContent = keyshotContent.replace(
                    /return [^;]+parseInt\(f\)\+["']_["']\+parseInt\(b\)[^;]+/g,
                    `return "${imageBaseUrl}/"+parseInt(f)+"_"+parseInt(b)+".png"`
                )
                modified = true
            } else {
                console.log('[DEBUG] ⚠️ No se encontró ningún patrón de URL de imagen para modificar')
            }
        }

        console.log('[DEBUG] 🎨 URL modificada:', modified)

        keyshotContent = keyshotContent.replace(
            /A\+a\.s\+["']\/files\/["']\+d/g,
            `"${imageBaseUrl}/files/"+d`
        )

        keyshotContent = keyshotContent.replace(
            /ca&&a\.ua\(\)/g,
            'false'
        )

        keyshotContent = keyshotContent.replace(
            /this\.ua=function\(\)\{[^}]+a\.p=document\.createElement[^}]+\};/g,
            'this.ua=function(){};'
        )

        processedHTML = processedHTML.replace(
            /<script\s+type="text\/javascript"\s+src="[^"]*KeyShotXR\.js"><\/script>/gi,
            `<script type="text/javascript">${keyshotContent}</script>`
        )

        processedHTML = processedHTML.replace(
            /<script[^>]*src="[^"]*KeyShotXR\.js"[^>]*><\/script>/gi,
            `<script type="text/javascript">${keyshotContent}</script>`
        )

        processedHTML = processedHTML.replace(
            /var\s+folderName\s*=\s*["']([^"']*)["']/g,
            'var folderName = ""'
        )

        processedHTML = processedHTML.replace(
            /A\+a\.s\+["']\/files\/["']/g,
            `"${imageBaseUrl}/files/"`
        )

        processedHTML = processedHTML.replace(
            /src=["']files\//g,
            `src="${imageBaseUrl}/files/`
        )

        processedHTML = processedHTML.replace(
            /<div([^>]*?)id=["']?xr-container["']?([^>]*?)>/g,
            '<div$1id="xr-container"$2 style="width: 100%; height: 100%; position: relative;">'
        )

        processedHTML = processedHTML.replace(
            /<body([^>]*)>/gi,
            '<body$1 style="background-color: transparent;">'
        )

        processedHTML = processedHTML.replace(
            /this\.backgroundColor=s\.style\.backgroundColor=[^;]+;/g,
            'this.backgroundColor=s.style.backgroundColor="transparent";'
        )

        return processedHTML
    }

    const injectXRViewer = (containerId, html) => {
        if (import.meta.client) {
            const container = document.getElementById(containerId)
            if (container && html) {
                container.innerHTML = html

                const scripts = container.querySelectorAll('script')
                scripts.forEach(script => {
                    const newScript = document.createElement('script')

                    if (script.src) {
                        newScript.src = script.src
                    } else {
                        newScript.textContent = script.textContent
                    }

                    if (script.type) {
                        newScript.type = script.type
                    }

                    document.head.appendChild(newScript)

                    setTimeout(() => {
                        if (newScript.parentNode) {
                            newScript.parentNode.removeChild(newScript)
                        }
                    }, 100)
                })
            }
        }
    }

    const renderXRViewer = async (containerId, productoSlug) => {
        try {
            const producto = await fetchProductoBySlug(productoSlug)

            if (producto && producto.xr_html_content) {
                const processedHTML = processKeyShotXRHTML(producto.xr_html_content, producto.nombre)
                injectXRViewer(containerId, processedHTML)
                return true
            }
            return false
        } catch (err) {
            console.error('Error rendering XR viewer:', err)
            return false
        }
    }

    const processProductoHTML = async (producto) => {
        if (!producto || !producto.archivo_html) return null

        try {
            let htmlUrl = producto.archivo_html
            if (!htmlUrl.startsWith('http')) {
                htmlUrl = `${config.public.supabase.url}/storage/v1/object/public/waterplast-productos/${htmlUrl}`
            }

            const htmlResponse = await $fetch(htmlUrl)

            let imagesFolder = producto.xr_images_folder || producto.images_folder || null

            // Extraer el nombre de la carpeta desde la ruta del archivo HTML
            // Por ejemplo: "agro-blanco-10000/html.html" -> "agro-blanco-10000"
            let folderName = null
            if (producto.archivo_html && producto.archivo_html.includes('/')) {
                folderName = producto.archivo_html.split('/')[0]
            }

            // Si no se puede extraer del path, usar el cleanName como fallback
            const cleanName = folderName || generateCleanName(producto.nombre)

            console.log('[DEBUG] 🗂️ Folder name extraído del archivo_html:', folderName)
            console.log('[DEBUG] 🏷️ Clean name fallback:', generateCleanName(producto.nombre))
            console.log('[DEBUG] 📂 Usando folder:', cleanName)

            if (!imagesFolder) {
                imagesFolder = await detectImageFolderFromStorage(cleanName)

                if (imagesFolder && producto.id) {
                    try {
                        await supabase
                            .from('waterplast-productos')
                            .update({ xr_images_folder: imagesFolder })
                            .eq('id', producto.id)
                    } catch (updateErr) {
                    }
                }
            }

            const processedHTML = await processKeyShotXRHTML(htmlResponse, producto.nombre, imagesFolder, cleanName)

            return {
                ...producto,
                processed_html: processedHTML,
                clean_name: cleanName,
                xr_images_folder: imagesFolder
            }
        } catch (error) {
            console.error('Error processing producto HTML:', error)
            return null
        }
    }

    const getCaracteristicaImageUrl = (imagePath) => {
        if (!imagePath) return null
        if (imagePath.startsWith('http')) return imagePath
        const baseUrl = config.public.bucketUrl || `${config.public.supabase?.url}/storage/v1/object/public`
        return `${baseUrl}/waterplast-productos-caracteristicas/${imagePath}`
    }

    const fetchProductosRelacionados = async (productosRelacionadosIds) => {
        if (!productosRelacionadosIds || productosRelacionadosIds.length === 0) {
            return []
        }

        try {
            const { data, error: supabaseError } = await supabase
                .from('waterplast-productos')
                .select(`
                    *,
                    categoria:categoria_id (
                        id,
                        nombre,
                        slug,
                        color
                    )
                `)
                .in('id', productosRelacionadosIds)
                .eq('estado', true)

            if (supabaseError) throw supabaseError

            const productosWithUrls = (data || []).map(producto => ({
                ...producto,
                imagen_principal: producto.imagen_principal ? getProductoImageUrl(producto.imagen_principal) : null,
                icono1: producto.icono1 ? getProductoImageUrl(producto.icono1) : null,
                icono2: producto.icono2 ? getProductoImageUrl(producto.icono2) : null,
                icono3: producto.icono3 ? getProductoImageUrl(producto.icono3) : null,
            }))

            return productosWithUrls
        } catch (err) {
            console.error('Error al obtener productos relacionados:', err)
            return []
        }
    }

    const fetchCaracteristicasAdicionales = async (productoId) => {
        if (!productoId) return []

        try {
            const { data, error: supabaseError } = await supabase
                .from('waterplast-productos-caracteristicas-adicionales')
                .select('*')
                .eq('producto_id', productoId)
                .order('orden', { ascending: true })

            if (supabaseError) throw supabaseError

            const caracteristicasWithUrls = (data || []).map(caracteristica => ({
                ...caracteristica,
                imagen: caracteristica.imagen ? getCaracteristicaImageUrl(caracteristica.imagen) : null
            }))

            return caracteristicasWithUrls
        } catch (err) {
            console.error('Error al obtener características adicionales:', err)
            return []
        }
    }

    const fetchImagenesRedes = async (categoriaSlug) => {
        if (!categoriaSlug) return []

        try {
            const { data: files, error } = await supabase.storage
                .from('waterplast-categorias')
                .list(`${categoriaSlug}/imagenes-redes`, {
                    limit: 100,
                    offset: 0,
                })

            if (error || !files || files.length === 0) return []

            const supabaseUrl = config.public.supabase?.url || config.public.bucketUrl?.replace('/storage/v1/object/public', '')
            const imagenesRedes = files
                .filter(file => {
                    const ext = file.name.split('.').pop().toLowerCase()
                    return ['jpg', 'jpeg', 'png', 'webp', 'gif'].includes(ext)
                })
                .map(file => ({
                    name: file.name,
                    url: `${supabaseUrl}/storage/v1/object/public/waterplast-categorias/${categoriaSlug}/imagenes-redes/${file.name}`
                }))

            return imagenesRedes
        } catch (err) {
            console.error('Error al obtener imágenes de redes:', err)
            return []
        }
    }

    return {
        productos: readonly(productos),
        currentProducto: readonly(currentProducto),
        loading: readonly(loading),
        error: readonly(error),
        fetchProductos,
        fetchProductosByCategoria,
        fetchProductoBySlug,
        fetchProductoByCategoriaAndSlug,
        getProductoImageUrl,
        getCaracteristicaImageUrl,
        generateCleanName,
        fetchProducto3DFromSupabase,
        processKeyShotXRHTML,
        processProductoHTML,
        injectXRViewer,
        renderXRViewer,
        fetchProductosRelacionados,
        fetchCaracteristicasAdicionales,
        fetchImagenesRedes
    }
}