<template>
    <Transition enter-active-class="transition-opacity duration-300 ease-out"
        leave-active-class="transition-opacity duration-300 ease-in" enter-from-class="opacity-0"
        enter-to-class="opacity-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
        <div v-if="isOpen" class="fixed inset-0 z-40 bg-black/30" @click="$emit('close')"></div>
    </Transition>

    <Transition enter-active-class="transition-transform duration-300 ease-out"
        leave-active-class="transition-transform duration-300 ease-in" enter-from-class="translate-x-full"
        enter-to-class="translate-x-0" leave-from-class="translate-x-0" leave-to-class="translate-x-full">
        <div v-if="isOpen" class="w-full sm:max-w-md h-full fixed top-0 right-0 z-50">
            <div
                class="h-full flex flex-col md:gap-6 absolute inset-0 z-10 bg-primary-reverse-gradient sm:rounded-l-[18px] md:p-6">
                <div class="flex justify-end py-2 px-4 md:p-0">
                    <button @click="$emit('close')" class="w-12 h-12 flex justify-center items-center">
                        <div class="w-6 h-6 flex justify-center items-center bg-white rounded-full">
                            <Icon name="material-symbols:close-rounded" class="w-5 h-5 text-primary" />
                        </div>
                    </button>
                </div>

                <div class="flex flex-col gap-6">
                    <nav class="px-4 md:p-0">
                        <ul class="text-sm text-white font-bold">
                            <li>
                                <button @click="navigateToPanel(2)"
                                    class="w-full text-start py-4 px-3">Productos</button>
                            </li>
                            <li v-for="(item, index) in conditionalMenu" :key="index" @click="$emit('close')"
                                class="w-full text-start py-4 px-3">
                                <NuxtLink :to="item.route" class="text-white">
                                    {{ item.nombre }}
                                </NuxtLink>
                            </li>
                        </ul>
                    </nav>

                    <div class="flex justify-center">
                        <NuxtImg src="/images/logos/Logo-Rohermet-Blanco.svg" alt="Logo Rohermet" fetchpriority="high"
                            class="w-36 md:w-[13.5rem] h-12 md:h-[4.5rem]" />
                    </div>
                </div>
            </div>

            <Transition enter-active-class="transition-all duration-300 ease-out"
                leave-active-class="transition-all duration-300 ease-in" enter-from-class="translate-x-full"
                enter-to-class="translate-x-0" leave-from-class="translate-x-0" leave-to-class="translate-x-full">
                <div v-if="currentPanel === 2"
                    class="h-full flex flex-col md:gap-6 absolute inset-0 z-20 bg-primary-reverse-gradient sm:rounded-l-[18px] md:p-6">
                    <div class="flex justify-between py-2 px-4 md:p-0">
                        <button @click="navigateToPanel(1)" class="w-12 h-12 flex justify-center items-center">
                            <div class="w-6 h-6 flex justify-center items-center bg-white rounded-full">
                                <Icon name="material-symbols:arrow-back" class="w-5 h-5 text-primary" />
                            </div>
                        </button>
                        <button @click="$emit('close')" class="w-12 h-12 flex justify-center items-center">
                            <div class="w-6 h-6 flex justify-center items-center bg-white rounded-full">
                                <Icon name="material-symbols:close-rounded" class="w-5 h-5 text-primary" />
                            </div>
                        </button>
                    </div>

                    <div class="flex flex-col gap-6 overflow-y-scroll" style="min-height: calc(100vh - 100px);">
                        <div class="flex flex-col gap-4 px-4 md:p-0">
                            <div class="grid grid-cols-2 gap-2">
                                <div v-if="loading" class="col-span-2 flex justify-center items-center py-8">
                                    <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                                </div>
                                <div v-else-if="error" class="col-span-2 text-center text-white py-8">
                                    <p>Error al cargar categorías</p>
                                </div>
                                <NuxtLink v-else :to="ROUTES_NAMES.ROHERMET.CATEGORIA(categoria.slug)"
                                    v-for="(categoria, index) in categorias" :key="categoria.id || index"
                                    @click="$emit('close')" class="relative">
                                    <img :src="categoria.imagen" :alt="`Categoria ${categoria.nombre}`"
                                        class="w-full h-44 md:h-52 object-cover rounded-2xl shadow-lg" />
                                    <p
                                        class="absolute top-4 left-0 right-0 text-center text-sm text-white font-semibold">
                                        {{ categoria.nombre }}</p>
                                </NuxtLink>
                            </div>
                            <img v-if="imagenBanner" :src="imagenBanner.imagen_chica" :alt="imagenBanner.nombre"
                                class="w-full object-cover rounded-2xl shadow-lg" />
                        </div>
                        <div class="flex justify-center pb-12">
                            <NuxtImg src="/images/logos/Logo-Rohermet-Blanco.svg" alt="Logo Rohermet"
                                fetchpriority="high" class="w-36 md:w-[13.5rem] h-12 md:h-[4.5rem]" />
                        </div>
                    </div>
                </div>
            </Transition>

            <Transition enter-active-class="transition-all duration-300 ease-out"
                leave-active-class="transition-all duration-300 ease-in" enter-from-class="translate-x-full"
                enter-to-class="translate-x-0" leave-from-class="translate-x-0" leave-to-class="translate-x-full">
                <div v-if="currentPanel === 3"
                    class="h-full flex flex-col md:gap-6 absolute inset-0 z-20 bg-primary-reverse-gradient sm:rounded-l-[18px] md:p-6">
                    <div class="flex justify-between py-2 px-4 md:p-0">
                        <button @click="navigateToPanel(1)" class="w-12 h-12 flex justify-center items-center">
                            <div class="w-6 h-6 flex justify-center items-center bg-white rounded-full">
                                <Icon name="material-symbols:arrow-back" class="w-5 h-5 text-primary" />
                            </div>
                        </button>
                        <button @click="$emit('close')" class="w-12 h-12 flex justify-center items-center">
                            <div class="w-6 h-6 flex justify-center items-center bg-white rounded-full">
                                <Icon name="material-symbols:close-rounded" class="w-5 h-5 text-primary" />
                            </div>
                        </button>
                    </div>

                    <nav class="flex flex-col gap-6 px-4 overflow-y-scroll" style="min-height: calc(100vh - 100px);">
                        <ul class="text-sm text-white font-bold">
                            <li @click="$emit('close')" class="w-full text-start py-4 px-3">
                                <NuxtLink to="#">
                                    Waterplast
                                </NuxtLink>
                            </li>
                            <li @click="$emit('close')" class="w-full text-start py-4 px-3">
                                <NuxtLink to="#">
                                    Murallon
                                </NuxtLink>
                            </li>
                        </ul>
                        <div class="flex justify-center pb-5">
                            <NuxtImg src="/images/logos/Logo-Rohermet-Blanco.svg" alt="Logo Rohermet"
                                fetchpriority="high" class="w-36 md:w-[13.5rem] h-12 md:h-[4.5rem]" />
                        </div>
                    </nav>
                </div>
            </Transition>
        </div>
    </Transition>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { ROUTES_NAMES } from '~/constants/ROUTE_NAMES'
import menu from '~/shared/rohermet/menu.js'

const { useRohermetCategorias } = await import('~/composables/rohermet/useCategorias.js')
const { categorias, loading, error, fetchCategorias } = useRohermetCategorias()

const { useRohermetImagenesDestacadas } = await import('~/composables/rohermet/useImagenesDestacadas.js')
const { fetchImagenDestacadaBySlug } = useRohermetImagenesDestacadas()

const route = useRoute()

const imagenBanner = ref(null)

const props = defineProps({
    isOpen: {
        type: Boolean,
        default: false
    }
})


const emit = defineEmits(['close'])

const currentPanel = ref(1)

const navigateToPanel = (panelNumber) => {
    currentPanel.value = panelNumber
}

const isOnHome = computed(() => {
    return route.path === '/' || route.path === '/rohermet'
})

const conditionalMenu = computed(() => {
    return menu.map(item => {
        if (isOnHome.value) {
            return item
        } else {
            if (item.nombre === 'Contacto') {
                return item
            } else {
                return {
                    ...item,
                    route: '/'
                }
            }
        }
    })
})


watch(() => props.isOpen, (newVal) => {
    if (!newVal) {
        setTimeout(() => {
            currentPanel.value = 1
        }, 300)
    }
})

watch(() => props.isOpen, (isOpen) => {
    if (import.meta.client) {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
    }
})

onUnmounted(() => {
    if (import.meta.client) {
        document.body.style.overflow = ''
    }
})

const handleEscape = (e) => {
    if (e.key === 'Escape' && props.isOpen) {
        emit('close')
    }
}

onMounted(async () => {
    watch(() => props.isOpen, (isOpen) => {
        if (isOpen) {
            fetchCategorias()
        }
    }, { immediate: false })

    try {
        const imagenMenu = await fetchImagenDestacadaBySlug('imagen-menu')
        if (imagenMenu) {
            imagenBanner.value = imagenMenu
        }
    } catch (error) {
        console.log(error);
    }

    document.addEventListener('keydown', handleEscape, { passive: true })
})

onUnmounted(() => {
    document.removeEventListener('keydown', handleEscape, { passive: true })
})
</script>
