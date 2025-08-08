<template>
    <DefaultSection class="gap-3 md:gap-6 bg-primary-gradient py-6 md:px-16">
        <HeadingH2 class="flex md:inline flex-col text-center text-white px-4">Opiniones de <span>nuestros clientes</span></HeadingH2>
        <CarouselStatic :slides-per-view="{ base: 1.4, sm: 2.5, md: 3, lg: 4, xl: 4, xxl: 6 }">
            <OpinionCard v-for="(opinion, index) in opiniones" :key="index" :opinion="opinion" />
        </CarouselStatic>
    </DefaultSection>
</template>

<script setup>
import opiniones from '~/shared/waterplast/opiniones.js';
</script>