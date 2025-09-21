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

      <div v-else-if="producto.xr_viewer_path && producto.xr_status === 'ready'" class="w-full">
        <div class="w-full" style="aspect-ratio:16/9; max-width:1200px; margin-inline:auto;">
          <iframe :src="producto.xr_viewer_path" class="w-full h-full" style="border:0;" allowfullscreen
            loading="lazy" referrerpolicy="no-referrer" />
        </div>
        <div class="text-center mt-3">
          <a :href="producto.xr_viewer_path" target="_blank" rel="noopener" class="underline">
            Abrir visor 3D en una pestaña nueva
          </a>
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

const route = useRoute()
const supabase = useSupabaseClient()

const loading = ref(true)
const producto = ref(null)
let timer = null

const fetchProducto = async () => {
  try {
    const { data, error } = await supabase
      .from('waterplast-productos')
      .select('*')
      .eq('slug', route.params.producto)
      .single()

    if (error) throw error
    producto.value = data
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
