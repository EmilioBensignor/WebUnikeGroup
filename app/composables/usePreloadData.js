export const usePreloadData = () => {
  const { getFromCache, saveToCache } = useSupabaseCache();

  const preloadCriticalData = async () => {
    try {
      const cacheKey = 'waterplast_categorias';
      let categorias = await getFromCache(cacheKey);

      if (!categorias) {
        const supabase = useSupabaseClient();
        const { data } = await supabase
          .from('categorias')
          .select('*')
          .eq('activa', true)
          .order('orden', { ascending: true });

        if (data) {
          categorias = data;
          await saveToCache(cacheKey, categorias, 24 * 60);
        }
      }

      return categorias;
    } catch (error) {
      console.error('Error al precargar categorías:', error);
      return [];
    }
  };

  const preloadFeaturedImages = async () => {
    try {
      const cacheKey = 'waterplast_featured_images';
      let images = await getFromCache(cacheKey);

      if (!images) {
        const supabase = useSupabaseClient();
        const { data } = await supabase
          .from('imagenes_destacadas')
          .select('*')
          .in('slug', ['imagen-hero-home', 'imagen-menu']);

        if (data) {
          images = data;
          await saveToCache(cacheKey, images, 24 * 60);

          if (process.client) {
            data.forEach(img => {
              ['imagen_chica', 'imagen_mediana', 'imagen_grande'].forEach(size => {
                if (img[size]) {
                  const link = document.createElement('link');
                  link.rel = 'preload';
                  link.as = 'image';
                  link.href = img[size];
                  document.head.appendChild(link);
                }
              });
            });
          }
        }
      }

      return images;
    } catch (error) {
      console.error('Error al precargar imágenes destacadas:', error);
      return [];
    }
  };

  const preloadRecentBlogPosts = async (limit = 6) => {
    try {
      const cacheKey = `blog_posts_recent_${limit}`;
      let posts = await getFromCache(cacheKey);

      if (!posts) {
        const supabase = useSupabaseClient();
        const { data } = await supabase
          .from('blogs')
          .select('id, titulo, slug, imagen_principal, fecha, creado_por')
          .eq('publicado', true)
          .order('fecha', { ascending: false })
          .limit(limit);

        if (data) {
          posts = data;
          await saveToCache(cacheKey, posts, 6 * 60);
        }
      }

      return posts;
    } catch (error) {
      console.error('Error al precargar posts del blog:', error);
      return [];
    }
  };

  const preloadDistributors = async () => {
    try {
      const cacheKey = 'waterplast_distributors';
      let distributors = await getFromCache(cacheKey);

      if (!distributors) {
        const supabase = useSupabaseClient();
        const { data } = await supabase
          .from('distribuidores')
          .select('*')
          .eq('activo', true);

        if (data) {
          distributors = data;
          await saveToCache(cacheKey, distributors, 24 * 60);
        }
      }

      return distributors;
    } catch (error) {
      console.error('Error al precargar distribuidores:', error);
      return [];
    }
  };

  const preloadAll = async () => {
    if (!process.client) return;

    try {
      await Promise.all([
        preloadCriticalData(),
        preloadFeaturedImages(),
        preloadRecentBlogPosts(),
        preloadDistributors()
      ]);
    } catch (error) {
      console.error('Error durante el preload completo:', error);
    }
  };

  return {
    preloadCriticalData,
    preloadFeaturedImages,
    preloadRecentBlogPosts,
    preloadDistributors,
    preloadAll
  };
};