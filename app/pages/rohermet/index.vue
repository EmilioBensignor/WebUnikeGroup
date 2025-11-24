<template>
    <div>
        <h1>Rohermet</h1>

        <div v-if="loading">Cargando categor�as...</div>
        <div v-else-if="error" style="color: red;">Error: {{ error }}</div>
        <ul v-else>
            <li v-for="categoria in categorias" :key="categoria.id">
                <NuxtLink :to="`/rohermet/${categoria.slug}`">
                    {{ categoria.nombre }}
                </NuxtLink>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { useRohermetCategorias } from '~/composables/rohermet/useCategorias'

definePageMeta({
    layout: 'default'
});

const { categorias, loading, error, fetchCategorias } = useRohermetCategorias()

onMounted(async () => {
    try {
        await fetchCategorias()
    } catch (err) {
        console.error('Error cargando categor�as:', err)
    }
})
</script>
