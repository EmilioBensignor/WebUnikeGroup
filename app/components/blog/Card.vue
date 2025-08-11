<template>
    <NuxtLink to="#" class="flex flex-col gap-2 bg-gray-light rounded-2xl shadow-md shadow-dark/20 p-2 pb-3">
        <NuxtImg :src="post.img" :alt="post.titulo" class="w-full h-28 object-cover rounded-xl" />
        <div class="flex flex-col gap-4 text-terciary px-3 md:px-2">
            <p class="text-sm font-semibold">{{ post.titulo }}</p>
            <p class="text-xs font-medium">Por {{ post.autor }} - {{ post.fecha }}</p>
        </div>
    </NuxtLink>
</template>

<script setup>
defineProps({
    post: {
        type: Object,
        required: true
    }
})
</script>