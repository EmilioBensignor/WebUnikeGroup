<template>
    <DefaultMain>
        <div class="flex flex-col gap-8">
            <!-- <div class="flex flex-col gap-4 pt-8 px-4">
                <HeadingH1 class="text-terciary">Blog Unike Group</HeadingH1>
            </div> -->

            <div v-if="loading" class="flex justify-center py-12">
                <div class="text-gray-dark">Cargando blogs...</div>
            </div>

            <div v-else-if="error" class="flex justify-center py-12">
                <div class="text-red-500">Error al cargar los blogs</div>
            </div>

            <Blog v-else class="mt-6 md:mt-8 lg:mt-28" />
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
