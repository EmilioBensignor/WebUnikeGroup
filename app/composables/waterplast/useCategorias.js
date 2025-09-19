export const useWaterplastCategorias = () => {
    const supabase = useSupabaseClient()
    const config = useRuntimeConfig()

    const loading = ref(false)
    const categorias = ref([])
    const currentCategoria = ref(null)
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

    const fetchCategorias = async () => {
        loading.value = true
        error.value = null

        try {
            const { data, error: supabaseError } = await supabase
                .from('waterplast-categorias')
                .select('*')
                .eq('estado', true)
                .order('orden', { ascending: true })

            if (supabaseError) throw supabaseError

            const categoriasWithUrls = (data || []).map(categoria => ({
                ...categoria,
                imagen_menu: categoria.imagen_menu ? getCategoriaImageUrl(categoria.imagen_menu) : null,
                imagen_hero_home: categoria.imagen_hero_home ? getCategoriaImageUrl(categoria.imagen_hero_home) : null,
                imagen_pagina_categorias: categoria.imagen_pagina_categorias ? getCategoriaImageUrl(categoria.imagen_pagina_categorias) : null,
                icono1: categoria.icono1 ? getCategoriaIconUrl(categoria.icono1) : null,
                icono2: categoria.icono2 ? getCategoriaIconUrl(categoria.icono2) : null,
                icono3: categoria.icono3 ? getCategoriaIconUrl(categoria.icono3) : null,
                imagenes_redes: categoria.imagenes_redes ?
                    categoria.imagenes_redes.map((img, index) => ({
                        id: `red-${index}`,
                        name: `imagen-red-${index + 1}.jpg`,
                        url: getCategoriaImagenRedUrl(img)
                    })) : [],
                imagenes_redes_count: categoria.imagenes_redes ? categoria.imagenes_redes.length : 0
            }))

            categorias.value = categoriasWithUrls
        } catch (err) {
            error.value = err.message
            console.error('Error al obtener categorías:', err)
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

            const categoriaWithUrls = {
                ...data,
                imagen_menu: data.imagen_menu ? getCategoriaImageUrl(data.imagen_menu) : null,
                imagen_hero_home: data.imagen_hero_home ? getCategoriaImageUrl(data.imagen_hero_home) : null,
                imagen_pagina_categorias: data.imagen_pagina_categorias ? getCategoriaImageUrl(data.imagen_pagina_categorias) : null,
                icono1: data.icono1 ? getCategoriaIconUrl(data.icono1) : null,
                icono2: data.icono2 ? getCategoriaIconUrl(data.icono2) : null,
                icono3: data.icono3 ? getCategoriaIconUrl(data.icono3) : null,
                imagenes_redes: data.imagenes_redes ?
                    data.imagenes_redes.map((img, index) => ({
                        id: `red-${index}`,
                        name: `imagen-red-${index + 1}.jpg`,
                        url: getCategoriaImagenRedUrl(img)
                    })) : []
            }

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

    return {
        categorias: readonly(categorias),
        currentCategoria: readonly(currentCategoria),
        loading: readonly(loading),
        error: readonly(error),
        fetchCategorias,
        fetchCategoriaById,
        getCategoriaImageUrl,
        getCategoriaIconUrl,
        getCategoriaImagenRedUrl
    }
}