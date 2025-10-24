<template>
    <DefaultMain>
        <div v-if="loading" class="h-screen flex items-center justify-center">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>

        <div v-else-if="error" class="h-screen flex items-center justify-center">
            <div class="text-center">
                <p class="text-red-500 text-lg">Error al cargar el blog</p>
            </div>
        </div>

        <div v-else-if="currentBlog" class="flex flex-col gap-8">
            <DefaultSection>
                <NuxtLink :to="ROUTES_NAMES.UNIKE.BLOG" class="text-primary hover:underline">← Volver al blog</NuxtLink>
            </DefaultSection>

            <!-- Imagen Principal -->
            <div class="w-full h-96 overflow-hidden">
                <img
                    v-if="imageUrl"
                    :src="imageUrl"
                    :alt="currentBlog.titulo"
                    class="w-full h-full object-cover"
                />
            </div>

            <DefaultSection>
                <div class="max-w-3xl mx-auto">
                    <!-- Encabezado -->
                    <div class="flex flex-col gap-6 mb-8">
                        <div class="flex flex-col gap-2">
                            <HeadingH1>{{ currentBlog.titulo }}</HeadingH1>
                            <p class="text-gray-dark">Por {{ currentBlog.creado_por }} - {{ formatDate(currentBlog.fecha) }}</p>
                        </div>
                    </div>

                    <!-- Contenido -->
                    <div class="prose prose-lg max-w-none" v-html="currentBlog.contenido"></div>
                </div>
            </DefaultSection>

            <!-- Blogs Relacionados -->
            <DefaultSection v-if="relatedBlogs.length > 0">
                <div class="flex flex-col gap-6">
                    <HeadingH2>Más artículos</HeadingH2>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <BlogCard v-for="blog in relatedBlogs" :key="blog.id" :post="blog" />
                    </div>
                </div>
            </DefaultSection>
        </div>
    </DefaultMain>
</template>

<script setup>
import { ROUTES_NAMES } from '~/constants/ROUTE_NAMES'
import { useBlog } from '~/composables/useBlog'

const route = useRoute()
const config = useRuntimeConfig()
const { currentBlog, loading, error, fetchBlogBySlug, blogs, fetchBlogs } = useBlog()

const slug = route.params.slug

const imageUrl = computed(() => {
    if (!currentBlog.value?.imagen_principal) return null

    if (currentBlog.value.imagen_principal.startsWith('http')) {
        return currentBlog.value.imagen_principal
    }

    return `${config.public.supabase.url}/storage/v1/object/public/blog/${currentBlog.value.imagen_principal}`
})

const relatedBlogs = computed(() => {
    return blogs.value.filter(blog => blog.slug !== slug).slice(0, 3)
})

const formatDate = (date) => {
    if (!date) return ''
    const d = new Date(date)
    return d.toLocaleDateString('es-AR', { year: 'numeric', month: 'long', day: 'numeric' })
}

onMounted(async () => {
    await fetchBlogBySlug(slug)
    await fetchBlogs()
})

watch(() => currentBlog.value, (newBlog) => {
    if (newBlog) {
        useHead({
            title: `${newBlog.titulo} | Blog Unike Group`,
            meta: [
                { name: 'description', content: newBlog.titulo }
            ]
        })
    }
})
</script>

