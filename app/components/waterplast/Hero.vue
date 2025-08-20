<template>
    <DefaultSection>
        <NuxtImg src="/images/waterplast/Hero-Mobile.png" alt="Waterplast" class="w-full h-40 md:hidden object-cover" />
        <NuxtImg src="/images/waterplast/Hero-Desktop.png" alt="Waterplast" class="w-full h-80 hidden md:block object-cover" />
        <div class="flex flex-col gap-4 md:absolute bg-primary-gradient md:bg-none pt-4 md:pt-12 pb-24 md:px-8">
            <div class="flex flex-col gap-2 md:gap-3 text-white px-4">
                <HeadingH1>Somos Waterplast</HeadingH1>
                <p class="md:max-w-[25rem] text-sm md:text-xl font-medium">
                    Empresa lider de Unike Group en innovación y desarrollo sustentable de soluciones para el
                    almacenamiento y manejo del agua.
                </p>
            </div>
        </div>
        <CarouselStatic :slides-per-view="{ base: 1.7, sm: 2.5, md: 3.5, lg: 4, xl: 4, xxl: 6 }" class="-mt-[4.5rem]">
            <NuxtLink to="#" v-for="(categoria, index) in categorias" :key="index"
                class="flex flex-col items-center relative bg-white shadow-md shadow-dark/20 rounded-2xl p-2 pb-9 md:first:ml-8 md:last:mr-8">
                <NuxtImg :src="categoria.imgHero" :alt="categoria.nombre"
                    class="w-full h-[6.25rem] md:h-32 rounded-xl object-cover relative z-[2]" />
                <div class="w-full absolute bottom-0 rounded-b-2xl text-center text-white font-semibold pt-6 pb-2"
                    :style="{ backgroundColor: categoria.color }">
                    <p>{{ categoria.nombre }}</p>
                </div>
            </NuxtLink>
        </CarouselStatic>
    </DefaultSection>
</template>

<script setup>
import categorias from '~/shared/waterplast/categorias.js';
</script>