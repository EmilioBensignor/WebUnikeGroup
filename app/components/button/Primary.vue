<template>
    <NuxtLink v-if="to" :to="to"
        class="bg-primary rounded-full text-white text-base font-bold transition duration-300 py-[0.906rem] px-5">
        <slot />
    </NuxtLink>
    <button v-else type="button"
        class="bg-primary rounded-full text-white text-base font-bold transition duration-300 py-[0.906rem] px-5">
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