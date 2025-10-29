const FIELD_MAPPINGS = {
  categorias: 'id,slug,nombre,color,imagen_hero_home,imagen_s_categorias,imagen_m_categorias,imagen_l_categorias,imagen_xl_categorias,orden',
  blogs: 'id,titulo,slug,imagen_principal,fecha,creado_por,contenido,descripcion',
  blogs_list: 'id,titulo,slug,imagen_principal,fecha,creado_por,descripcion', // Para listados
  imagenes_destacadas: 'id,slug,imagen_chica,imagen_mediana,imagen_grande',
  productos: 'id,nombre,slug,categoria_id,imagen,imagen_principal,descripcion,caracteristicas,precio',
  distribuidores: 'id,nombre,direccion,telefono,email,ciudad,provincia,latitud,longitud',
  especificaciones: '*',
};

export const useOptimizedQueries = () => {
  const supabase = useSupabaseClient();

  const fetchCategorias = async () => {
    try {
      const { data, error } = await supabase
        .from('categorias')
        .select(FIELD_MAPPINGS.categorias)
        .eq('activa', true)
        .order('orden', { ascending: true });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching categorías:', error);
      return [];
    }
  };

  const fetchBlogsList = async (limit = 10, offset = 0) => {
    try {
      const { data, error, count } = await supabase
        .from('blogs')
        .select(FIELD_MAPPINGS.blogs_list, { count: 'exact' })
        .eq('publicado', true)
        .order('fecha', { ascending: false })
        .range(offset, offset + limit - 1);

      if (error) throw error;
      return { data: data || [], count: count || 0 };
    } catch (error) {
      console.error('Error fetching blogs list:', error);
      return { data: [], count: 0 };
    }
  };

  const fetchBlogDetail = async (slug) => {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select(FIELD_MAPPINGS.blogs)
        .eq('slug', slug)
        .eq('publicado', true)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching blog detail:', error);
      return null;
    }
  };

  const fetchProductosByCategoria = async (categoriaSlug) => {
    try {
      const { data: categoria, error: catError } = await supabase
        .from('categorias')
        .select('id')
        .eq('slug', categoriaSlug)
        .single();

      if (catError) throw catError;

      const { data, error } = await supabase
        .from('productos')
        .select(FIELD_MAPPINGS.productos)
        .eq('categoria_id', categoria.id)
        .eq('activo', true)
        .order('nombre', { ascending: true });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching productos:', error);
      return [];
    }
  };

  const fetchProductoDetail = async (categoriaSlug, productoSlug) => {
    try {
      const { data: categoria } = await supabase
        .from('categorias')
        .select('id')
        .eq('slug', categoriaSlug)
        .single();

      const { data: producto, error } = await supabase
        .from('productos')
        .select(FIELD_MAPPINGS.productos)
        .eq('categoria_id', categoria.id)
        .eq('slug', productoSlug)
        .single();

      if (error) throw error;

      if (producto?.id) {
        const { data: specs } = await supabase
          .from('especificaciones')
          .select('*')
          .eq('producto_id', producto.id);

        producto.especificaciones = specs || [];
      }

      return producto;
    } catch (error) {
      console.error('Error fetching producto detail:', error);
      return null;
    }
  };

  const fetchImagenesDestacadas = async (slugs = []) => {
    try {
      let query = supabase
        .from('imagenes_destacadas')
        .select(FIELD_MAPPINGS.imagenes_destacadas);

      if (slugs.length > 0) {
        query = query.in('slug', slugs);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching imágenes destacadas:', error);
      return [];
    }
  };

  const fetchDistribuidores = async (filters = {}) => {
    try {
      let query = supabase
        .from('distribuidores')
        .select(FIELD_MAPPINGS.distribuidores)
        .eq('activo', true);

      if (filters.provincia) {
        query = query.eq('provincia', filters.provincia);
      }

      const { data, error } = await query.order('nombre', { ascending: true });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching distribuidores:', error);
      return [];
    }
  };

  return {
    fetchCategorias,
    fetchBlogsList,
    fetchBlogDetail,
    fetchProductosByCategoria,
    fetchProductoDetail,
    fetchImagenesDestacadas,
    fetchDistribuidores
  };
};