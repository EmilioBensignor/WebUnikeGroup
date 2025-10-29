import { defineStore } from 'pinia'
import { ref, readonly } from 'vue'

const CACHE_KEY_ALL = 'waterplast_blog_posts'
const CACHE_KEY_SINGLE = 'waterplast_blog_post_'
const CACHE_TTL = 6 * 60

export const useStoreBlog = defineStore('blog', () => {
  const supabase = useSupabaseClient()
  const config = useRuntimeConfig()
  const { getFromCache, saveToCache } = useSupabaseCache()

  const posts = ref([])
  const currentPost = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const getPostImageUrl = (imagePath) => {
    if (!imagePath) return null
    if (imagePath.startsWith('http')) return imagePath
    return `${config.public.supabase.url}/storage/v1/object/public/blog/${imagePath}`
  }

  const formatPostWithUrls = (post) => {
    return {
      ...post,
      imagen: post.imagen ? getPostImageUrl(post.imagen) : null,
      imagen_destacada: post.imagen_destacada ? getPostImageUrl(post.imagen_destacada) : null
    }
  }

  const fetchBlogPosts = async (limit = null) => {
    if (posts.value.length > 0) {
      return limit ? posts.value.slice(0, limit) : posts.value
    }

    const cachedData = await getFromCache(CACHE_KEY_ALL)
    if (cachedData) {
      posts.value = cachedData
      return limit ? cachedData.slice(0, limit) : cachedData
    }

    loading.value = true
    error.value = null

    try {
      let query = supabase
        .from('blog')
        .select('*')
        .eq('estado', true)
        .order('fecha', { ascending: false })

      if (limit) {
        query = query.limit(limit)
      }

      const { data, error: supabaseError } = await query

      if (supabaseError) throw supabaseError

      const postsWithUrls = (data || []).map(formatPostWithUrls)
      posts.value = postsWithUrls

      await saveToCache(CACHE_KEY_ALL, postsWithUrls, CACHE_TTL)

      return postsWithUrls
    } catch (err) {
      error.value = err.message
      console.error('Error al obtener posts del blog:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const fetchBlogPostBySlug = async (slug) => {
    const cacheKey = CACHE_KEY_SINGLE + slug
    const cachedData = await getFromCache(cacheKey)
    if (cachedData) {
      currentPost.value = cachedData
      return cachedData
    }

    loading.value = true
    error.value = null
    currentPost.value = null

    try {
      const { data, error: supabaseError } = await supabase
        .from('blog')
        .select('*')
        .eq('slug', slug)
        .single()

      if (supabaseError) throw supabaseError

      const postWithUrls = formatPostWithUrls(data)
      currentPost.value = postWithUrls

      await saveToCache(cacheKey, postWithUrls, CACHE_TTL)

      return postWithUrls
    } catch (err) {
      error.value = err.message
      console.error('Error al obtener post del blog:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const fetchBlogPostsRecientes = async (limit = 3) => {
    return fetchBlogPosts(limit)
  }


  const getPostBySlug = (slug) => {
    return posts.value.find(p => p.slug === slug)
  }

  const getPostById = (id) => {
    return posts.value.find(p => p.id === id)
  }

  const getPostsRecientes = (limit = 3) => {
    return posts.value.slice(0, limit)
  }

  return {
    posts: readonly(posts),
    currentPost: readonly(currentPost),
    loading: readonly(loading),
    error: readonly(error),
    fetchBlogPosts,
    fetchBlogPostBySlug,
    fetchBlogPostsRecientes,
    getPostBySlug,
    getPostById,
    getPostsRecientes,
    getPostImageUrl
  }
})
