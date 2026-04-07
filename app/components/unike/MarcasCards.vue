<template>
    <DefaultSection class="px-4 md:px-8 lg:px-16 xxl:px-0 py-6 md:py-8 lg:py-12 xxl:py-16">
        <HeadingH2 v-if="showTitle" class="text-center text-terciary mb-4 lg:mb-6 xxl:mb-8">Nuestras soluciones para tu día a día</HeadingH2>
        <div class="xxl:max-w-[1304px] xxl:w-full flex justify-center flex-wrap md:flex-nowrap gap-2 lg:gap-4">
            <component v-for="marca in marcas" :key="marca.nombre"
                :is="marca.disabled ? 'div' : (marca.external ? 'a' : NuxtLink)"
                :to="(!marca.disabled && !marca.external) ? marca.route : undefined"
                :href="(!marca.disabled && marca.external) ? marca.route : undefined"
                :target="(!marca.disabled && marca.external) ? '_blank' : undefined"
                :rel="(!marca.disabled && marca.external) ? 'noopener noreferrer' : undefined"
                :class="[
                    'w-72 md:w-[14.5rem] lg:w-[19.25rem] xxl:w-[25.25rem] group flex flex-col gap-2.5 xxl:gap-6 rounded-2xl shadow-md shadow-black/20 p-4 lg:p-6',
                    marca.disabled ? 'bg-gray-light opacity-70' : 'bg-white'
                ]">
                <div class="relative w-full h-40 md:h-32 lg:h-40 xxl:h-56 overflow-hidden rounded-xl">
                    <NuxtImg :src="marca.logo" :alt="marca.nombre" format="webp" quality="75"
                        :class="[
                            'w-full h-full object-contain transition-opacity duration-300',
                            !marca.disabled && 'group-hover:opacity-0'
                        ]" />
                    <NuxtImg v-if="!marca.disabled" :src="marca.imagen" :alt="marca.nombre" format="webp" quality="75"
                        class="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 opacity-0 group-hover:opacity-100" />
                    <span v-if="marca.disabled"
                        class="absolute bottom-3 left-0 right-0 mx-auto w-max bg-primary rounded-full text-xs lg:text-sm text-white font-semibold py-1 px-4">
                        Próximamente
                    </span>
                </div>
                <p class="text-center text-xs lg:text-base text-dark font-medium">{{ marca.descripcion }}</p>
            </component>
        </div>
    </DefaultSection>
</template>

<script setup>
import { ROUTES_NAMES } from '~/constants/ROUTE_NAMES'

defineProps({
    showTitle: {
        type: Boolean,
        default: true,
    },
})

const NuxtLink = resolveComponent('NuxtLink')

const marcas = [
    {
        nombre: 'Waterplast',
        logo: '/images/marcas/Waterplast.webp',
        imagen: '/images/marcas/Waterplast-Almacenamiento-Manejo-Agua.png',
        descripcion: 'Soluciones para almacenamiento de agua',
        route: ROUTES_NAMES.WATERPLAST.HOME,
        external: false,
    },
    {
        nombre: 'Rohermet',
        logo: '/images/marcas/Rohermet.webp',
        imagen: '/images/marcas/Rohermet-Instalaciones-Componentes-Sanitarios.png',
        descripcion: 'Componentes sanitarios de alta precisión',
        route: ROUTES_NAMES.ROHERMET.HOME,
        external: false,
    },
    {
        nombre: 'Murallón',
        logo: '/images/marcas/Murallon.webp',
        imagen: '/images/marcas/Murallon-Pinturas-Variedad-Espacios.png',
        descripcion: 'Pinturas para hogar y obra',
        route: ROUTES_NAMES.UNIKE.MURALLON,
        external: true,
        disabled: true,
    },
]
</script>
