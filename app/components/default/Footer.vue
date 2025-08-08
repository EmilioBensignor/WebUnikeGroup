<template>
    <footer class="w-full flex flex-col items-center gap-6 bg-primary-gradient rounded-t-3xl pt-12">
        <div class="flex flex-col items-center gap-6 md:gap-12 px-4 md:px-8">
            <NuxtImg src="/images/logos/Logo-Unike-Group.svg" alt="Logo Unike Group"
                class="w-[6.5rem] md:w-[11.75rem] h-[4.5rem] md:h-32" />
            <div
                class="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-5 text-sm text-white font-medium">
                <div v-for="section in footerSections" :key="section.title"
                    class="flex flex-col items-center md:items-start gap-3">
                    <p class="text-base font-bold">{{ section.title }}</p>
                    <ul
                        :class="section.title === 'Redes Sociales' ? 'flex items-center gap-2' : 'flex flex-col items-center md:items-start gap-3'">
                        <li class="md:max-w-52" v-for="item in section.items" :key="item.route || item.link || item.map">
                            <NuxtLink v-if="item.link" :to="item.link" class="flex gap-3">
                                <Icon v-if="item.icon" :name="`material-symbols:${item.icon}`"
                                    class="w-4 h-4 flex-shrink-0" />
                                <span>{{ item.text }}</span>
                            </NuxtLink>
                            <div v-else-if="item.map" class="flex gap-3">
                                <Icon :name="`material-symbols:${item.icon}`" class="w-4 h-4 flex-shrink-0" />
                                <span>{{ item.map }}</span>
                            </div>
                            <NuxtLink v-else-if="item.route && item.nombre" :to="item.route"
                                class="text-white hover:underline">
                                {{ item.nombre }}
                            </NuxtLink>
                            <NuxtLink v-else-if="item.route && item.img" :to="item.route"
                                class="text-white hover:underline">
                                <NuxtImg :src="`/images/redes/${item.img}.svg`" :alt="item.img" class="w-8 h-8" />
                            </NuxtLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="w-full text-center text-white text-sm md:text-base font-medium py-4 md:py-6">
            <p>© Copyright {{ new Date().getFullYear() }} Unike Group S.A.</p>
        </div>
    </footer>
</template>

<script setup>
import { ROUTES_NAMES } from '@/constants/ROUTE_NAMES.js'

const footerSections = [
    {
        title: "Contacto",
        items: [
            {
                icon: 'phone-in-talk-outline-rounded',
                link: 'tel:' + ROUTES_NAMES.CONTACTO.TELEFONO,
                text: ROUTES_NAMES.CONTACTO.TELEFONO,
            },
            {
                icon: 'mail-outline-rounded',
                link: 'mailto:' + ROUTES_NAMES.CONTACTO.MAIL,
                text: ROUTES_NAMES.CONTACTO.MAIL,
            },
            {
                icon: 'location-on-outline-rounded',
                map: ROUTES_NAMES.CONTACTO.UBICACION,
            },
        ]
    },
    {
        title: "Unike Group",
        items: [
            {
                nombre: "Sobre nosotros",
                route: ROUTES_NAMES.UNIKE.SOBRE
            },
            {
                nombre: "Waterplast",
                route: ROUTES_NAMES.UNIKE.WATERPLAST
            },
            {
                nombre: "Rohermet",
                route: ROUTES_NAMES.UNIKE.ROHERMET
            },
            {
                nombre: "Murallón",
                route: ROUTES_NAMES.UNIKE.MURALLON
            },
        ]
    },
    {
        title: "Ayuda",
        items: [
            {
                nombre: "Preguntas frecuentes",
                route: ROUTES_NAMES.AYUDA.FAQS
            },
            {
                nombre: "Tutoriales de instalación",
                route: ROUTES_NAMES.AYUDA.TUTORIALES
            },
            {
                nombre: "Lista de distribuidores",
                route: ROUTES_NAMES.AYUDA.DISTRIBUIDORES
            },
            {
                nombre: "Blog",
                route: ROUTES_NAMES.AYUDA.BLOG
            },
        ]
    },
    {
        title: "Redes Sociales",
        items: [
            {
                img: 'Instagram',
                route: ROUTES_NAMES.REDES.INSTAGRAM,
            },
            {
                img: 'Facebook',
                route: ROUTES_NAMES.REDES.FACEBOOK,
            },
            {
                img: 'YouTube',
                route: ROUTES_NAMES.REDES.YOUTUBE,
            },
            {
                img: 'LinkedIn',
                route: ROUTES_NAMES.REDES.LINKEDIN,
            },
        ]
    }
];
</script>