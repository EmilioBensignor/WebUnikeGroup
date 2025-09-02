<template>
    <DefaultSection class="gap-3 md:gap-6 xxl:gap-8 bg-primary-gradient py-6 lg:py-12 md:px-16">
        <HeadingH2 class="flex sm:inline flex-col text-center text-white px-4">Opiniones de <span>nuestros
                clientes</span></HeadingH2>
        <CarouselStatic :slides-per-view="{ base: 1.4, sm: 2.5, md: 3, lg: 3, xl: 4, xxl: 4 }" :button-position="{
            top: '50%',
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
        }">
            <OpinionCard v-for="(opinion, index) in opiniones" :key="index" :opinion="opinion" />
        </CarouselStatic>
    </DefaultSection>
</template>

<script setup>
import opiniones from '~/shared/waterplast/opiniones.js';
</script>