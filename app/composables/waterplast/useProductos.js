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

    const generateCleanName = (nombre) => {
        if (!nombre) return ''

        return nombre
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim('-')
            .substring(0, 20)
            .replace(/-$/, '')
    }

    const fetchProducto3DFromSupabase = async (productoId) => {
        try {
            const { data, error } = await supabase
                .from('waterplast-productos')
                .select('archivo_html, nombre')
                .eq('id', productoId)
                .single()

            if (error) throw error

            if (data && data.archivo_html) {
                const htmlResponse = await $fetch(data.archivo_html)

                const processedHTML = processKeyShotXRHTML(htmlResponse, data.nombre)

                return {
                    ...data,
                    processed_html: processedHTML,
                    clean_name: generateCleanName(data.nombre)
                }
            }

            return data
        } catch (error) {
            console.error('Error fetching 3D product from Supabase:', error)
            throw error
        }
    }

    const processKeyShotXRHTML = async (html, productoNombre) => {
        if (!html) return ''

        let processedHTML = html
        const cleanName = generateCleanName(productoNombre)
        const config = useRuntimeConfig()

        let keyshotContent = await $fetch('/lib/keyshot-xr.js')

        const pattern = /b\.src=a\.D\[f\]/g
        const matches = keyshotContent.match(pattern)

        const imageBaseUrl = `${config.public.supabase.url}/storage/v1/object/public/waterplast-productos/${cleanName}/images`

        let modified = false
        
        const vaPattern = /this\.va=function\(b,f\)\{return A\+a\.s\+[^}]+\}/
        const vaMatch = keyshotContent.match(vaPattern)
        
        if (vaMatch) {
            keyshotContent = keyshotContent.replace(
                vaPattern,
                `this.va=function(b,f){return "${imageBaseUrl}/"+parseInt(f)+"_"+parseInt(b)+".png"}`
            )
            modified = true
        } else {
        }
        
        if (!modified) {
            if (keyshotContent.includes('parseInt(f)+"_"+parseInt(b)')) {
                keyshotContent = keyshotContent.replace(
                    /return [^;]+parseInt\(f\)\+["']_["']\+parseInt\(b\)[^;]+/g,
                    `return "${imageBaseUrl}/"+parseInt(f)+"_"+parseInt(b)+".png"`
                )
                modified = true
            }
        }

        if (modified) {
            const vaIndex = keyshotContent.indexOf('this.va=function')
            if (vaIndex !== -1) {
                console.log('Modified va function area:', keyshotContent.substring(vaIndex, vaIndex + 200))
            }
        }

        if (!keyshotContent.includes('window.keyshotXR=function')) {
            console.error('KeyShotXR function not found in the loaded script')
        } else {
            console.log('KeyShotXR function found successfully')
        }

        processedHTML = processedHTML.replace(
            /<script\s+type="text\/javascript"\s+src="[^"]*KeyShotXR\.js"><\/script>/gi,
            `<script type="text/javascript">${keyshotContent}</script>`
        )

        processedHTML = processedHTML.replace(
            /<script[^>]*src="[^"]*KeyShotXR\.js"[^>]*><\/script>/gi,
            `<script type="text/javascript">${keyshotContent}</script>`
        )

        processedHTML = processedHTML.replace(
            /var\s+folderName\s*=\s*["']([^"']*)["']/g,
            'var folderName = ""'
        )

        processedHTML = processedHTML.replace(
            /<div([^>]*?)id=["']?xr-container["']?([^>]*?)>/g,
            '<div$1id="xr-container"$2 style="width: 100%; height: 100%; position: relative;">'
        )


        const scriptMatch = processedHTML.match(/<script type="text\/javascript">(.*?)<\/script>/s)
        if (scriptMatch) {
            
            try {
                new Function(scriptMatch[1])
                console.log('Script syntax is valid')
            } catch (e) {
                console.error('Script syntax error:', e.message)
            }
        }

        return processedHTML
    }

    const injectXRViewer = (containerId, html) => {
        if (process.client) {
            const container = document.getElementById(containerId)
            if (container && html) {
                container.innerHTML = html

                const scripts = container.querySelectorAll('script')
                scripts.forEach(script => {
                    const newScript = document.createElement('script')

                    if (script.src) {
                        newScript.src = script.src
                    } else {
                        newScript.textContent = script.textContent
                    }

                    if (script.type) {
                        newScript.type = script.type
                    }

                    document.head.appendChild(newScript)

                    setTimeout(() => {
                        if (newScript.parentNode) {
                            newScript.parentNode.removeChild(newScript)
                        }
                    }, 100)
                })
            }
        }
    }

    const renderXRViewer = async (containerId, productoSlug) => {
        try {
            const producto = await fetchProductoBySlug(productoSlug)

            if (producto && producto.xr_html_content) {
                const processedHTML = processKeyShotXRHTML(producto.xr_html_content, producto.nombre)
                injectXRViewer(containerId, processedHTML)
                return true
            }
            return false
        } catch (err) {
            console.error('Error rendering XR viewer:', err)
            return false
        }
    }

    const processProductoHTML = async (producto) => {
        if (!producto || !producto.archivo_html) return null

        try {
            let htmlUrl = producto.archivo_html
            if (!htmlUrl.startsWith('http')) {
                const config = useRuntimeConfig()
                htmlUrl = `${config.public.supabase.url}/storage/v1/object/public/waterplast-productos/${htmlUrl}`
            }


            const htmlResponse = await $fetch(htmlUrl)

            const processedHTML = await processKeyShotXRHTML(htmlResponse, producto.nombre)

            return {
                ...producto,
                processed_html: processedHTML,
                clean_name: generateCleanName(producto.nombre)
            }
        } catch (error) {
            console.error('Error processing producto HTML:', error)
            return null
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
        getProductoImageUrl,
        generateCleanName,
        fetchProducto3DFromSupabase,
        processKeyShotXRHTML,
        processProductoHTML,
        injectXRViewer,
        renderXRViewer
    }
}