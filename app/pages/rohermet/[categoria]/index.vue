<template>
    <div>
        <div v-if="!isClient || categoriaLoading">Cargando categor�a...</div>

        <div v-else-if="categoriaError" style="color: red;">
            Error al cargar categor�a: {{ categoriaError }}
        </div>

        <div v-else-if="categoriaData">
            <h1>{{ categoriaData.nombre }}</h1>
            <p v-if="categoriaData.descripcion">{{ categoriaData.descripcion }}</p>

            <div v-if="productsLoading">Cargando productos...</div>
            <div v-else-if="productsError" style="color: red;">
                Error al cargar productos: {{ productsError }}
            </div>
            <div v-else-if="productos.length === 0">
                No hay productos en esta categor�a
            </div>
            <ul v-else>
                <li v-for="producto in productos" :key="producto.id">
                    <NuxtLink :to="`/rohermet/${categoria}/${producto.slug || producto.id}`">
                        {{ producto.nombre }}
                    </NuxtLink>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { useRohermetCategorias } from '~/composables/rohermet/useCategorias'
import { useRohermetProductos } from '~/composables/rohermet/useProductos'

definePageMeta({
    layout: 'default'
});

const route = useRoute()
const categoria = route.params.categoria

const { currentCategoria: categoriaData, loading: categoriaLoading, error: categoriaError, fetchCategoriaBySlug } = useRohermetCategorias()
const { productos, loading: productsLoading, error: productsError, fetchProductosByCategoria } = useRohermetProductos()

const isClient = ref(false)

onMounted(async () => {
    isClient.value = true
    try {
        await fetchCategoriaBySlug(categoria)
        await fetchProductosByCategoria(categoria)
    } catch (err) {
        console.error('Error:', err)
    }
})
</script>
