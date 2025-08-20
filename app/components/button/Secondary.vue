<template>
    <NuxtLink v-if="to" :to="to"
        class="bg-secondary hover:bg-white rounded-full text-white hover:text-terciary text-base font-bold transition duration-300 py-[0.906rem] px-5">
        <slot />
    </NuxtLink>
    <button v-else type="button"
        class="bg-secondary hover:bg-white rounded-full text-white hover:text-terciary text-base font-bold transition duration-300 py-[0.906rem] px-5">
        <slot />
    </button>
</template>

<script setup>
defineProps({
    to: {
        type: [String, Object],
        default: null
    }
})
</script>