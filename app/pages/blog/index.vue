<template>
    <DefaultMain>
        <div class="flex flex-col gap-8">
            <div class="flex flex-col gap-4">
                <HeadingH1>Blog Unike Group</HeadingH1>
                <p class="text-lg text-gray-dark">Enterate de las últimas novedades que tenemos para vos</p>
            </div>

            <div v-if="loading" class="flex justify-center py-12">
                <div class="text-gray-dark">Cargando blogs...</div>
            </div>

            <div v-else-if="error" class="flex justify-center py-12">
                <div class="text-red-500">Error al cargar los blogs</div>
            </div>

            <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <BlogCard v-for="blog in blogs" :key="blog.id" :post="blog" />
            </div>
        </div>
    </DefaultMain>
</template>

<script setup>
import { useBlog } from '~/composables/useBlog'

const { blogs, loading, error, fetchBlogs } = useBlog()

definePageMeta({
    layout: 'waterplast'
});

onMounted(() => {
    fetchBlogs()
})
</script>
