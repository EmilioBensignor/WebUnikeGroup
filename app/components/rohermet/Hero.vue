<template>
    <DefaultSection class="relative lg:-mt-32">
        <picture class="w-full">
            <img v-if="imagenHeroHome?.imagen_grande" :src="imagenHeroHome.imagen_grande" alt="Rohermet"
                fetchpriority="high" decoding="async"
                class="hidden lg:block w-full h-[37rem] xxl:h-[38rem] object-cover object-right xxl:object-center">
            <img v-if="imagenHeroHome?.imagen_mediana" :src="imagenHeroHome.imagen_mediana" alt="Rohermet"
                fetchpriority="high" decoding="async"
                class="hidden md:block lg:hidden w-full h-[16.25rem] object-cover">
            <img v-if="imagenHeroHome?.imagen_chica" :src="imagenHeroHome.imagen_chica" alt="Rohermet" decoding="async"
                class="block md:hidden w-full h-40 sm:h-60 object-cover">
        </picture>
        <div
            class="xxl:w-full xxl:max-w-[1304px] md:h-full flex flex-col md:justify-center lg:justify-end gap-4 md:absolute bg-primary-gradient md:bg-none py-6 px-4 md:px-8 lg:p-16 xxl:px-0 xxl:mx-auto">
            <div class="md:max-w-[22rem] lg:max-w-[40.5rem] flex flex-col gap-2 md:gap-3 lg:gap-4 text-white">
                <HeadingH1>
                    Soluciones diseñadas
                    para garantizar seguridad y funcionalidad
                </HeadingH1>
                <p class="lg:max-w-[31rem] xxl:max-w-[37.5rem] text-sm md:text-xl lg:text-[1.75rem] font-medium">
                    Productos sanitarios pensados para el uso real en hogares, obras
                    e instalaciones técnicas.
                </p>
            </div>
        </div>
    </DefaultSection>
</template>

<script setup>
const { useRohermetImagenesDestacadas } = await import('~/composables/rohermet/useImagenesDestacadas.js')
const { fetchImagenDestacadaBySlug } = useRohermetImagenesDestacadas()

const imagenHeroHome = ref(null)

onMounted(async () => {
    try {
        const imagenHero = await fetchImagenDestacadaBySlug('imagen-hero-home')
        if (imagenHero) {
            imagenHeroHome.value = imagenHero
        }
    } catch (error) {
        console.log(error);
    }
})
</script>
