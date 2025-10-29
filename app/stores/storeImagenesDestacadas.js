import { defineStore } from 'pinia'
import { ref, readonly } from 'vue'

const CACHE_KEY = 'waterplast_imagenes_destacadas'
const CACHE_TTL = 24 * 60

export const useStoreImagenesDestacadas = defineStore('imagenesDestacadas', () => {
  const supabase = useSupabaseClient()
  const config = useRuntimeConfig()
  const { getFromCache, saveToCache } = useSupabaseCache()

  const imagenes = ref([])
  const loading = ref(false)
  const error = ref(null)

  const getImagenUrl = (imagePath) => {
    if (!imagePath) return null
    if (imagePath.startsWith('http')) return imagePath
    return `${config.public.supabase.url}/storage/v1/object/public/waterplast-imagenes-destacadas/${imagePath}`
  }

  const formatImagenWithUrls = (imagen) => {
    return {
      ...imagen,
      imagen_chica: imagen.imagen_chica ? getImagenUrl(imagen.imagen_chica, 'chica') : null,
      imagen_mediana: imagen.imagen_mediana ? getImagenUrl(imagen.imagen_mediana, 'mediana') : null,
      imagen_grande: imagen.imagen_grande ? getImagenUrl(imagen.imagen_grande, 'grande') : null
    }
  }

  const fetchImagenesDestacadas = async () => {
    if (imagenes.value.length > 0) {
      return imagenes.value
    }

    const cachedData = await getFromCache(CACHE_KEY)
    if (cachedData) {
      imagenes.value = cachedData
      return cachedData
    }

    loading.value = true
    error.value = null

    try {
      const { data, error: supabaseError } = await supabase
        .from('waterplast-imagenes-destacadas')
        .select('*')
        .eq('estado', true)
        .order('orden', { ascending: true })

      if (supabaseError) throw supabaseError

      const imagenesWithUrls = (data || []).map(formatImagenWithUrls)
      imagenes.value = imagenesWithUrls

      await saveToCache(CACHE_KEY, imagenesWithUrls, CACHE_TTL)

      return imagenesWithUrls
    } catch (err) {
      error.value = err.message
      console.error('Error al obtener imágenes destacadas:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const fetchImagenById = async (id) => {
    loading.value = true
    error.value = null

    try {
      const { data, error: supabaseError } = await supabase
        .from('waterplast-imagenes-destacadas')
        .select('*')
        .eq('id', id)
        .single()

      if (supabaseError) throw supabaseError

      return formatImagenWithUrls(data)
    } catch (err) {
      error.value = err.message
      console.error('Error al obtener imagen destacada por id:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const fetchImagenBySlug = async (slug) => {
    const cached = imagenes.value.find(img => img.slug === slug)
    if (cached) return cached

    loading.value = true
    error.value = null

    try {
      const { data, error: supabaseError } = await supabase
        .from('waterplast-imagenes-destacadas')
        .select('*')
        .eq('slug', slug)
        .single()

      if (supabaseError) {
        if (supabaseError.code === 'PGRST116') {
          return null
        }
        throw supabaseError
      }

      return formatImagenWithUrls(data)
    } catch (err) {
      error.value = err.message
      console.error('Error al obtener imagen destacada por slug:', err)
      return null
    } finally {
      loading.value = false
    }
  }

  const getImagenBySlug = (slug) => {
    return imagenes.value.find(img => img.slug === slug)
  }

  return {
    imagenes: readonly(imagenes),
    loading: readonly(loading),
    error: readonly(error),
    fetchImagenesDestacadas,
    fetchImagenById,
    fetchImagenBySlug,
    getImagenBySlug,
    getImagenUrl
  }
})
