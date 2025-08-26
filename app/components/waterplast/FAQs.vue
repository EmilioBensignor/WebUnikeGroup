<template>
    <DefaultSection class="bg-gray-light gap-3 md:gap-4 lg:gap-6 xxl:gap-8 py-6 md:py-8 lg:py-12 xxl:py-16 px-4 md:px-8 lg:px-16">
        <HeadingH2 class="text-center text-terciary">Preguntas Frecuentes</HeadingH2>
        <div class="xxl:max-w-[1304px] xxl:w-full flex flex-col md:grid md:grid-cols-2 gap-3 md:gap-8">
            <div class="flex flex-col gap-3 lg:gap-4">
                <FaqAccordion v-for="(faq, index) in primeraColumna" :key="index" :faq="faq" />
            </div>
            <div class="flex flex-col gap-3 lg:gap-4">
                <FaqAccordion v-for="(faq, index) in segundaColumna" :key="index" :faq="faq" />
            </div>
        </div>
    </DefaultSection>
</template>

<script setup>
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

const mitad = Math.ceil(faqs.length / 2);

const primeraColumna = computed(() => {
    return faqs.slice(0, mitad);
});

const segundaColumna = computed(() => {
    return faqs.slice(mitad);
});
</script>