<template>
    <DefaultSection class="bg-gradient-to-b from-terciary to-secondary py-6 px-4 md:p-8 lg:py-12 lg:px-16 xxl:p-16">
        <div class="xxl:max-w-[1304px] xxl:w-full flex flex-col items-center gap-3 md:gap-6 xxl:gap-8 mx-auto">
            <HeadingH2 class="text-white">Lo que nos define</HeadingH2>
            <div class="flex md:grid md:grid-cols-4 justify-center flex-wrap gap-2 lg:gap-4">
                <div v-for="definicion in definiciones" :key="definicion.id"
                    class="w-60 md:w-auto flex flex-col items-center gap-2 bg-white rounded-3xl shadow-md shadow-black/20 text-center p-4">
                    <div class="w-20 h-20 flex justify-center items-center bg-primary rounded-full">
                        <Icon :name="`material-symbols:${definicion.icono}`"
                            class="w-12 h-12 text-white flex-shrink-0" />
                    </div>
                    <HeadingH3 class="lg:text-xl text-terciary">{{ definicion.titulo }}</HeadingH3>
                    <p class="text-xs lg:text-sm font-medium">{{ definicion.texto }}</p>
                </div>
            </div>
        </div>
    </DefaultSection>
</template>

<script setup>
const definiciones = [
    {
        id: 1,
        icono: 'shield-lock-outline-rounded',
        titulo: 'Seguridad',
        texto: 'Productos diseñados para máxima durabilidad.',
    },
    {
        id: 2,
        icono: 'thumb-up-outline-rounded',
        titulo: 'Experiencia',
        texto: 'Más de una década desarrollando soluciones.',
    },
    {
        id: 3,
        icono: 'settings-suggest-outline-rounded',
        titulo: 'Innovación',
        texto: 'Tecnología y procesos productivos avanzados.',
    },
    {
        id: 4,
        icono: 'water-ec-outline-rounded',
        titulo: 'Sostenibilidad',
        texto: 'Compromiso con producción responsable.',
    },
];
</script>