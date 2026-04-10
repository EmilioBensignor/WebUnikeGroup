<template>
    <DefaultSection class="flex flex-col gap-3 lg:gap-8 pt-6 md:pt-8 lg:pt-12 xxl:pt-16">
        <HeadingH2 class="text-center text-terciary px-4 mx:px-0">Nuestra capacidad productiva</HeadingH2>
        <CarouselStatic :slides-per-view="{ base: 1.4, sm: 1.5, md: 2, lg: 2, xl: 2, xxl: 2 }"
            :gap="{ base: 8, lg: 16, xl: 16, xxl: 16 }" :button-position="{
                top: '45%',
                transform: 'translateY(-50%)',
                left: {
                    md: '2.5rem',
                    lg: '2.5rem',
                    xl: '2.5rem',
                    xxl: '-1.5rem',
                },
                right: {
                    md: '2.5rem',
                    lg: '2.5rem',
                    xl: '2.5rem',
                    xxl: '-1.5rem',
                }
            }" class="md:px-16">
            <div v-for="item in procesos" :key="item.nombre" class="flex flex-col gap-2 md:gap-4">
                <div class="overflow-hidden rounded-3xl">
                    <NuxtImg :src="`/images/unike/unike_mision_proceso_${item.imagen}.webp`" :alt="item.nombre"
                        format="webp" quality="75" class="w-full h-[17rem] lg:h-[24rem] xxl:h-[23.5rem] object-cover" />
                </div>
                <p class="text-center lg:text-xl font-semibold">{{ item.nombre }}</p>
            </div>
        </CarouselStatic>
    </DefaultSection>
</template>

<script setup>
const procesos = [
    { nombre: 'Proceso de Rotomoldeo', imagen: 'rotomoldeo' },
    { nombre: 'Proceso de Soplado', imagen: 'soplado' },
    { nombre: 'Proceso de Inyección', imagen: 'inyeccion' },
    { nombre: 'Fabricación Industrial', imagen: 'industrial' },
]
</script>