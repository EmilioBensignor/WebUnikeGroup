<template>
  <DefaultMain>
    <DefaultSection class="flex flex-col md:relative lg:-mt-20 xxl:-mt-[5.25rem]">
      <div class="w-full">
        <NuxtImg v-if="categoriaData?.imagen_s_categorias" :src="getImageUrl(categoriaData.imagen_s_categorias)"
          class="w-full block md:hidden" />
        <NuxtImg v-if="categoriaData?.imagen_m_categorias" :src="getImageUrl(categoriaData.imagen_m_categorias)"
          class="w-full hidden md:block lg:hidden" />
        <NuxtImg v-if="categoriaData?.imagen_l_categorias" :src="getImageUrl(categoriaData.imagen_l_categorias)"
          class="w-full hidden lg:block xxl:hidden" />
        <NuxtImg v-if="categoriaData?.imagen_xl_categorias" :src="getImageUrl(categoriaData.imagen_xl_categorias)"
          class="w-full hidden xxl:block" />
      </div>
      <div
        class="md:max-w-xs lg:max-w-[25rem] xxl:w-full xxl:max-w-[1304px] flex flex-col gap-4 md:absolute md:top-24 lg:top-[16.75rem] xxl:top-[18rem] md:left-8 lg:left-16 xxl:left-0 xxl:right-0 px-4 lg:px-0 xxl:mx-auto">
        <HeadingH1 class="absolute -z-10 lg:static lg:z-0 text-white">{{ categoriaData?.nombre }}</HeadingH1>
        <div class="flex items-center gap-4">
          <NuxtImg :src="getImageUrl(categoriaData?.icono1)" :alt="categoriaData?.caracteristica1"
            class="w-12 lg:w-14 h-12 lg:h-14" />
          <p class="text-sm lg:text-2xl md:text-white font-semibold">{{ categoriaData?.caracteristica1 }}</p>
        </div>
        <div class="flex items-center gap-4">
          <NuxtImg :src="getImageUrl(categoriaData?.icono2)" :alt="categoriaData?.caracteristica2"
            class="w-12 lg:w-14 h-12 lg:h-14" />
          <p class="text-sm lg:text-2xl md:text-white font-semibold">{{ categoriaData?.caracteristica2 }}</p>
        </div>
        <div class="flex items-center gap-4">
          <NuxtImg :src="getImageUrl(categoriaData?.icono3)" :alt="categoriaData?.caracteristica3"
            class="w-12 lg:w-14 h-12 lg:h-14" />
          <p class="text-sm lg:text-2xl md:text-white font-semibold">{{ categoriaData?.caracteristica3 }}</p>
        </div>
      </div>
    </DefaultSection>

    <DefaultSection>
      <div v-if="!isClient || loading" class="text-center py-8">
        <p>Cargando productos...</p>
      </div>

      <div v-else-if="error" class="text-center text-error py-8">
        <p>Error al cargar productos: {{ error }}</p>
      </div>

      <div v-else-if="productos.length === 0" class="text-center py-8">
        <p>No hay productos disponibles en esta categoría.</p>
      </div>

      <WaterplastCategoriaFiltros v-else :categoria-actual="categoriaData" :productos="productos" />
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
const { fetchCategoriaBySlug, getCategoriaImageUrl } = useWaterplastCategorias()

const categoriaData = ref(null)
const isClient = ref(false)

const getImageUrl = (imagePath) => {
  return getCategoriaImageUrl(imagePath)
}

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