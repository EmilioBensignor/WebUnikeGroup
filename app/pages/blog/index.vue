<template>
    <DefaultMain>
        <span
            class="bg-gradient-hero md:w-full md:h-[11.5rem] lg:h-[16.5rem] hidden md:block md:absolute md:top-0"></span>
        <DefaultSection class="px-4 md:px-8 lg:px-16 xxl:px-0 pt-6 md:pt-10 lg:pt-32 xxl:pt-36">
            <div class="xxl:max-w-[1304px] xxl:w-full flex flex-col gap-2 lg:gap-4 text-center lg:text-start text-dark">
                <HeadingH1>Blog Unike Group</HeadingH1>
                <p class="text-sm lg:text-[1.75rem] font-medium">Enterate de las últimas novedades que tenemos para vos
                </p>
            </div>
        </DefaultSection>

        <DefaultSection class="px-4 md:px-8 lg:px-16 xxl:px-0 py-6 md:py-8 lg:py-12 xxl:py-16">
            <div class="xxl:max-w-[1304px] xxl:w-full flex flex-col gap-3 md:gap-4 lg:gap-6">
                <HeadingH2 class="text-center text-terciary">Últimas novedades</HeadingH2>
                <div v-if="loading" class="flex justify-center py-8">
                    <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                </div>
                <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                    <BlogCardDestacada v-for="post in ultimosBlogs" :key="post.id" :post="post" />
                </div>
            </div>
        </DefaultSection>

        <DefaultSection class="px-4 md:px-8 lg:px-16 xxl:px-0 pb-12 lg:pb-16 xxl:pb-20">
            <div class="xxl:max-w-[1304px] xxl:w-full flex flex-col items-center gap-3 md:gap-4 lg:gap-6">
                <HeadingH2 class="text-terciary">Todas las notas</HeadingH2>

                <div class="w-full flex md:justify-center gap-2 lg:gap-3 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden">
                    <ButtonPrimary @click="setFiltro(null)" class="!px-4 sm:!px-10 flex-shrink-0 !border-2 !border-terciary"
                        :class="filtroActivo === null ? '!bg-terciary' : '!bg-transparent !text-terciary'">
                        Unike Group
                    </ButtonPrimary>
                    <ButtonPrimary @click="setFiltro('Waterplast')" class="!px-4 sm:!px-10 flex-shrink-0 !border-2 !border-terciary"
                        :class="filtroActivo === 'Waterplast' ? '!bg-terciary' : '!bg-transparent !text-terciary'">
                        Waterplast
                    </ButtonPrimary>
                    <ButtonPrimary @click="setFiltro('Rohermet')" class="!px-4 sm:!px-10 flex-shrink-0 !border-2 !border-terciary"
                        :class="filtroActivo === 'Rohermet' ? '!bg-terciary' : '!bg-transparent !text-terciary'">
                        Rohermet
                    </ButtonPrimary>
                </div>

                <div v-if="loading" class="flex justify-center py-8">
                    <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                </div>
                <div v-else-if="blogsPaginados.length === 0" class="text-center text-dark/50 py-8">
                    No hay notas disponibles
                </div>
                <div v-else class="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
                    <BlogCardDestacada v-for="post in blogsPaginados" :key="post.id" :post="post" />
                </div>

                <ButtonPrimary v-if="hayMas" @click="cargarMas" class="!bg-terciary">
                    Cargar más
                </ButtonPrimary>
            </div>
        </DefaultSection>
    </DefaultMain>
</template>

<script setup>
import { useBlog } from '~/composables/useBlog'

definePageMeta({
    layout: 'default'
})

const { blogs, loading, fetchBlogs } = useBlog()

const ultimosBlogs = computed(() => blogs.value.slice(0, 2))

const filtroActivo = ref(null)
const cantidadVisible = ref(6)

const setFiltro = (marca) => {
    filtroActivo.value = marca
    cantidadVisible.value = 6
}

const blogsFiltrados = computed(() => {
    if (!filtroActivo.value) return blogs.value
    return blogs.value.filter(p => p.creado_por === filtroActivo.value)
})

const blogsPaginados = computed(() => blogsFiltrados.value.slice(0, cantidadVisible.value))

const hayMas = computed(() => cantidadVisible.value < blogsFiltrados.value.length)

const cargarMas = () => {
    cantidadVisible.value += 6
}

onMounted(() => {
    fetchBlogs()
})
</script>
