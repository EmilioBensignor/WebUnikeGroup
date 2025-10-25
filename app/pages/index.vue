<template>
    <DefaultMain>
        <WaterplastHero />
        <WaterplastMuestra />
        <WaterplastSobre />
        <WaterplastOpiniones />
        <WaterplastDistribuidores />
        <WaterplastFAQs />
        <Blog />
    </DefaultMain>
</template>

<script setup>
definePageMeta({
    layout: 'waterplast'
});

useSeoMeta({
    title: 'Waterplast - Tanques de Agua y Sistemas de Almacenamiento | Unike Group',
    description: 'En Unike Group desarrollamos soluciones innovadoras para el almacenamiento y tratamiento del agua en Argentina. Nuestros tanques Waterplast garantizan calidad, durabilidad y protección antibacteriana. Descubrí nuestra red de distribuidores y asesorate con nuestros expertos en soluciones hídricas sustentables.',
    keywords: 'tUnike Group Argentina, Waterplast, tanques de agua, tanques para agua potable, tanques plásticos, tanques con filtro UV, tanques antibacterianos, soluciones sustentables para agua, almacenamiento de agua Argentina, sistemas hídricos, distribuidores Waterplast, tanques domiciliarios, tanques industriales, innovación en agua Argentina',
    ogTitle: 'Waterplast - Tanques de Agua y Sistemas de Almacenamiento',
    ogDescription: 'En Unike Group desarrollamos soluciones innovadoras para el almacenamiento y tratamiento del agua en Argentina. Nuestros tanques Waterplast garantizan calidad, durabilidad y protección antibacteriana. Descubrí nuestra red de distribuidores y asesorate con nuestros expertos en soluciones hídricas sustentables.',
    ogSiteName: 'Waterplast - Unike Group',
    twitterCard: 'summary_large_image',
    twitterTitle: 'Waterplast - Tanques de Agua y Sistemas de Almacenamiento',
    twitterDescription: 'En Unike Group desarrollamos soluciones innovadoras para el almacenamiento y tratamiento del agua en Argentina. Nuestros tanques Waterplast garantizan calidad, durabilidad y protección antibacteriana. Descubrí nuestra red de distribuidores y asesorate con nuestros expertos en soluciones hídricas sustentables.',
});

useHead({
    titleTemplate: null
});
</script>