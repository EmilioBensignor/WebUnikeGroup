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
            <div class="h-full flex flex-col md:gap-6 absolute inset-0 z-10 bg-primary-reverse-gradient sm:rounded-l-[18px] md:p-6">
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
                            <li v-for="(item, index) in menu" :key="index" @click="$emit('close')"
                                class="w-full text-start py-4 px-3">
                                <NuxtLink :to="item.route" class="text-white">
                                    {{ item.nombre }}
                                </NuxtLink>
                            </li>
                            <li>
                                <button @click="currentPanel = 2" class="w-full text-start py-4 px-3">
                                    Somos Unike Group
                                </button>
                            </li>
                        </ul>
                    </nav>

                    <div class="flex justify-center">
                        <NuxtImg src="/images/logos/Logo-Unike-Group.svg" alt="Logo Unike Group"
                            fetchpriority="high"
                            class="w-24 md:w-36 h-12 md:h-[4.5rem] object-contain" />
                    </div>
                </div>
            </div>

            <Transition enter-active-class="transition-all duration-300 ease-out"
                leave-active-class="transition-all duration-300 ease-in" enter-from-class="translate-x-full"
                enter-to-class="translate-x-0" leave-from-class="translate-x-0" leave-to-class="translate-x-full">
                <div v-if="currentPanel === 2"
                    class="h-full flex flex-col md:gap-6 absolute inset-0 z-20 bg-primary-reverse-gradient sm:rounded-l-[18px] md:p-6">
                    <div class="flex justify-between py-2 px-4 md:p-0">
                        <button @click="currentPanel = 1" class="w-12 h-12 flex justify-center items-center">
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
                            <li v-if="!isWaterplast" @click="$emit('close')" class="w-full text-start py-4 px-3">
                                <NuxtLink :to="ROUTES_NAMES.HOME">Waterplast</NuxtLink>
                            </li>
                            <li v-if="!isRohermet" @click="$emit('close')" class="w-full text-start py-4 px-3">
                                <NuxtLink :to="ROUTES_NAMES.ROHERMET.HOME">Rohermet</NuxtLink>
                            </li>
                        </ul>
                        <div class="flex justify-center pb-5">
                            <NuxtImg src="/images/logos/Logo-Unike-Group.svg" alt="Logo Unike Group"
                                fetchpriority="high"
                                class="w-24 md:w-36 h-12 md:h-[4.5rem] object-contain" />
                        </div>
                    </nav>
                </div>
            </Transition>
        </div>
    </Transition>
</template>

<script setup>
import { ROUTES_NAMES } from '~/constants/ROUTE_NAMES'
const { isWaterplast, isRohermet } = useBrand()

const props = defineProps({
    isOpen: {
        type: Boolean,
        default: false
    }
})

defineEmits(['close'])

const currentPanel = ref(1)

const menu = [
    { nombre: "Distribuidores", route: ROUTES_NAMES.DISTRIBUIDORES },
    { nombre: "Blog", route: ROUTES_NAMES.BLOG },
    { nombre: "Contacto", route: "#footer" },
]

watch(() => props.isOpen, (newVal) => {
    if (!newVal) {
        setTimeout(() => { currentPanel.value = 1 }, 300)
    }
})

watch(() => props.isOpen, (isOpen) => {
    if (import.meta.client) {
        document.body.style.overflow = isOpen ? 'hidden' : ''
    }
})

onUnmounted(() => {
    if (import.meta.client) {
        document.body.style.overflow = ''
    }
})
</script>
