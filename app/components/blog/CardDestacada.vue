<template>
    <NuxtLink :to="ROUTES_NAMES.UNIKE.BLOG_DETALLE(post.slug)" class="h-72 block relative overflow-hidden rounded-3xl">
        <NuxtImg v-if="imageUrl" :src="imageUrl" :alt="post.titulo" loading="lazy"
            class="w-full h-full absolute inset-0 object-cover" />
        <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
        <div class="flex flex-col gap-4 absolute bottom-0 left-0 right-0 text-white p-6">
            <div class="flex flex-col gap-2">
                <span class="self-start bg-white rounded-full text-xs text-terciary font-medium py-2 px-4">
                    {{ post.creado_por }}
                </span>
                <HeadingH3 class="!text-base">{{ post.titulo }}</HeadingH3>
            </div>
            <p class="text-xs font-medium">{{ formatDate(post.fecha) }}</p>
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
    return d.toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' })
}
</script>
