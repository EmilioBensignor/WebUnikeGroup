<template>
    <div class="bg-white border border-gray-300 rounded-lg overflow-hidden transition-all duration-300"
         :class="{ 'border-primary': isOpen && !disabled }"
         data-dropdown>
        <button @click="$emit('toggle')" :disabled="disabled"
            class="w-full px-4 py-3 focus:outline-none text-left flex items-center justify-between transition-colors"
            :class="!disabled ? 'hover:bg-gray-50' : 'opacity-50 cursor-not-allowed'">
            <span class="text-gray-700">{{ value || placeholder }}</span>
            <Icon name="material-symbols:keyboard-arrow-down-rounded" 
                class="w-5 h-5 text-gray-400 transition-transform duration-300"
                :class="{ 'rotate-180': isOpen }" />
        </button>
        
        <Transition name="expand">
            <div v-if="isOpen && !disabled" class="border-t border-gray-200">
                <div class="p-3 bg-gray-50">
                    <input :value="search" @input="$emit('update:search', $event.target.value)" 
                        type="text" :placeholder="`Buscar ${id}...`"
                        class="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                </div>
                <div class="max-h-48 overflow-y-auto">
                    <button v-for="option in options" :key="getOptionKey(option)"
                        @click="$emit('select', option)"
                        class="w-full px-4 py-2.5 text-left hover:bg-gray-50 transition-colors text-sm text-gray-700"
                        :class="{ 'bg-primary/10 text-primary font-medium': isSelected(option) }">
                        {{ getOptionDisplay(option) }}
                    </button>
                    <div v-if="options.length === 0" class="px-4 py-3 text-sm text-gray-500 text-center">
                        No se encontraron {{ id }}s
                    </div>
                </div>
            </div>
        </Transition>
    </div>
</template>

<script setup>
const props = defineProps({
    id: String,
    value: [String, Number],
    placeholder: String,
    options: Array,
    search: String,
    isOpen: Boolean,
    disabled: Boolean,
    optionKey: {
        type: String,
        default: null
    }
})

defineEmits(['toggle', 'select', 'update:search'])

const getOptionKey = (option) => {
    return typeof option === 'object' ? option.id || option[props.optionKey] : option
}

const getOptionDisplay = (option) => {
    return typeof option === 'object' ? option[props.optionKey] || option.name : option
}

const isSelected = (option) => {
    if (typeof option === 'object') {
        return props.value === (option[props.optionKey] || option.name)
    }
    return props.value === option
}
</script>

<style scoped>
.expand-enter-active,
.expand-leave-active {
    transition: all 0.3s ease-out;
    transform-origin: top;
}

.expand-enter-from,
.expand-leave-to {
    max-height: 0;
    opacity: 0;
    transform: scaleY(0);
}

.expand-enter-to,
.expand-leave-from {
    max-height: 300px;
    opacity: 1;
    transform: scaleY(1);
}
</style>