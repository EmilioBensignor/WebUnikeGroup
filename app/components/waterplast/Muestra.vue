<template>
    <DefaultSection class="relative h-[250vh] md:h-[150vh] lg:h-[300vh] pt-2 px-4 pb-6 md:px-8 md:py-8 lg:px-16">
        <div ref="sectionRef" class="h-full">
        <div class="flex flex-col md:flex-row items-center gap-6 md:gap-12 sticky top-20 md:top-32">
            <div class="md:w-1/2 flex justify-center md:justify-start">
                <NuxtImg src="/images/waterplast/muestra/Soplado.png" alt="Soplado"
                    class="w-[13.5rem] md:w-[22rem] lg:w-[34.25rem] h-[14.625rem] md:h-[24rem] lg:h-[38rem] object-contain flex-shrink-0" />
            </div>
            <div class="md:w-1/2 flex flex-col gap-2 md:gap-8">
                <div v-for="(caracteristica, index) in caracteristicas" :key="index"
                    class="flex gap-4 transition-all duration-700 ease-out transform" :class="{
                        'opacity-0 translate-y-12': !caracteristica.visible,
                        'opacity-100 translate-y-0': caracteristica.visible
                    }">
                    <NuxtImg :src="caracteristica.img" :alt="caracteristica.titulo" class="w-[4.5rem] lg:w-[6.25rem] h-[4.5rem] lg:h-[6.25rem]" />
                    <div class="flex flex-col gap-1 text-dark">
                        <p class="text-sm lg:text-base font-bold">{{ caracteristica.titulo }}</p>
                        <p class="text-xs lg:text-sm font-medium">{{ caracteristica.texto }}</p>
                    </div>
                </div>
            </div>
        </div>
        </div>
    </DefaultSection>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const caracteristicas = ref([
    {
        titulo: "CIERRE HERMÉTICO",
        texto: "Tapa a rosca de 48 cm con sistema antivuelco. Diseño innovador con filtro UV.",
        img: "/images/waterplast/muestra/Cierre-Hermetico.png",
        visible: false
    },
    {
        titulo: "MANIJA PARA IZAR",
        texto: "Manijas integradas para sujeción fácil y segura.",
        img: "/images/waterplast/muestra/Manija-Izar.png",
        visible: false
    },
    {
        titulo: "CONEXIÓN",
        texto: "Salida integrada en lateral inferior con brida roscada de 11/2\".",
        img: "/images/waterplast/muestra/Conexion.png",
        visible: false
    }
])

const sectionRef = ref(null)
let observer = null

const handleScroll = () => {
    if (!sectionRef.value) return
    
    const sectionRect = sectionRef.value.getBoundingClientRect()
    const sectionHeight = sectionRef.value.offsetHeight
    const viewportHeight = window.innerHeight
    
    const scrollProgress = Math.max(0, Math.min(1, (viewportHeight - sectionRect.top) / (sectionHeight + viewportHeight)))
    
    caracteristicas.value.forEach((caracteristica, index) => {
        const threshold = 0.3 + (index * 0.2)
        caracteristica.visible = scrollProgress >= threshold
    })
}

onMounted(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
    if (observer) observer.disconnect()
})
</script>