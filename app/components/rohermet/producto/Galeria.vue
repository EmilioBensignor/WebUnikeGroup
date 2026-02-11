<template>
    <div class="w-full md:w-1/2">
        <div v-if="!imagenPrincipal && imagenes.length === 0" class="text-center py-8">
            <p>Este producto no tiene imagen disponible.</p>
        </div>

        <div v-else class="flex flex-col gap-4">
            <div class="relative flex justify-center items-center">
                <button v-if="imagenes.length > 1" @click="prevImagen" aria-label="Imagen anterior"
                    class="absolute left-0 z-10 w-10 h-10 flex justify-center items-center bg-white rounded-full shadow-md shadow-black/20 text-secondary">
                    <Icon name="tabler:chevron-left" class="w-6 h-6" />
                </button>

                <NuxtImg :src="imagenActual" :alt="alt"
                    class="w-72 md:w-96 lg:w-full max-h-[20rem] lg:max-h-[24rem] xxl:max-h-[28rem] object-contain"
                    loading="lazy" />

                <button v-if="imagenes.length > 1" @click="nextImagen" aria-label="Imagen siguiente"
                    class="absolute right-0 z-10 w-10 h-10 flex justify-center items-center bg-white rounded-full shadow-md shadow-black/20 text-secondary">
                    <Icon name="tabler:chevron-right" class="w-6 h-6" />
                </button>
            </div>

            <div v-if="imagenes.length > 1" class="flex justify-center gap-3">
                <button v-for="(img, index) in imagenes" :key="img.id || index" @click="seleccionarImagen(index)"
                    :aria-label="`Ver imagen ${index + 1}`"
                    class="w-16 h-16 lg:w-20 lg:h-20 rounded-lg overflow-hidden border-2 transition-colors"
                    :class="indexActual === index ? 'border-primary' : 'border-transparent'">
                    <NuxtImg :src="img.url" :alt="`${alt} - ${index + 1}`"
                        class="w-full h-full object-cover" loading="lazy" />
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    imagenPrincipal: {
        type: String,
        default: null
    },
    galeria: {
        type: Array,
        default: () => []
    },
    alt: {
        type: String,
        default: 'Producto Rohermet'
    }
})

const indexActual = ref(0)

const imagenes = computed(() => {
    const imgs = []

    if (props.imagenPrincipal) {
        imgs.push({ id: 'principal', url: props.imagenPrincipal })
    }

    if (props.galeria?.length) {
        props.galeria.forEach(img => {
            imgs.push(img)
        })
    }

    return imgs
})

const imagenActual = computed(() => {
    if (imagenes.value.length === 0) return props.imagenPrincipal
    return imagenes.value[indexActual.value]?.url || props.imagenPrincipal
})

const seleccionarImagen = (index) => {
    indexActual.value = index
}

const prevImagen = () => {
    if (imagenes.value.length === 0) return
    indexActual.value = (indexActual.value - 1 + imagenes.value.length) % imagenes.value.length
}

const nextImagen = () => {
    if (imagenes.value.length === 0) return
    indexActual.value = (indexActual.value + 1) % imagenes.value.length
}
</script>
