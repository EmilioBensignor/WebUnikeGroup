<template>
    <DefaultMain>
        <ContactoHero />
        <MarcasCards />
        <MediosContacto class="!pt-0" />
        <ContactoRedDistribuidores />
    </DefaultMain>
</template>

<script setup>
import MarcasCards from '~/components/unike/MarcasCards.vue';
import MediosContacto from '~/components/unike/MediosContacto.vue';

definePageMeta({
    layout: 'default'
})

useSeoMeta({
    title: 'Contacto | Unike Group',
    description: 'Contactanos para más información sobre nuestros productos y servicios.',
})

useHead({
    titleTemplate: null,
})
</script>
