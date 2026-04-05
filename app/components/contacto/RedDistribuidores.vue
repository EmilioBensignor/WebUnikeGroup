<template>
    <DefaultSection class="pb-6 px-4 md:pt-0 md:p-8 lg:px-16 lg:pb-12 xxl:pb-16">
        <div
            class="xxl:max-w-[1304px] xxl:w-full flex flex-col items-center md:items-start gap-6 xxl:gap-8 bg-[url('/images/waterplast/sobre/banner_tutoriales_320.webp')] sm:bg-[url('/images/waterplast/sobre/banner_tutoriales_768.webp')] lg:bg-[url('/images/waterplast/sobre/banner_tutoriales_1080.webp')] xxl:bg-[url('/images/waterplast/sobre/banner_tutoriales_1440.webp')] bg-cover bg-center bg-no-repeat rounded-2xl md:rounded-3xl p-6 md:px-8 md:py-9 lg:py-14 xxl:px-16">
            <div
                class="md:max-w-[22rem] lg:max-w-full flex flex-col md:items-start gap-3 xxl:gap-4 text-center md:text-start text-white">
                <HeadingH2>Red de distribuidores Unike Group</HeadingH2>
                <p class="lg:max-w-[32rem] text-sm lg:text-base font-medium">
                    Tenemos una amplia red de distribuidores de nuestros productos a lo ancho y largo de todo el
                    país,
                    te invitamos a encontrar tu distribuidor más cercano aquí debajo
                </p>
            </div>
            <ButtonPrimary :to="ROUTES_NAMES.DISTRIBUIDORES" class="bg-terciary">
                Ver distribuidores
            </ButtonPrimary>
        </div>
    </DefaultSection>
</template>

<script setup>
import { ROUTES_NAMES } from '~/constants/ROUTE_NAMES';

</script>