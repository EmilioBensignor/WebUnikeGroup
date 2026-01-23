<template>
    <DefaultSection id="faqs" class="bg-gray-light gap-3 md:gap-4 lg:gap-6 xxl:gap-8 py-6 md:py-8 lg:py-12 xxl:py-16 px-4 md:px-8 lg:px-16">
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
const props = defineProps({
    faqs: {
        type: Array,
        required: true
    }
});

const mitad = computed(() => Math.ceil(props.faqs.length / 2));

const primeraColumna = computed(() => {
    return props.faqs.slice(0, mitad.value);
});

const segundaColumna = computed(() => {
    return props.faqs.slice(mitad.value);
});
</script>