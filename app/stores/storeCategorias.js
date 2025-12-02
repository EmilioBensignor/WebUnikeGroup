import { defineStore } from 'pinia'
import { ref, readonly } from 'vue'

const CACHE_KEY = 'waterplast_categorias'
const CACHE_TTL = 1 * 60

export const useStoreCategorias = defineStore('categorias', () => {
  const supabase = useSupabaseClient()
  const config = useRuntimeConfig()
  const { getFromCache, saveToCache } = useSupabaseCache()

  const categorias = ref([])
  const currentCategoria = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const getCategoriaImageUrl = (imagePath) => {
    if (!imagePath) return null
    if (imagePath.startsWith('http')) return imagePath
    return `${config.public.supabase.url}/storage/v1/object/public/waterplast-categorias/${imagePath}`
  }

  const getCategoriaIconUrl = (iconPath) => {
    if (!iconPath) return null
    if (iconPath.startsWith('http')) return iconPath
    return `${config.public.supabase.url}/storage/v1/object/public/waterplast-categorias/${iconPath}`
  }

  const getCategoriaImagenRedUrl = (imagePath) => {
    if (!imagePath) return null
    if (imagePath.startsWith('http')) return imagePath
    return `${config.public.supabase.url}/storage/v1/object/public/waterplast-categorias/${imagePath}`
  }

  const formatCategoriaWithUrls = (categoria) => {
    return {
      ...categoria,
      imagen_menu: categoria.imagen_menu ? getCategoriaImageUrl(categoria.imagen_menu) : null,
      imagen_hero_home: categoria.imagen_hero_home ? getCategoriaImageUrl(categoria.imagen_hero_home) : null,
      imagen_pagina_categorias: categoria.imagen_pagina_categorias ? getCategoriaImageUrl(categoria.imagen_pagina_categorias) : null,
      icono1: categoria.icono1 ? getCategoriaIconUrl(categoria.icono1) : null,
      icono2: categoria.icono2 ? getCategoriaIconUrl(categoria.icono2) : null,
      icono3: categoria.icono3 ? getCategoriaIconUrl(categoria.icono3) : null,
      imagenes_redes: categoria.imagenes_redes
        ? categoria.imagenes_redes.map((img, index) => ({
            id: `red-${index}`,
            name: `imagen-red-${index + 1}.jpg`,
            url: getCategoriaImagenRedUrl(img)
          }))
        : [],
      imagenes_redes_count: categoria.imagenes_redes ? categoria.imagenes_redes.length : 0
    }
  }

  const fetchCategorias = async () => {
    if (categorias.value.length > 0) {
      return categorias.value
    }

    const cachedData = await getFromCache(CACHE_KEY)
    if (cachedData) {
      categorias.value = cachedData
      return cachedData
    }

    loading.value = true
    error.value = null

    try {
      const { data, error: supabaseError } = await supabase
        .from('waterplast-categorias')
        .select('*')
        .order('orden', { ascending: true })

      if (supabaseError) throw supabaseError

      const categoriasWithUrls = (data || []).map(formatCategoriaWithUrls)

      categorias.value = categoriasWithUrls

      await saveToCache(CACHE_KEY, categoriasWithUrls, CACHE_TTL)

      return categoriasWithUrls
    } catch (err) {
      error.value = err.message
      console.error('Error al obtener categorías:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const fetchCategoriaById = async (id) => {
    loading.value = true
    error.value = null
    currentCategoria.value = null

    try {
      const { data, error: supabaseError } = await supabase
        .from('waterplast-categorias')
        .select('*')
        .eq('id', id)
        .single()

      if (supabaseError) throw supabaseError

      const categoriaWithUrls = formatCategoriaWithUrls(data)
      currentCategoria.value = categoriaWithUrls
      return categoriaWithUrls
    } catch (err) {
      error.value = err.message
      console.error('Error al obtener categoría:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const fetchCategoriaBySlug = async (slug) => {
    const cached = categorias.value.find(c => c.slug === slug)
    if (cached) {
      currentCategoria.value = cached
      return cached
    }

    loading.value = true
    error.value = null
    currentCategoria.value = null

    try {
      const { data, error: supabaseError } = await supabase
        .from('waterplast-categorias')
        .select('*')
        .eq('slug', slug)
        .single()

      if (supabaseError) throw supabaseError

      const categoriaWithUrls = formatCategoriaWithUrls(data)
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

  const getCategoriaBySlug = (slug) => {
    return categorias.value.find(c => c.slug === slug)
  }

  const getCategoriaById = (id) => {
    return categorias.value.find(c => c.id === id)
  }

  return {
    categorias: readonly(categorias),
    currentCategoria: readonly(currentCategoria),
    loading: readonly(loading),
    error: readonly(error),
    fetchCategorias,
    fetchCategoriaById,
    fetchCategoriaBySlug,
    getCategoriaBySlug,
    getCategoriaById,
    getCategoriaImageUrl,
    getCategoriaIconUrl,
    getCategoriaImagenRedUrl
  }
})
