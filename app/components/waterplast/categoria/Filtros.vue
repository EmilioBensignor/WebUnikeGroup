<template>
    <DefaultSection>
        <HeadingH2 class="hidden md:block text-center text-primary mt-8 md:mb-3 lg:mt-12 lg:mb-0 xxl:mt-16">Desarrollados por personas para personas</HeadingH2>
        <div class="w-full max-w-[1304px] flex flex-col md:flex-row md:gap-8 xxl:gap-16 md:p-8 lg:py-12 xxl:py-16 xxl:px-0">
            <div class="md:w-72 lg:w-[19.75rem] xxl:w-[20.75rem] flex flex-col flex-shrink-0 gap-3 lg:gap-4 py-6 px-4 md:p-0">
                <div
                    class="flex flex-col gap-3 bg-gray-light rounded-[18px] shadow-md shadow-black/30 text-terciary p-4 lg:p-6">
                    <p class="text-sm lg:text-xl font-bold"><span>{{ filtrosAplicados.length }}</span> Filtros aplicados</p>
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
                    <button @click="limpiarFiltros" class="self-end text-sm lg:text-base text-secondary font-semibold">Limpiar
                        filtros</button>
                </div>
                <div
                    class="flex flex-col gap-3 lg:gap-4 bg-gray-light rounded-[18px] shadow-md shadow-black/30 text-terciary p-4 lg:p-6">
                    <div class="flex justify-between items-center">
                        <p class="font-bold lg:text-xl">Filtros</p>
                        <button @click="toggleFiltros"
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
                                <div class="flex flex-col gap-1.5">
                                    <label for="altura" class="text-sm lg:text-base font-bold">Altura</label>
                                    <div class="relative">
                                        <input id="altura" name="altura" v-model="filtros.altura" type="number"
                                            placeholder="Ingrese un número"
                                            class="w-full bg-gray-light border border-terciary rounded-full text-terciary placeholder:text-gray-dark text-sm font-medium outline-none p-3 pr-12">
                                        <span
                                            class="absolute right-3 top-1/2 transform -translate-y-1/2 text-terciary text-sm">cm</span>
                                    </div>
                                    <p class="text-xs text-gray-dark">Te mostraremos productos con ±10 cm de diferencia.
                                    </p>
                                </div>

                                <!-- Ancho -->
                                <div class="flex flex-col gap-1.5">
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
                                <div class="flex flex-col gap-1.5">
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
                                <div class="flex flex-col gap-1.5">
                                    <label for="diametro" class="text-sm lg:text-base font-bold">Diámetro</label>
                                    <div class="relative">
                                        <input id="diametro" name="diametro" v-model="filtros.diametro" type="number"
                                            placeholder="Ingrese un número"
                                            class="w-full bg-gray-light border border-terciary rounded-full text-terciary placeholder:text-gray-dark text-sm font-medium outline-none p-3 pr-12">
                                        <span
                                            class="absolute right-3 top-1/2 transform -translate-y-1/2 text-terciary text-sm">cm</span>
                                    </div>
                                    <p class="text-xs text-gray-dark">Te mostraremos productos con ±10 cm de diferencia.
                                    </p>
                                </div>

                                <!-- Capacidad -->
                                <div class="flex flex-col gap-1.5">
                                    <label for="capacidad" class="text-sm lg:text-base font-bold">Capacidad</label>
                                    <div class="relative">
                                        <input id="capacidad" name="capacidad" v-model="filtros.capacidad" type="number"
                                            placeholder="Ingrese un número"
                                            class="w-full bg-gray-light border border-terciary rounded-full text-terciary placeholder:text-gray-dark text-sm font-medium outline-none p-3 pr-12">
                                        <span
                                            class="absolute right-3 top-1/2 transform -translate-y-1/2 text-terciary text-sm">lts</span>
                                    </div>
                                    <p class="text-xs text-gray-dark">Te mostraremos productos con ±10 cm de diferencia.
                                    </p>
                                </div>
                            </div>

                            <!-- Filtros de switches -->
                            <div class="flex flex-col gap-4">
                                <!-- Orientación -->
                                <div class="flex flex-col gap-1.5">
                                    <h3 class="text-sm lg:text-base font-bold">Orientación</h3>
                                    <div class="flex flex-col gap-1.5">
                                        <div v-for="orientacion in orientaciones" :key="orientacion"
                                            class="flex items-center justify-between">
                                            <span class="text-xs lg:text-sm text-terciary font-medium">{{ orientacion }}</span>
                                            <label class="relative inline-flex items-center cursor-pointer">
                                                <input :id="`orientacion-${orientacion}`"
                                                    :name="`orientacion-${orientacion}`"
                                                    v-model="filtros.orientacion[orientacion]" type="checkbox"
                                                    class="sr-only peer">
                                                <div
                                                    class="w-12 h-7 bg-gray-mid peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all after:duration-300 peer-checked:bg-secondary transition-colors duration-300">
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <!-- Color -->
                                <div class="flex flex-col gap-1.5">
                                    <h3 class="text-sm lg:text-base font-bold">Color</h3>
                                    <div class="flex flex-col gap-1.5">
                                        <div v-for="color in colores" :key="color"
                                            class="flex items-center justify-between">
                                            <span class="text-xs lg:text-sm text-terciary font-medium">{{ color }}</span>
                                            <label class="relative inline-flex items-center cursor-pointer">
                                                <input :id="`color-${color}`" :name="`color-${color}`"
                                                    v-model="filtros.color[color]" type="checkbox"
                                                    class="sr-only peer" />
                                                <div
                                                    class="w-12 h-7 bg-gray-mid peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all after:duration-300 peer-checked:bg-secondary transition-colors duration-300">
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <!-- Tecnología -->
                                <div class="flex flex-col gap-1.5">
                                    <h3 class="text-sm lg:text-base font-bold">Tecnología</h3>
                                    <div class="flex flex-col gap-1.5">
                                        <div v-for="tech in tecnologias" :key="tech"
                                            class="flex items-center justify-between">
                                            <span class="text-xs lg:text-sm text-terciary font-medium">{{ tech }}</span>
                                            <label class="relative inline-flex items-center cursor-pointer">
                                                <input :id="`tecnologia-${tech}`" :name="`tecnologia-${tech}`"
                                                    v-model="filtros.tecnologia[tech]" type="checkbox"
                                                    class="sr-only peer" />
                                                <div
                                                    class="w-12 h-7 bg-gray-mid peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all after:duration-300 peer-checked:bg-secondary transition-colors duration-300">
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <!-- Opción -->
                                <div class="flex flex-col gap-1.5">
                                    <h3 class="text-sm lg:text-base font-bold">Opción</h3>
                                    <div class="flex flex-col gap-1.5">
                                        <div v-for="opcion in opciones" :key="opcion"
                                            class="flex items-center justify-between">
                                            <span class="text-xs lg:text-sm text-terciary font-medium">{{ opcion }}</span>
                                            <label class="relative inline-flex items-center cursor-pointer">
                                                <input :id="`opcion-${opcion}`" :name="`opcion-${opcion}`"
                                                    v-model="filtros.opcion[opcion]" type="checkbox"
                                                    class="sr-only peer" />
                                                <div
                                                    class="w-12 h-7 bg-gray-mid peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all after:duration-300 peer-checked:bg-secondary transition-colors duration-300">
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Transition>
                </div>
            </div>
            <!-- Resultados -->
            <div class="w-full flex flex-col gap-4 px-4 pb-6 md:p-0">
                <HeadingH2 class="md:hidden text-center text-primary">Desarrollados por personas para personas</HeadingH2>
                <div v-if="productosFiltrados.length === 0" class="text-center text-gray-dark">
                    No se encontraron productos que coincidan con los filtros aplicados.
                </div>
                <div v-else class="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6 md:gap-2 lg:gap-y-4">
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

const filtros = ref({
    altura: '',
    ancho: '',
    largo: '',
    diametro: '',
    capacidad: '',
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

const orientaciones = ['Vertical', 'Horizontal']
const colores = ['Arena', 'Negro', 'Celeste', 'Gris', 'Blanco', 'Rojo', 'Azul', 'Verde', 'Naranja']
const tecnologias = ['Soplado', 'Rotomoldeo', 'Soldadura', 'Inyección']
const opciones = ['Para exteriores', 'Es cisterna']

const filtrosAplicados = computed(() => {
    const aplicados = []

    if (props.categoriaActual?.nombre) {
        aplicados.push(props.categoriaActual.nombre)
    }

    if (filtros.value.altura) aplicados.push(`Altura: ${filtros.value.altura}cm`)
    if (filtros.value.ancho) aplicados.push(`Ancho: ${filtros.value.ancho}cm`)
    if (filtros.value.largo) aplicados.push(`Largo: ${filtros.value.largo}cm`)
    if (filtros.value.diametro) aplicados.push(`Diámetro: ${filtros.value.diametro}cm`)
    if (filtros.value.capacidad) aplicados.push(`Capacidad: ${filtros.value.capacidad}lts`)

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


    return props.productos.filter(producto => {
        if (filtros.value.altura && producto.altura_cm) {
            const altura = parseInt(filtros.value.altura)
            if (Math.abs(producto.altura_cm - altura) > 10) return false
        }

        if (filtros.value.ancho && producto.ancho_cm) {
            const ancho = parseInt(filtros.value.ancho)
            if (Math.abs(producto.ancho_cm - ancho) > 10) return false
        }

        if (filtros.value.largo && producto.largo_cm) {
            const largo = parseInt(filtros.value.largo)
            if (Math.abs(producto.largo_cm - largo) > 10) return false
        }

        if (filtros.value.diametro && producto.diametro_cm) {
            const diametro = parseInt(filtros.value.diametro)
            if (Math.abs(producto.diametro_cm - diametro) > 10) return false
        }

        if (filtros.value.capacidad && producto.capacidad_lts) {
            const capacidad = parseInt(filtros.value.capacidad)
            if (Math.abs(producto.capacidad_lts - capacidad) > 10) return false
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
        altura: '',
        ancho: '',
        largo: '',
        diametro: '',
        capacidad: '',
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

    if (filtro.includes('Altura:')) filtros.value.altura = ''
    else if (filtro.includes('Ancho:')) filtros.value.ancho = ''
    else if (filtro.includes('Largo:')) filtros.value.largo = ''
    else if (filtro.includes('Diámetro:')) filtros.value.diametro = ''
    else if (filtro.includes('Capacidad:')) filtros.value.capacidad = ''
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