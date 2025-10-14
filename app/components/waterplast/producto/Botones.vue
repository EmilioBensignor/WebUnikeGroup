<template>
    <div v-if="producto" class="w-full md:max-w-72 flex flex-col sm:flex-row md:flex-col items-center gap-2 lg:gap-4">
        <ButtonPrimary :href="whatsappLink" target="_blank" rel="noopener noreferrer"
            class="w-full lg:w-1/2 flex justify-center items-center gap-2.5 sm:px-6">
            <NuxtImg src="/images/redes/Whatsapp.svg" alt="Logo Whatsapp" class="w-6 h-6 flex-shrink-0" />
            <span class="xxl:hidden font-bold">Consultar</span>
            <span class="hidden xxl:inline font-bold">Consultar por este producto</span>
        </ButtonPrimary>

        <ButtonPrimary v-if="producto.ficha_tecnica" @click="downloadFichaTecnica"
            class="w-full lg:w-1/2 flex justify-center items-center gap-2.5 !bg-gray-blue !text-terciary sm:px-6 cursor-pointer">
            <Icon name="material-symbols:docs-outline-rounded" class="w-6 h-6 flex-shrink-0" />
            <span class="xxl:hidden font-bold">Ficha técnica</span>
            <span class="hidden xxl:inline font-bold">Descargar ficha técnica</span>
        </ButtonPrimary>
    </div>
</template>

<script setup>
import { ROUTES_NAMES } from '~/constants/ROUTE_NAMES'

const props = defineProps({
    producto: {
        type: Object,
        required: true
    }
})

const config = useRuntimeConfig()

const whatsappLink = computed(() => {
    const phoneNumber = ROUTES_NAMES.CONTACTO.TELEFONO.replace(/[^0-9]/g, '')
    const message = `Hola! Me interesa el producto: ${props.producto?.nombre || ''}`
    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
})

const downloadFichaTecnica = async () => {
    if (!props.producto?.ficha_tecnica) return

    const fichaTecnica = props.producto.ficha_tecnica

    const fileName = fichaTecnica.split('/').pop()
    const extension = fileName.split('.').pop()
    const downloadName = props.producto?.nombre
        ? `${props.producto.nombre}-ficha-tecnica.${extension}`
        : fileName

    let downloadUrl = ''

    if (fichaTecnica.startsWith('http')) {
        downloadUrl = fichaTecnica
    } else {
        downloadUrl = `${config.public.supabase.url}/storage/v1/object/public/waterplast-productos/${fichaTecnica}`
    }

    try {
        const response = await fetch(downloadUrl)
        const blob = await response.blob()

        const blobUrl = URL.createObjectURL(blob)

        const downloadLink = document.createElement('a')
        downloadLink.href = blobUrl
        downloadLink.download = downloadName
        document.body.appendChild(downloadLink)
        downloadLink.click()
        document.body.removeChild(downloadLink)

        setTimeout(() => {
            window.open(downloadUrl, '_blank', 'noopener,noreferrer')
        }, 100)

        setTimeout(() => {
            URL.revokeObjectURL(blobUrl)
        }, 500)
    } catch (error) {
        console.error('Error al descargar ficha técnica:', error)
        const downloadLink = document.createElement('a')
        downloadLink.href = downloadUrl
        downloadLink.download = downloadName
        downloadLink.target = '_blank'
        document.body.appendChild(downloadLink)
        downloadLink.click()
        document.body.removeChild(downloadLink)
    }
}
</script>