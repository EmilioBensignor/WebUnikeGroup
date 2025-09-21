<template>
  <DefaultMain>
    <DefaultSection class="my-32">
      <HeadingH1>Waterplast</HeadingH1>
      <ul>
        <li>
          <NuxtLink :to="ROUTES_NAMES.WATERPLAST.CATEGORIA('tanques')">Tanques</NuxtLink>
        </li>
        <li>
          <NuxtLink :to="ROUTES_NAMES.WATERPLAST.CATEGORIA('accesorios')">Accesorios</NuxtLink>
        </li>
      </ul>
    </DefaultSection>
  </DefaultMain>
</template>

<script setup>
import { ROUTES_NAMES } from '~/constants/ROUTE_NAMES'

definePageMeta({
  layout: 'waterplast'
})
</script>