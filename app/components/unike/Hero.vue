<template>
    <DefaultSection class="relative lg:-mt-32">
        <picture class="w-full">
            <NuxtImg src="/images/unike/hero/unike_hero_quienes_somos_1512.webp" alt="Unike Group" format="webp" quality="75"
                fetchpriority="high" decoding="async"
                class="hidden xxl:block w-full h-[38rem] object-cover object-center" />

            <NuxtImg src="/images/unike/hero/unike_hero_quienes_somos_1080.webp" alt="Unike Group" format="webp" quality="75"
                fetchpriority="high" decoding="async"
                class="hidden lg:block xxl:hidden w-full h-[40rem] object-cover object-right xxl:object-center" />

            <NuxtImg src="/images/unike/hero/unike_hero_quienes_somos_768.webp" alt="Unike Group" format="webp" quality="75"
                fetchpriority="high" decoding="async" class="hidden md:block lg:hidden w-full h-full object-cover" />

            <NuxtImg src="/images/unike/hero/unike_hero_quienes_somos_320.webp" alt="Unike Group" quality="75" decoding="async"
                class="block md:hidden w-full h-full object-cover" />
        </picture>

        <div
            class="md:absolute md:inset-0 bg-primary-gradient md:bg-none py-6 px-4 md:px-8 lg:p-16">
            <div class="xxl:w-full xxl:max-w-[1304px] md:h-full flex flex-col md:justify-center lg:justify-end gap-2 md:gap-3 lg:gap-4 text-white mx-auto">
                <HeadingH1 class="md:max-w-[20rem] lg:max-w-[35rem] xxl:max-w-[45rem]">Soluciones para el hogar, la construcción y la industria.</HeadingH1>
                <p class="md:max-w-[25rem] lg:max-w-[35rem] text-sm lg:text-xl font-medium">
                    Somos Unike Group, un grupo de marcas que desarrollan soluciones confiables para distintos sectores
                    del mercado.
                </p>
                <ButtonPrimary :to="ROUTES_NAMES.DISTRIBUIDORES" class="w-max !px-3 md:!px-6">Conocé nuestros distribuidores</ButtonPrimary>
            </div>
        </div>
    </DefaultSection>
</template>

<script setup>
import { ROUTES_NAMES } from '~/constants/ROUTE_NAMES'
</script>