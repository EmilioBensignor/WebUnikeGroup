<template>
    <footer id="footer" class="w-full flex flex-col items-center gap-6 bg-primary-gradient rounded-t-3xl pt-12 xxl:px-16">
        <div
            class="lg:w-full xxl:max-w-[1304px] flex flex-col xxl:flex-row items-center gap-6 md:gap-12 xxl:gap-28 px-4 md:px-8 lg:px-16 xxl:px-0">
            <NuxtImg src="/images/logos/Logo-Unike-Group.svg" alt="Logo Unike Group"
                class="w-[6.5rem] md:w-[11.75rem] h-[4.5rem] md:h-32" />
            <div
                class="lg:w-full flex flex-col md:flex-row lg:justify-between items-center md:items-start gap-6 md:gap-5 xxl:gap-20 text-sm lg:text-base text-white font-medium">
                <div v-for="section in filteredSections" :key="section.title"
                    class="flex flex-col items-center md:items-start gap-3">
                    <p class="text-base lg:text-xl font-bold">{{ section.title }}</p>
                    <ul
                        :class="section.title === 'Redes Sociales' ? 'flex items-center gap-2' : 'flex flex-col items-center md:items-start gap-3'">
                        <li class="max-w-56 md:max-w-52 lg:max-w-60" v-for="(item, index) in section.items"
                            :key="`${section.title}-${index}-${item.route || item.link || item.map}`">
                            <NuxtLink v-if="item.link && section.title === 'Contacto'" :to="item.link"
                                class="flex gap-3">
                                <Icon v-if="item.icon" :name="`material-symbols:${item.icon}`"
                                    class="w-4 lg:w-5 h-4 lg:h-5 flex-shrink-0" />
                                <span>{{ item.text }}</span>
                            </NuxtLink>
                            <div v-else-if="item.map" class="flex gap-3">
                                <Icon :name="`material-symbols:${item.icon}`"
                                    class="w-4 lg:w-5 h-4 lg:h-5 flex-shrink-0" />
                                <span>{{ item.map }}</span>
                            </div>
                            <NuxtLink v-else-if="item.route && item.nombre && item.route.startsWith('http')" :to="item.route"
                                target="_blank"
                                class="text-white underline-animated">
                                {{ item.nombre }}
                            </NuxtLink>
                            <NuxtLink v-else-if="item.route && item.nombre" :to="item.route"
                                class="text-white underline-animated">
                                {{ item.nombre }}
                            </NuxtLink>
                            <NuxtLink v-else-if="item.route && item.img && section.title === 'Redes Sociales'"
                                :to="item.route" target="_blank" class="text-white">
                                <NuxtImg :src="`/images/redes/${item.img}.svg`" :alt="item.img" class="w-8 h-8 opacity-100 hover:opacity-70 transition-opacity duration-300" />
                            </NuxtLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="w-full text-center text-white text-sm md:text-base font-medium py-4 md:py-6 lg:py-12 xxl:pt-16">
            <p>© Copyright {{ new Date().getFullYear() }} Unike Group S.A.</p>
        </div>
    </footer>
</template>

<script setup>
import footerSections from '~/shared/menu';
import { useRoute } from 'vue-router';

const route = useRoute();

const isOnHome = computed(() => {
    return route.path === '/' || route.path === '/waterplast';
});

const filteredSections = computed(() => {
    return footerSections.map((section) => {
        // Si es la sección de Ayuda, aplicar lógica condicional a los items
        if (section.title === 'Ayuda') {
            return {
                ...section,
                items: section.items.map((item) => {
                    // Si estamos en la home, mantener las rutas originales
                    if (isOnHome.value) {
                        return item;
                    } else {
                        // En otras páginas, cambiar rutas hash a la home
                        if (item.route && item.route.startsWith('#')) {
                            return {
                                ...item,
                                route: '/'
                            };
                        }
                        return item;
                    }
                })
            };
        }
        return section;
    });
});
</script>