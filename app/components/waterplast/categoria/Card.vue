<template>
    <div class="flex flex-col items-center">
        <NuxtImg :src="getImageUrl(producto.imagen)" :alt="producto.nombre" class="w-72 md:w-96 lg:w-[20.5rem] xxl:w-[28rem] h-[13.5rem] md:h-[20.75rem] lg:h-[17.5rem] xxl:h-[21.25rem] object-contain" />
        <div class="w-full flex flex-col items-center gap-4 lg:gap-8 px-5 lg:px-2 pb-4">
            <div class="flex items-center justify-center gap-4 lg:gap-6">
                <div class="flex flex-col xxl:flex-row items-center gap-2">
                    <NuxtImg :src="getImageUrl(producto.icono1)" :alt="producto.caracteristica1" class="w-12 h-12" />
                    <p class="text-xs lg:text-sm font-semibold">{{ producto.caracteristica1 }}</p>
                </div>
                <div v-if="producto.caracteristica2" class="flex flex-col xxl:flex-row items-center gap-2">
                    <NuxtImg :src="getImageUrl(producto.icono2)" :alt="producto.caracteristica2" class="w-12 h-12" />
                    <p class="text-xs lg:text-sm font-semibold">{{ producto.caracteristica2 }}</p>
                </div>
                <div v-if="producto.caracteristica3" class="flex flex-col xxl:flex-row items-center gap-2">
                    <NuxtImg :src="getImageUrl(producto.icono3)" :alt="producto.caracteristica3" class="w-12 h-12" />
                    <p class="text-xs lg:text-sm font-semibold">{{ producto.caracteristica3 }}</p>
                </div>
            </div>
            <ButtonSecondary class="px-6 lg:px-12">Ver a detalle</ButtonSecondary>
        </div>
    </div>
</template>

<script setup>
import { useWaterplastProductos } from '~/composables/waterplast/useProductos'

defineProps({
    producto: {
        type: Object,
        required: true
    }
})

const { getProductoImageUrl } = useWaterplastProductos()

const getImageUrl = (imagePath) => {
    return getProductoImageUrl(imagePath)
}
</script>