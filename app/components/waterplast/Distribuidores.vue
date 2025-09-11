<template>
    <DefaultSection class="gap-3 md:gap-6 lg:gap-8 bg-gray-light py-6 lg:pt-12 xxl:pt-16 lg:pb-0 px-4 md:px-8 lg:px-16 relative">
        <HeadingH2 class="flex justify-center items-end gap-2 lg:gap-3 text-center text-primary">
            Distribuidores <NuxtImg src="/images/logos/Logo-Waterplast-Azul.svg" alt="Logo Waterplast" class="w-24 lg:w-32 h-8 lg:h-11 object-contain" />
        </HeadingH2>
        <div class="w-full xxl:max-w-[1304px] bg-primary-gradient rounded-2xl md:rounded-[18px] xxl:rounded-3xl overflow-hidden md:p-2 lg:p-2.5 xxl:p-3">
            <ClientOnly>
                <div class="w-full h-72 lg:h-[30rem] rounded-2xl md:rounded-xl relative">
                    <div ref="mapContainer"
                        class="w-full h-full border-2 md:border-none border-terciary rounded-2xl md:rounded-[18px] lg:rounded-2xl">
                    </div>

                    <div v-if="!mapLoaded"
                        class="absolute inset-0 bg-white  rounded-[18px] flex items-center justify-center z-20">
                        <div class="text-center">
                            <div class="w-8 h-8 animate-spin rounded-full border-b-2 border-primary mx-auto mb-2"></div>
                            <p class="text-sm text-dark">Cargando mapa...</p>
                        </div>
                    </div>

                    <div v-if="mapLoaded && selectedDistribuidor"
                        class="w-[90%] md:max-w-64 lg:max-w-72 flex flex-col gap-3 absolute bottom-4 md:top-6 md:bottom-auto left-0 md:left-auto right-0 md:right-6 bg-white rounded-[18px] shadow-md shadow-dark/20 z-10 p-3 mx-auto">
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
  { id: 1, name: "Distribuidora Yayi", address: "Calle 526 y 31, 3558", provincia: "Buenos Aires", localidad: "La Plata", lat: null, lng: null },
  { id: 2, name: "SANITARIOS RETRO", address: "Rodríguez Peña 2565", provincia: "Buenos Aires", localidad: "Mar del Plata", lat: null, lng: null },
  { id: 3, name: "CASTELLI Sanitarios", address: "Castelli 3448", provincia: "Buenos Aires", localidad: "Mar del Plata", lat: null, lng: null },
  { id: 4, name: "NATOL Sanitarios", address: "Calle 11 Nº 559", provincia: "Buenos Aires", localidad: "Balcarce", lat: null, lng: null },
  { id: 5, name: "CORDA Sanitarios", address: "Ruta 11 KM 396", provincia: "Buenos Aires", localidad: "Ostende", lat: null, lng: null },
  { id: 6, name: "EL ARGENTINO", address: "Av. Jorge Newbery 3299", provincia: "Buenos Aires", localidad: "Mar del Plata", lat: null, lng: null },
  { id: 7, name: "EL TEFLON", address: "Av. Luro 6655", provincia: "Buenos Aires", localidad: "Mar del Plata", lat: null, lng: null },
  { id: 8, name: "CENTRAL Materiales", address: "Av. 75 Nº 1949", provincia: "Buenos Aires", localidad: "Necochea", lat: null, lng: null },
  { id: 9, name: "EL TEFLON", address: "Calle 57 Nº 2730", provincia: "Buenos Aires", localidad: "Necochea", lat: null, lng: null },
  { id: 10, name: "RE-SA", address: "Av. Luro 5984", provincia: "Buenos Aires", localidad: "Mar del Plata", lat: null, lng: null },
  { id: 11, name: "EL ÁGUILA Sanitarios", address: "Av. Jara 866", provincia: "Buenos Aires", localidad: "Mar del Plata", lat: null, lng: null },
  { id: 12, name: "IPLI S.R.L.", address: "Belgrano 4474", provincia: "Buenos Aires", localidad: "Mar del Plata", lat: null, lng: null },
  { id: 13, name: "PUJOL Sanitarios", address: "Calle 46 Nº 2601", provincia: "Buenos Aires", localidad: "Necochea", lat: null, lng: null },
  { id: 14, name: "EL JARDÍN", address: "Av. Mario Bravo 2862", provincia: "Buenos Aires", localidad: "Mar del Plata", lat: null, lng: null },
  { id: 15, name: "GABARAIN Materiales", address: "Calle 9 Nº 2107", provincia: "Buenos Aires", localidad: "Miramar", lat: null, lng: null },
  { id: 16, name: "Sanitarios MIRAMAR", address: "Calle 19 Nº 1657", provincia: "Buenos Aires", localidad: "Miramar", lat: null, lng: null },
  { id: 17, name: "CPG Sanitarios", address: "Av. 58 Nº 3602", provincia: "Buenos Aires", localidad: "Necochea", lat: null, lng: null },
  { id: 18, name: "Ferretería BH", address: "Calle 58 Nº 244", provincia: "Buenos Aires", localidad: "Mar del Tuyú", lat: null, lng: null },
  { id: 19, name: "Cansanello Sanitarios SRL", address: "Marcelo T. de Alvear 4451", provincia: "Buenos Aires", localidad: "Caseros", lat: null, lng: null },
  { id: 20, name: "Sanitarios Luro", address: "Av. Luro 5707", provincia: "Buenos Aires", localidad: "Laferrere", lat: null, lng: null },
  { id: 21, name: "Sanitarios Ferro", address: "Colectora Sur, Acceso Oeste esq. Río Negro 1196", provincia: "Buenos Aires", localidad: "Gral. Rodríguez", lat: null, lng: null },
  { id: 22, name: "Sanitarios Casa Franco", address: "Av. Luque Honorio 5967", provincia: "Buenos Aires", localidad: "Laferrere", lat: null, lng: null },
  { id: 23, name: "Mundiplas", address: "Av. Monseñor Bufano 3785", provincia: "Buenos Aires", localidad: "Laferrere", lat: null, lng: null },
  { id: 24, name: "Sanitarios Arieta", address: "Av. Ignacio Arieta 1858", provincia: "Buenos Aires", localidad: "San Justo", lat: null, lng: null },
  { id: 25, name: "Sanitarios Crovara", address: "Av. Crovara 3176", provincia: "Buenos Aires", localidad: "Tablada", lat: null, lng: null },
  { id: 26, name: "Sanitarios Chiacchiari", address: "Carlos Casares 96", provincia: "Buenos Aires", localidad: "Rafael Castillo", lat: null, lng: null },
  { id: 27, name: "Sanitarios Pampa", address: "Av. Arturo Humberto Illia 4289", provincia: "Buenos Aires", localidad: "San Miguel", lat: null, lng: null },
  { id: 28, name: "Sanitarios Atlantis", address: "Ing. Guillermo Marconi 544", provincia: "Buenos Aires", localidad: "El Palomar", lat: null, lng: null },
  { id: 29, name: "Sanitarios Tesei", address: "Av. Gdor. Vergara 2657", provincia: "Buenos Aires", localidad: "Villa Tesei", lat: null, lng: null },
  { id: 30, name: "Sanitarios Gaona", address: "Av. Pte. Perón 2656", provincia: "Buenos Aires", localidad: "Haedo", lat: null, lng: null },
  { id: 31, name: "Sanitarios Hidrobras", address: "Av. Juan Manuel de Rosas 669", provincia: "Buenos Aires", localidad: "Lomas del Mirador", lat: null, lng: null },
  { id: 32, name: "EL CONSTRUCTOR", address: "San Luis y 3 de Febrero 3590", provincia: "Entre Ríos", localidad: "Chajarí", lat: null, lng: null },
  { id: 33, name: "C.B.C.", address: "Italia 188", provincia: "Entre Ríos", localidad: "Nogoyá", lat: null, lng: null },
  { id: 34, name: "C.B.C.", address: "Hipólito Yrigoyen 905", provincia: "Entre Ríos", localidad: "Victoria", lat: null, lng: null },
  { id: 35, name: "MATERIALES DE ZAN", address: "25 de Mayo 344", provincia: "Entre Ríos", localidad: "Larroque", lat: null, lng: null },
  { id: 36, name: "MATERIALES DE ZAN", address: "Bv. Rivadavia y Victorino de la Plaza S/N", provincia: "Entre Ríos", localidad: "Urdinarrain", lat: null, lng: null },
  { id: 37, name: "SANITARIOS DEL VALLE", address: "Av. del Valle 1038", provincia: "Entre Ríos", localidad: "Gualeguaychú", lat: null, lng: null },
  { id: 38, name: "LEFFLER Y WOLLERT", address: "Belgrano 298", provincia: "Entre Ríos", localidad: "Ramírez", lat: null, lng: null },
  { id: 39, name: "CORRALON SAN PIO", address: "Av. Pte. Illia y Ruta 11 S/N", provincia: "Entre Ríos", localidad: "Gualeguay", lat: null, lng: null },
  { id: 40, name: "BONATO ACCESORIOS", address: "Ramírez 11", provincia: "Entre Ríos", localidad: "Colón", lat: null, lng: null },
  { id: 41, name: "FERRETERIA LOS DOS HERMANOS", address: "Santa Teresita 1313", provincia: "Entre Ríos", localidad: "Concepción del Uruguay", lat: null, lng: null },
  { id: 42, name: "SANITARIOS ALFREDO", address: "Alberdi 120", provincia: "Entre Ríos", localidad: "Gualeguaychú", lat: null, lng: null },
  { id: 43, name: "Ferretería Loewen", address: "25 de Mayo 131", provincia: "Córdoba", localidad: "Canals", lat: null, lng: null },
  { id: 44, name: "LA ESQUINA SANITARIOS", address: "Gral. Paz 294", provincia: "Córdoba", localidad: "La Cumbre", lat: null, lng: null },
  { id: 45, name: "SANITARIOS TRITON", address: "Av. España 361", provincia: "Córdoba", localidad: "La Falda", lat: null, lng: null },
  { id: 46, name: "BERMAT", address: "Juan José Castelli 1939", provincia: "Córdoba", localidad: "Río Cuarto", lat: null, lng: null },
  { id: 47, name: "BERTERO", address: "Marcelo T. de Alvear 1712", provincia: "Córdoba", localidad: "Río Cuarto", lat: null, lng: null },
  { id: 48, name: "TODO SANITARIOS", address: "Libertad 1945", provincia: "Córdoba", localidad: "San Francisco", lat: null, lng: null },
  { id: 49, name: "HIPERCAÑO", address: "Colón 155", provincia: "Córdoba", localidad: "Villa María", lat: null, lng: null },
  { id: 50, name: "CAÑO 14", address: "Av. Alem 2850", provincia: "Córdoba", localidad: "Córdoba", lat: null, lng: null },
  { id: 51, name: "SALTANOVICH", address: "Gral. Alvear 671", provincia: "Córdoba", localidad: "Córdoba", lat: null, lng: null },
  { id: 52, name: "CORRALON EL MERCADO", address: "Av. Almirante Brown 198", provincia: "Jujuy", localidad: "San Salvador de Jujuy", lat: null, lng: null },
  { id: 53, name: "HIEMACAR", address: "Maipú 56", provincia: "Córdoba", localidad: "Villa Carlos Paz", lat: null, lng: null },
  { id: 54, name: "SUMA INSTALACIONES", address: "Av. San Martín 1290", provincia: "Córdoba", localidad: "Villa Carlos Paz", lat: null, lng: null },
  { id: 55, name: "ICA SANITARIOS", address: "Diagonal ICA 1066", provincia: "Córdoba", localidad: "Córdoba", lat: null, lng: null },
  { id: 56, name: "TODO REPUESTOS", address: "Rodriguez del Busto, Hiperconstrucción Local 400", provincia: "Córdoba", localidad: "Córdoba", lat: null, lng: null },
  { id: 57, name: "CORRALON BARBIERI HNOS", address: "Lucio V. Mansilla 52", provincia: "Córdoba", localidad: "Coronel Moldes", lat: null, lng: null },
  { id: 58, name: "FERRETERIA COMPLEJO ALEX", address: "Las Magnolias 519", provincia: "Córdoba", localidad: "Villa General Belgrano", lat: null, lng: null },
  { id: 59, name: "SANITARIOS JESÚS MARÍA", address: "Almafuerte 150", provincia: "Córdoba", localidad: "Jesús María", lat: null, lng: null },
  { id: 60, name: "FERRETERIA BOLIVAR", address: "Alsina 262", provincia: "Córdoba", localidad: "Río Tercero", lat: null, lng: null },
  { id: 61, name: "OSBORN SUPERCENTER CORDOBA", address: "Paso de Uspallata 1630", provincia: "Córdoba", localidad: "Córdoba", lat: null, lng: null },
  { id: 62, name: "COLORAMA", address: "Av. Belgrano 890", provincia: "Córdoba", localidad: "Villa Dolores", lat: null, lng: null },
  { id: 63, name: "COPMACO", address: "Ruta 9 KM 689A", provincia: "Córdoba", localidad: "Ferreyra", lat: null, lng: null },
  { id: 64, name: "Cañoplast", address: "Av. 66 Nº 1892 esq. 133", provincia: "Buenos Aires", localidad: "La Plata", lat: null, lng: null },
  { id: 65, name: "Sanitarios Val Mar", address: "Av. Libertad 891", provincia: "Buenos Aires", localidad: "Gral. Belgrano", lat: null, lng: null },
  { id: 66, name: "Sanitarios MPM", address: "Av. H. Yrigoyen 18616", provincia: "Buenos Aires", localidad: "Longchamps", lat: null, lng: null },
  { id: 67, name: "Sanitarios Uriarte", address: "Av. Uriarte 531", provincia: "Buenos Aires", localidad: "Lanús", lat: null, lng: null },
  { id: 68, name: "Dago", address: "Calle 528 Bis esq. 116 Nº 393", provincia: "Buenos Aires", localidad: "La Plata", lat: null, lng: null },
  { id: 69, name: "Sanitarios Boedo", address: "Boedo 952", provincia: "Buenos Aires", localidad: "Lomas de Zamora", lat: null, lng: null }
];


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