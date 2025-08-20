<template>
    <header
        class="flex items-center justify-between sticky top-0 lg:top-16 z-10 bg-gradient-to-r from-primary to-terciary lg:border-2 lg:rounded-full py-2 md:py-6 lg:py-3 px-4 md:px-8 lg:px-4 lg:mx-16">
        <NuxtImg src="/images/logos/Logo-Waterplast-Blanco.svg" alt="Logo Waterplast"
            class="w-28 md:w-[13.5rem] h-9 md:h-[4.5rem] lg:w-[9.75rem] lg:h-[3.25rem]" />
        <button @click="toggleDrawer" class="w-12 h-12 lg:hidden flex justify-center items-center p-4">
            <Icon name="material-symbols:menu-rounded" class="w-6 md:w-8 h-6 md:h-8 flex-shrink-0 text-white" />
        </button>
        <nav class="hidden lg:flex">
            <ul class="flex items-center text-white font-bold">
                <li class="relative group">
                    <div
                        class="h-12 flex justify-center items-center border-2 border-transparent hover:border-secondary rounded-full transition-colors duration-300 px-4 cursor-default">
                        Productos
                    </div>
                    <div
                        class="w-[59.5rem] flex gap-6 absolute top-full -left-[200%] z-20 bg-white rounded-3xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 p-3 mt-5">
                        <div class="grid grid-cols-4 gap-3">
                            <NuxtLink to="#" v-for="(categoria, index) in categorias" :key="index"
                                @click="goToCategory(categoria)" class="relative">
                                <NuxtImg :src="categoria.img" :alt="`Categoria ${categoria.nombre}`"
                                    class="w-[9.25rem] h-[8.75rem] object-cover rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300" />
                                <p class="absolute top-4 left-0 right-0 text-center text-white font-semibold">
                                    {{ categoria.nombre }}
                                </p>
                            </NuxtLink>
                        </div>
                        <NuxtImg src="/images/waterplast/banners/Biolam.png" alt="Banner Biolam"
                            class="w-[17.5rem] h-[18.125rem] object-cover rounded-2xl shadow-lg" />
                    </div>
                </li>
                <li v-for="(item, index) in menu" :key="index"
                    class="h-12 flex justify-center items-center border-2 border-transparent hover:border-secondary rounded-full transition-colors duration-300 px-4">
                    <NuxtLink :to="item.route">{{ item.nombre }}</NuxtLink>
                </li>
                <div class="relative ml-2 group">
                    <ButtonSecondary>
                        Somos Unike Group
                    </ButtonSecondary>
                    <div
                        class="w-full flex flex-col absolute top-full left-0 z-20 bg-white rounded-3xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 p-3 mt-5">
                        <NuxtLink to="#"
                            class="hover:bg-gray-mid rounded-xl text-dark font-semibold transition-colors duration-300 py-2.5 px-3">
                            Rohermet
                        </NuxtLink>
                        <NuxtLink to="#"
                            class="hover:bg-gray-mid rounded-xl text-dark font-semibold transition-colors duration-300 py-2.5 px-3">
                            Murallón
                        </NuxtLink>
                    </div>
                </div>
            </ul>
        </nav>
    </header>

    <WaterplastDrawer :isOpen="isDrawerOpen" @close="closeDrawer" />
</template>

<script setup>
import menu from '~/shared/waterplast/menu.js'
import categorias from '~/shared/waterplast/categorias.js'

const isDrawerOpen = ref(false)

const toggleDrawer = () => {
    isDrawerOpen.value = !isDrawerOpen.value
}

const closeDrawer = () => {
    isDrawerOpen.value = false
}
</script>