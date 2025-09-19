export const useWaterplastImagenesDestacadas = () => {
    const supabase = useSupabaseClient()
    const config = useRuntimeConfig()

    const loading = ref(false)
    const imagenesDestacadas = ref([])
    const currentImagenDestacada = ref(null)
    const error = ref(null)

    const getImagenDestacadaUrl = (imagePath) => {
        if (!imagePath) return null
        if (imagePath.startsWith('http')) return imagePath
        return `${config.public.supabase.url}/storage/v1/object/public/waterplast-imagenes-destacadas/${imagePath}`
    }

    const fetchImagenesDestacadas = async () => {
        loading.value = true
        error.value = null

        try {
            const { data, error: supabaseError } = await supabase
                .from('waterplast-imagenes-destacadas')
                .select('*')
                .order('orden', { ascending: true })

            if (supabaseError) throw supabaseError

            const imagenesWithUrls = (data || []).map(imagen => ({
                ...imagen,
                imagen_chica: imagen.imagen_chica ? getImagenDestacadaUrl(imagen.imagen_chica) : null,
                imagen_mediana: imagen.imagen_mediana ? getImagenDestacadaUrl(imagen.imagen_mediana) : null,
                imagen_grande: imagen.imagen_grande ? getImagenDestacadaUrl(imagen.imagen_grande) : null
            }))

            imagenesDestacadas.value = imagenesWithUrls
        } catch (err) {
            error.value = err.message
            console.error('Error al obtener imágenes destacadas:', err)
        } finally {
            loading.value = false
        }
    }

    const fetchImagenDestacadaById = async (id) => {
        loading.value = true
        error.value = null
        currentImagenDestacada.value = null

        try {
            const { data, error: supabaseError } = await supabase
                .from('waterplast-imagenes-destacadas')
                .select('*')
                .eq('id', id)
                .single()

            if (supabaseError) throw supabaseError

            const imagenWithUrls = {
                ...data,
                imagen_chica: data.imagen_chica ? getImagenDestacadaUrl(data.imagen_chica) : null,
                imagen_mediana: data.imagen_mediana ? getImagenDestacadaUrl(data.imagen_mediana) : null,
                imagen_grande: data.imagen_grande ? getImagenDestacadaUrl(data.imagen_grande) : null
            }

            currentImagenDestacada.value = imagenWithUrls
            return imagenWithUrls
        } catch (err) {
            error.value = err.message
            console.error('Error al obtener imagen destacada:', err)
            throw err
        } finally {
            loading.value = false
        }
    }

    const fetchImagenDestacadaBySlug = async (slug) => {
        loading.value = true
        error.value = null

        try {
            const { data, error: supabaseError } = await supabase
                .from('waterplast-imagenes-destacadas')
                .select('*')
                .eq('slug', slug)
                .single()

            if (supabaseError) throw supabaseError

            const imagenWithUrls = {
                ...data,
                imagen_chica: data.imagen_chica ? getImagenDestacadaUrl(data.imagen_chica) : null,
                imagen_mediana: data.imagen_mediana ? getImagenDestacadaUrl(data.imagen_mediana) : null,
                imagen_grande: data.imagen_grande ? getImagenDestacadaUrl(data.imagen_grande) : null
            }

            return imagenWithUrls
        } catch (err) {
            error.value = err.message
            console.error('Error al obtener imagen destacada por slug:', err)
            return null
        } finally {
            loading.value = false
        }
    }

    return {
        imagenesDestacadas: readonly(imagenesDestacadas),
        currentImagenDestacada: readonly(currentImagenDestacada),
        loading: readonly(loading),
        error: readonly(error),
        fetchImagenesDestacadas,
        fetchImagenDestacadaById,
        fetchImagenDestacadaBySlug,
        getImagenDestacadaUrl
    }
}