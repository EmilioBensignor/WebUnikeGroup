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
        <div v-else-if="currentBlog">
            <span
                class="lg:w-full lg:h-[12.75rem] hidden lg:block lg:absolute lg:top-0 bg-gradient-to-b from-primary to-transparent"></span>
            <DefaultSection class="w-full py-6 md:py-8 px-4 lg:pt-32 lg:pb-12 xxl:pb-16 md:px-16">
                <div class="w-full max-w-[1144px] flex flex-col gap-6 lg:gap-12 xxl:gap-16">
                    <HeadingH1 class="w-full text-terciary">{{ currentBlog.titulo }}</HeadingH1>
                    <NuxtImg v-if="imageUrl" :src="imageUrl" :alt="currentBlog.titulo"
                        class="w-full h-full max-h-72 sm:max-h-96 md:max-h-[25rem] object-cover rounded-3xl" />
                    <p v-html="currentBlog.contenido"
                        class="text-dark text-sm lg:text-base font-medium whitespace-pre-line"></p>
                </div>
            </DefaultSection>
        </div>

        <DefaultSection v-if="relatedBlogs.length > 0" class="md:pt-0 md:pb-8 lg:pb-12 md:px-8 lg:px-16">
            <div
                class="xxl:max-w-[1304px] xxl:w-full md:flex md:flex-col md:gap-6 xxl:gap-8 relative md:rounded-[48px] pb-6 md:py-8 md:px-12 lg:px-16 overflow-hidden md:bg-primary-gradient">
                <div
                    class="flex flex-col md:items-start gap-4 md:gap-6 xxl:gap-8 bg-primary-gradient md:bg-none p-4 pb-32 md:p-0 md:pb-0">
                    <div class="flex flex-col gap-2 md:gap-3 xxl:gap-4 relative z-10 text-white">
                        <HeadingH2>Artículos recientes</HeadingH2>
                        <p class="text-sm lg:text-xl font-medium">Enterate de las últimas novedades que tenemos para vos
                        </p>
                    </div>
                </div>
                <CarouselStatic :slides-per-view="{ base: 1.4, sm: 2.5, md: 3, lg: 3, xl: 4, xxl: 4 }" :button-position="{
                    top: '50%',
                    transform: 'translateY(-50%)',
                    left: {
                        md: '-1.5rem',
                        lg: '-1.5rem',
                        xl: '-1.5rem',
                        xxl: '-1.5rem',
                    },
                    right: {
                        md: '-1.5rem',
                        lg: '-1.5rem',
                        xl: '-1.5rem',
                        xxl: '-1.5rem',
                    }
                }" class="-mt-28 md:mt-0 lg:!px-0">
                    <BlogCard v-for="blog in relatedBlogs" :key="blog.id" :post="blog" />
                </CarouselStatic>
            </div>
        </DefaultSection>
    </DefaultMain>
</template>

<script setup>
import { useBlog } from '~/composables/useBlog'

definePageMeta({
    layout: 'waterplast'
});

const route = useRoute()
const config = useRuntimeConfig()
const { currentBlog, loading, error, fetchBlogBySlug, blogs, fetchBlogs } = useBlog();

const slug = route.params.slug

const imageUrl = computed(() => {
    if (!currentBlog.value?.imagen_principal) return null

    if (currentBlog.value.imagen_principal.startsWith('http')) {
        return currentBlog.value.imagen_principal
    }

    return `${config.public.supabase.url}/storage/v1/object/public/blog/${currentBlog.value.imagen_principal}`
})

const relatedBlogs = computed(() => {
    if (!currentBlog.value) return []

    return blogs.value
        .filter(blog => blog.slug !== slug && blog.creado_por === currentBlog.value.creado_por)
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .slice(0, 5)
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
