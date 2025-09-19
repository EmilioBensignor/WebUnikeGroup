<template>
    <DefaultSection
        class="relative h-[250vh] md:h-[150vh] lg:h-[300vh] pt-2 px-4 pb-6 md:px-8 md:py-8 xxl:py-16 lg:px-16">
        <div ref="sectionRef" class="h-full">
            <div class="hidden xxl:max-w-[1304px] xxl:flex flex-row justify-between items-center gap-12 sticky top-32">
                <div class="w-[22.125rem] flex flex-col gap-8">
                    <div v-for="(capa, index) in capas" :key="index"
                        class="flex gap-4 transition-all duration-700 ease-out transform" :class="{
                            'opacity-0 translate-y-12': !capa.visible,
                            'opacity-100 translate-y-0': capa.visible
                        }">
                        <div class="w-[6.25rem] h-[6.25rem] flex justify-center items-center rounded-full flex-shrink-0"
                            :class="{ 'border border-dark': index === 0 }"
                            :style="{ backgroundColor: capa.fondo, color: capa.color }">
                            <p class="text-[1.75rem] font-bold">{{ index + 1 }}</p>
                        </div>
                        <div class="flex flex-col justify-center gap-1 text-dark">
                            <p class="text-base font-bold">{{ capa.titulo }}</p>
                            <p class="text-sm font-medium">{{ capa.texto }}</p>
                        </div>
                    </div>
                </div>
                <div class="flex justify-center md:justify-start">
                    <NuxtImg 
                        src="/images/waterplast/muestra/Render_soplado.webp" 
                        alt="Waterplast"
                        class="w-[35.75rem] h-[39.5rem] object-contain flex-shrink-0" />
                </div>
                <div class="w-[22.125rem] flex flex-col gap-8">
                    <div v-for="(caracteristica, index) in caracteristicas" :key="index"
                        class="flex gap-4 transition-all duration-700 ease-out transform" :class="{
                            'opacity-0 translate-y-12': !caracteristica.visible,
                            'opacity-100 translate-y-0': caracteristica.visible
                        }">
                        <NuxtImg :src="caracteristica.img" :alt="caracteristica.titulo"
                            class="w-[6.25rem] h-[6.25rem]" />
                        <div class="flex flex-col justify-center gap-1 text-dark">
                            <p class="text-base font-bold">{{ caracteristica.titulo }}</p>
                            <p class="text-sm font-medium">{{ caracteristica.texto }}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="flex xxl:hidden flex-col md:flex-row items-center gap-12 sticky top-32">
                <div class="md:w-1/2 flex justify-center md:justify-start">
                    <NuxtImg src="/images/waterplast/muestra/Render_soplado.webp" alt="Soplado"
                        class="w-[13.5rem] md:w-[22rem] lg:w-[34.25rem] h-[14.625rem] md:h-[24rem] lg:h-[38rem] object-contain flex-shrink-0" />
                </div>
                <div class="md:w-1/2 flex flex-col gap-2 md:gap-8">
                    <div v-for="(caracteristica, index) in caracteristicas" :key="index"
                        class="flex gap-4 transition-all duration-700 ease-out transform" :class="{
                            'opacity-0 translate-y-12': !caracteristica.visible,
                            'opacity-100 translate-y-0': caracteristica.visible
                        }">
                        <NuxtImg :src="caracteristica.img" :alt="caracteristica.titulo"
                            class="w-[4.5rem] lg:w-[6.25rem] h-[4.5rem] lg:h-[6.25rem]" />
                        <div class="flex justify-center flex-col gap-1 text-dark">
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
const caracteristicas = ref([
    {
        titulo: "CIERRE HERMÉTICO",
        texto: "Tapa a rosca de 48 cm con sistema antivuelco. Diseño innovador con filtro UV.",
        img: "/images/waterplast/muestra/tapa.webp",
        visible: false
    },
    {
        titulo: "MANIJA PARA IZAR",
        texto: "Manijas integradas para sujeción fácil y segura.",
        img: "/images/waterplast/muestra/manija.webp",
        visible: false
    },
    {
        titulo: "CONEXIÓN",
        texto: "Salida integrada en lateral inferior con brida roscada de 11/2.",
        img: "/images/waterplast/muestra/conexion.webp",
        visible: false
    }
])

const capas = ref([
    {
        titulo: "CAPA INTERNA BLANCO",
        texto: "Con recubrimiento antibacteriano (inhibe la producción de bacterias).",
        fondo: "#FFFFFF",
        color: "#010101",
        visible: false
    },
    {
        titulo: "CAPA INTERMEDIA NEGRA",
        texto: "Con filtro UV. Impide la entrada de luz exterior evitando la formación de microorganismos en su interior.",
        fondo: "#010101",
        color: "#FFFFFF",
        visible: false
    },
    {
        titulo: "CAPA EXTERNA BEIGE",
        texto: "Asegura la funcionalidad del tanque por más tiempo.",
        fondo: "#C7B299",
        color: "#010101",
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

    const maxLength = Math.max(caracteristicas.value.length, capas.value.length)

    for (let i = 0; i < maxLength; i++) {
        const threshold = 0.2 + (i * 0.25)

        if (caracteristicas.value[i]) {
            caracteristicas.value[i].visible = scrollProgress >= threshold
        }

        if (capas.value[i]) {
            capas.value[i].visible = scrollProgress >= threshold
        }
    }
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