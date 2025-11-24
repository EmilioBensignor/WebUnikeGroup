<template>
  <div>
    <div v-if="loading">Cargando producto...</div>

    <div v-else-if="error" style="color: red;">
      Error: {{ error }}
    </div>

    <div v-else-if="producto">
      <h1>{{ producto.nombre }}</h1>
      <p v-if="producto.descripcion">{{ producto.descripcion }}</p>

      <ProductoModelo />
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'default'
});

const route = useRoute()
const supabase = useSupabaseClient()

const loading = ref(true)
const error = ref(null)
const producto = ref(null)

onMounted(async () => {
  try {
    const { data, error: err } = await supabase
      .from('rohermet-productos')
      .select('*')
      .eq('slug', route.params.producto)
      .single()

    if (err) throw err

    producto.value = data
  } catch (err) {
    error.value = err.message
    console.error('Error:', err)
  } finally {
    loading.value = false
  }
})
</script>
