import { defineStore } from 'pinia'
import { ref, readonly } from 'vue'

const CACHE_KEY_ALL = 'waterplast_productos_all'
const CACHE_KEY_BY_CATEGORIA = 'waterplast_productos_categoria_'
const CACHE_TTL = 1 * 60

export const useStoreProductos = defineStore('productos', () => {
  const supabase = useSupabaseClient()
  const config = useRuntimeConfig()
  const { getFromCache, saveToCache } = useSupabaseCache()

  const productos = ref([])
  const productosPorCategoria = ref({})
  const loading = ref(false)
  const error = ref(null)

  const getProductoImageUrl = (imagePath) => {
    if (!imagePath) return null
    if (imagePath.startsWith('http')) return imagePath
    const supabaseUrl = config.public.supabase?.url || config.public.bucketUrl?.replace('/storage/v1/object/public', '')
    return `${supabaseUrl}/storage/v1/object/public/waterplast-productos/${imagePath}`
  }

  const getCaracteristicaImageUrl = (imagePath) => {
    if (!imagePath) return null
    if (imagePath.startsWith('http')) return imagePath
    const baseUrl = config.public.bucketUrl || `${config.public.supabase?.url}/storage/v1/object/public`
    return `${baseUrl}/waterplast-productos-caracteristicas/${imagePath}`
  }

  const formatProductoWithUrls = (producto) => {
    return {
      ...producto,
      imagen: producto.imagen ? getProductoImageUrl(producto.imagen) : null,
      imagen_principal: producto.imagen_principal ? getProductoImageUrl(producto.imagen_principal) : (producto.imagen ? getProductoImageUrl(producto.imagen) : null),
      imagen_ficha_tecnica: producto.imagen_ficha_tecnica ? getProductoImageUrl(producto.imagen_ficha_tecnica) : null,
      icono1: producto.icono1 ? getProductoImageUrl(producto.icono1) : null,
      icono2: producto.icono2 ? getProductoImageUrl(producto.icono2) : null,
      icono3: producto.icono3 ? getProductoImageUrl(producto.icono3) : null,
      imagenes_galeria: producto.imagenes_galeria
        ? producto.imagenes_galeria.map((img, index) => ({
            id: `galeria-${index}`,
            name: `imagen-galeria-${index + 1}.jpg`,
            url: getProductoImageUrl(img)
          }))
        : [],
      imagenes_galeria_count: producto.imagenes_galeria ? producto.imagenes_galeria.length : 0
    }
  }


  const fetchProductos = async () => {
    if (productos.value.length > 0) {
      return productos.value
    }

    const cachedData = await getFromCache(CACHE_KEY_ALL)
    if (cachedData) {
      productos.value = cachedData
      return cachedData
    }

    loading.value = true
    error.value = null

    try {
      const { data, error: supabaseError } = await supabase
        .from('waterplast-productos')
        .select(`
          *,
          categoria:categoria_id (
            id,
            nombre,
            slug
          )
        `)
        .eq('estado', true)
        .order('created_at', { ascending: true })

      if (supabaseError) throw supabaseError

      const productosWithUrls = (data || []).map(formatProductoWithUrls)
      productos.value = productosWithUrls

      await saveToCache(CACHE_KEY_ALL, productosWithUrls, CACHE_TTL)

      return productosWithUrls
    } catch (err) {
      error.value = err.message
      console.error('Error al obtener productos:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const fetchProductosByCategoria = async (categoriaSlug) => {
    if (productosPorCategoria.value[categoriaSlug]) {
      return productosPorCategoria.value[categoriaSlug]
    }

    const cacheKey = CACHE_KEY_BY_CATEGORIA + categoriaSlug
    const cachedData = await getFromCache(cacheKey)
    if (cachedData) {
      productosPorCategoria.value[categoriaSlug] = cachedData
      return cachedData
    }

    loading.value = true
    error.value = null

    try {
      const { data: categoriaData, error: categoriaError } = await supabase
        .from('waterplast-categorias')
        .select('id')
        .eq('slug', categoriaSlug)
        .single()

      if (categoriaError) throw categoriaError

      const { data, error: supabaseError } = await supabase
        .from('waterplast-productos')
        .select(`
          *,
          categoria:categoria_id (
            id,
            nombre,
            slug,
            color
          )
        `)
        .eq('estado', true)
        .eq('categoria_id', categoriaData.id)
        .order('created_at', { ascending: true })

      if (supabaseError) throw supabaseError

      const productosWithUrls = (data || []).map(formatProductoWithUrls)
      productosPorCategoria.value[categoriaSlug] = productosWithUrls

      await saveToCache(cacheKey, productosWithUrls, CACHE_TTL)

      return productosWithUrls
    } catch (err) {
      error.value = err.message
      console.error('Error al obtener productos por categoría:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const fetchProductoBySlug = async (slug) => {
    loading.value = true
    error.value = null
    currentProducto.value = null

    try {
      const { data, error: supabaseError } = await supabase
        .from('waterplast-productos')
        .select(`
          *,
          categoria:categoria_id (
            id,
            nombre,
            slug
          )
        `)
        .eq('slug', slug)
        .eq('estado', true)
        .single()

      if (supabaseError) throw supabaseError

      const productoWithUrls = formatProductoWithUrls(data)
      currentProducto.value = productoWithUrls
      return productoWithUrls
    } catch (err) {
      error.value = err.message
      console.error('Error al obtener producto:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const fetchProductoByCategoriaAndSlug = async (categoriaSlug, productoSlug) => {
    loading.value = true
    error.value = null
    currentProducto.value = null

    try {
      const { data: categoriaData, error: categoriaError } = await supabase
        .from('waterplast-categorias')
        .select('id')
        .eq('slug', categoriaSlug)
        .single()

      if (categoriaError) throw categoriaError

      const { data, error: supabaseError } = await supabase
        .from('waterplast-produtos')
        .select('*')
        .eq('slug', productoSlug)
        .eq('categoria_id', categoriaData.id)
        .eq('estado', true)
        .single()

      if (supabaseError) throw supabaseError

      const productoWithUrls = formatProductoWithUrls(data)
      currentProducto.value = productoWithUrls
      return productoWithUrls
    } catch (err) {
      error.value = err.message
      console.error('Error al obtener producto por categoría y slug:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const fetchProductosRelacionados = async (productosRelacionadosIds) => {
    if (!productosRelacionadosIds || productosRelacionadosIds.length === 0) {
      return []
    }

    try {
      const { data, error: supabaseError } = await supabase
        .from('waterplast-productos')
        .select(`
          *,
          categoria:categoria_id (
            id,
            nombre,
            slug,
            color
          )
        `)
        .in('id', productosRelacionadosIds)
        .eq('estado', true)

      if (supabaseError) throw supabaseError

      const productosWithUrls = (data || []).map(producto => ({
        ...producto,
        imagen_principal: producto.imagen_principal ? getProductoImageUrl(producto.imagen_principal) : null,
        icono1: producto.icono1 ? getProductoImageUrl(producto.icono1) : null,
        icono2: producto.icono2 ? getProductoImageUrl(producto.icono2) : null,
        icono3: producto.icono3 ? getProductoImageUrl(producto.icono3) : null,
      }))

      return productosWithUrls
    } catch (err) {
      console.error('Error al obtener productos relacionados:', err)
      return []
    }
  }

  const fetchCaracteristicasAdicionales = async (productoId) => {
    if (!productoId) return []

    try {
      const { data, error: supabaseError } = await supabase
        .from('waterplast-productos-caracteristicas-adicionales')
        .select('*')
        .eq('producto_id', productoId)
        .order('orden', { ascending: true })

      if (supabaseError) throw supabaseError

      const caracteristicasWithUrls = (data || []).map(caracteristica => ({
        ...caracteristica,
        imagen: caracteristica.imagen ? getCaracteristicaImageUrl(caracteristica.imagen) : null
      }))

      return caracteristicasWithUrls
    } catch (err) {
      console.error('Error al obtener características adicionales:', err)
      return []
    }
  }

  const fetchImagenesRedes = async (categoriaSlug) => {
    if (!categoriaSlug) return []

    try {
      const { data: files, error } = await supabase.storage
        .from('waterplast-categorias')
        .list(`${categoriaSlug}/imagenes-redes`, {
          limit: 100,
          offset: 0,
        })

      if (error || !files || files.length === 0) return []

      const supabaseUrl = config.public.supabase?.url || config.public.bucketUrl?.replace('/storage/v1/object/public', '')
      const imagenesRedes = files
        .filter(file => {
          const ext = file.name.split('.').pop().toLowerCase()
          return ['jpg', 'jpeg', 'png', 'webp', 'gif'].includes(ext)
        })
        .map(file => ({
          name: file.name,
          url: `${supabaseUrl}/storage/v1/object/public/waterplast-categorias/${categoriaSlug}/imagenes-redes/${file.name}`
        }))

      return imagenesRedes
    } catch (err) {
      console.error('Error al obtener imágenes de redes:', err)
      return []
    }
  }

  const getProductosByCategoria = (categoriaSlug) => {
    return productosPorCategoria.value[categoriaSlug] || []
  }

  const getProductoBySlug = (slug) => {
    return productos.value.find(p => p.slug === slug)
  }

  return {
    productos: readonly(productos),
    productosPorCategoria: readonly(productosPorCategoria),
    currentProducto: readonly(currentProducto),
    loading: readonly(loading),
    error: readonly(error),
    fetchProductos,
    fetchProductosByCategoria,
    fetchProductoBySlug,
    fetchProductoByCategoriaAndSlug,
    fetchProductosRelacionados,
    fetchCaracteristicasAdicionales,
    fetchImagenesRedes,
    getProductosByCategoria,
    getProductoBySlug,
    getProductoImageUrl,
    getCaracteristicaImageUrl
  }
})
