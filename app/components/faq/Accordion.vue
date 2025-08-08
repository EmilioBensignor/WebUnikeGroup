<template>
    <div class="border-b border-gray-mid">
        <button @click="isOpen = !isOpen" class="w-full flex justify-between items-center gap-6 pb-3 md:pb-4">
            <p class="text-left text-sm md:text-base text-terciary font-medium">{{ faq.pregunta }}</p>
            <span class="w-6 h-6 flex justify-center items-center flex-shrink-0 bg-white rounded-full shadow-1 transition duraion-300"
                :class="{ 'rotate-180': isOpen }">
                <Icon name="material-symbols:chevron-right-rounded"
                    class="w-6 h-6 text-primary transform rotate-90 transition-transform duration-200" />
            </span>
        </button>

        <div class="grid transition-all duration-300 ease-in-out"
            :class="isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'">
            <div class="overflow-hidden">
                <div class="pb-3 md:pb-4">
                    <p class="text-xs md:text-sm text-terciary font-medium">{{ faq.respuesta }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    faq: {
        type: Object,
        required: true
    }
})

const isOpen = ref(false)
</script>