<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
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