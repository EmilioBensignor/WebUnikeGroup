<template>
    <div class="w-full md:w-1/2">
        <div v-if="loading" class="flex justify-center items-center py-8">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>

        <div v-else-if="!producto" class="text-center py-8">
            <p class="text-lg text-dark">Producto no encontrado</p>
            <p class="text-sm text-dark mt-2">
                Categoría: {{ route.params.categoria }} | Producto: {{ route.params.producto }}
            </p>
        </div>

        <div v-else-if="has3DViewer">
            <div class="xr-wrap">
                <div class="xr-box">
                    <iframe :src="get3DViewerUrl()" allowfullscreen scrolling="no" class="xr-iframe"></iframe>
                </div>
            </div>
            <div class="w-full flex justify-center">
                <Icon name="material-symbols:360-rounded" class="w-6 h-6 text-primary flex-shrink-0 mx-auto" />
            </div>
        </div>

        <div v-else-if="producto.xr_status === 'pending'" class="text-center py-8">
            <p>Procesando el modelo 3D… actualizando…</p>
        </div>

        <div v-else-if="producto.imagen" class="w-full">
            <NuxtImg :src="getImageUrl(producto.imagen)" :alt="producto.nombre"
                class="w-full h-auto object-contain rounded-lg" loading="lazy" />
        </div>

        <div v-else class="text-center py-8">
            <p>Este producto no tiene imagen disponible.</p>
        </div>
    </div>
</template>

<script setup>
import { useWaterplastProductos } from '~/composables/waterplast/useProductos'

const route = useRoute()
const supabase = useSupabaseClient()
const config = useRuntimeConfig()
const { processProductoHTML } = useWaterplastProductos()

const loading = ref(true)
const producto = ref(null)
const processedProducto = ref(null)
let timer = null

const has3DViewer = computed(() => {
    return (producto.value && (
        producto.value.archivo_html ||
        (producto.value.xr_viewer_path && producto.value.xr_status === 'ready')
    )) || (processedProducto.value && processedProducto.value.processed_html)
})

const get3DViewerUrl = () => {
    if (processedProducto.value && processedProducto.value.processed_html) {
        const blob = new Blob([processedProducto.value.processed_html], { type: 'text/html' })
        return URL.createObjectURL(blob)
    }

    if (!producto.value) return ''

    if (producto.value.archivo_html) {
        if (producto.value.archivo_html.startsWith('http')) {
            return producto.value.archivo_html
        }
        return `${config.public.supabase.url}/storage/v1/object/public/waterplast-productos/${producto.value.archivo_html}`
    }

    if (producto.value.xr_viewer_path) {
        return producto.value.xr_viewer_path
    }

    return ''
}

const getImageUrl = (imagen) => {
    if (!imagen) return ''
    if (imagen.startsWith('http')) return imagen
    return `${config.public.supabase.url}/storage/v1/object/public/waterplast-productos/${imagen}`
}

const fetchProducto = async () => {
    try {
        const { data, error } = await supabase
            .from('waterplast-productos')
            .select(`
                *,
                categoria:categoria_id (
                id,
                nombre,
                slug,
                color
                )
            `)
            .eq('slug', route.params.producto)
            .single()

        if (error) throw error
        producto.value = data

        if (data && data.archivo_html) {
            try {
                const processed = await processProductoHTML(data)
                processedProducto.value = processed
            } catch (processError) {
                console.warn('Error processing HTML:', processError)
            }
        }
    } catch (error) {
        console.error('Error al cargar producto:', error)
        producto.value = null
    } finally {
        loading.value = false
    }
}

const startPolling = () => {
    if (producto.value?.xr_status === 'pending') {
        timer = setInterval(async () => {
            await fetchProducto()
            if (producto.value?.xr_status === 'ready' || producto.value?.xr_status === 'failed') {
                clearInterval(timer)
                timer = null
            }
        }, 10000)
    }
}

onMounted(async () => {
    await fetchProducto()
    startPolling()
})

onBeforeUnmount(() => {
    if (timer) {
        clearInterval(timer)
        timer = null
    }
})
</script>

<style scoped>
.xr-box {
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 75%;
    overflow: hidden;
    background-color: transparent;
}

.xr-iframe {
    position: absolute;
    inset: 0;
    width: 1px;
    min-width: 100%;
    height: 100%;
    border: 0;
    background-color: transparent;
}
</style>