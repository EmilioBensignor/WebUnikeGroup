<template>
  <div v-if="!isClient || loading || !categoriaData || !contentReady" class="h-screen flex items-center justify-center">
    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  </div>

  <DefaultMain v-else>
    <DefaultSection class="flex flex-col relative lg:-mt-20 xxl:-mt-[5.25rem]">
      <div class="w-full">
        <NuxtImg v-if="categoriaData?.imagen_s_categorias" :src="categoriaData.imagen_s_categorias"
          :alt="`Rohermet Categoría ${categoriaData.nombre}`" class="w-full block md:hidden" />
        <NuxtImg v-if="categoriaData?.imagen_m_categorias" :src="categoriaData.imagen_m_categorias"
          :alt="`Rohermet Categoría ${categoriaData.nombre}`" class="w-full hidden md:block lg:hidden" />
        <NuxtImg v-if="categoriaData?.imagen_l_categorias" :src="categoriaData.imagen_l_categorias"
          :alt="`Rohermet Categoría ${categoriaData.nombre}`" class="w-full hidden lg:block xxl:hidden" />
        <NuxtImg v-if="categoriaData?.imagen_xl_categorias" :src="categoriaData.imagen_xl_categorias"
          :alt="`Rohermet Categoría ${categoriaData.nombre}`" class="w-full hidden xxl:block" />
      </div>
      <div v-if="categoriaData?.nombre"
        class="infoHeader md:max-w-96 lg:max-w-[25rem] xxl:w-full xxl:max-w-[1304px] flex flex-col gap-4 xl:gap-8 md:absolute md:top-6 lg:top-[11.75rem] xxl:top-52 md:left-8 lg:left-16 xxl:left-0 xxl:right-0 p-4 pb-6 md:p-0 xxl:mx-auto">
        <HeadingH1 class="md:text-white font-bold">{{ categoriaData.nombre }}</HeadingH1>
        <div class="flex items-center gap-4">
          <NuxtImg :src="categoriaData?.icono1" :alt="categoriaData?.caracteristica1"
            class="w-12 xl:w-14 h-12 xl:h-14" />
          <p class="text-sm lg:text-xl xxl:text-2xl md:text-white font-medium">{{ categoriaData?.caracteristica1 }}</p>
        </div>
        <div class="flex items-center gap-4">
          <NuxtImg :src="categoriaData?.icono2" :alt="categoriaData?.caracteristica2"
            class="w-12 xl:w-14 h-12 xl:h-14" />
          <p class="text-sm lg:text-xl xxl:text-2xl md:text-white font-medium">{{ categoriaData?.caracteristica2 }}</p>
        </div>
        <div class="flex items-center gap-4">
          <NuxtImg :src="categoriaData?.icono3" :alt="categoriaData?.caracteristica3"
            class="w-12 xl:w-14 h-12 xl:h-14" />
          <p class="text-sm lg:text-xl xxl:text-2xl md:text-white font-medium">{{ categoriaData?.caracteristica3 }}</p>
        </div>
      </div>
    </DefaultSection>

    <DefaultSection>
      <div v-if="error" class="text-center text-error py-8">
        <p>Error al cargar productos: {{ error }}</p>
      </div>

      <div v-else-if="productos.length === 0" class="text-center py-8">
        <p>No hay productos disponibles en esta categoría.</p>
      </div>

      <RohermetCategoriaFiltros v-else :categoria-actual="categoriaData" :productos="productos" />
    </DefaultSection>
  </DefaultMain>
</template>

<script setup>
import { useRohermetCategorias } from '~/composables/rohermet/useCategorias'
import { useRohermetProductos } from '~/composables/rohermet/useProductos'
import { useRohermetSeo } from '~/composables/useSeoMeta'

definePageMeta({
  layout: 'rohermet'
});

const route = useRoute()
const categoria = route.params.categoria

const { productos, loading: productosLoading, error, fetchProductosByCategoria } = useRohermetProductos()
const { fetchCategoriaBySlug } = useRohermetCategorias()
const { setSeoForCategoria } = useRohermetSeo()

const categoriaData = ref(null)
const isClient = ref(false)
const contentReady = ref(false)
const loading = computed(() => productosLoading.value)

onMounted(async () => {
  isClient.value = true
  try {
    categoriaData.value = await fetchCategoriaBySlug(categoria)

    if (categoriaData.value) {
      setSeoForCategoria(categoriaData.value)
    }

    await fetchProductosByCategoria(categoria)
    setTimeout(() => {
      contentReady.value = true
    }, 300)
  } catch (err) {
    console.error('Error al cargar categoría:', err)
  }
})
</script>

<style>
@media screen and (min-width: 1680px) {
  .infoHeader {
    top: 15rem;
    max-width: 94rem;
  }
}

@media screen and (min-width: 1920px) {
  .infoHeader {
    top: 18rem;
    max-width: 100rem;
  }
}
</style>
