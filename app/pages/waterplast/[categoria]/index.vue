<template>
  <DefaultMain>
    <DefaultSection class="my-32 space-y-8">
      <div>
        <HeadingH1>{{ categoriaData?.nombre || categoria }}</HeadingH1>
        <p v-if="categoriaData?.descripcion" class="text-lg text-gray-600 mt-4">
          {{ categoriaData.descripcion }}
        </p>
      </div>

      <div v-if="!isClient || loading" class="text-center py-8">
        <p>Cargando productos...</p>
      </div>

      <div v-else-if="error" class="text-center text-red-500 py-8">
        <p>Error al cargar productos: {{ error }}</p>
      </div>

      <div v-else-if="productos.length === 0" class="text-center py-8">
        <p>No hay productos disponibles en esta categoría.</p>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <NuxtLink
          v-for="producto in productos"
          :key="producto.id"
          :to="ROUTES_NAMES.WATERPLAST.PRODUCTO(categoria, producto.slug)"
          class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
        >
          <img
            v-if="producto.imagen_principal"
            :src="producto.imagen_principal"
            :alt="producto.nombre"
            class="w-full h-48 object-cover"
          />
          <div class="p-4">
            <h3 class="text-xl font-semibold mb-2">{{ producto.nombre }}</h3>
            <p v-if="producto.descripcion" class="text-gray-600 text-sm">
              {{ producto.descripcion }}
            </p>
          </div>
        </NuxtLink>
      </div>

      <div class="pt-8">
        <NuxtLink :to="ROUTES_NAMES.WATERPLAST.HOME" class="text-blue-600 hover:text-blue-800">
          ← Volver a Waterplast
        </NuxtLink>
      </div>
    </DefaultSection>
  </DefaultMain>
</template>

<script setup>
import { ROUTES_NAMES } from '~/constants/ROUTE_NAMES'
import { useWaterplastProductos } from '~/composables/waterplast/useProductos'
import { useWaterplastCategorias } from '~/composables/waterplast/useCategorias'

definePageMeta({
  layout: 'waterplast'
});

const route = useRoute()
const categoria = route.params.categoria

const { productos, loading, error, fetchProductosByCategoria } = useWaterplastProductos()
const { fetchCategoriaBySlug } = useWaterplastCategorias()

const categoriaData = ref(null)
const isClient = ref(false)

// Evitar hydration mismatch cargando solo en cliente
onMounted(async () => {
  isClient.value = true
  try {
    categoriaData.value = await fetchCategoriaBySlug(categoria)
    await fetchProductosByCategoria(categoria)
  } catch (err) {
    console.error('Error al cargar categoría:', err)
  }
})
</script>