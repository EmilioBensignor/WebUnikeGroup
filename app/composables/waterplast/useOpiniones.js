export const useWaterplastOpiniones = () => {
    const supabase = useSupabaseClient()

    const loading = ref(false)
    const opiniones = ref([])
    const currentOpinion = ref(null)
    const error = ref(null)

    const getOpinionImageUrl = (imagePath) => {
        if (!imagePath) return null
        if (imagePath.startsWith('http')) return imagePath
        return `/image-proxy/waterplast-opiniones/${imagePath}`
    }

    const fetchOpiniones = async () => {
        loading.value = true
        error.value = null

        try {
            const { data, error: supabaseError } = await supabase
                .from('waterplast-opiniones')
                .select('*')
                .order('created_at', { ascending: false })

            if (supabaseError) throw supabaseError

            const opinionesWithUrls = (data || []).map(opinion => ({
                ...opinion,
                imagen: opinion.imagen ? getOpinionImageUrl(opinion.imagen) : null
            }))

            opiniones.value = opinionesWithUrls
        } catch (err) {
            error.value = err.message
            console.error('Error al obtener opiniones:', err)
        } finally {
            loading.value = false
        }
    }

    const fetchOpinionById = async (id) => {
        loading.value = true
        error.value = null
        currentOpinion.value = null

        try {
            const { data, error: supabaseError } = await supabase
                .from('waterplast-opiniones')
                .select('*')
                .eq('id', id)
                .single()

            if (supabaseError) throw supabaseError

            const opinionWithUrl = {
                ...data,
                imagen: data.imagen ? getOpinionImageUrl(data.imagen) : null
            }

            currentOpinion.value = opinionWithUrl
            return opinionWithUrl
        } catch (err) {
            error.value = err.message
            console.error('Error al obtener opinión:', err)
            throw err
        } finally {
            loading.value = false
        }
    }

    return {
        opiniones: readonly(opiniones),
        currentOpinion: readonly(currentOpinion),
        loading: readonly(loading),
        error: readonly(error),
        fetchOpiniones,
        fetchOpinionById,
        getOpinionImageUrl
    }
}