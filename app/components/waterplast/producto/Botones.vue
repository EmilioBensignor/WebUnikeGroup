<template>
    <div v-if="producto" class="w-full md:max-w-72 flex flex-col sm:flex-row md:flex-col items-center gap-2 lg:gap-4">
        <ButtonPrimary :href="whatsappLink" target="_blank" rel="noopener noreferrer"
            class="w-full lg:w-1/2 flex justify-center items-center gap-2.5 sm:px-6">
            <NuxtImg src="/images/redes/Whatsapp.svg" alt="Logo Whatsapp" class="w-6 h-6 flex-shrink-0" />
            <span class="xxl:hidden font-bold">Consultar</span>
            <span class="hidden xxl:inline font-bold">Consultar por este producto</span>
        </ButtonPrimary>

        <ButtonPrimary v-if="producto.ficha_tecnica" :href="getFichaTecnicaUrl(producto.ficha_tecnica)" download
            class="w-full lg:w-1/2 flex justify-center items-center gap-2.5 !bg-gray-blue !text-terciary sm:px-6">
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

const getFichaTecnicaUrl = (fichaTecnica) => {
    if (!fichaTecnica) return ''
    if (fichaTecnica.startsWith('http')) return fichaTecnica
    return `${config.public.supabase.url}/storage/v1/object/public/waterplast-productos/${fichaTecnica}`
}
</script>