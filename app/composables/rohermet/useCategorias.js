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

    const fetchCategorias = async () => {
        loading.value = true
        error.value = null

        try {
            const { data, error: supabaseError } = await supabase
                .from('rohermet-categorias')
                .select('*')
                .order('orden', { ascending: true })

            if (supabaseError) throw supabaseError

            const categoriasWithUrls = (data || []).map(categoria => ({
                ...categoria,
                imagen_principal: categoria.imagen_principal ? getCategoriaImageUrl(categoria.imagen_principal) : null,
            }))

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

            const categoriaWithUrls = {
                ...data,
                imagen_principal: data.imagen_principal ? getCategoriaImageUrl(data.imagen_principal) : null,
            }

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
