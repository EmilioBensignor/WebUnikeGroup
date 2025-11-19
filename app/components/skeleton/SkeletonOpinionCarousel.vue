<template>
  <div class="w-full overflow-hidden">
    <div class="h-8 bg-gray-200 rounded-lg mb-6 w-1/3 animate-pulse" />

    <div class="flex gap-4 overflow-x-auto pb-4">
      <div
        v-for="n in 3"
        :key="n"
        class="flex-shrink-0 w-80 animate-pulse border border-gray-200 rounded-lg p-6"
      >
        <div class="flex items-center gap-3 mb-4">
          <div class="w-12 h-12 bg-gray-200 rounded-full" />
          <div class="flex-1">
            <div class="h-4 bg-gray-200 rounded-lg mb-2 w-3/4" />
            <div class="h-3 bg-gray-200 rounded-lg w-1/2" />
          </div>
        </div>

        <div class="flex gap-1 mb-3">
          <div
            v-for="i in 5"
            :key="i"
            class="w-5 h-5 bg-gray-200 rounded"
          />
        </div>

        <div class="h-5 bg-gray-200 rounded-lg mb-3 w-3/4" />

        <div class="h-4 bg-gray-200 rounded-lg mb-2 w-full" />
        <div class="h-4 bg-gray-200 rounded-lg mb-2 w-full" />
        <div class="h-4 bg-gray-200 rounded-lg w-4/5" />
      </div>
    </div>
  </div>
</template>