<template>
    <div class="flex flex-col gap-2 bg-white shadow-md shadow-dark/20 rounded-2xl lg:rounded-3xl p-4 xxl:p-6">
        <div class="flex items-center gap-3">
            <img :src="avatarUrl" :alt="nombreUsuario" class="w-12 h-12 rounded-full object-cover flex-shrink-0" />
            <div class="flex flex-col gap-0.5">
                <div class="flex items-start gap-0.5 lg:gap-1">
                    <p class="text-xs lg:text-base text-terciary font-semibold">{{ nombreUsuario }}</p>
                    <Icon name="material-symbols:verified" class="w-3 h-3 flex-shrink-0 text-primary -mt-0.5" />
                </div>
                <div class="flex items-center gap-0.5">
                    <Icon v-for="n in Math.floor(ratingValue)" :key="`full-${n}`" name="material-symbols:star-rounded"
                        class="w-4 h-4 text-secondary" />

                    <Icon v-if="ratingValue % 1 !== 0" name="material-symbols:star-rounded"
                        class="w-4 h-4 text-secondary opacity-50" />

                    <Icon v-for="n in (5 - Math.ceil(ratingValue))" :key="`empty-${n}`"
                        name="material-symbols:star-rounded" class="w-4 h-4 text-gray-mid" />
                </div>
            </div>
        </div>
        <div class="flex flex-col gap-1 xxl:gap-2 text-xs lg:text-sm text-terciary">
            <p class="font-bold">{{ tituloOpinion }}</p>
            <p class="font-medium line-clamp-4">{{ textoCompleto }}</p>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    opinion: {
        type: Object,
        required: true
    }
});

const avatarUrl = computed(() => {
    if (!props.opinion.imagen) return null

    if (props.opinion.imagen.startsWith('http')) {
        return props.opinion.imagen
    }

    const config = useRuntimeConfig()
    return `${config.public.supabase.url}/storage/v1/object/public/waterplast-opiniones/${props.opinion.imagen}`
})

const nombreUsuario = computed(() => {
    return props.opinion.nombre_usuario || props.opinion.nombre || 'Usuario'
})

const ratingValue = computed(() => {
    return props.opinion.estrellas || props.opinion.calificacion || props.opinion.rating || 0
})

const tituloOpinion = computed(() => {
    return props.opinion.titulo || props.opinion.opinion || 'Excelente'
})

const textoCompleto = computed(() => {
    return props.opinion.comentario || props.opinion.texto || ''
})
</script>