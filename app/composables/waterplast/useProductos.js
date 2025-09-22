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
                // Fetch the HTML content from the archivo_html URL
                const htmlResponse = await $fetch(data.archivo_html)

                // Process the HTML with KeyShotXR transformations
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

        // Read KeyShotXR content and modify it to handle absolute URLs
        let keyshotContent = await $fetch('/lib/keyshot-xr.js')

        // Check if the pattern exists in the code
        const pattern = /b\.src=a\.D\[f\]/g
        const matches = keyshotContent.match(pattern)
        console.log('Found b.src patterns:', matches ? matches.length : 0)

        // Try different patterns that might exist in the minified code
        const imageBaseUrl = `${config.public.supabase.url}/storage/v1/object/public/waterplast-productos/${cleanName}/images`

        // Try multiple possible patterns
        let modified = false
        
        console.log('Original KeyShot content length:', keyshotContent.length)
        console.log('Looking for va function pattern...')
        
        // Pattern 1: The va function that constructs image paths (most precise)
        const vaPattern = /this\.va=function\(b,f\)\{return A\+a\.s\+[^}]+\}/
        const vaMatch = keyshotContent.match(vaPattern)
        
        if (vaMatch) {
            console.log('Found va function:', vaMatch[0])
            keyshotContent = keyshotContent.replace(
                vaPattern,
                `this.va=function(b,f){return "${imageBaseUrl}/"+parseInt(f)+"_"+parseInt(b)+".png"}`
            )
            modified = true
            console.log('Applied pattern 1: va function replacement')
        } else {
            console.log('va function not found, trying alternative patterns...')
        }
        
        // Only try other patterns if va function wasn't found and replaced
        if (!modified) {
            // Pattern 2: More general approach - find any function that looks like it builds image paths
            if (keyshotContent.includes('parseInt(f)+"_"+parseInt(b)')) {
                keyshotContent = keyshotContent.replace(
                    /return [^;]+parseInt\(f\)\+["']_["']\+parseInt\(b\)[^;]+/g,
                    `return "${imageBaseUrl}/"+parseInt(f)+"_"+parseInt(b)+".png"`
                )
                modified = true
                console.log('Applied pattern 2: parseInt pattern replacement')
            }
        }

        console.log('KeyShotXR code modified:', modified)
        console.log('Image base URL:', imageBaseUrl)
        console.log('Clean name:', cleanName)

        // Show a sample of the modified code around the va function
        if (modified) {
            const vaIndex = keyshotContent.indexOf('this.va=function')
            if (vaIndex !== -1) {
                console.log('Modified va function area:', keyshotContent.substring(vaIndex, vaIndex + 200))
            }
        }

        // Ensure window.keyshotXR is properly declared
        if (!keyshotContent.includes('window.keyshotXR=function')) {
            console.error('KeyShotXR function not found in the loaded script')
        } else {
            console.log('KeyShotXR function found successfully')
        }

        // Remove the problematic debugging code for now
        // if (keyshotContent.includes('b.src=')) {
        //     keyshotContent = keyshotContent.replace(
        //         /(b\.src=)/g,
        //         'console.log("Loading image:", arguments[0]); $1'
        //     )
        // }

        // Transform script src to inline script
        processedHTML = processedHTML.replace(
            /<script\s+type="text\/javascript"\s+src="[^"]*KeyShotXR\.js"><\/script>/gi,
            `<script type="text/javascript">${keyshotContent}</script>`
        )

        // Also handle other variations
        processedHTML = processedHTML.replace(
            /<script[^>]*src="[^"]*KeyShotXR\.js"[^>]*><\/script>/gi,
            `<script type="text/javascript">${keyshotContent}</script>`
        )

        // Set folderName to empty since we're handling URLs in the script
        processedHTML = processedHTML.replace(
            /var\s+folderName\s*=\s*["']([^"']*)["']/g,
            'var folderName = ""'
        )

        // Make sure the container has proper styling
        processedHTML = processedHTML.replace(
            /<div([^>]*?)id=["']?xr-container["']?([^>]*?)>/g,
            '<div$1id="xr-container"$2 style="width: 100%; height: 100%; position: relative;">'
        )

        console.log('Processed HTML preview:', processedHTML.substring(0, 500))

        // Also log the script content to check for syntax errors
        const scriptMatch = processedHTML.match(/<script type="text\/javascript">(.*?)<\/script>/s)
        if (scriptMatch) {
            console.log('Script content length:', scriptMatch[1].length)
            console.log('Script start:', scriptMatch[1].substring(0, 200))
            
            // Try to detect syntax errors
            try {
                new Function(scriptMatch[1])
                console.log('Script syntax is valid')
            } catch (e) {
                console.error('Script syntax error:', e.message)
                console.log('Error around character:', e.message.match(/\d+/) ? scriptMatch[1].substring(parseInt(e.message.match(/\d+/)[0]) - 50, parseInt(e.message.match(/\d+/)[0]) + 50) : 'unknown')
            }
        }

        return processedHTML
    }

    const injectXRViewer = (containerId, html) => {
        if (process.client) {
            const container = document.getElementById(containerId)
            if (container && html) {
                container.innerHTML = html

                // Execute scripts in the injected HTML
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
            // Build the full URL for the HTML file
            let htmlUrl = producto.archivo_html
            if (!htmlUrl.startsWith('http')) {
                const config = useRuntimeConfig()
                htmlUrl = `${config.public.supabase.url}/storage/v1/object/public/waterplast-productos/${htmlUrl}`
            }


            // Fetch the HTML content from the archivo_html URL
            const htmlResponse = await $fetch(htmlUrl)

            // Process the HTML with KeyShotXR transformations
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