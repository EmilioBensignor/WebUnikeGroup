<template>
    <NuxtLink to="#" class="flex flex-col gap-2 bg-white shadow-md shadow-dark/20 rounded-2xl p-4">
        <div class="flex items-center gap-3">
            <NuxtImg :src="opinion.img" :alt="opinion.nombre" class="w-12 h-12 rounded-full" />
            <div class="flex flex-col gap-0.5">
                <div class="flex items-start gap-0.5">
                    <p class="text-xs text-terciary font-semibold">{{ opinion.nombre }}</p>
                    <Icon name="material-symbols:verified" class="w-3 h-3 text-primary -mt-0.5" />
                </div>
                <div class="flex items-center gap-0.5">
                    <Icon v-for="n in Math.floor(opinion.rating)" :key="`full-${n}`"
                        name="material-symbols:star-rounded" class="w-4 h-4 text-secondary" />

                    <Icon v-if="opinion.rating % 1 !== 0"
                        name="material-symbols:star-rounded" class="w-4 h-4 text-secondary opacity-50" />

                    <Icon v-for="n in (5 - Math.ceil(opinion.rating))" :key="`empty-${n}`"
                        name="material-symbols:star-rounded" class="w-4 h-4 text-gray-mid" />
                </div>
            </div>
        </div>
        <div class="flex flex-col gap-1 text-xs text-terciary">
            <p class="font-bold">{{ opinion.opinion }}</p>
            <p class="font-medium">{{ opinion.comentario }}</p>
        </div>
    </NuxtLink>
</template>

<script setup>
defineProps({
    opinion: {
        type: Object,
        required: true
    }
});
</script>