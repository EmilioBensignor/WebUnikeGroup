export const useProducto = (marca) => {
    const supabase = useSupabaseClient()
    const config = useRuntimeConfig()

    const loading = ref(false)
    const producto = ref(null)
    const error = ref(null)

    const getProductoImageUrl = (imagePath, marca) => {
        if (!imagePath) return null
        if (imagePath.startsWith('http')) return imagePath
        return `${config.public.supabase.url}/storage/v1/object/public/${marca}-productos/${imagePath}`
    }

    const fetchProductoBySlugOrId = async (slugOrId, marcaName) => {
        loading.value = true
        error.value = null
        producto.value = null

        try {
            const { data, error: supabaseError } = await supabase
                .from(`${marcaName}-productos`)
                .select('*')
                .eq('slug', slugOrId)
                .single()

            if (supabaseError) {
                // Si no encuentra por slug, intenta por ID
                if (supabaseError.code === 'PGRST116') {
                    const { data: dataById, error: errorById } = await supabase
                        .from(`${marcaName}-productos`)
                        .select('*')
                        .eq('id', slugOrId)
                        .single()

                    if (errorById) throw errorById
                    producto.value = dataById
                } else {
                    throw supabaseError
                }
            } else {
                producto.value = data
            }

            return producto.value
        } catch (err) {
            error.value = err.message
            console.error(`Error al obtener producto de ${marcaName}:`, err)
            throw err
        } finally {
            loading.value = false
        }
    }

    return {
        producto: readonly(producto),
        loading: readonly(loading),
        error: readonly(error),
        fetchProductoBySlugOrId,
        getProductoImageUrl,
    }
}
