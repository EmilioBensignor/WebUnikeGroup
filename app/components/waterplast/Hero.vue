<template>
    <DefaultSection>
        <NuxtImg src="/images/waterplast/Hero-Mobile.png" alt="Waterplast" class="w-full h-40" />
        <div class="flex flex-col gap-4 bg-primary-gradient pt-4 pb-24">
            <div class="flex flex-col gap-2 text-white px-4">
                <HeadingH1>Somos Waterplast</HeadingH1>
                <p class="text-sm font-medium">
                    Empresa lider de Unike Group en innovación y desarrollo sustentable de soluciones para el
                    almacenamiento y manejo del agua.
                </p>
            </div>
        </div>
        <CarouselStatic :slides-per-view="{ base: 1.7, sm: 2.5, md: 3, lg: 4, xl: 4, xxl: 6 }" class="-mt-[4.5rem]">
            <NuxtLink to="#" v-for="(categoria, index) in categorias" :key="index"
                class="flex flex-col items-center relative bg-white rounded-2xl p-2 pb-9">
                <NuxtImg :src="categoria.img" :alt="categoria.nombre" class="w-full h-[6.25rem] object-cover relative z-[2]" />
                <div class="w-full absolute bottom-0 rounded-b-2xl text-center text-white font-semibold pt-6 pb-2" :style="{ backgroundColor: categoria.color }">
                    <p>{{ categoria.nombre }}</p>
                </div>
            </NuxtLink>
        </CarouselStatic>
    </DefaultSection>
</template>

<script setup>
import categorias from '~/shared/waterplast/categorias.js';
</script>