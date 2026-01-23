<template>
    <DefaultSection class="gap-6 lg:gap-8 py-8">
        <HeadingH2 class="text-center text-terciary">Nuestros productos</HeadingH2>
        <div class="w-full md:px-8 lg:px-16 xxl:px-0 xxl:max-w-[1304px] xxl:mx-auto">
            <RohermetCarouselProductos :categorias="categorias" />
        </div>
        <div class="xxl:max-w-[1304px] xxl:w-full px-4 md:px-8 lg:px-16 xxl:px-0 xxl:mx-auto">
            <div class="relative rounded-2xl md:rounded-3xl overflow-hidden">
                <NuxtImg src="/images/rohermet/Productos-Rohermet.png" alt="Produtos Rohermet"
                    class="w-full h-52 lg:h-[15.75rem] object-cover object-right" />
                <div
                    class="md:max-w-[24.75rem] lg:max-w-[36rem] xxl:max-w-[50rem] h-52 lg:h-[15.75rem] flex justify-center items-center absolute top-0 md:px-8 xxl:px-16">
                    <HeadingH2 class="text-center md:text-start text-white text-shadow-lg/30">
                        Instalados en hogares, obras e instalaciones técnicas donde la estabilidad y la seguridad son
                        críticas.
                    </HeadingH2>
                </div>
            </div>
        </div>
    </DefaultSection>
</template>

<script setup>
import { useRohermetCategorias } from '~/composables/rohermet/useCategorias'

const { categorias, fetchCategorias } = useRohermetCategorias()

onMounted(() => {
    fetchCategorias()
})
</script>