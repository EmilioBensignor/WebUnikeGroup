<template>
    <div class="flex flex-col items-center gap-2">
        <NuxtImg v-if="producto.imagen_principal" :src="producto.imagen_principal" :alt="producto.nombre" class="w-72 md:w-96 lg:w-[20.5rem] xxl:w-[28rem] h-[13.5rem] md:h-[20.75rem] lg:h-[17.5rem] xxl:h-[21.25rem] object-contain" />
        <div class="w-full flex flex-col items-center gap-4 lg:gap-8 px-5 lg:px-2 pb-4">
            <HeadingH3 class="text-center text-primary font-bold">{{ producto.nombre }}</HeadingH3>
            <div v-if="hasCaracteristicas" class="flex justify-center items-end gap-4 lg:gap-6">
                <div v-if="producto.caracteristica1 && producto.icono1" class="flex flex-col xxl:flex-row items-center gap-2">
                    <div class="w-12 h-12 flex justify-center items-center rounded-full" :style="{ backgroundColor: producto.categoria?.color }">
                        <NuxtImg :src="producto.icono1" :alt="producto.caracteristica1" class="w-8 h-8" />
                    </div>
                    <p class="text-xs lg:text-sm font-semibold">{{ producto.caracteristica1 }}</p>
                </div>
                <div v-if="producto.caracteristica2 && producto.icono2" class="flex flex-col xxl:flex-row items-center gap-2">
                    <div class="w-12 h-12 flex justify-center items-center rounded-full" :style="{ backgroundColor: producto.categoria?.color }">
                        <NuxtImg :src="producto.icono2" :alt="producto.caracteristica2" class="w-8 h-8" />
                    </div>
                    <p class="text-xs lg:text-sm font-semibold">{{ producto.caracteristica2 }}</p>
                </div>
                <div v-if="producto.caracteristica3 && producto.icono3" class="flex flex-col xxl:flex-row items-center gap-2">
                    <div class="w-12 h-12 flex justify-center items-center rounded-full" :style="{ backgroundColor: producto.categoria?.color }">
                        <NuxtImg :src="producto.icono3" :alt="producto.caracteristica3" class="w-8 h-8" />
                    </div>
                    <p class="text-xs lg:text-sm font-semibold">{{ producto.caracteristica3 }}</p>
                </div>
            </div>
            <NuxtLink :to="`/waterplast/${producto.categoria?.slug || 'categoria'}/${producto.slug}`">
                <ButtonSecondary class="px-6 lg:px-12">Ver detalle</ButtonSecondary>
            </NuxtLink>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    producto: {
        type: Object,
        required: true
    }
})

const hasCaracteristicas = computed(() => {
    return props.producto.caracteristica1 || props.producto.caracteristica2 || props.producto.caracteristica3
})
</script>