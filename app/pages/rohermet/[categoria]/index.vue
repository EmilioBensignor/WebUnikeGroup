<template>
  <DefaultMain>
    <DefaultSection class="flex flex-col items-center justify-center py-32">
      <HeadingH1 v-if="categoriaData">{{ categoriaData.nombre }}</HeadingH1>
      <p v-else class="text-gray-dark">Cargando categoría...</p>
    </DefaultSection>
  </DefaultMain>
</template>

<script setup>
import { useRohermetCategorias } from '~/composables/rohermet/useCategorias'

definePageMeta({
  layout: 'rohermet'
});

const route = useRoute()
const categoria = route.params.categoria

const { fetchCategoriaBySlug } = useRohermetCategorias()

const categoriaData = ref(null)

onMounted(async () => {
  try {
    categoriaData.value = await fetchCategoriaBySlug(categoria)
  } catch (err) {
    console.error('Error al cargar categoría:', err)
  }
})
</script>
