<template>
    <div class="w-full relative">
        <button @click="scrollLeftFn"
            class="w-10 h-10 hidden md:flex justify-center items-center absolute z-10 bg-white shadow-md rounded-full top-1/2 -translate-y-1/2 left-0 xxl:-left-6"
            aria-label="Anterior">
            <Icon name="material-symbols:chevron-left-rounded" size="2rem" class="text-primary" />
        </button>

        <div ref="container" class="scrollbar-hide overflow-x-auto cursor-grab select-none md:mx-14"
            :class="isDragging ? 'cursor-grabbing' : ''" @scroll="onScroll" @mousedown="startDrag" @mousemove="drag"
            @mouseup="endDrag" @mouseleave="endDrag" @touchstart="startDrag" @touchmove="drag" @touchend="endDrag">
            <div class="carousel-wrapper flex items-center py-4" :style="wrapperStyles">
                <div v-for="(item, index) in loopedCategorias" :key="`${item.categoria.slug}-${index}`"
                    class="carousel-item flex-shrink-0 transition-all duration-300"
                    :class="[isCenter(index) ? 'opacity-100' : 'opacity-60']" :style="{ width: `${slideWidth}px` }">
                    <NuxtLink :to="ROUTES_NAMES.ROHERMET.CATEGORIA(item.categoria.slug)"
                        class="group relative block rounded-2xl overflow-hidden"
                        :style="{ height: getCardHeight(index) }">
                        <HeadingH3
                            class="absolute top-6 left-0 right-0 z-[2] lg:text-xl text-white font-semibold text-center">
                            {{ item.categoria.nombre }}
                        </HeadingH3>
                        <img v-if="item.categoria.imagen" :src="item.categoria.imagen" :alt="item.categoria.nombre"
                            class="w-full h-full object-cover transition-transform duration-300 lg:group-hover:scale-110" />

                    </NuxtLink>
                </div>
            </div>
        </div>

        <button @click="scrollRightFn"
            class="w-10 h-10 hidden md:flex justify-center items-center absolute z-10 bg-white shadow-md rounded-full top-1/2 -translate-y-1/2 right-0 xxl:-right-6"
            aria-label="Siguiente">
            <Icon name="material-symbols:chevron-right-rounded" size="2rem" class="text-primary" />
        </button>
    </div>
</template>

<script setup>
import { ROUTES_NAMES } from '~/constants/ROUTE_NAMES'

const props = defineProps({
    categorias: {
        type: Array,
        required: true
    },
    gap: {
        type: Number,
        default: 16
    },
    slidesPerView: {
        type: Object,
        default: () => ({
            base: 1.5,
            sm: 2.5,
            md: 3,
            lg: 3,
            xl: 5,
            xxl: 5,
        })
    }
})

const container = ref(null)

const isDragging = ref(false)
const containerWidth = ref(0)
const currentBreakpoint = ref('base')
const centerIndex = ref(0)

let startX = 0
let startY = 0
let scrollStart = 0
let resizeObserver = null
let isDragHorizontal = false
let hasScrollStarted = false

const cloneCount = 3

const loopedCategorias = computed(() => {
    if (!props.categorias.length) return []

    const items = props.categorias
    const clones = items.slice(-cloneCount).map(cat => ({ categoria: cat, isClone: true }))
    const clonesEnd = items.slice(0, cloneCount).map(cat => ({ categoria: cat, isClone: true }))
    const originals = items.map(cat => ({ categoria: cat, isClone: false }))

    return [...clones, ...originals, ...clonesEnd]
})

const slidesVisible = computed(() => {
    return props.slidesPerView[currentBreakpoint.value] || props.slidesPerView.base
})

const slideWidth = computed(() => {
    if (!containerWidth.value) return 200
    const totalGaps = (slidesVisible.value - 1) * props.gap
    return (containerWidth.value - totalGaps) / slidesVisible.value
})

const sidePadding = computed(() => {
    if (!containerWidth.value) return 0
    return (containerWidth.value - slideWidth.value) / 2
})

const wrapperStyles = computed(() => ({
    gap: `${props.gap}px`,
    paddingLeft: `${sidePadding.value}px`,
    paddingRight: `${sidePadding.value}px`,
}))

const isCenter = (index) => {
    return index === centerIndex.value
}

const getCardHeight = (index) => {
    const distance = Math.abs(index - centerIndex.value)
    const isXl = ['xl', 'xxl'].includes(currentBreakpoint.value)
    const isLg = currentBreakpoint.value === 'lg'

    if (distance === 0) {
        return isLg || isXl ? '20rem' : '15.5rem'
    }

    if (isXl) {
        if (distance === 1) return '17.5rem'
        return '15rem'
    }

    return isLg ? '17.5rem' : '13rem'
}

const updateCenterIndex = () => {
    if (!container.value) return

    const scrollLeft = container.value.scrollLeft
    const itemWidth = slideWidth.value + props.gap

    const newCenterIndex = Math.round(scrollLeft / itemWidth)
    centerIndex.value = Math.max(0, Math.min(newCenterIndex, loopedCategorias.value.length - 1))
}

let isJumping = false

const checkLoop = () => {
    if (!container.value || isJumping || !props.categorias.length) return

    const scrollLeft = container.value.scrollLeft
    const itemWidth = slideWidth.value + props.gap
    const totalOriginals = props.categorias.length
    const maxScroll = (cloneCount + totalOriginals) * itemWidth

    if (scrollLeft <= itemWidth * 0.5) {
        isJumping = true
        container.value.scrollLeft = scrollLeft + totalOriginals * itemWidth
        setTimeout(() => { isJumping = false }, 50)
    } else if (scrollLeft >= maxScroll - itemWidth * 0.5) {
        isJumping = true
        container.value.scrollLeft = scrollLeft - totalOriginals * itemWidth
        setTimeout(() => { isJumping = false }, 50)
    }
}

const updateBreakpoint = () => {
    if (import.meta.server) return

    const width = window.innerWidth
    let newBreakpoint = 'base'

    if (width >= 1440) newBreakpoint = 'xxl'
    else if (width >= 1280) newBreakpoint = 'xl'
    else if (width >= 1080) newBreakpoint = 'lg'
    else if (width >= 768) newBreakpoint = 'md'
    else if (width >= 480) newBreakpoint = 'sm'

    currentBreakpoint.value = newBreakpoint
}

const updateContainerWidth = () => {
    if (!container.value) return
    containerWidth.value = container.value.getBoundingClientRect().width
}

const onScroll = () => {
    updateCenterIndex()
    checkLoop()
}

const scrollLeftFn = () => {
    if (!container.value) return
    container.value.scrollBy({
        left: -(slideWidth.value + props.gap),
        behavior: 'smooth'
    })
}

const scrollRightFn = () => {
    if (!container.value) return
    container.value.scrollBy({
        left: slideWidth.value + props.gap,
        behavior: 'smooth'
    })
}

const startDrag = (e) => {
    isDragging.value = true
    hasScrollStarted = false
    isDragHorizontal = false

    startX = e.pageX || e.touches[0].pageX
    startY = e.pageY || e.touches[0].pageY
    scrollStart = container.value.scrollLeft

    if (e.type === 'mousedown') {
        e.preventDefault()
    }
}

const drag = (e) => {
    if (!isDragging.value) return

    const x = e.pageX || e.touches[0].pageX
    const y = e.pageY || e.touches[0].pageY

    const deltaX = Math.abs(x - startX)
    const deltaY = Math.abs(y - startY)

    if (!hasScrollStarted && (deltaX > 5 || deltaY > 5)) {
        hasScrollStarted = true
        isDragHorizontal = deltaX > deltaY
    }

    if (hasScrollStarted && isDragHorizontal) {
        e.preventDefault()
        const walk = (x - startX) * 1.2
        container.value.scrollLeft = scrollStart - walk
    } else if (hasScrollStarted && !isDragHorizontal) {
        endDrag()
    }
}

const endDrag = () => {
    isDragging.value = false
    hasScrollStarted = false
    isDragHorizontal = false
}

const initialize = async () => {
    await nextTick()
    updateBreakpoint()
    updateContainerWidth()

    if (container.value && props.categorias.length) {
        const itemWidth = slideWidth.value + props.gap
        container.value.scrollLeft = cloneCount * itemWidth
    }

    updateCenterIndex()
}

watch(() => props.categorias, (newVal) => {
    if (newVal.length) {
        nextTick(() => {
            initialize()
        })
    }
}, { immediate: false })

onMounted(() => {
    if (props.categorias.length) {
        initialize()
    }

    let resizeTimeout
    const debouncedResize = () => {
        clearTimeout(resizeTimeout)
        resizeTimeout = setTimeout(() => {
            updateBreakpoint()
            updateContainerWidth()
            updateCenterIndex()
        }, 150)
    }

    window.addEventListener('resize', debouncedResize)

    if (container.value && window.ResizeObserver) {
        resizeObserver = new ResizeObserver(() => {
            updateContainerWidth()
            updateCenterIndex()
        })
        resizeObserver.observe(container.value)
    }
})

onUnmounted(() => {
    if (resizeObserver) {
        resizeObserver.disconnect()
    }
})
</script>

<style scoped>
.scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
    display: none;
}
</style>
