<template>
    <DefaultMain>
        <span
            class="bg-gradient-hero md:w-full md:h-[11.5rem] lg:h-[16.5rem] hidden md:block md:absolute md:top-0"></span>
        <DefaultSection class="px-4 md:px-8 lg:px-16 xxl:px-0 pt-6 md:pt-10 lg:pt-32 xxl:pt-36">
            <div class="xxl:max-w-[1304px] xxl:w-full flex flex-col gap-2 lg:gap-4 text-center lg:text-start text-dark">
                <HeadingH1>Distribuidores Unike Group</HeadingH1>
                <p class="text-sm lg:text-[1.75rem] font-medium">Buscá tu punto de venta más cercano</p>
            </div>
        </DefaultSection>

        <DefaultSection class="px-4 md:px-8 lg:px-16 xxl:px-0 py-6 md:py-8 lg:py-12 xxl:py-16">
            <div class="xxl:max-w-[1304px] xxl:w-full flex flex-col gap-3 md:gap-4 lg:gap-6 xxl:gap-8">

                <div class="flex justify-center gap-3 lg:gap-4">
                    <ButtonPrimary @click="setEmpresa('waterplast')" :class="empresaActiva === 'waterplast'
                        ? '!bg-terciary'
                        : '!bg-transparent !border-2 !border-terciary !text-terciary'">
                        Waterplast
                    </ButtonPrimary>
                    <ButtonPrimary @click="setEmpresa('rohermet')" :class="empresaActiva === 'rohermet'
                        ? '!bg-terciary'
                        : '!bg-transparent !border-2 !border-terciary !text-terciary'">
                        Rohermet
                    </ButtonPrimary>
                </div>

                <Distribuidores :empresa="empresaActiva" :key="empresaActiva" :show-title="false" class="!p-0" />

                <div class="flex flex-col gap-2 mt-2 xxl:px-14">
                    <div v-if="isLoading" class="flex justify-center py-8">
                        <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                    </div>
                    <template v-else>
                        <div v-for="distribuidor in distribuidoresPaginados" :key="distribuidor.id"
                            class="flex flex-col md:flex-row md:justify-between items-center gap-3 py-4 border-b border-gray-mid">
                            <div class="flex flex-col md:items-start gap-2">
                                <div class="flex justify-center items-center gap-2 text-terciary">
                                    <Icon name="material-symbols:shopping-bag-outline"
                                        class="w-6 h-6 flex-shrink-0" />
                                    <HeadingH3>{{
                                        distribuidor.nombreComercio }}</HeadingH3>
                                </div>
                                <p class="text-center md:text-start lg:text-xl font-medium">
                                    {{ distribuidor.calle }}, {{ distribuidor.localidad }}, {{ distribuidor.provincia }}
                                </p>
                            </div>
                            <ButtonPrimary
                                :href="`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${distribuidor.nombreComercio}, ${distribuidor.calle}, ${distribuidor.localidad}, ${distribuidor.provincia}`)}`"
                                target="_blank" rel="noopener noreferrer"
                                class="flex items-center gap-2.5 !bg-terciary">
                                <Icon name="material-symbols:location-on-outline-rounded" class="w-6 h-6" />
                                <span>Ver en Maps</span>
                            </ButtonPrimary>
                        </div>
                        <div v-if="distribuidoresOrdenados.length === 0 && !isLoading"
                            class="text-center py-8 text-dark/50">
                            No se encontraron distribuidores
                        </div>

                        <div v-if="totalPaginas > 1" class="flex justify-center items-center gap-2 pt-4">
                            <button @click="paginaActual--" :disabled="paginaActual === 1"
                                class="w-9 h-9 flex items-center justify-center rounded-full border-2 border-terciary text-terciary disabled:opacity-30 disabled:cursor-not-allowed transition-opacity hover:opacity-70">
                                <Icon name="material-symbols:chevron-left-rounded" class="w-5 h-5" />
                            </button>
                            <span class="text-sm text-dark/60 px-2">
                                {{ paginaActual }} / {{ totalPaginas }}
                            </span>
                            <button @click="paginaActual++" :disabled="paginaActual === totalPaginas"
                                class="w-9 h-9 flex items-center justify-center rounded-full border-2 border-terciary text-terciary disabled:opacity-30 disabled:cursor-not-allowed transition-opacity hover:opacity-70">
                                <Icon name="material-symbols:chevron-right-rounded" class="w-5 h-5" />
                            </button>
                        </div>
                    </template>
                </div>

            </div>
        </DefaultSection>
    </DefaultMain>
</template>

<script setup>
import { useDistribuidores } from '~/composables/useDistribuidores.js'

definePageMeta({
    layout: 'default'
})

useSeoMeta({
    title: 'Distribuidores | Unike Group',
    description: 'Encontrá distribuidores de Waterplast y Rohermet en todo el país.',
})

const empresaActiva = ref('waterplast')
const paginaActual = ref(1)
const POR_PAGINA = 15

const { distribuidores: distribuidoresWaterplast, loading: loadingWp, fetchDistribuidores: fetchWp } = useDistribuidores('waterplast')
const { distribuidores: distribuidoresRohermet, loading: loadingRohermet, fetchDistribuidores: fetchRohermet } = useDistribuidores('rohermet')

const distribuidores = computed(() =>
    empresaActiva.value === 'waterplast' ? distribuidoresWaterplast.value : distribuidoresRohermet.value
)

const isLoading = computed(() =>
    empresaActiva.value === 'waterplast' ? loadingWp.value : loadingRohermet.value
)

const distribuidoresOrdenados = computed(() =>
    [...distribuidores.value].sort((a, b) =>
        (a.nombreComercio || '').localeCompare(b.nombreComercio || '', 'es')
    )
)

const totalPaginas = computed(() => Math.ceil(distribuidoresOrdenados.value.length / POR_PAGINA))

const distribuidoresPaginados = computed(() => {
    const inicio = (paginaActual.value - 1) * POR_PAGINA
    return distribuidoresOrdenados.value.slice(inicio, inicio + POR_PAGINA)
})

const setEmpresa = async (empresa) => {
    if (empresaActiva.value === empresa) return
    empresaActiva.value = empresa
    paginaActual.value = 1
    if (empresa === 'rohermet' && distribuidoresRohermet.value.length === 0) {
        await fetchRohermet()
    }
}

// Reset page when empresa changes
watch(empresaActiva, () => { paginaActual.value = 1 })

onMounted(async () => {
    if (process.client) {
        await fetchWp()
    }
})
</script>
