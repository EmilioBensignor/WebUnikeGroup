<template>
    <div class="md:w-48 md:h-12 md:flex md:justify-center md:items-center relative bg-white rounded-2xl md:border-2 md:border-primary md:rounded-full overflow-hidden transition-all duration-300"
        :class="{ 'border-primary': isOpen && !disabled }" data-dropdown>
        <button ref="button" @click="$emit('toggle')" :disabled="disabled"
            class="w-full flex items-center justify-between text-left outline-none transition-colors px-4 py-3 md:pl-6">
            <span class="text-dark font-bold truncate max-w-[calc(100%-2rem)]">{{ value || placeholder }}</span>
            <span
                class="w-6 h-6 flex justify-center items-center rounded-full shadow-md shadow-dark/20 transition-transform duration-300"
                :class="{ 'rotate-180': isOpen }">
                <Icon name="material-symbols:keyboard-arrow-down-rounded" class="w-6 h-6 text-secondary" />
            </span>
        </button>

        <Transition name="expand">
            <div v-if="isOpen && !disabled" ref="dropdown"
                class="md:w-56 md:max-h-80 flex flex-col gap-2.5 md:fixed md:z-[9999] md:bg-white md:shadow-md shadow-dark/20 md:rounded-2xl p-3"
                :style="dropdownStyle">
                <div class="relative">
                    <input :id="id" :value="search" @input="$emit('update:search', $event.target.value)" type="text"
                        placeholder="Buscar"
                        class="w-full border border-primary rounded-xl text-xs outline-none p-3 pr-10">
                    <span
                        class="flex justify-center items-center absolute right-3 top-1/2 transform -translate-y-1/2 text-primary">
                        <Icon name="material-symbols:search" class="w-5 h-5" />
                    </span>
                </div>
                <div class="max-h-48 md:max-h-none relative z-10 overflow-y-auto">
                    <button v-for="option in options" :key="getOptionKey(option)" @click="$emit('select', option)"
                        class="w-full hover:bg-gray-mid/50 rounded-xl text-sm text-dark text-left transition-colors duration-200 py-2.5 px-3"
                        :class="{ 'bg-gray-mid': isSelected(option) }">
                        {{ getOptionDisplay(option) }}
                    </button>
                    <div v-if="options.length === 0" class="text-sm text-dark text-center px-4 py-3">
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

const button = ref(null)
const dropdownStyle = ref({})

const updateDropdownPosition = () => {
    if (button.value && window.innerWidth >= 768) {
        const rect = button.value.getBoundingClientRect()
        dropdownStyle.value = {
            top: `${rect.bottom + 8}px`,
            left: `${rect.left - 16}px`
        }
    }
}

watch(() => props.isOpen, (newVal) => {
    if (newVal) {
        nextTick(() => {
            updateDropdownPosition()
        })
    }
})

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
    opacity: 0;
    max-height: 0;
}

.expand-enter-to,
.expand-leave-from {
    opacity: 1;
    max-height: 400px;
}

@media (min-width: 768px) {

    .expand-enter-from,
    .expand-leave-to {
        opacity: 0;
        transform: scaleY(0);
    }

    .expand-enter-to,
    .expand-leave-from {
        opacity: 1;
        transform: scaleY(1);
    }
}
</style>
