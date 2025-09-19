<template>
    <DefaultSection class="gap-3 md:gap-6 xxl:gap-8 bg-primary-gradient py-6 lg:py-12 md:px-16">
        <HeadingH2 class="flex sm:inline flex-col text-center text-white px-4">Opiniones de <span>nuestros
                clientes</span></HeadingH2>
        <CarouselStatic :slides-per-view="{ base: 1.4, sm: 2.5, md: 3, lg: 3, xl: 4, xxl: 4 }" :button-position="{
            top: '50%',
            transform: 'translateY(-50%)',
            left: {
                md: '-5rem',
                lg: '2rem',
                xl: '2rem',
                xxl: '-2rem',
            },
            right: {
                md: '-5rem',
                lg: '2rem',
                xl: '2rem',
                xxl: '-2rem',
            }
        }">
            <div v-if="loading" class="flex justify-center items-center min-h-[200px]">
                <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
            <div v-else-if="error" class="text-center text-white py-8">
                <p>Error al cargar las opiniones: {{ error }}</p>
            </div>
            <OpinionCard v-else v-for="(opinion, index) in opiniones" :key="opinion.id || index" :opinion="opinion" />
        </CarouselStatic>
    </DefaultSection>
</template>

<script setup>
const { useWaterplastOpiniones } = await import('~/composables/waterplast/useOpiniones.js')
const { opiniones, loading, error, fetchOpiniones } = useWaterplastOpiniones()

onMounted(() => {
    fetchOpiniones()
})
</script>