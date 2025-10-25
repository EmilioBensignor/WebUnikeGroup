<template>
    <NuxtLink :to="ROUTES_NAMES.UNIKE.BLOG_DETALLE(post.slug)" class="flex flex-col gap-2 bg-gray-light rounded-2xl lg:rounded-3xl shadow-md shadow-dark/20 p-2 pb-3">
        <NuxtImg v-if="imageUrl" :src="imageUrl" :alt="post.titulo" class="w-full h-28 lg:h-36 xxl:h-44 object-cover rounded-xl lg:rounded-2xl" />
        <div class="flex flex-col gap-4 text-terciary px-3 md:px-2">
            <p class="text-sm lg:text-base font-semibold">{{ post.titulo }}</p>
            <p class="text-xs lg:text-sm font-medium">Por {{ post.creado_por }} - {{ formatDate(post.fecha) }}</p>
        </div>
    </NuxtLink>
</template>

<script setup>
import { ROUTES_NAMES } from '~/constants/ROUTE_NAMES'

const props = defineProps({
    post: {
        type: Object,
        required: true
    }
})

const imageUrl = computed(() => {
    if (!props.post.imagen_principal) return null

    if (props.post.imagen_principal.startsWith('http')) {
        return props.post.imagen_principal
    }

    const config = useRuntimeConfig()
    return `${config.public.supabase.url}/storage/v1/object/public/blog/${props.post.imagen_principal}`
})

const formatDate = (date) => {
    if (!date) return ''
    const d = new Date(date)
    return d.toLocaleDateString('es-AR', { year: 'numeric', month: '2-digit', day: '2-digit' })
}
</script>