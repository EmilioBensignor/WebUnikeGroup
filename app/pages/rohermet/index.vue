<template>
    <DefaultMain>
        <RohermetHero />
        <RohermetNuestrosProductos />
        <RohermetPilares />
        <Opiniones />
        <Distribuidores empresa="rohermet" />
        <FAQs :faqs="faqs" />
        <Blog />
    </DefaultMain>
</template>

<script setup>
definePageMeta({
    layout: 'rohermet'
});

useSeoMeta({
    title: 'Rohermet - Soluciones para la Construcción | Unike Group',
    description: 'Rohermet es parte de Unike Group, ofreciendo soluciones innovadoras para el sector de la construcción en Argentina. Descubrí nuestra amplia gama de productos y red de distribuidores.',
    keywords: 'Rohermet, Unike Group Argentina, construcción, soluciones constructivas, distribuidores Rohermet',
    ogTitle: 'Rohermet - Soluciones para la Construcción',
    ogDescription: 'Rohermet es parte de Unike Group, ofreciendo soluciones innovadoras para el sector de la construcción en Argentina.',
    ogSiteName: 'Rohermet - Unike Group',
    twitterCard: 'summary_large_image',
    twitterTitle: 'Rohermet - Soluciones para la Construcción',
    twitterDescription: 'Rohermet es parte de Unike Group, ofreciendo soluciones innovadoras para el sector de la construcción en Argentina.',
});

useHead({
    titleTemplate: null
});

const faqs = [
    {
        pregunta: "¿Qué tipo de garantía ofrecen sus productos?",
        respuesta: "Ofrecemos garantía de calidad y durabilidad en todos nuestros productos. Consulta los términos específicos en cada caso.",
    },
    {
        pregunta: "¿Cuáles son los tiempos de entrega?",
        respuesta: "Los tiempos de entrega varían según la ubicación y el producto, pero nos esforzamos en cumplir con plazos de entrega rápidos y eficientes.",
    },
    {
        pregunta: "¿Ofrecen asesoría en la instalación de productos?",
        respuesta: "Sí, contamos con un equipo de soporte que puede guiarte en la instalación de nuestros productos o recomendarte técnicos especializados.",
    },
    {
        pregunta: "¿Tienen distribución en todo el país?",
        respuesta: "Sí, nuestros productos están disponibles en todo el país gracias a nuestra amplia red de distribuidores.",
    },
    {
        pregunta: "¿Tienen comercialización directa?",
        respuesta: "No, nuestros productos son comercializados mediante nuestros distribuidores oficiales.",
    },
    {
        pregunta: "¿Cómo saber qué producto es adecuado para mi proyecto?",
        respuesta: "Puedes contactarnos y uno de nuestros asesores te guiará en la elección del producto que mejor se adapte a tus necesidades.",
    },
];
</script>
