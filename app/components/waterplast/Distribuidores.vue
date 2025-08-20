<template>
    <DefaultSection class="gap-3 md:gap-6 bg-gray-light py-6 px-4 md:px-8 relative">
        <HeadingH2 class="flex justify-center items-end gap-2 text-center text-primary">
            Distribuidores <NuxtImg src="/images/logos/Logo-Waterplast-Azul.svg" alt="Logo Waterplast" class="w-24 h-8" />
        </HeadingH2>
        <div class="bg-primary-gradient rounded-2xl md:rounded-[18px] overflow-hidden md:p-2">
            <ClientOnly>
                <div class="w-full h-72 rounded-2xl md:rounded-xl relative">
                    <div ref="mapContainer"
                        class="w-full h-full border-2 md:border-none border-terciary rounded-2xl md:rounded-[18px]">
                    </div>

                    <div v-if="!mapLoaded"
                        class="absolute inset-0 bg-white  rounded-[18px] flex items-center justify-center z-20">
                        <div class="text-center">
                            <div class="w-8 h-8 animate-spin rounded-full border-b-2 border-primary mx-auto mb-2"></div>
                            <p class="text-sm text-dark">Cargando mapa...</p>
                        </div>
                    </div>

                    <div v-if="mapLoaded && selectedDistribuidor"
                        class="w-[90%] md:max-w-64 flex flex-col gap-3 absolute bottom-4 md:top-6 md:bottom-auto left-0 md:left-auto right-0 md:right-6 bg-white rounded-[18px] shadow-md shadow-dark/20 z-10 p-3 mx-auto">
                        <div class="flex justify-between items-start gap-3">
                            <div class="flex items-start gap-1 text-primary">
                                <Icon name="material-symbols:shopping-bag-outline" class="flex-shrink-0" />
                                <p class="text-sm font-semibold">{{ selectedDistribuidor?.name }}</p>
                            </div>
                            <button @click="selectedDistribuidor = null" class="text-dark">
                                <Icon name="material-symbols:close-rounded" />
                            </button>
                        </div>
                        <div class="flex flex-col gap-2">
                            <div class="flex items-center justify-between">
                                <p class="text-xs text-dark">{{ selectedDistribuidor?.address }}</p>
                                <button @click="copyToClipboard(selectedDistribuidor?.address)" class="text-primary">
                                    <Icon name="material-symbols:content-copy-outline-rounded" />
                                </button>
                            </div>
                            <div v-if="selectedDistribuidor?.phone" class="flex items-center justify-between">
                                <p class="text-xs text-dark">{{ selectedDistribuidor?.phone }}</p>
                                <button @click="copyToClipboard(selectedDistribuidor?.phone)" class="text-primary">
                                    <Icon name="material-symbols:content-copy-outline-rounded" />
                                </button>
                            </div>
                        </div>
                    </div>
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

            <div class="md:absolute md:left-0 md:right-0 bottom-7 p-4">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-3 md:px-16">
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
                        :options="filteredComercios" option-key="name" :search="searchComercio"
                        @update:search="searchComercio = $event" @select="selectComercio"
                        :is-open="activeDropdown === 'comercio'" @toggle="toggleDropdown('comercio')"
                        :disabled="!selectedLocalidad" />
                </div>
            </div>
        </div>

        <Transition enter-active-class="transition-all duration-300 ease-out"
            enter-from-class="opacity-0 transform translate-y-2" enter-to-class="opacity-100 transform translate-y-0"
            leave-active-class="transition-all duration-200 ease-in"
            leave-from-class="opacity-100 transform translate-y-0" leave-to-class="opacity-0 transform translate-y-2">
            <div v-if="showCopyText"
                class="w-max flex items-center gap-2 absolute top-20 left-1/2 transform -translate-x-1/2 bg-primary text-white rounded-[18px] shadow-md shadow-dark/20 z-50 px-4 py-2">
                <Icon name="material-symbols:check-circle-outline-rounded" class="text-white w-5 h-5" />
                <span class="text-sm font-medium">¡Copiado al portapapeles!</span>
            </div>
        </Transition>
    </DefaultSection>
</template>

<script setup>
const mapContainer = ref(null)
const mapLoaded = ref(false)
const selectedProvincia = ref('Buenos Aires')
const selectedLocalidad = ref('Avellaneda')
const selectedComercio = ref('')
const activeDropdown = ref(null)
const searchProvincia = ref('')
const searchLocalidad = ref('')
const searchComercio = ref('')
const selectedDistribuidor = shallowRef(null)

let map = null
let markers = []

const distribuidores = [
    {
        id: 1,
        name: 'Centro Deportivo Huracán De San Justo',
        address: 'De la Serna 3955',
        phone: '+54 9 11 4246-2205',
        provincia: 'Buenos Aires',
        localidad: 'Avellaneda',
        lat: -34.6631,
        lng: -58.5631
    },
    {
        id: 2,
        name: 'Abertura de los pozos',
        address: 'Plaza San Justo',
        provincia: 'Buenos Aires',
        localidad: 'Avellaneda',
        lat: -34.6651,
        lng: -58.5651
    },
    {
        id: 3,
        name: 'Mostaza',
        address: 'Av. Principal 123',
        provincia: 'Buenos Aires',
        localidad: 'Avellaneda',
        lat: -34.6611,
        lng: -58.5611
    },
    {
        id: 4,
        name: 'Las Ligas',
        address: 'Calle Secundaria 456',
        provincia: 'Buenos Aires',
        localidad: 'Hurlingham',
        lat: -34.5881,
        lng: -58.6381
    },
    {
        id: 5,
        name: 'Registro del Automotor',
        address: 'Av. Central 789',
        provincia: 'Buenos Aires',
        localidad: 'Temperley',
        lat: -34.7751,
        lng: -58.3975
    },
    {
        id: 6,
        name: 'Comercio Santa Fe',
        address: 'Av. Santa Fe 1000',
        provincia: 'Santa Fe',
        localidad: 'Rosario',
        lat: -32.9468,
        lng: -60.6393
    },
    {
        id: 7,
        name: 'Distribuidora Córdoba',
        address: 'Av. Colón 500',
        provincia: 'Córdoba',
        localidad: 'Córdoba Capital',
        lat: -31.4201,
        lng: -64.1888
    }
]

const provincias = computed(() => {
    return [...new Set(distribuidores.map(d => d.provincia))].sort()
})

const filteredProvincias = computed(() => {
    if (!searchProvincia.value) return provincias.value
    return provincias.value.filter(p =>
        p.toLowerCase().includes(searchProvincia.value.toLowerCase())
    )
})

const localidades = computed(() => {
    if (!selectedProvincia.value) return []
    return [...new Set(distribuidores.filter(d => d.provincia === selectedProvincia.value).map(d => d.localidad))].sort()
})

const filteredLocalidades = computed(() => {
    if (!searchLocalidad.value) return localidades.value
    return localidades.value.filter(l =>
        l.toLowerCase().includes(searchLocalidad.value.toLowerCase())
    )
})

const comercios = computed(() => {
    if (!selectedLocalidad.value) return []
    return distribuidores.filter(d =>
        d.provincia === selectedProvincia.value &&
        d.localidad === selectedLocalidad.value
    )
})

const filteredComercios = computed(() => {
    if (!searchComercio.value) return comercios.value
    return comercios.value.filter(c =>
        c.name.toLowerCase().includes(searchComercio.value.toLowerCase())
    )
})

const selectedComercioName = computed(() => {
    if (!selectedComercio.value) return ''
    const comercio = distribuidores.find(d => d.id == selectedComercio.value)
    return comercio ? comercio.name : ''
})

const filteredDistribuidores = computed(() => {
    let result = distribuidores

    if (selectedProvincia.value) {
        result = result.filter(d => d.provincia === selectedProvincia.value)
    }
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
        map.setCenter({ lat: comercio.lat, lng: comercio.lng })
        map.setZoom(16)
    }
}

const copyToClipboard = async (text) => {
    if (!text) return

    try {
        await navigator.clipboard.writeText(text)
        // Mostrar notificación de éxito
        showCopyNotification()
    } catch (err) {
        const textArea = document.createElement('textarea')
        textArea.value = text
        document.body.appendChild(textArea)
        textArea.select()
        try {
            document.execCommand('copy')
            // Mostrar notificación de éxito
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
    }, 2000)
}

const initializeMap = async () => {
    if (typeof window === 'undefined' || !mapContainer.value) return

    try {
        if (!window.google || !window.google.maps) {
            const config = useRuntimeConfig()
            const apiKey = config.public.googleMapsApiKey

            await new Promise((resolve, reject) => {
                window.initMap = () => {
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
                script.onerror = reject
                document.head.appendChild(script)
            })
        }

        if (mapContainer.value) {
            map = new window.google.maps.Map(mapContainer.value, {
                mapTypeControl: false,
                streetViewControl: false,
                fullscreenControl: false,
                mapId: 'waterplast-map',
                center: { lat: -34.6631, lng: -58.5631 },
                zoom: 12
            })

            await nextTick()
            updateMarkers()

            mapLoaded.value = true
        }
    } catch (error) {
        console.error('Error al cargar el mapa:', error)
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
            const marker = new window.google.maps.marker.AdvancedMarkerElement({
                position: { lat: distribuidor.lat, lng: distribuidor.lng },
                map: map,
                title: distribuidor.name
            })

            marker.addListener('click', () => {
                selectedDistribuidor.value = distribuidor
            })

            markers.push(marker)
            bounds.extend(marker.position)
        } catch (error) {
            console.error('Error al crear marcador:', error)
        }
    })

    if (markers.length > 0) {
        map.fitBounds(bounds)
        if (markers.length === 1) {
            setTimeout(() => {
                if (map) map.setZoom(16)
            }, 100)
        }
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

onMounted(() => {
    if (process.client) {
        nextTick(() => {
            initializeMap()
        })
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