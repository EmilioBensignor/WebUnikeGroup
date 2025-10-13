<template>
  <DefaultMain>
    <DefaultSection class="flex flex-col gap-6 py-6 px-4 md:p-8 lg:py-12 xxl:py-16 lg:px-16">
      <div class="flex flex-col gap-6">
        <div class="flex flex-col gap-3">
          <HeadingH1 class="text-terciary">{{ producto?.nombre || route.params.producto }}</HeadingH1>
          <p class="text-sm text-terciary font-medium">{{ producto?.descripcion }}</p>
        </div>
        <div v-if="loading" class="text-center py-8">
          <p>Cargando producto...</p>
        </div>

        <div v-else-if="!producto" class="text-center py-8">
          <p class="text-lg text-dark">Producto no encontrado</p>
          <p class="text-sm text-dark mt-2">
            Categoría: {{ route.params.categoria }} | Producto: {{ route.params.producto }}
          </p>
        </div>

        <div v-else-if="has3DViewer" class="w-full">
          <div class="xr-wrap">
            <div class="xr-box">
              <iframe :src="get3DViewerUrl()" allowfullscreen scrolling="no" class="xr-iframe"></iframe>
            </div>
          </div>
        </div>

        <div v-else-if="producto.xr_status === 'pending'" class="text-center py-8">
          <p>Procesando el modelo 3D… actualizando…</p>
        </div>

        <div v-else class="text-center py-8">
          <p>Este producto no tiene modelo 3D disponible.</p>
        </div>
      </div>

      <div class="flex flex-col gap-6">
        <div v-if="productosRelacionados.length > 0"
          class="grid grid-cols-4 lg:grid-cols-auto lg:grid-flow-col items-end">
          <NuxtLink v-for="(relacionado, index) in productosRelacionados" :key="relacionado.id"
            :to="`${ROUTES_NAMES.WATERPLAST.HOME}/${relacionado.categoria?.slug}/${relacionado.slug}`"
            :style="getRelacionadoStyle(relacionado, index)" :class="getRelacionadoBorderClass(relacionado, index)"
            class="flex justify-center items-center py-3 px-4">
            <p class="text-center text-xs font-bold text-terciary">{{ relacionado.nombre }}</p>
          </NuxtLink>
        </div>
        <!-- Características -->
        <div v-if="caracteristicasAdicionales.length > 0"
          class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          <div v-for="caracteristica in caracteristicasAdicionales" :key="caracteristica.id"
            class="flex flex-col items-center gap-3">
            <div class="w-16 h-16 flex justify-center items-center rounded-full"
              :style="{ backgroundColor: categoriaColor }">
              <NuxtImg v-if="caracteristica.imagen" :src="caracteristica.imagen" :alt="caracteristica.descripcion"
                class="w-10 h-10 object-contain" loading="lazy" @error="(e) => handleImageError(e, caracteristica)" />
            </div>
            <p class="text-xs lg:text-sm text-center font-medium text-terciary">{{ caracteristica.descripcion }}</p>
          </div>
        </div>

        <div class="w-full flex flex-col items-center gap-2">
          <ButtonPrimary :href="whatsappLink" target="_blank" rel="noopener noreferrer"
            class="w-full flex justify-center items-center gap-2.5">
            <NuxtImg src="/images/redes/Whatsapp.svg" alt="Logo Whatsapp" class="w-6 h-6 flex-shrink-0" />
            <span class="font-bold">Consultar</span>
          </ButtonPrimary>

          <ButtonPrimary v-if="producto?.ficha_tecnica" :href="getFichaTecnicaUrl(producto.ficha_tecnica)" download
            class="w-full flex justify-center items-center gap-2.5 !bg-gray-blue !text-terciary">
            <Icon name="material-symbols:docs-outline-rounded" class="w-6 h-6 flex-shrink-0" />
            <span class="font-bold">Ficha técnica</span>
          </ButtonPrimary>
        </div>
      </div>
    </DefaultSection>
    <WaterplastOpiniones />
    <DefaultSection v-if="imagenesRedes.length > 0" class="flex flex-col items-center gap-3 py-12">
      <HeadingH2 class="text-primary">Seguinos en nuestras redes</HeadingH2>
      <CarouselStatic>
        <NuxtImg v-for="imagen in imagenesRedes" :key="imagen.name" :src="imagen.url" :alt="imagen.name"
          class="w-full h-auto rounded-3xl" />
      </CarouselStatic>
    </DefaultSection>
  </DefaultMain>
</template>

<script setup>
definePageMeta({ layout: 'waterplast' })

import { useWaterplastProductos } from '~/composables/waterplast/useProductos'
import { ROUTES_NAMES } from '~/constants/ROUTE_NAMES'

const route = useRoute()
const supabase = useSupabaseClient()
const config = useRuntimeConfig()
const {
  processProductoHTML,
  fetchProductosRelacionados,
  fetchCaracteristicasAdicionales,
  fetchImagenesRedes
} = useWaterplastProductos()

const loading = ref(true)
const producto = ref(null)
const processedProducto = ref(null)
const productosRelacionados = ref([])
const caracteristicasAdicionales = ref([])
const imagenesRedes = ref([])
let timer = null

const has3DViewer = computed(() => {
  return (producto.value && (
    producto.value.archivo_html ||
    (producto.value.xr_viewer_path && producto.value.xr_status === 'ready')
  )) || (processedProducto.value && processedProducto.value.processed_html)
})

const categoriaColor = computed(() => {
  return producto.value?.categoria?.color || '#E6F3FF'
})

const getRelacionadoStyle = (relacionado, index) => {
  const isSelected = relacionado.slug === route.params.producto
  const baseColor = producto.value?.categoria?.color || '#E6F3FF'

  if (isSelected) {
    return { backgroundColor: '#FFFFFF' }
  }

  const hexToRgba = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    if (result) {
      return `rgba(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}, 0.33)`
    }
    return hex
  }

  return { backgroundColor: hexToRgba(baseColor) }
}

const getRelacionadoBorderClass = (relacionado, index) => {
  const isSelected = relacionado.slug === route.params.producto
  const isFirst = index === 0
  const isFourth = index === 3
  const isFifth = index === 4
  const isLast = index === productosRelacionados.value.length - 1
  const hasFifth = productosRelacionados.value.length >= 5

  const classes = []

  if (isSelected) {
    classes.push('h-[62px]')
  } else {
    classes.push('h-[3.375rem]')
  }

  classes.push('border', 'border-gray-dark')

  if (index % 4 !== 0) {
    classes.push('-ml-[1px]')
  }

  if (index >= 4) {
    classes.push('-mt-[1px]')
  }

  if (isSelected) {
    classes.push('rounded-t-lg')
    if (isFirst && !hasFifth) {
      classes.push('rounded-bl-lg')
    }
  } else {
    if (isFirst && !hasFifth) {
      classes.push('rounded-tl-lg', 'rounded-bl-lg')
    } else if (isFirst) {
      classes.push('rounded-tl-lg')
    }

    if (isFourth) {
      classes.push('rounded-tr-lg', 'rounded-br-lg')
    }

    if (isFifth) {
      classes.push('rounded-bl-lg')
      if (isLast) {
        classes.push('rounded-br-lg')
      }
    }
  }

  classes.push('lg:border', 'lg:border-gray-dark')

  if (!isFirst) {
    classes.push('lg:-ml-[1px]')
  }

  classes.push('lg:mt-0')

  if (isFirst) {
    classes.push('lg:rounded-l-lg', 'lg:rounded-tr-none', 'lg:rounded-br-none')
  }
  if (isLast) {
    classes.push('lg:rounded-r-lg', 'lg:rounded-tl-none', 'lg:rounded-bl-none')
  }
  if (!isFirst && !isLast) {
    classes.push('lg:rounded-none')
  }
  if (isSelected) {
    classes.push('lg:rounded-t-lg')
    if (isFirst) classes.push('lg:rounded-bl-lg')
    if (isLast) classes.push('lg:rounded-br-lg')
  }

  return classes.join(' ')
}

const handleImageError = (event, caracteristica) => {
  console.error('Error loading image:')
  console.error('- URL:', event.target.src)
  console.error('- Característica:', caracteristica)
}

const whatsappLink = computed(() => {
  const phoneNumber = ROUTES_NAMES.CONTACTO.TELEFONO.replace(/[^0-9]/g, '')
  const message = `Hola! Me interesa el producto: ${producto.value?.nombre || ''}`
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
})

const getFichaTecnicaUrl = (fichaTecnica) => {
  if (!fichaTecnica) return ''
  if (fichaTecnica.startsWith('http')) return fichaTecnica
  return `${config.public.supabase.url}/storage/v1/object/public/waterplast-productos/${fichaTecnica}`
}

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

    if (data && data.productos_relacionados && data.productos_relacionados.length > 0) {
      try {
        const relacionados = await fetchProductosRelacionados(data.productos_relacionados)
        productosRelacionados.value = [data, ...relacionados]
      } catch (relacionadosError) {
        console.warn('Error loading related products:', relacionadosError)
        productosRelacionados.value = [data]
      }
    } else {
      productosRelacionados.value = [data]
    }

    if (data && data.id) {
      try {
        caracteristicasAdicionales.value = await fetchCaracteristicasAdicionales(data.id)
      } catch (caracteristicasError) {
        console.warn('Error loading additional characteristics:', caracteristicasError)
      }
    }

    if (data && data.categoria && data.categoria.slug) {
      try {
        imagenesRedes.value = await fetchImagenesRedes(data.categoria.slug)
      } catch (redesError) {
        console.warn('Error loading social media images:', redesError)
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
