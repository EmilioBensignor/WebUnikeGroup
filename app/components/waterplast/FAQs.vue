<template>
    <DefaultSection class="bg-gray-light gap-3 md:gap-4 lg:gap-6 py-6 lg:py-12 px-4 md:px-8 lg:px-16">
        <HeadingH2 class="text-center text-terciary">Preguntas Frecuentes</HeadingH2>
        <div class="flex flex-col md:grid md:grid-cols-2 gap-3 md:gap-8">
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

const mitad = Math.ceil(faqs.length / 2);

const primeraColumna = computed(() => {
    return faqs.slice(0, mitad);
});

const segundaColumna = computed(() => {
    return faqs.slice(mitad);
});
</script>