<template>
    <NuxtLink to="#" class="flex flex-col gap-2 bg-gray-light rounded-2xl lg:rounded-3xl shadow-md shadow-dark/20 p-2 pb-3">
        <NuxtImg :src="post.img" :alt="post.titulo" class="w-full h-28 lg:h-36 xxl:h-44 object-cover rounded-xl lg:rounded-2xl" />
        <div class="flex flex-col gap-4 text-terciary px-3 md:px-2">
            <p class="text-sm lg:text-base font-semibold">{{ post.titulo }}</p>
            <p class="text-xs lg:text-sm font-medium">Por {{ post.autor }} - {{ post.fecha }}</p>
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