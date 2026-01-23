<template>
    <DefaultSection class="gap-4 md:gap-6 xxl:gap-8 py-6 md:py-8 lg:py-12 xxl:py-16 px-4 md:px-16 xxl:px-0 xxl:mx-auto">
        <HeadingH2 class="text-center text-terciary">Nuestros pilares</HeadingH2>
        <div class="xxl:max-w-[1304px] xxl:w-full flex flex-col gap-4 md:gap-6">
            <div class="flex flex-wrap md:flex-nowrap justify-center gap-2 lg:gap-4">
                <div v-for="(pilar, index) in pilares" :key="index" class="md:w-1/3 max-w-60 md:max-w-full lg:max-w-[19.25rem] flex flex-col items-center text-center gap-2 rounded-3xl shadow-md shadow-black/20 p-4 lg:p-6">
                    <div class="w-20 h-20 flex justify-center items-center bg-secondary rounded-full">
                        <NuxtImg :src="`/images/rohermet/Pilar-${pilar.title}.svg`" :alt="pilar.title" class="w-12 h-12" />
                    </div>
                    <HeadingH3 class="text-primary lg:text-xl">{{ pilar.title }}</HeadingH3>
                    <p class="text-xs lg:text-sm font-medium">{{ pilar.text }}</p>
                </div>
            </div>
            <div class="flex flex-col items-center gap-4 md:gap-6">
                <div class="max-w-[646px] lg:max-w-full flex flex-col gap-2 md:gap-0 text-center text-sm lg:text-base font-medium">
                    <p>
                        Desarrollamos soluciones sanitarias pensadas para responder
                        en entornos reales.
                    </p>
                    <p>
                        Cada producto está diseñado
                        para brindar estabilidad, protección
                        y funcionamiento confiable
                        allí donde se instala.
                    </p>
                </div>
                <ButtonPrimary class="flex md:hidden justify-center items-center sm:self-center gap-2.5">
                    Somos Unike Group
                    <Icon name="material-symbols:arrow-right-alt-rounded" class="w-6 h-6" />
                </ButtonPrimary>
                <ButtonPrimary class="hidden md:flex justify-center items-center sm:self-center gap-2.5">
                    Somos parte de Unike Group
                    <Icon name="material-symbols:arrow-right-alt-rounded" class="w-6 h-6" />
                </ButtonPrimary>
            </div>
        </div>
    </DefaultSection>
</template>

<script setup>
const pilares = [
    {
        title: "Seguridad",
        text: "Protección estructural, estabilidad y prevención de fallas.",
    },
    {
        title: "Funcionalidad",
        text: "Diseño inteligente, fácil instalación y desempeño eficiente.",
    },
    {
        title: "Confiabilidad",
        text: "Materiales de calidad, procesos controlados y experiencia.",
    },
];
</script>