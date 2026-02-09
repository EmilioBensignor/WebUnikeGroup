export const useRohermetCategorias = () => {
    const supabase = useSupabaseClient()
    const config = useRuntimeConfig()

    const loading = ref(false)
    const categorias = ref([])
    const currentCategoria = ref(null)
    const error = ref(null)

    const getCategoriaImageUrl = (imagePath) => {
        if (!imagePath) return null
        if (imagePath.startsWith('http')) return imagePath
        return `${config.public.supabase.url}/storage/v1/object/public/rohermet-categorias/${imagePath}`
    }

    const mapCategoriaUrls = (categoria) => ({
        ...categoria,
        imagen: categoria.imagen ? getCategoriaImageUrl(categoria.imagen) : null,
        imagen_xl_categorias: categoria.imagen_xl_categorias ? getCategoriaImageUrl(categoria.imagen_xl_categorias) : null,
        imagen_l_categorias: categoria.imagen_l_categorias ? getCategoriaImageUrl(categoria.imagen_l_categorias) : null,
        imagen_m_categorias: categoria.imagen_m_categorias ? getCategoriaImageUrl(categoria.imagen_m_categorias) : null,
        imagen_s_categorias: categoria.imagen_s_categorias ? getCategoriaImageUrl(categoria.imagen_s_categorias) : null,
        icono1: categoria.icono1 ? getCategoriaImageUrl(categoria.icono1) : null,
        icono2: categoria.icono2 ? getCategoriaImageUrl(categoria.icono2) : null,
        icono3: categoria.icono3 ? getCategoriaImageUrl(categoria.icono3) : null,
        imagenesRedes: categoria.imagenesRedes
            ? categoria.imagenesRedes.map((img, index) => ({
                id: `red-${index}`,
                name: `imagen-red-${index + 1}.jpg`,
                url: getCategoriaImageUrl(img)
            }))
            : [],
    })

    const fetchCategorias = async () => {
        loading.value = true
        error.value = null

        try {
            const { data, error: supabaseError } = await supabase
                .from('rohermet-categorias')
                .select('*')
                .order('orden', { ascending: true })

            if (supabaseError) throw supabaseError

            const categoriasWithUrls = (data || []).map(mapCategoriaUrls)

            categorias.value = categoriasWithUrls
            return categoriasWithUrls
        } catch (err) {
            error.value = err.message
            console.error('Error al obtener categorías de Rohermet:', err)
            throw err
        } finally {
            loading.value = false
        }
    }

    const fetchCategoriaBySlug = async (slug) => {
        loading.value = true
        error.value = null
        currentCategoria.value = null

        try {
            const { data, error: supabaseError } = await supabase
                .from('rohermet-categorias')
                .select('*')
                .eq('slug', slug)
                .single()

            if (supabaseError) throw supabaseError

            const categoriaWithUrls = mapCategoriaUrls(data)

            currentCategoria.value = categoriaWithUrls
            return categoriaWithUrls
        } catch (err) {
            error.value = err.message
            console.error('Error al obtener categoría por slug:', err)
            throw err
        } finally {
            loading.value = false
        }
    }

    return {
        categorias: readonly(categorias),
        currentCategoria: readonly(currentCategoria),
        loading: readonly(loading),
        error: readonly(error),
        fetchCategorias,
        fetchCategoriaBySlug,
        getCategoriaImageUrl,
    }
}
