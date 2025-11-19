<template>
    <DefaultSection class="relative lg:-mt-32">
        <picture class="w-full">
            <img v-if="imagenHeroHome?.imagen_grande" :src="imagenHeroHome.imagen_grande" alt="Waterplast"
                fetchpriority="high"
                decoding="async"
                class="hidden lg:block w-full h-[38rem] xl:h-[40rem] object-cover object-right xxl:object-center">
            <img v-if="imagenHeroHome?.imagen_mediana" :src="imagenHeroHome.imagen_mediana" alt="Waterplast"
                fetchpriority="high"
                decoding="async"
                class="hidden md:block lg:hidden w-full h-96 object-cover">
            <img v-if="imagenHeroHome?.imagen_chica" :src="imagenHeroHome.imagen_chica" alt="Waterplast"
                decoding="async"
                class="block md:hidden w-full h-40 sm:h-60 object-cover">
        </picture>
        <div
            class="xxl:w-full xxl:max-w-[1304px] lg:h-full flex flex-col lg:justify-center gap-4 md:absolute bg-primary-gradient md:bg-none pt-4 md:pt-24 lg:pt-12 pb-24 md:px-8 lg:px-16 xxl:px-0 xxl:mx-auto">
            <div class="flex flex-col gap-2 md:gap-3 lg:gap-4 text-white px-4 md:px-0">
                <HeadingH1>Somos Waterplast</HeadingH1>
                <p class="md:max-w-[25rem] lg:max-w-[40.75rem] text-sm md:text-xl lg:text-[1.75rem] font-medium">
                    Empresa lider de Unike Group en innovación y desarrollo sustentable de soluciones para el
                    almacenamiento y manejo del agua.
                </p>
            </div>
        </div>
        <CarouselStatic v-if="!loading" :slides-per-view="{ base: 1.7, sm: 2.7, md: 3.7, lg: 4, xl: 4, xxl: 5 }" :button-position="{
            top: '47%',
            transform: 'translateY(-50%)',
            left: {
                md: '-5rem',
                lg: '2rem',
                xl: '2rem',
                xxl: '-2rem',
            },
            right: {
                md: '-5rem',
                lg: '2rem',
                xl: '2rem',
                xxl: '-2rem',
            }
        }" class="-mt-[4.5rem] lg:-mt-[6.5rem]">
            <div v-if="error" class="text-center text-white py-8">
                <p>Error al cargar las categorías: {{ error }}</p>
            </div>
            <NuxtLink v-else :to="ROUTES_NAMES.WATERPLAST.CATEGORIA(categoria.slug)"
                v-for="(categoria, index) in categorias" :key="categoria.id || index"
                class="flex flex-col items-center relative bg-white shadow-md shadow-dark/20 rounded-2xl lg:rounded-3xl p-2 pb-9 md:first:ml-8 lg:first:ml-0 md:last:mr-8 lg:last:mr-0">
                <div
                    class="w-full h-[6.25rem] md:h-32 lg:h-40 rounded-xl lg:rounded-2xl overflow-hidden relative z-[2]">
                    <img :src="getCategoriaImageUrl(categoria.imagen_hero_home)"
                        :alt="`Waterplast Categoría ${categoria.nombre}`"
                        class="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-110" />
                </div>
                <div class="w-full absolute bottom-0 rounded-b-2xl lg:rounded-b-3xl text-center text-white font-semibold pt-6 lg:pt-16 pb-2"
                    :style="{ backgroundColor: categoria.color }">
                    <p>{{ categoria.nombre }}</p>
                </div>
            </NuxtLink>
        </CarouselStatic>
        <SkeletonCategoryCarousel v-else class="px-4 md:px-8 lg:px-16 xxl:px-0 xxl:max-w-[1304px] xxl:mx-auto" />
    </DefaultSection>
</template>

<script setup>
import { ROUTES_NAMES } from '~/constants/ROUTE_NAMES'

const { useWaterplastCategorias } = await import('~/composables/waterplast/useCategorias.js')
const { categorias, loading, error, fetchCategorias, getCategoriaImageUrl } = useWaterplastCategorias()

const { useWaterplastImagenesDestacadas } = await import('~/composables/waterplast/useImagenesDestacadas.js')
const { fetchImagenDestacadaBySlug } = useWaterplastImagenesDestacadas()

const imagenHeroHome = ref(null)

onMounted(async () => {
    setTimeout(() => {
        fetchCategorias()
    }, 0)

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