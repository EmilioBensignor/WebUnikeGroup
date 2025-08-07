<template>
    <DefaultSection class="gap-6 bg-gray-light py-6 px-4">
        <div class="flex flex-col gap-6">
            <div class="flex flex-col gap-2">
                <HeadingH2 class="text-terciary">Sobre Waterplast</HeadingH2>
                <p class="text-sm text-dark">
                    Somos un equipo con años de experiencia en desarrollo de tecnología e infraestructura sostenible
                    aplicada a la gestión de los recursos hídricos.
                </p>
                <p class="text-sm text-dark">
                    Nos especializamos en sistemas de almacenamiento y distribución de agua para ámbitos tanto urbanos
                    como agro-industriales, siendo elegidos por la calidad, durabilidad y eficiencia de nuestras
                    soluciones.
                </p>
            </div>
            <div class="flex flex-col gap-4">
                <div v-for="(item, index) in sobre" :key="index" class="flex items-center gap-4">
                    <span class="w-12 h-12 flex items-center justify-center bg-secondary rounded-full flex-shrink-0">
                        <img :src="`/images/waterplast/sobre/${item.icon}.svg`" :alt="item.texto" class="w-6 h-6" />
                    </span>
                    <p class="text-sm text-dark font-medium">{{ item.texto }}</p>
                </div>
            </div>
            <ButtonPrimary class="flex justify-center items-center gap-2.5">
                Somos Unike Group
                <Icon name="material-symbols:arrow-right-alt-rounded" class="w-6 h-6" />
            </ButtonPrimary>
        </div>
        <div class="flex flex-col gap-6 bg-cover bg-center bg-no-repeat rounded-2xl p-6"
            style="background-image: url('/images/waterplast/sobre/Instalar.png');">
            <div class="flex flex-col gap-3 text-center text-white">
                <HeadingH2>Cómo instalar Waterplast</HeadingH2>
                <div class="flex flex-col gap-2 text-sm">
                    <p class="font-bold">¿Tenés alguna duda sobre nuestros productos?</p>
                    <p class="font-medium">
                        No te preocupes, tenemos un canal de youtube con tutoriales
                        sobre todo lo que necesitas para instalar nuestros productos.
                    </p>
                </div>
            </div>
            <ButtonPrimary>Suscribite a nuestro canal</ButtonPrimary>
        </div>
    </DefaultSection>
</template>

<script setup>
const sobre = [
    {
        icon: "Sostenible",
        texto: "Desarrollo sostenible y responsable",
    },
    {
        icon: "Calidad",
        texto: "Los más altos estándares de calidad",
    },
    {
        icon: "Innovacion",
        texto: "Búsqueda constante de innovación",
    },
];
</script>