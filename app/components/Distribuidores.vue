<template>
    <DefaultSection
        id="distribuidores"
        class="gap-3 md:gap-6 lg:gap-8 relative bg-gray-light py-6 lg:pt-12 xxl:pt-16 lg:pb-0 px-4 md:px-8 lg:px-16">
        <HeadingH2 class="flex justify-center items-end gap-2 lg:gap-3 text-center text-primary">
            Distribuidores
            <NuxtImg :src="empresaConfig.logo" :alt="empresaConfig.logoAlt"
                class="w-24 lg:w-32 h-8 lg:h-11 object-contain" />
        </HeadingH2>
        <div
            class="w-full xxl:max-w-[1304px] bg-primary-gradient rounded-2xl md:rounded-[18px] xxl:rounded-3xl overflow-hidden md:p-2 lg:p-2.5 xxl:p-3">
            <ClientOnly>
                <div class="w-full h-72 lg:h-[30rem] rounded-2xl md:rounded-xl relative">
                    <div ref="mapContainer"
                        class="w-full h-full border-2 md:border-none border-terciary rounded-2xl md:rounded-[18px] lg:rounded-2xl">
                    </div>

                    <div v-if="!mapLoaded || isLoading"
                        class="absolute inset-0 bg-white  rounded-[18px] flex items-center justify-center z-20">
                        <div class="text-center">
                            <div class="w-8 h-8 animate-spin rounded-full border-b-2 border-primary mx-auto mb-2"></div>
                            <p class="text-sm text-dark">{{ isLoading ? 'Cargando distribuidores...' : 'Cargando mapa...' }}</p>
                        </div>
                    </div>

                    <div v-if="mapLoaded && selectedDistribuidor"
                        class="w-[90%] md:max-w-64 lg:max-w-72 flex flex-col gap-3 absolute bottom-4 md:top-6 md:bottom-auto left-0 md:left-auto right-0 md:right-6 bg-white rounded-[18px] shadow-md shadow-dark/20 z-10 p-3 mx-auto">
                        <div class="flex justify-between items-start gap-3">
                            <div class="flex items-start gap-1 text-primary">
                                <Icon name="material-symbols:shopping-bag-outline" class="flex-shrink-0" />
                                <p class="text-sm font-semibold">{{ selectedDistribuidor?.nombreComercio }}</p>
                            </div>
                            <button @click="selectedDistribuidor = null" class="text-dark">
                                <Icon name="material-symbols:close-rounded" />
                            </button>
                        </div>
                        <div class="flex flex-col gap-2">
                            <div class="flex items-center justify-between">
                                <p class="text-xs text-dark">{{ selectedDistribuidor?.calle }}, {{ selectedDistribuidor?.localidad }}, {{ selectedDistribuidor?.provincia }}</p>
                                <button @click="copyToClipboard(`${selectedDistribuidor?.calle}, ${selectedDistribuidor?.localidad}, ${selectedDistribuidor?.provincia}`)" class="text-primary">
                                    <Icon name="material-symbols:content-copy-outline-rounded" />
                                </button>
                            </div>
                        </div>
                    </div>

                    <Transition enter-active-class="transition-all duration-300 ease-out"
                        enter-from-class="opacity-0 transform translate-y-2" enter-to-class="opacity-100 transform translate-y-0"
                        leave-active-class="transition-all duration-200 ease-in"
                        leave-from-class="opacity-100 transform translate-y-0" leave-to-class="opacity-0 transform translate-y-2">
                        <div v-if="showCopyText"
                            class="w-max flex items-center gap-2 absolute top-4 md:top-[7.5rem] right-6 bg-primary text-white rounded-[18px] shadow-md shadow-dark/20 z-50 px-4 py-2">
                            <Icon name="material-symbols:check-circle-outline-rounded" class="text-white w-5 h-5" />
                            <span class="text-sm font-medium">¡Copiado al portapapeles!</span>
                        </div>
                    </Transition>
                </div>

                <template #fallback>
                    <div class="w-full h-72 bg-gray-100 rounded-2xl md:rounded-[18px] flex items-center justify-center">
                        <div class="text-center">
                            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
                            <p class="text-sm text-dark">Cargando mapa...</p>
                        </div>
                    </div>
                </template>
            </ClientOnly>

            <div class="lg:max-w-[43.25rem] lg:w-full md:absolute md:left-0 md:right-0 bottom-7 p-4 lg:mx-auto">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-3 md:px-16 lg:px-0">
                    <FilterDropdown id="provincia" :value="selectedProvincia" placeholder="Provincia"
                        :options="filteredProvincias" :search="searchProvincia"
                        @update:search="searchProvincia = $event" @select="selectProvincia"
                        :is-open="activeDropdown === 'provincia'" @toggle="toggleDropdown('provincia')" />

                    <FilterDropdown id="localidad" :value="selectedLocalidad" placeholder="Localidad"
                        :options="filteredLocalidades" :search="searchLocalidad"
                        @update:search="searchLocalidad = $event" @select="selectLocalidad"
                        :is-open="activeDropdown === 'localidad'" @toggle="toggleDropdown('localidad')"
                        :disabled="!selectedProvincia" />

                    <FilterDropdown id="comercio" :value="selectedComercioName" placeholder="Comercio"
                        :options="filteredComercios" option-key="nombreComercio" :search="searchComercio"
                        @update:search="searchComercio = $event" @select="selectComercio"
                        :is-open="activeDropdown === 'comercio'" @toggle="toggleDropdown('comercio')"
                        :disabled="!selectedLocalidad" />
                </div>
            </div>
        </div>
    </DefaultSection>
</template>

<script setup>
import { useDistribuidores } from '~/composables/useDistribuidores.js'

const props = defineProps({
    empresa: {
        type: String,
        required: true,
        validator: (value) => ['waterplast', 'rohermet', 'murallon'].includes(value)
    }
})

const mapContainer = ref(null)
const mapLoaded = ref(false)
const selectedProvincia = ref('')
const selectedLocalidad = ref('')
const selectedComercio = ref('')
const activeDropdown = ref(null)
const searchProvincia = ref('')
const searchLocalidad = ref('')
const searchComercio = ref('')
const selectedDistribuidor = shallowRef(null)

let map = null
let markers = []

const { distribuidores, loading: isLoading, fetchDistribuidores } = useDistribuidores(props.empresa)

const empresaConfig = computed(() => {
    const configs = {
        waterplast: {
            logo: '/images/logos/Logo-Waterplast-Azul.svg',
            logoAlt: 'Logo Waterplast',
            marker: '/images/waterplast/Waterplast-Maps.svg'
        },
        rohermet: {
            logo: '/images/logos/Logo-Rohermet-Azul.svg',
            logoAlt: 'Logo Rohermet',
            marker: '/images/rohermet/Rohermet-Maps.svg'
        },
        murallon: {
            logo: '/images/logos/Logo-Murallon-Group.svg',
            logoAlt: 'Logo Murallon Group',
            marker: '/images/murallon/Murallon-Group-Maps.svg'
        }
    }
    return configs[props.empresa]
})


const provincias = computed(() => {
    return [...new Set(distribuidores.value.map(d => d.provincia))].sort()
})

const filteredProvincias = computed(() => {
    if (!searchProvincia.value) return provincias.value
    return provincias.value.filter(p =>
        p.toLowerCase().includes(searchProvincia.value.toLowerCase())
    )
})

const localidades = computed(() => {
    if (!selectedProvincia.value) return []
    return [...new Set(distribuidores.value.filter(d => d.provincia === selectedProvincia.value).map(d => d.localidad))].sort()
})

const filteredLocalidades = computed(() => {
    if (!searchLocalidad.value) return localidades.value
    return localidades.value.filter(l =>
        l.toLowerCase().includes(searchLocalidad.value.toLowerCase())
    )
})

const comercios = computed(() => {
    if (!selectedLocalidad.value) return []
    return distribuidores.value.filter(d =>
        d.provincia === selectedProvincia.value &&
        d.localidad === selectedLocalidad.value
    )
})

const filteredComercios = computed(() => {
    if (!searchComercio.value) return comercios.value
    return comercios.value.filter(c =>
        c.nombreComercio.toLowerCase().includes(searchComercio.value.toLowerCase())
    )
})

const selectedComercioName = computed(() => {
    if (!selectedComercio.value) return ''
    const comercio = distribuidores.value.find(d => d.id == selectedComercio.value)
    return comercio ? comercio.nombreComercio : ''
})

const filteredDistribuidores = computed(() => {
    if (!selectedProvincia.value) {
        return []
    }

    let result = distribuidores.value.filter(d => d.provincia === selectedProvincia.value)

    if (selectedLocalidad.value) {
        result = result.filter(d => d.localidad === selectedLocalidad.value)
    }
    if (selectedComercio.value) {
        result = result.filter(d => d.id == selectedComercio.value)
    }

    return result
})

const toggleDropdown = (dropdown) => {
    if (activeDropdown.value === dropdown) {
        activeDropdown.value = null
        return
    }

    activeDropdown.value = dropdown

    nextTick(() => {
        if (dropdown === 'provincia') searchProvincia.value = ''
        if (dropdown === 'localidad') searchLocalidad.value = ''
        if (dropdown === 'comercio') searchComercio.value = ''
    })
}

const selectProvincia = (provincia) => {
    selectedProvincia.value = provincia
    selectedLocalidad.value = ''
    selectedComercio.value = ''
    activeDropdown.value = null
    searchProvincia.value = ''
}

const selectLocalidad = (localidad) => {
    selectedLocalidad.value = localidad
    selectedComercio.value = ''
    activeDropdown.value = null
    searchLocalidad.value = ''
}

const selectComercio = (comercio) => {
    selectedComercio.value = comercio.id
    activeDropdown.value = null
    searchComercio.value = ''

    if (map && comercio) {
        const lat = parseFloat(comercio.latitud)
        const lng = parseFloat(comercio.longitud)

        if (!isNaN(lat) && !isNaN(lng) && lat !== null && lng !== null) {
            map.setCenter({ lat, lng })
            map.setZoom(16)
        } else {
            console.warn(`Comercio ${comercio.nombreComercio} tiene coordenadas inválidas para centrar el mapa:`, { latitud: comercio.latitud, longitud: comercio.longitud })
        }
    }
}

const copyToClipboard = async (text) => {
    if (!text) return

    try {
        await navigator.clipboard.writeText(text)
        showCopyNotification()
    } catch (err) {
        const textArea = document.createElement('textarea')
        textArea.value = text
        document.body.appendChild(textArea)
        textArea.select()
        try {
            document.execCommand('copy')
            showCopyNotification()
        } catch (fallbackErr) {
            console.error('Error al copiar al portapapeles:', fallbackErr)
        }
        document.body.removeChild(textArea)
    }
}

const showCopyText = ref(false)

const showCopyNotification = () => {
    showCopyText.value = true
    setTimeout(() => {
        showCopyText.value = false
    }, 2000000)
}

const initializeMap = async () => {
    if (typeof window === 'undefined' || !mapContainer.value) return

    try {
        if (!window.google || !window.google.maps) {
            const config = useRuntimeConfig()
            const apiKey = config.public.googleMapsApiKey

            await new Promise((resolve, reject) => {
                let timeoutId = setTimeout(() => {
                    reject(new Error('Timeout cargando Google Maps'))
                }, 10000)

                window.initMap = () => {
                    clearTimeout(timeoutId)
                    resolve()
                    delete window.initMap
                }

                const existingScript = document.querySelector('script[src*="maps.googleapis.com"]')
                if (existingScript) {
                    existingScript.remove()
                }

                const script = document.createElement('script')
                script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&loading=async&libraries=marker&callback=initMap`
                script.async = true
                script.defer = true
                script.onerror = (error) => {
                    clearTimeout(timeoutId)
                    reject(error)
                }
                document.head.appendChild(script)
            })
        }

        if (mapContainer.value && window.google && window.google.maps) {
            map = new window.google.maps.Map(mapContainer.value, {
                mapTypeControl: false,
                streetViewControl: false,
                fullscreenControl: false,
                mapId: 'waterplast-map',
                center: { lat: -34.6037, lng: -58.3816 },
                zoom: 5,
                gestureHandling: 'greedy'
            })

            window.google.maps.event.addListenerOnce(map, 'idle', () => {
                mapLoaded.value = true
                updateMarkers()
            })
        }
    } catch (error) {
        console.error('Error al cargar el mapa:', error)
        mapLoaded.value = true
    }
}

const updateMarkers = () => {
    if (!map || !window.google) return

    markers.forEach(marker => {
        if (marker && marker.setMap) {
            marker.setMap(null)
        }
    })
    markers = []

    selectedDistribuidor.value = null

    const bounds = new window.google.maps.LatLngBounds()

    filteredDistribuidores.value.forEach(distribuidor => {
        try {
            const lat = parseFloat(distribuidor.latitud)
            const lng = parseFloat(distribuidor.longitud)

            if (isNaN(lat) || isNaN(lng) || lat === null || lng === null) {
                console.warn(`Distribuidor ${distribuidor.nombreComercio} tiene coordenadas inválidas:`, { latitud: distribuidor.latitud, longitud: distribuidor.longitud })
                return
            }

            const position = { lat, lng }

            const markerContainer = document.createElement('div')
            markerContainer.style.cssText = 'cursor: pointer; -webkit-tap-highlight-color: transparent; touch-action: manipulation;'

            const markerImg = document.createElement('img')
            markerImg.src = empresaConfig.value.marker
            markerImg.style.cssText = 'width: 100px; height: 40px; pointer-events: none; display: block;'
            markerImg.alt = distribuidor.nombreComercio

            markerContainer.appendChild(markerImg)

            const marker = new window.google.maps.marker.AdvancedMarkerElement({
                position: position,
                map: map,
                title: distribuidor.nombreComercio,
                content: markerContainer
            })

            marker.addListener('click', () => {
                selectedDistribuidor.value = distribuidor
            })

            markerContainer.addEventListener('click', () => {
                selectedDistribuidor.value = distribuidor
            }, { passive: true })

            markers.push(marker)
            bounds.extend(position)
        } catch (error) {
            console.error(`Error al crear marcador para ${distribuidor.nombreComercio}:`, error)
        }
    })

    if (markers.length > 0) {
        map.fitBounds(bounds)
        if (markers.length === 1) {
            setTimeout(() => {
                if (map) map.setZoom(16)
            }, 100)
        }
    } else {
        map.setCenter({ lat: -34.6037, lng: -58.3816 })
        map.setZoom(5)
    }
}

watch(filteredDistribuidores, () => {
    if (map) {
        updateMarkers()
    }
})

const handleClickOutside = (event) => {
    const clickedInsideDropdown = event.target.closest('[data-dropdown]')
    if (!clickedInsideDropdown) {
        activeDropdown.value = null
    }
}

onMounted(async () => {
    if (process.client) {
        try {
            await fetchDistribuidores()

            nextTick(() => {
                initializeMap()
            })
        } catch (err) {
            console.error('Error al cargar distribuidores:', err)
        }

        document.addEventListener('click', handleClickOutside)
    }
})

onUnmounted(() => {
    if (markers.length > 0) {
        markers.forEach(marker => {
            if (marker && marker.setMap) {
                marker.setMap(null)
            }
        })
    }
    markers = []
    selectedDistribuidor.value = null

    if (process.client) {
        document.removeEventListener('click', handleClickOutside)
    }

    map = null
})
</script>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
    transition: all 0.2s ease-out;
    transform-origin: top;
}

.dropdown-enter-from,
.dropdown-leave-to {
    opacity: 0;
    transform: scaleY(0.9) translateY(-4px);
}

.dropdown-enter-to,
.dropdown-leave-from {
    opacity: 1;
    transform: scaleY(1) translateY(0);
}
</style>