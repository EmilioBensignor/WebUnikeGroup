<template>
    <DefaultSection>
        <HeadingH2 class="hidden md:block text-center text-primary mt-8 md:mb-3 lg:mt-12 lg:mb-0 xxl:mt-16">
            Desarrollados por personas para personas</HeadingH2>
        <div
            class="w-full max-w-[1304px] flex flex-col md:flex-row md:gap-8 xxl:gap-16 md:p-8 lg:py-12 xxl:py-16 xxl:px-0">
            <div
                class="md:w-72 lg:w-[19.75rem] xxl:w-[20.75rem] flex flex-col flex-shrink-0 gap-3 lg:gap-4 py-6 px-4 md:p-0">
                <div
                    class="flex flex-col gap-3 bg-gray-light rounded-[18px] shadow-md shadow-black/30 text-terciary p-4 lg:p-6">
                    <p class="text-sm lg:text-xl font-bold"><span>{{ filtrosAplicados.length }}</span> Filtros aplicados
                    </p>
                    <div class="flex flex-wrap items-center gap-2">
                        <span v-for="(filtro, index) in filtrosAplicados" :key="index"
                            class="flex items-center gap-2 border border-terciary rounded-full text-sm font-medium p-2 pl-3">
                            {{ filtro }}
                            <button v-if="!(index === 0 && categoriaActual?.nombre === filtro)"
                                @click="removerFiltro(index)"
                                class="w-4 h-4 flex justify-center items-center bg-terciary rounded-full text-white">
                                <Icon name="tabler:x" class="w-3 h-3" />
                            </button>
                        </span>
                    </div>
                    <button @click="limpiarFiltros"
                        class="self-end text-sm lg:text-base text-secondary font-semibold">Limpiar
                        filtros</button>
                </div>
                <div
                    class="flex flex-col gap-3 lg:gap-4 bg-gray-light rounded-[18px] shadow-md shadow-black/30 text-terciary p-4 lg:p-6">
                    <div class="flex justify-between items-center">
                        <p class="font-bold lg:text-xl">Filtros</p>
                        <button @click="toggleFiltros" aria-label="Toggle Filtros Productos"
                            class="w-6 h-6 flex justify-center items-center bg-white rounded-full shadow-md shadow-black/20 text-secondary md:hidden">
                            <Icon name="tabler:chevron-down" class="w-5 h-5 transition-transform duration-200"
                                :class="filtrosAbiertos ? 'rotate-180' : ''" />
                        </button>
                    </div>
                    <Transition enter-active-class="transition-all duration-300 ease-out md:transition-none"
                        enter-from-class="opacity-0 transform -translate-y-2 md:opacity-100 md:transform-none"
                        enter-to-class="opacity-100 transform translate-y-0"
                        leave-active-class="transition-all duration-200 ease-in md:transition-none"
                        leave-from-class="opacity-100 transform translate-y-0"
                        leave-to-class="opacity-0 transform -translate-y-2 md:opacity-100 md:transform-none">
                        <div v-if="filtrosAbiertos || esPantallaGrande" class="flex flex-col gap-6 text-terciary">
                            <div class="flex flex-col gap-4">
                                <!-- Altura -->
                                <div v-if="tieneAlturaFiltro" class="flex flex-col gap-1.5">
                                    <h3 class="text-sm lg:text-base font-bold">Altura</h3>
                                    <div class="flex flex-col gap-1.5">
                                        <label v-for="rango in alturaRangosDisponibles" :key="rango.label"
                                            class="flex items-center justify-between cursor-pointer group">
                                            <span
                                                class="text-xs lg:text-sm text-terciary font-medium group-hover:text-secondary transition-colors">{{
                                                    rango.label }}</span>
                                            <div class="relative inline-flex items-center">
                                                <input :id="`altura-${rango.label}`" :name="`altura-${rango.label}`"
                                                    v-model="filtros.altura[rango.label]" type="checkbox"
                                                    class="sr-only peer">
                                                <div
                                                    class="w-12 h-7 bg-gray-mid peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all after:duration-300 peer-checked:bg-secondary transition-colors duration-300">
                                                </div>
                                            </div>
                                        </label>
                                    </div>
                                </div>

                                <!-- Ancho -->
                                <div v-if="tieneAnchoFiltro" class="flex flex-col gap-1.5">
                                    <label for="ancho" class="text-sm lg:text-base font-bold">Ancho</label>
                                    <div class="relative">
                                        <input id="ancho" name="ancho" v-model="filtros.ancho" type="number"
                                            placeholder="Ingrese un número"
                                            class="w-full bg-gray-light border border-terciary rounded-full text-terciary placeholder:text-gray-dark text-sm font-medium outline-none p-3 pr-12">
                                        <span
                                            class="absolute right-3 top-1/2 transform -translate-y-1/2 text-terciary text-sm">cm</span>
                                    </div>
                                    <p class="text-xs text-gray-dark">Te mostraremos productos con ±10 cm de diferencia.
                                    </p>
                                </div>

                                <!-- Largo -->
                                <div v-if="tieneLargoFiltro" class="flex flex-col gap-1.5">
                                    <label for="largo" class="text-sm lg:text-base font-bold">Largo</label>
                                    <div class="relative">
                                        <input id="largo" name="largo" v-model="filtros.largo" type="number"
                                            placeholder="Ingrese un número"
                                            class="w-full bg-gray-light border border-terciary rounded-full text-terciary placeholder:text-gray-dark text-sm font-medium outline-none p-3 pr-12">
                                        <span
                                            class="absolute right-3 top-1/2 transform -translate-y-1/2 text-terciary text-sm">cm</span>
                                    </div>
                                    <p class="text-xs text-gray-dark">Te mostraremos productos con ±10 cm de diferencia.
                                    </p>
                                </div>

                                <!-- Diámetro -->
                                <div v-if="tieneDiametroFiltro" class="flex flex-col gap-1.5">
                                    <h3 class="text-sm lg:text-base font-bold">Diámetro</h3>
                                    <div class="flex flex-col gap-1.5">
                                        <label v-for="rango in diametroRangosDisponibles" :key="rango.label"
                                            class="flex items-center justify-between cursor-pointer group">
                                            <span
                                                class="text-xs lg:text-sm text-terciary font-medium group-hover:text-secondary transition-colors">{{
                                                    rango.label }}</span>
                                            <div class="relative inline-flex items-center">
                                                <input :id="`diametro-${rango.label}`" :name="`diametro-${rango.label}`"
                                                    v-model="filtros.diametro[rango.label]" type="checkbox"
                                                    class="sr-only peer">
                                                <div
                                                    class="w-12 h-7 bg-gray-mid peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all after:duration-300 peer-checked:bg-secondary transition-colors duration-300">
                                                </div>
                                            </div>
                                        </label>
                                    </div>
                                </div>

                                <!-- Capacidad -->
                                <div v-if="tieneCapacidadFiltro" class="flex flex-col gap-1.5">
                                    <h3 class="text-sm lg:text-base font-bold">Capacidad</h3>
                                    <div class="flex flex-col gap-1.5">
                                        <label v-for="rango in capacidadRangosDisponibles" :key="rango.label"
                                            class="flex items-center justify-between cursor-pointer group">
                                            <span
                                                class="text-xs lg:text-sm text-terciary font-medium group-hover:text-secondary transition-colors">{{
                                                    rango.label }}</span>
                                            <div class="relative inline-flex items-center">
                                                <input :id="`capacidad-${rango.label}`"
                                                    :name="`capacidad-${rango.label}`"
                                                    v-model="filtros.capacidad[rango.label]" type="checkbox"
                                                    class="sr-only peer">
                                                <div
                                                    class="w-12 h-7 bg-gray-mid peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all after:duration-300 peer-checked:bg-secondary transition-colors duration-300">
                                                </div>
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <!-- Filtros de switches -->
                            <div class="flex flex-col gap-4">
                                <!-- Orientación -->
                                <div v-if="tieneOrientacionFiltro" class="flex flex-col gap-1.5">
                                    <h3 class="text-sm lg:text-base font-bold">Orientación</h3>
                                    <div class="flex flex-col gap-1.5">
                                        <label v-for="orientacion in orientacionesDisponibles" :key="orientacion"
                                            class="flex items-center justify-between cursor-pointer group">
                                            <span
                                                class="text-xs lg:text-sm text-terciary font-medium group-hover:text-secondary transition-colors">{{
                                                    orientacion
                                                }}</span>
                                            <div class="relative inline-flex items-center">
                                                <input :id="`orientacion-${orientacion}`"
                                                    :name="`orientacion-${orientacion}`"
                                                    v-model="filtros.orientacion[orientacion]" type="checkbox"
                                                    class="sr-only peer">
                                                <div
                                                    class="w-12 h-7 bg-gray-mid peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all after:duration-300 peer-checked:bg-secondary transition-colors duration-300">
                                                </div>
                                            </div>
                                        </label>
                                    </div>
                                </div>

                                <!-- Color -->
                                <div v-if="tieneColorFiltro" class="flex flex-col gap-1.5">
                                    <h3 class="text-sm lg:text-base font-bold">Color</h3>
                                    <div class="flex flex-col gap-1.5">
                                        <label v-for="color in coloresDisponibles" :key="color"
                                            class="flex items-center justify-between cursor-pointer group">
                                            <span
                                                class="text-xs lg:text-sm text-terciary font-medium group-hover:text-secondary transition-colors">{{
                                                    color
                                                }}</span>
                                            <div class="relative inline-flex items-center">
                                                <input :id="`color-${color}`" :name="`color-${color}`"
                                                    v-model="filtros.color[color]" type="checkbox"
                                                    class="sr-only peer" />
                                                <div
                                                    class="w-12 h-7 bg-gray-mid peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all after:duration-300 peer-checked:bg-secondary transition-colors duration-300">
                                                </div>
                                            </div>
                                        </label>
                                    </div>
                                </div>

                                <!-- Tecnología -->
                                <div v-if="tieneTecnologiaFiltro" class="flex flex-col gap-1.5">
                                    <h3 class="text-sm lg:text-base font-bold">Tecnología</h3>
                                    <div class="flex flex-col gap-1.5">
                                        <label v-for="tech in tecnologiasDisponibles" :key="tech"
                                            class="flex items-center justify-between cursor-pointer group">
                                            <span
                                                class="text-xs lg:text-sm text-terciary font-medium group-hover:text-secondary transition-colors">{{
                                                    tech }}</span>
                                            <div class="relative inline-flex items-center">
                                                <input :id="`tecnologia-${tech}`" :name="`tecnologia-${tech}`"
                                                    v-model="filtros.tecnologia[tech]" type="checkbox"
                                                    class="sr-only peer" />
                                                <div
                                                    class="w-12 h-7 bg-gray-mid peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all after:duration-300 peer-checked:bg-secondary transition-colors duration-300">
                                                </div>
                                            </div>
                                        </label>
                                    </div>
                                </div>

                                <!-- Opción -->
                                <div v-if="tieneOpcionesFiltro" class="flex flex-col gap-1.5">
                                    <h3 class="text-sm lg:text-base font-bold">Opción</h3>
                                    <div class="flex flex-col gap-1.5">
                                        <label v-for="opcion in opcionesDisponibles" :key="opcion"
                                            class="flex items-center justify-between cursor-pointer group">
                                            <span
                                                class="text-xs lg:text-sm text-terciary font-medium group-hover:text-secondary transition-colors">{{
                                                    opcion
                                                }}</span>
                                            <div class="relative inline-flex items-center">
                                                <input :id="`opcion-${opcion}`" :name="`opcion-${opcion}`"
                                                    v-model="filtros.opcion[opcion]" type="checkbox"
                                                    class="sr-only peer" />
                                                <div
                                                    class="w-12 h-7 bg-gray-mid peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all after:duration-300 peer-checked:bg-secondary transition-colors duration-300">
                                                </div>
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Transition>
                </div>
            </div>
            <!-- Resultados -->
            <div class="w-full flex flex-col gap-4 px-4 pb-6 md:p-0">
                <HeadingH2 class="md:hidden text-center text-primary">Desarrollados por personas para personas
                </HeadingH2>
                <div v-if="productosFiltrados.length === 0"
                    class="flex flex-col items-center text-center gap-4 lg:gap-5 xxl:gap-6 bg-gray-blue rounded-lg p-3 md:p-5 lg:p-6 xxl:p-8">
                    <p class="text-sm lg:text-base xxl:text-xl font-bold">No hay productos que coincidan con tu
                        búsqueda.</p>
                    <ButtonSecondary @click="limpiarFiltros">
                        Limpiar filtros
                    </ButtonSecondary>
                    <p class="text-xs lg:text-sm xxl:text-base font-medium">O <NuxtLink
                            :to="`tel:${ROUTES_NAMES.CONTACTO.TELEFONO}`" class="text-primary underline">ponete en
                            contacto</NuxtLink> con nosotros.</p>
                </div>
                <div v-else class="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6 md:gap-2 lg:gap-x-6 lg:gap-y-4">
                    <WaterplastCategoriaCard v-for="producto in productosVisibles" :key="producto.id"
                        :producto="producto" />
                </div>
                <div v-if="hayMasProductos" class="flex justify-center mt-6">
                    <ButtonSecondary @click="cargarMasProductos" class="px-6 lg:px-12">
                        Cargar más productos
                    </ButtonSecondary>
                </div>
            </div>
        </div>
    </DefaultSection>
</template>

<script setup>
import { ROUTES_NAMES } from '~/constants/ROUTE_NAMES'

const props = defineProps({
    categoriaActual: Object,
    productos: {
        type: Array,
        default: () => []
    }
})

const filtrosAbiertos = ref(false)
const esPantallaGrande = ref(false)
const productosPorPagina = 20
const paginaActual = ref(1)

const actualizarTamanoPantalla = () => {
    esPantallaGrande.value = window.innerWidth >= 768
}

onMounted(() => {
    actualizarTamanoPantalla()
    window.addEventListener('resize', actualizarTamanoPantalla)
})

onUnmounted(() => {
    window.removeEventListener('resize', actualizarTamanoPantalla)
})

const alturaRangos = [
    { label: 'Menos de 0.80 m', min: 0, max: 80 },
    { label: 'Entre 0.80 y 1.10 m', min: 80, max: 110 },
    { label: 'Entre 1.10 y 1.50 m', min: 110, max: 150 },
    { label: 'Entre 1.50 y 1.80 m', min: 150, max: 180 },
    { label: 'Entre 1.80 y 2.20 m', min: 180, max: 220 },
    { label: 'Más de 2.20 m', min: 220, max: Infinity }
]

const diametroRangos = [
    { label: 'Menos de 80 cm', min: 0, max: 80 },
    { label: 'Entre 80 y 100 cm', min: 80, max: 100 },
    { label: 'Entre 100 y 120 cm', min: 100, max: 120 },
    { label: 'Entre 120 y 150 cm', min: 120, max: 150 },
    { label: 'Entre 150 y 200 cm', min: 150, max: 200 },
    { label: 'Más de 200 cm', min: 200, max: Infinity }
]

const capacidadRangos = [
    { label: 'Menos de 300 lts', min: 0, max: 300 },
    { label: 'Entre 300 y 600 lts', min: 300, max: 600 },
    { label: 'Entre 600 y 1100 lts', min: 600, max: 1100 },
    { label: 'Entre 1100 y 2000 lts', min: 1100, max: 2000 },
    { label: 'Entre 2000 y 5000 lts', min: 2000, max: 5000 },
    { label: 'Más de 5000 lts', min: 5000, max: Infinity }
]

const filtros = ref({
    altura: {
        'Menos de 0.80 m': false,
        'Entre 0.80 y 1.10 m': false,
        'Entre 1.10 y 1.50 m': false,
        'Entre 1.50 y 1.80 m': false,
        'Entre 1.80 y 2.20 m': false,
        'Más de 2.20 m': false
    },
    ancho: '',
    largo: '',
    diametro: {
        'Menos de 80 cm': false,
        'Entre 80 y 100 cm': false,
        'Entre 100 y 120 cm': false,
        'Entre 120 y 150 cm': false,
        'Entre 150 y 200 cm': false,
        'Más de 200 cm': false
    },
    capacidad: {
        'Menos de 300 lts': false,
        'Entre 300 y 600 lts': false,
        'Entre 600 y 1100 lts': false,
        'Entre 1100 y 2000 lts': false,
        'Entre 2000 y 5000 lts': false,
        'Más de 5000 lts': false
    },
    orientacion: {
        'Vertical': false,
        'Horizontal': false
    },
    color: {
        'Arena': false,
        'Negro': false,
        'Celeste': false,
        'Gris': false,
        'Blanco': false,
        'Rojo': false,
        'Azul': false,
        'Verde': false,
        'Naranja': false
    },
    tecnologia: {
        'Soplado': false,
        'Rotomoldeo': false,
        'Soldadura': false,
        'Inyección': false
    },
    opcion: {
        'Para exteriores': false,
        'Es cisterna': false
    }
})

// Computed properties para determinar qué filtros mostrar
const alturaRangosDisponibles = computed(() => {
    if (!props.productos?.length) return []

    return alturaRangos.filter(rango => {
        return props.productos.some(producto => {
            if (producto.altura_cm == null) return false
            const altura = parseFloat(producto.altura_cm)
            return !isNaN(altura) && altura >= rango.min && altura < rango.max
        })
    })
})

const tieneAlturaFiltro = computed(() => alturaRangosDisponibles.value.length > 0)

const tieneAnchoFiltro = computed(() => {
    if (!props.productos?.length) return false
    return props.productos.some(producto => producto.ancho_cm != null && !isNaN(parseFloat(producto.ancho_cm)))
})

const tieneLargoFiltro = computed(() => {
    if (!props.productos?.length) return false
    return props.productos.some(producto => producto.largo_cm != null && !isNaN(parseFloat(producto.largo_cm)))
})

const diametroRangosDisponibles = computed(() => {
    if (!props.productos?.length) return []

    return diametroRangos.filter(rango => {
        return props.productos.some(producto => {
            if (producto.diametro_cm == null) return false
            const diametro = parseFloat(producto.diametro_cm)
            return !isNaN(diametro) && diametro >= rango.min && diametro < rango.max
        })
    })
})

const tieneDiametroFiltro = computed(() => diametroRangosDisponibles.value.length > 0)

const capacidadRangosDisponibles = computed(() => {
    if (!props.productos?.length) return []

    return capacidadRangos.filter(rango => {
        return props.productos.some(producto => {
            if (producto.capacidad_lts == null) return false
            const capacidad = parseFloat(producto.capacidad_lts)
            return !isNaN(capacidad) && capacidad >= rango.min && capacidad < rango.max
        })
    })
})

const tieneCapacidadFiltro = computed(() => capacidadRangosDisponibles.value.length > 0)

const orientacionesDisponibles = computed(() => {
    if (!props.productos?.length) return []

    const orientacionesUnicas = new Set()
    props.productos.forEach(producto => {
        if (producto.orientacion) {
            const orientacion = producto.orientacion.charAt(0).toUpperCase() + producto.orientacion.slice(1).toLowerCase()
            orientacionesUnicas.add(orientacion)
        }
    })

    return Array.from(orientacionesUnicas)
})

const tieneOrientacionFiltro = computed(() => orientacionesDisponibles.value.length > 1)

const coloresDisponibles = computed(() => {
    if (!props.productos?.length) return []

    const coloresUnicos = new Set()
    props.productos.forEach(producto => {
        if (producto.color) {
            const color = producto.color.charAt(0).toUpperCase() + producto.color.slice(1).toLowerCase()
            coloresUnicos.add(color)
        }
    })

    return Array.from(coloresUnicos)
})

const tieneColorFiltro = computed(() => coloresDisponibles.value.length > 1)

const tecnologiasDisponibles = computed(() => {
    if (!props.productos?.length) return []

    const tecnologiasUnicas = new Set()
    props.productos.forEach(producto => {
        if (producto.tecnologia) {
            const tecnologia = producto.tecnologia.charAt(0).toUpperCase() + producto.tecnologia.slice(1).toLowerCase()
            tecnologiasUnicas.add(tecnologia)
        }
    })

    return Array.from(tecnologiasUnicas)
})

const tieneTecnologiaFiltro = computed(() => tecnologiasDisponibles.value.length > 1)

const opcionesDisponibles = computed(() => {
    if (!props.productos?.length) return []

    const opcionesArr = []
    const tieneExteriores = props.productos.some(p => p.opcion === 'para_exteriores')
    const tieneCisterna = props.productos.some(p => p.opcion === 'es_cisterna')

    if (tieneExteriores) opcionesArr.push('Para exteriores')
    if (tieneCisterna) opcionesArr.push('Es cisterna')

    return opcionesArr
})

const tieneOpcionesFiltro = computed(() => opcionesDisponibles.value.length > 1)

const filtrosAplicados = computed(() => {
    const aplicados = []

    if (props.categoriaActual?.nombre) {
        aplicados.push(props.categoriaActual.nombre)
    }

    Object.keys(filtros.value.altura).forEach(rango => {
        if (filtros.value.altura[rango]) {
            aplicados.push(rango)
        }
    })

    if (filtros.value.ancho) aplicados.push(`Ancho: ${filtros.value.ancho}cm`)
    if (filtros.value.largo) aplicados.push(`Largo: ${filtros.value.largo}cm`)

    Object.keys(filtros.value.diametro).forEach(rango => {
        if (filtros.value.diametro[rango]) {
            aplicados.push(rango)
        }
    })

    Object.keys(filtros.value.capacidad).forEach(rango => {
        if (filtros.value.capacidad[rango]) {
            aplicados.push(rango)
        }
    })

    Object.keys(filtros.value.orientacion).forEach(orientacion => {
        if (filtros.value.orientacion[orientacion]) {
            aplicados.push(orientacion)
        }
    })

    Object.keys(filtros.value.color).forEach(color => {
        if (filtros.value.color[color]) {
            aplicados.push(color)
        }
    })

    Object.keys(filtros.value.tecnologia).forEach(tech => {
        if (filtros.value.tecnologia[tech]) {
            aplicados.push(tech)
        }
    })

    Object.keys(filtros.value.opcion).forEach(opcion => {
        if (filtros.value.opcion[opcion]) {
            aplicados.push(opcion)
        }
    })

    return aplicados
})

const productosFiltrados = computed(() => {
    if (!props.productos?.length) return []

    const filtrados = props.productos.filter(producto => {
        const alturaRangosSeleccionados = Object.keys(filtros.value.altura).filter(rango => filtros.value.altura[rango])
        if (alturaRangosSeleccionados.length > 0) {
            if (producto.altura_cm == null) return false
            const productoAltura = parseFloat(producto.altura_cm)
            if (isNaN(productoAltura)) return false

            const cumpleAlguno = alturaRangosSeleccionados.some(rangoLabel => {
                const rango = alturaRangos.find(r => r.label === rangoLabel)
                return productoAltura >= rango.min && productoAltura < rango.max
            })
            if (!cumpleAlguno) return false
        }

        const ancho = filtros.value.ancho ? parseFloat(filtros.value.ancho) : null
        if (ancho) {
            if (producto.ancho_cm == null) return false
            const productoAncho = parseFloat(producto.ancho_cm)
            if (isNaN(productoAncho) || Math.abs(productoAncho - ancho) > 10) return false
        }

        const largo = filtros.value.largo ? parseFloat(filtros.value.largo) : null
        if (largo) {
            if (producto.largo_cm == null) return false
            const productoLargo = parseFloat(producto.largo_cm)
            if (isNaN(productoLargo) || Math.abs(productoLargo - largo) > 10) return false
        }

        const diametroRangosSeleccionados = Object.keys(filtros.value.diametro).filter(rango => filtros.value.diametro[rango])
        if (diametroRangosSeleccionados.length > 0) {
            if (producto.diametro_cm == null) return false
            const productoDiametro = parseFloat(producto.diametro_cm)
            if (isNaN(productoDiametro)) return false

            const cumpleAlguno = diametroRangosSeleccionados.some(rangoLabel => {
                const rango = diametroRangos.find(r => r.label === rangoLabel)
                return productoDiametro >= rango.min && productoDiametro < rango.max
            })
            if (!cumpleAlguno) return false
        }

        const capacidadRangosSeleccionados = Object.keys(filtros.value.capacidad).filter(rango => filtros.value.capacidad[rango])
        if (capacidadRangosSeleccionados.length > 0) {
            if (producto.capacidad_lts == null) return false
            const productoCapacidad = parseFloat(producto.capacidad_lts)
            if (isNaN(productoCapacidad)) return false

            const cumpleAlguno = capacidadRangosSeleccionados.some(rangoLabel => {
                const rango = capacidadRangos.find(r => r.label === rangoLabel)
                return productoCapacidad >= rango.min && productoCapacidad < rango.max
            })
            if (!cumpleAlguno) return false
        }

        const orientacionesSeleccionadas = Object.keys(filtros.value.orientacion).filter(orientacion => filtros.value.orientacion[orientacion])
        if (orientacionesSeleccionadas.length > 0) {
            if (!producto.orientacion || !orientacionesSeleccionadas.map(o => o.toLowerCase()).includes(producto.orientacion)) {
                return false
            }
        }

        const coloresSeleccionados = Object.keys(filtros.value.color).filter(color => filtros.value.color[color])
        if (coloresSeleccionados.length > 0) {
            if (!producto.color || !coloresSeleccionados.map(c => c.toLowerCase()).includes(producto.color)) {
                return false
            }
        }

        const tecnologiasSeleccionadas = Object.keys(filtros.value.tecnologia).filter(tech => filtros.value.tecnologia[tech])
        if (tecnologiasSeleccionadas.length > 0) {
            if (!producto.tecnologia || !tecnologiasSeleccionadas.map(t => t.toLowerCase()).includes(producto.tecnologia)) {
                return false
            }
        }

        const opcionesSeleccionadas = Object.keys(filtros.value.opcion).filter(opcion => filtros.value.opcion[opcion])
        if (opcionesSeleccionadas.length > 0) {
            const cumpleOpcion = opcionesSeleccionadas.some(opcion => {
                if (opcion === 'Para exteriores') return producto.opcion === 'para_exteriores'
                if (opcion === 'Es cisterna') return producto.opcion === 'es_cisterna'
                return false
            })
            if (!cumpleOpcion) return false
        }

        return true
    })

    // Ordenar por litraje (capacidad) de menor a mayor
    return filtrados.sort((a, b) => {
        const capacidadA = parseFloat(a.capacidad_lts) || 0
        const capacidadB = parseFloat(b.capacidad_lts) || 0
        return capacidadA - capacidadB
    })
})

const productosVisibles = computed(() => {
    const totalProductos = paginaActual.value * productosPorPagina
    return productosFiltrados.value.slice(0, totalProductos)
})

const hayMasProductos = computed(() => {
    return productosFiltrados.value.length > paginaActual.value * productosPorPagina
})

const cargarMasProductos = () => {
    paginaActual.value++
}

watch(productosFiltrados, () => {
    paginaActual.value = 1
})

const toggleFiltros = () => {
    filtrosAbiertos.value = !filtrosAbiertos.value
}


const limpiarFiltros = () => {
    filtros.value = {
        altura: {
            'Menos de 0.80 m': false,
            'Entre 0.80 y 1.10 m': false,
            'Entre 1.10 y 1.50 m': false,
            'Entre 1.50 y 1.80 m': false,
            'Entre 1.80 y 2.20 m': false,
            'Más de 2.20 m': false
        },
        ancho: '',
        largo: '',
        diametro: {
            'Menos de 80 cm': false,
            'Entre 80 y 100 cm': false,
            'Entre 100 y 120 cm': false,
            'Entre 120 y 150 cm': false,
            'Entre 150 y 200 cm': false,
            'Más de 200 cm': false
        },
        capacidad: {
            'Menos de 300 lts': false,
            'Entre 300 y 600 lts': false,
            'Entre 600 y 1100 lts': false,
            'Entre 1100 y 2000 lts': false,
            'Entre 2000 y 5000 lts': false,
            'Más de 5000 lts': false
        },
        orientacion: {
            'Vertical': false,
            'Horizontal': false
        },
        color: {
            'Arena': false,
            'Negro': false,
            'Celeste': false,
            'Gris': false,
            'Blanco': false,
            'Rojo': false,
            'Azul': false,
            'Verde': false,
            'Naranja': false
        },
        tecnologia: {
            'Soplado': false,
            'Rotomoldeo': false,
            'Soldadura': false,
            'Inyección': false
        },
        opcion: {
            'Para exteriores': false,
            'Es cisterna': false
        }
    }
}

const removerFiltro = (index) => {
    const filtro = filtrosAplicados.value[index]

    if (filtros.value.altura.hasOwnProperty(filtro)) {
        filtros.value.altura[filtro] = false
    }
    else if (filtro.includes('Ancho:')) filtros.value.ancho = ''
    else if (filtro.includes('Largo:')) filtros.value.largo = ''
    else if (filtros.value.diametro.hasOwnProperty(filtro)) {
        filtros.value.diametro[filtro] = false
    }
    else if (filtros.value.capacidad.hasOwnProperty(filtro)) {
        filtros.value.capacidad[filtro] = false
    }
    else if (orientaciones.includes(filtro)) {
        filtros.value.orientacion[filtro] = false
    }
    else if (colores.includes(filtro)) {
        filtros.value.color[filtro] = false
    }
    else if (tecnologias.includes(filtro)) {
        filtros.value.tecnologia[filtro] = false
    }
    else if (opciones.includes(filtro)) {
        filtros.value.opcion[filtro] = false
    }
}
</script>