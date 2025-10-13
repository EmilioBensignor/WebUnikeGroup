<template>
    <NuxtLink v-if="to" :to="to"
        class="bg-primary rounded-full text-white text-base font-bold transition duration-300 py-[0.906rem] px-5 sm:px-10">
        <slot />
    </NuxtLink>
    <a v-else-if="href" :href="href" :target="target" :rel="rel" :download="download"
        class="bg-primary rounded-full text-white text-base font-bold transition duration-300 py-[0.906rem] px-5 sm:px-10">
        <slot />
    </a>
    <button v-else type="button"
        class="bg-primary rounded-full text-white text-base font-bold transition duration-300 py-[0.906rem] px-5 sm:px-10">
        <slot />
    </button>
</template>

<script setup>
defineProps({
    to: {
        type: [String, Object],
        default: null
    },
    href: {
        type: String,
        default: null
    },
    target: {
        type: String,
        default: null
    },
    rel: {
        type: String,
        default: null
    },
    download: {
        type: [String, Boolean],
        default: null
    }
})
</script>