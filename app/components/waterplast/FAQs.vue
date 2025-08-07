<template>
    <DefaultSection class="bg-gray-light gap-3 py-6 px-4">
        <HeadingH2 class="text-center text-terciary">Preguntas Frecuentes</HeadingH2>
        <div class="flex flex-col gap-3">
            <FaqAccordion v-for="(faq, index) in faqs" :key="index" :faq="faq" />
        </div>
    </DefaultSection>
</template>

<script setup>
const faqs = [
    {
        pregunta: "¿Qué tipo de garantía ofrecen sus productos?",
        respuesta: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
        pregunta: "¿Cuáles son los tiempos de entrega?",
        respuesta: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
        pregunta: "¿Ofrecen asesoría en la instalación de productos?",
        respuesta: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
        pregunta: "¿Tienen distribución en todo el país?",
        respuesta: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
        pregunta: "¿Tienen comercialización directa?",
        respuesta: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
        pregunta: "¿Cómo saber qué producto es adecuado para mi proyecto?",
        respuesta: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
];
</script>