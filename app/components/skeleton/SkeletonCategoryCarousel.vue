<template>
  <div class="w-full overflow-hidden">
    <div class="h-8 bg-gray-200 rounded-lg mb-6 w-1/4 animate-pulse" />

    <div class="flex gap-4 overflow-x-auto pb-4">
      <div
        v-for="n in 4"
        :key="n"
        class="flex-shrink-0 w-64 animate-pulse"
      >
        <div class="w-full h-40 bg-gray-200 rounded-lg mb-3" />

        <div class="h-6 bg-gray-200 rounded-lg mb-2 w-3/4" />

        <div class="h-4 bg-gray-200 rounded-lg w-full mb-2" />
        <div class="h-4 bg-gray-200 rounded-lg w-5/6" />
      </div>
    </div>
  </div>
</template>