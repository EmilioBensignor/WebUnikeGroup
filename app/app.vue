<template>
  <div :data-brand="brand">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
const { brand } = useBrand();
const { preloadCriticalData, preloadFeaturedImages } = usePreloadData();

onMounted(async () => {
  try {
    await Promise.all([
      preloadCriticalData(),
      preloadFeaturedImages()
    ]);
  } catch (error) {
    console.warn('Error al precargar datos:', error);
  }
});
</script>