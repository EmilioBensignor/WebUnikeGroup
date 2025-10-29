import { defineStore } from 'pinia'
import { ref, readonly } from 'vue'

const CACHE_KEY = 'waterplast_opiniones'
const CACHE_TTL = 12 * 60

export const useStoreOpiniones = defineStore('opiniones', () => {
  const supabase = useSupabaseClient()
  const config = useRuntimeConfig()
  const { getFromCache, saveToCache } = useSupabaseCache()

  const opiniones = ref([])
  const loading = ref(false)
  const error = ref(null)

  const getOpinionImageUrl = (imagePath) => {
    if (!imagePath) return null
    if (imagePath.startsWith('http')) return imagePath
    return `${config.public.supabase.url}/storage/v1/object/public/waterplast-opiniones/${imagePath}`
  }

  const formatOpinionWithUrls = (opinion) => {
    return {
      ...opinion,
      imagen: opinion.imagen ? getOpinionImageUrl(opinion.imagen) : null
    }
  }

  const fetchOpiniones = async () => {
    if (opiniones.value.length > 0) {
      return opiniones.value
    }

    const cachedData = await getFromCache(CACHE_KEY)
    if (cachedData) {
      opiniones.value = cachedData
      return cachedData
    }

    loading.value = true
    error.value = null

    try {
      const { data, error: supabaseError } = await supabase
        .from('waterplast-opiniones')
        .select('*')
        .eq('estado', true)
        .order('created_at', { ascending: false })

      if (supabaseError) throw supabaseError

      const opinionesWithUrls = (data || []).map(formatOpinionWithUrls)
      opiniones.value = opinionesWithUrls

      await saveToCache(CACHE_KEY, opinionesWithUrls, CACHE_TTL)

      return opinionesWithUrls
    } catch (err) {
      error.value = err.message
      console.error('Error al obtener opiniones:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const fetchOpinionById = async (id) => {
    loading.value = true
    error.value = null

    try {
      const { data, error: supabaseError } = await supabase
        .from('waterplast-opiniones')
        .select('*')
        .eq('id', id)
        .single()

      if (supabaseError) throw supabaseError

      const opinionWithUrl = formatOpinionWithUrls(data)
      return opinionWithUrl
    } catch (err) {
      error.value = err.message
      console.error('Error al obtener opinión:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const getOpinionById = (id) => {
    return opiniones.value.find(op => op.id === id)
  }

  return {
    opiniones: readonly(opiniones),
    loading: readonly(loading),
    error: readonly(error),
    fetchOpiniones,
    fetchOpinionById,
    getOpinionById,
    getOpinionImageUrl
  }
})
