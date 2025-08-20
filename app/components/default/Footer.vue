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
                        <li class="max-w-56 md:max-w-52" v-for="item in section.items" :key="item.route || item.link || item.map">
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
import footerSections from '~/shared/menu';
</script>