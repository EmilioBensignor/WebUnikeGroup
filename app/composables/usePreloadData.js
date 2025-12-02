export const usePreloadData = () => {
  const { getFromCache, saveToCache } = useSupabaseCache();

  const FIELD_MAPPINGS = {
    categorias: 'id,slug,nombre,color,imagen_hero_home,imagen_s_categorias,imagen_m_categorias,imagen_l_categorias,imagen_xl_categorias,orden',
    imagenes_destacadas: 'id,slug,imagen_chica,imagen_mediana,imagen_grande',
    blogs_list: 'id,titulo,slug,imagen_principal,fecha,creado_por,descripcion',
    distribuidores: 'id,nombre,direccion,telefono,email,ciudad,provincia,latitud,longitud'
  };

  const preloadCriticalData = async () => {
    try {
      const cacheKey = 'waterplast_categorias';
      let categorias = await getFromCache(cacheKey);

      if (!categorias) {
        const supabase = useSupabaseClient();
        const { data } = await supabase
          .from('waterplast-categorias')
          .select(FIELD_MAPPINGS.categorias)
          .eq('estado', true)
          .order('orden', { ascending: true });

        if (data) {
          categorias = data;
          await saveToCache(cacheKey, categorias, 1 * 60);
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
        const config = useRuntimeConfig();
        const { data } = await supabase
          .from('waterplast-imagenes-destacadas')
          .select(FIELD_MAPPINGS.imagenes_destacadas)
          .in('slug', ['imagen-hero-home', 'imagen-menu']);

        if (data) {
          images = data;
          await saveToCache(cacheKey, images, 1 * 60);

          if (import.meta.client) {
            data.forEach(img => {
              ['imagen_chica', 'imagen_mediana', 'imagen_grande'].forEach(size => {
                if (img[size]) {
                  const link = document.createElement('link');
                  link.rel = 'preload';
                  link.as = 'image';
                  link.href = `${config.public.supabase.url}/storage/v1/object/public/waterplast-imagenes-destacadas/${img[size]}`;
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
          .from('blog')
          .select(FIELD_MAPPINGS.blogs_list)
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
          .from('waterplast-distribuidores')
          .select(FIELD_MAPPINGS.distribuidores);

        if (data) {
          distributors = data;
          await saveToCache(cacheKey, distributors, 1 * 60);
        }
      }

      return distributors;
    } catch (error) {
      console.error('Error al precargar distribuidores:', error);
      return [];
    }
  };

  const preloadAll = async () => {
    if (!import.meta.client) return;

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