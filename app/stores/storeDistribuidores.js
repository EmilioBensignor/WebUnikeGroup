import { defineStore } from 'pinia'
import { ref, readonly } from 'vue'

const CACHE_KEY = 'waterplast_distribuidores'
const CACHE_TTL = 24 * 60

export const useStoreDistribuidores = defineStore('distribuidores', () => {
  const supabase = useSupabaseClient()
  const config = useRuntimeConfig()
  const { getFromCache, saveToCache } = useSupabaseCache()

  const distribuidores = ref([])
  const distribuidoresPorProvincia = ref({})
  const loading = ref(false)
  const error = ref(null)

  const getDistribuidorImageUrl = (imagePath) => {
    if (!imagePath) return null
    if (imagePath.startsWith('http')) return imagePath
    return `${config.public.supabase.url}/storage/v1/object/public/waterplast-distribuidores/${imagePath}`
  }

  const formatDistribuidorWithUrls = (distribuidor) => {
    return {
      ...distribuidor,
      logo: distribuidor.logo ? getDistribuidorImageUrl(distribuidor.logo) : null,
      imagen: distribuidor.imagen ? getDistribuidorImageUrl(distribuidor.imagen) : null
    }
  }

  const fetchDistribuidores = async () => {
    if (distribuidores.value.length > 0) {
      return distribuidores.value
    }

    const cachedData = await getFromCache(CACHE_KEY)
    if (cachedData) {
      distribuidores.value = cachedData
      return cachedData
    }

    loading.value = true
    error.value = null

    try {
      const { data, error: supabaseError } = await supabase
        .from('waterplast-distribuidores')
        .select('*')
        .eq('estado', true)
        .order('nombre', { ascending: true })

      if (supabaseError) throw supabaseError

      const distribuidoresWithUrls = (data || []).map(formatDistribuidorWithUrls)
      distribuidores.value = distribuidoresWithUrls

      const porProvincia = {}
      distribuidoresWithUrls.forEach(dist => {
        const provincia = dist.provincia || 'Sin especificar'
        if (!porProvincia[provincia]) {
          porProvincia[provincia] = []
        }
        porProvincia[provincia].push(dist)
      })
      distribuidoresPorProvincia.value = porProvincia

      await saveToCache(CACHE_KEY, distribuidoresWithUrls, CACHE_TTL)

      return distribuidoresWithUrls
    } catch (err) {
      error.value = err.message
      console.error('Error al obtener distribuidores:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const fetchDistribuidoresPorProvincia = async (provincia) => {
    if (distribuidoresPorProvincia.value[provincia]) {
      return distribuidoresPorProvincia.value[provincia]
    }

    if (distribuidores.value.length === 0) {
      await fetchDistribuidores()
    }

    return distribuidoresPorProvincia.value[provincia] || []
  }

  const fetchDistribuidorById = async (id) => {
    loading.value = true
    error.value = null

    try {
      const { data, error: supabaseError } = await supabase
        .from('waterplast-distribuidores')
        .select('*')
        .eq('id', id)
        .single()

      if (supabaseError) throw supabaseError

      return formatDistribuidorWithUrls(data)
    } catch (err) {
      error.value = err.message
      console.error('Error al obtener distribuidor:', err)
      throw err
    } finally {
      loading.value = false
    }
  }


  const getDistribuidorById = (id) => {
    return distribuidores.value.find(d => d.id === id)
  }

  const getDistribuidoresPorProvincia = (provincia) => {
    return distribuidoresPorProvincia.value[provincia] || []
  }

  const getProvincias = () => {
    return Object.keys(distribuidoresPorProvincia.value).sort()
  }

  return {
    distribuidores: readonly(distribuidores),
    distribuidoresPorProvincia: readonly(distribuidoresPorProvincia),
    loading: readonly(loading),
    error: readonly(error),
    fetchDistribuidores,
    fetchDistribuidoresPorProvincia,
    fetchDistribuidorById,
    getDistribuidorById,
    getDistribuidoresPorProvincia,
    getProvincias,
    getDistribuidorImageUrl
  }
})
