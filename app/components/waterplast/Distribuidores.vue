<template>
    <DefaultSection class="bg-gray-light py-6 px-4">
        <HeadingH2 class="text-center text-terciary mb-8">
            Distribuidores Waterplast
        </HeadingH2>
        <div class="bg-primary-gradient rounded-2xl overflow-hidden p-0.5">
            <ClientOnly>
                <div ref="mapContainer" class="w-full h-72 rounded-2xl">
                    <div v-if="!mapLoaded" class="h-full flex items-center justify-center">
                        <div class="text-center">
                            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
                            <p class="text-sm text-gray-600">Cargando mapa...</p>
                        </div>
                    </div>
                </div>
                <template #fallback>
                    <div class="w-full h-[400px] bg-gray-100 flex items-center justify-center">
                        <p class="text-gray-600">Cargando mapa...</p>
                    </div>
                </template>
            </ClientOnly>

            <div class="p-4 bg-white">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FilterDropdown
                        id="provincia"
                        :value="selectedProvincia"
                        placeholder="Seleccionar Provincia"
                        :options="filteredProvincias"
                        :search="searchProvincia"
                        @update:search="searchProvincia = $event"
                        @select="selectProvincia"
                        :is-open="activeDropdown === 'provincia'"
                        @toggle="toggleDropdown('provincia')"
                    />
                    
                    <FilterDropdown
                        id="localidad"
                        :value="selectedLocalidad"
                        placeholder="Seleccionar Localidad"
                        :options="filteredLocalidades"
                        :search="searchLocalidad"
                        @update:search="searchLocalidad = $event"
                        @select="selectLocalidad"
                        :is-open="activeDropdown === 'localidad'"
                        @toggle="toggleDropdown('localidad')"
                        :disabled="!selectedProvincia"
                    />
                    
                    <FilterDropdown
                        id="comercio"
                        :value="selectedComercioName"
                        placeholder="Seleccionar Comercio"
                        :options="filteredComercios"
                        option-key="name"
                        :search="searchComercio"
                        @update:search="searchComercio = $event"
                        @select="selectComercio"
                        :is-open="activeDropdown === 'comercio'"
                        @toggle="toggleDropdown('comercio')"
                        :disabled="!selectedLocalidad"
                    />
                </div>
            </div>
        </div>
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

let map = null
let markers = []
let infoWindow = null

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
    // Si el mismo dropdown está abierto, cerrarlo
    if (activeDropdown.value === dropdown) {
        activeDropdown.value = null
        return
    }
    
    // Cerrar cualquier dropdown abierto y abrir el nuevo
    activeDropdown.value = dropdown
    
    // Limpiar búsqueda al abrir
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

const onProvinciaChange = () => {
    selectedLocalidad.value = ''
    selectedComercio.value = ''
}

const onLocalidadChange = () => {
    selectedComercio.value = ''
}

const onComercioChange = () => {
    const comercio = distribuidores.find(d => d.id == selectedComercio.value)
    if (map && comercio) {
        map.setCenter({ lat: comercio.lat, lng: comercio.lng })
        map.setZoom(16)
    }
}

const initializeMap = async () => {
    if (typeof window === 'undefined') return

    try {
        if (!window.google || !window.google.maps) {
            const config = useRuntimeConfig()
            const apiKey = config.public.googleMapsApiKey

            await new Promise((resolve, reject) => {
                window.initMap = () => {
                    resolve()
                    delete window.initMap
                }

                const script = document.createElement('script')
                script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&loading=async&libraries=marker&callback=initMap`
                script.async = true
                script.defer = true
                script.onerror = reject
                document.head.appendChild(script)
            })
        }

        await nextTick()

        if (!mapContainer.value) return

        map = new window.google.maps.Map(mapContainer.value, {
            zoom: 11,
            center: { lat: -34.6631, lng: -58.5631 },
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: false,
            mapId: 'waterplast-map'
        })

        infoWindow = new window.google.maps.InfoWindow()
        mapLoaded.value = true
        updateMarkers()
    } catch (error) {
        console.error('Error al cargar el mapa:', error)
    }
}

const updateMarkers = () => {
    if (!map || !window.google) return

    markers.forEach(marker => marker.setMap(null))
    markers = []

    const bounds = new window.google.maps.LatLngBounds()

    filteredDistribuidores.value.forEach(distribuidor => {
        const marker = new window.google.maps.marker.AdvancedMarkerElement({
            position: { lat: distribuidor.lat, lng: distribuidor.lng },
            map: map,
            title: distribuidor.name
        })

        const content = `
            <div style="padding: 8px;">
                <h3 style="font-weight: bold; margin: 0 0 4px 0;">${distribuidor.name}</h3>
                ${distribuidor.address ? `<p style="color: #666; margin: 2px 0;">${distribuidor.address}</p>` : ''}
                ${distribuidor.phone ? `<p style="color: #666; margin: 2px 0;">${distribuidor.phone}</p>` : ''}
            </div>
        `

        marker.addListener('click', () => {
            infoWindow.setContent(content)
            infoWindow.open(map, marker)
        })

        markers.push(marker)
        bounds.extend(marker.position)
    })

    if (markers.length > 0) {
        map.fitBounds(bounds)
        if (markers.length === 1) {
            setTimeout(() => map.setZoom(16), 100)
        }
    }
}

watch(filteredDistribuidores, updateMarkers)

const handleClickOutside = (event) => {
    // Verificar si el click fue fuera de cualquier FilterDropdown
    const clickedInsideDropdown = event.target.closest('[data-dropdown]')
    if (!clickedInsideDropdown) {
        activeDropdown.value = null
    }
}

onMounted(() => {
    if (typeof window !== 'undefined') {
        initializeMap()
        document.addEventListener('click', handleClickOutside)
    }
})

onUnmounted(() => {
    if (markers.length > 0) {
        markers.forEach(marker => marker.setMap(null))
    }
    if (typeof window !== 'undefined') {
        document.removeEventListener('click', handleClickOutside)
    }
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
