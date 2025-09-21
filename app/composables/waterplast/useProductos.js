export const useWaterplastProductos = () => {
    const supabase = useSupabaseClient()
    const config = useRuntimeConfig()

    const loading = ref(false)
    const productos = ref([])
    const currentProducto = ref(null)
    const error = ref(null)

    const getProductoImageUrl = (imagePath) => {
        if (!imagePath) return null
        if (imagePath.startsWith('http')) return imagePath
        return `${config.public.supabase.url}/storage/v1/object/public/waterplast-productos/${imagePath}`
    }

    const fetchProductos = async () => {
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

            const productosWithUrls = (data || []).map(producto => ({
                ...producto,
                imagen_principal: producto.imagen_principal ? getProductoImageUrl(producto.imagen_principal) : null,
                imagen_ficha_tecnica: producto.imagen_ficha_tecnica ? getProductoImageUrl(producto.imagen_ficha_tecnica) : null,
                imagenes_galeria: producto.imagenes_galeria ?
                    producto.imagenes_galeria.map((img, index) => ({
                        id: `galeria-${index}`,
                        name: `imagen-galeria-${index + 1}.jpg`,
                        url: getProductoImageUrl(img)
                    })) : [],
                imagenes_galeria_count: producto.imagenes_galeria ? producto.imagenes_galeria.length : 0
            }))

            productos.value = productosWithUrls
        } catch (err) {
            error.value = err.message
            console.error('Error al obtener productos:', err)
        } finally {
            loading.value = false
        }
    }

    const fetchProductosByCategoria = async (categoriaSlug) => {
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
                .select('*')
                .eq('estado', true)
                .eq('categoria_id', categoriaData.id)
                .order('created_at', { ascending: true })

            if (supabaseError) throw supabaseError

            const productosWithUrls = (data || []).map(producto => ({
                ...producto,
                imagen_principal: producto.imagen_principal ? getProductoImageUrl(producto.imagen_principal) : null,
                imagen_ficha_tecnica: producto.imagen_ficha_tecnica ? getProductoImageUrl(producto.imagen_ficha_tecnica) : null,
                imagenes_galeria: producto.imagenes_galeria ?
                    producto.imagenes_galeria.map((img, index) => ({
                        id: `galeria-${index}`,
                        name: `imagen-galeria-${index + 1}.jpg`,
                        url: getProductoImageUrl(img)
                    })) : [],
                imagenes_galeria_count: producto.imagenes_galeria ? producto.imagenes_galeria.length : 0
            }))

            productos.value = productosWithUrls
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
                .single()

            if (supabaseError) throw supabaseError

            const productoWithUrls = {
                ...data,
                imagen_principal: data.imagen_principal ? getProductoImageUrl(data.imagen_principal) : null,
                imagen_ficha_tecnica: data.imagen_ficha_tecnica ? getProductoImageUrl(data.imagen_ficha_tecnica) : null,
                imagenes_galeria: data.imagenes_galeria ?
                    data.imagenes_galeria.map((img, index) => ({
                        id: `galeria-${index}`,
                        name: `imagen-galeria-${index + 1}.jpg`,
                        url: getProductoImageUrl(img)
                    })) : []
            }

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
                .from('waterplast-productos')
                .select('*')
                .eq('slug', productoSlug)
                .eq('categoria_id', categoriaData.id)
                .single()

            if (supabaseError) throw supabaseError

            const productoWithUrls = {
                ...data,
                imagen_principal: data.imagen_principal ? getProductoImageUrl(data.imagen_principal) : null,
                imagen_ficha_tecnica: data.imagen_ficha_tecnica ? getProductoImageUrl(data.imagen_ficha_tecnica) : null,
                imagenes_galeria: data.imagenes_galeria ?
                    data.imagenes_galeria.map((img, index) => ({
                        id: `galeria-${index}`,
                        name: `imagen-galeria-${index + 1}.jpg`,
                        url: getProductoImageUrl(img)
                    })) : []
            }

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

    return {
        productos: readonly(productos),
        currentProducto: readonly(currentProducto),
        loading: readonly(loading),
        error: readonly(error),
        fetchProductos,
        fetchProductosByCategoria,
        fetchProductoBySlug,
        fetchProductoByCategoriaAndSlug,
        getProductoImageUrl
    }
}