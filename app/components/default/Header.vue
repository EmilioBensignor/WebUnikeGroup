<template>
    <header :class="[
        'xxl:max-w-[1304px] flex items-center justify-between sticky z-20 bg-gradient-to-r from-primary to-terciary lg:border-2 lg:rounded-full py-2 md:py-6 lg:py-3 xxl:py-[0.875rem] px-4 md:px-8 lg:px-4 xxl:pl-6 lg:mx-16 xxl:mx-auto transition-all duration-300',
        isScrolled ? 'top-0 lg:top-6' : 'top-0 lg:top-16'
    ]">
        <NuxtLink :to="ROUTES_NAMES.HOME" class="lg:ml-2">
            <NuxtImg src="/images/logos/Logo-Unike-Group.svg" alt="Logo Unike Group" fetchpriority="high"
                class="w-[3.5rem] md:w-[6.75rem] lg:w-[4.75rem] h-9 md:h-[4.5rem] lg:h-[3.25rem] object-contain" />
        </NuxtLink>
        <button @click="toggleDrawer" aria-label="Toggle Menu"
            class="w-12 h-12 lg:hidden flex justify-center items-center p-4 cursor-pointer touch-manipulation active:opacity-70">
            <Icon name="material-symbols:menu-rounded"
                class="w-6 md:w-8 h-6 md:h-8 flex-shrink-0 text-white pointer-events-none" />
        </button>
        <nav class="hidden lg:flex">
            <ul class="flex items-center text-white font-bold">
                <li v-for="(item, index) in menu" :key="index"
                    class="h-12 flex justify-center items-center border-2 border-transparent hover:border-white rounded-full transition-colors duration-300 px-4 xxl:px-6">
                    <a v-if="item.isCatalogo" :href="catalogoUrl" :download="catalogoUrl ? true : undefined"
                        target="_blank" rel="noopener noreferrer"
                        class="cursor-pointer" :class="!catalogoUrl ? 'opacity-50 pointer-events-none' : ''">
                        {{ item.nombre }}
                    </a>
                    <NuxtLink v-else :to="item.route">{{ item.nombre }}</NuxtLink>
                </li>
            </ul>
            <div class="flex justify-center items-center relative ml-2 group">
                <ButtonPrimary :to="ROUTES_NAMES.HOME" class="!px-6">
                    Somos Unike Group
                </ButtonPrimary>
                <div
                    class="w-full flex flex-col absolute top-full left-0 z-20 bg-white rounded-3xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 p-3 mt-5">
                    <NuxtLink v-if="!isWaterplast" :to="ROUTES_NAMES.WATERPLAST.HOME"
                        class="hover:bg-gray-mid rounded-xl text-dark font-semibold transition-colors duration-300 py-2.5 px-3">
                        Waterplast
                    </NuxtLink>
                    <NuxtLink v-if="!isRohermet" :to="ROUTES_NAMES.ROHERMET.HOME"
                        class="hover:bg-gray-mid rounded-xl text-dark font-semibold transition-colors duration-300 py-2.5 px-3">
                        Rohermet
                    </NuxtLink>
                    <NuxtLink :to="ROUTES_NAMES.UNIKE.MURALLON" target="_blank" rel="noopener noreferrer"
                        class="hover:bg-gray-mid rounded-xl text-dark font-semibold transition-colors duration-300 py-2.5 px-3">
                        Murallón
                    </NuxtLink>
                </div>
            </div>
        </nav>
    </header>

    <DefaultDrawer :isOpen="isDrawerOpen" :catalogoUrl="catalogoUrl" @close="closeDrawer" />
</template>

<script setup>
import { ROUTES_NAMES } from '~/constants/ROUTE_NAMES'
import menu from '~/shared/unike/menu.js'
const { isWaterplast, isRohermet } = useBrand()

const { fetchCatalogoByMarca } = useCatalogos()

const isDrawerOpen = ref(false)
const isScrolled = ref(false)
const catalogoUrl = ref(null)

const toggleDrawer = () => {
    isDrawerOpen.value = !isDrawerOpen.value
}

const closeDrawer = () => {
    isDrawerOpen.value = false
}

const handleScroll = () => {
    isScrolled.value = window.scrollY > 0
}

onMounted(() => {
    fetchCatalogoByMarca('Unike Group').then((url) => {
        catalogoUrl.value = url
    })

    window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll, { passive: true })
})
</script>
