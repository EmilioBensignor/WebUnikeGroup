export const useBlog = () => {
    const supabase = useSupabaseClient()

    const loading = ref(false)
    const blogs = ref([])
    const currentBlog = ref(null)
    const error = ref(null)

    const fetchBlogs = async () => {
        loading.value = true
        error.value = null

        try {
            const { data, error: supabaseError } = await supabase
                .from('blog')
                .select('*')
                .order('fecha', { ascending: false })

            if (supabaseError) throw supabaseError

            blogs.value = data || []
        } catch (err) {
            error.value = err.message
            console.error('Error al obtener blogs:', err)
        } finally {
            loading.value = false
        }
    }

    const fetchBlogById = async (id) => {
        loading.value = true
        error.value = null
        currentBlog.value = null

        try {
            const { data, error: supabaseError } = await supabase
                .from('blog')
                .select('*')
                .eq('id', id)
                .single()

            if (supabaseError) throw supabaseError

            currentBlog.value = data
            return data
        } catch (err) {
            error.value = err.message
            console.error('Error al obtener blog:', err)
            throw err
        } finally {
            loading.value = false
        }
    }

    const fetchBlogBySlug = async (slug) => {
        loading.value = true
        error.value = null
        currentBlog.value = null

        try {
            const { data, error: supabaseError } = await supabase
                .from('blog')
                .select('*')
                .eq('slug', slug)
                .single()

            if (supabaseError) throw supabaseError

            currentBlog.value = data
            return data
        } catch (err) {
            error.value = err.message
            console.error('Error al obtener blog por slug:', err)
            throw err
        } finally {
            loading.value = false
        }
    }

    return {
        blogs: readonly(blogs),
        currentBlog: readonly(currentBlog),
        loading: readonly(loading),
        error: readonly(error),
        fetchBlogs,
        fetchBlogById,
        fetchBlogBySlug
    }
}
