<template>
  <DefaultMain>
    <DefaultSection class="my-32 space-y-6">
      <HeadingH1>{{ producto?.nombre || route.params.producto }}</HeadingH1>
      <p v-if="producto?.descripcion">{{ producto.descripcion }}</p>

      <div v-if="loading" class="text-center py-8">
        <p>Cargando producto...</p>
      </div>

      <div v-else-if="!producto" class="text-center py-8">
        <p class="text-lg text-gray-600">Producto no encontrado</p>
        <p class="text-sm text-gray-500 mt-2">
          Categoría: {{ route.params.categoria }} | Producto: {{ route.params.producto }}
        </p>
      </div>

      <!-- 3D Viewer -->
      <div v-else-if="has3DViewer" class="w-full">
        <div class="xr-wrap">
          <h2 class="text-xl font-semibold mb-4">Viewer 360°</h2>
          <div class="xr-box">
            <iframe
              :src="get3DViewerUrl()"
              allowfullscreen
              scrolling="no"
              class="xr-iframe"
            ></iframe>
          </div>
          <div class="text-center mt-3">
            <a :href="get3DViewerUrl()" target="_blank" rel="noopener" class="underline text-sm text-gray-600">
              Abrir visor 3D en una pestaña nueva
            </a>
          </div>
        </div>
      </div>

      <div v-else-if="producto.xr_status === 'pending'" class="text-center py-8">
        <p>Procesando el modelo 3D… actualizando…</p>
      </div>

      <div v-else class="text-center py-8">
        <p>Este producto no tiene modelo 3D disponible.</p>
      </div>
    </DefaultSection>
  </DefaultMain>
</template>

<script setup>
definePageMeta({ layout: 'waterplast' })

import { useWaterplastProductos } from '~/composables/waterplast/useProductos'

const route = useRoute()
const supabase = useSupabaseClient()
const { processProductoHTML } = useWaterplastProductos()

const loading = ref(true)
const producto = ref(null)
const processedProducto = ref(null)
let timer = null

// Computed properties for 3D viewer
const has3DViewer = computed(() => {
  return (producto.value && (
    producto.value.archivo_html ||
    (producto.value.xr_viewer_path && producto.value.xr_status === 'ready')
  )) || (processedProducto.value && processedProducto.value.processed_html)
})

const get3DViewerUrl = () => {
  // Priority: processed HTML > archivo_html > xr_viewer_path
  if (processedProducto.value && processedProducto.value.processed_html) {
    // Create blob URL for processed HTML content
    const blob = new Blob([processedProducto.value.processed_html], { type: 'text/html' })
    return URL.createObjectURL(blob)
  }

  if (!producto.value) return ''

  if (producto.value.archivo_html) {
    // If archivo_html is a full URL, use it directly
    if (producto.value.archivo_html.startsWith('http')) {
      return producto.value.archivo_html
    }
    // Otherwise, construct the Supabase storage URL
    const config = useRuntimeConfig()
    return `${config.public.supabase.url}/storage/v1/object/public/waterplast-productos/${producto.value.archivo_html}`
  }

  if (producto.value.xr_viewer_path) {
    return producto.value.xr_viewer_path
  }

  return ''
}

const fetchProducto = async () => {
  try {
    const { data, error } = await supabase
      .from('waterplast-productos')
      .select('*')
      .eq('slug', route.params.producto)
      .single()

    if (error) throw error
    producto.value = data

    // Process HTML if archivo_html exists
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

// Polling conservador solo para consultar estado
const startPolling = () => {
  if (producto.value?.xr_status === 'pending') {
    timer = setInterval(async () => {
      await fetchProducto()
      if (producto.value?.xr_status === 'ready' || producto.value?.xr_status === 'failed') {
        clearInterval(timer)
        timer = null
      }
    }, 10000) // cada 10 segundos
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
/* Estilos para el visor 3D - idénticos al HTML de ejemplo */
.xr-wrap {
  max-width: 1024px;
  margin: 2rem auto;
}

.xr-box {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 75%; /* Aspect ratio 4:3 (1024x768 = 0.75) */
  overflow: hidden;
}

.xr-iframe {
  position: absolute;
  inset: 0;
  width: 1px;
  min-width: 100%;
  height: 100%;
  border: 0;
}
</style>
