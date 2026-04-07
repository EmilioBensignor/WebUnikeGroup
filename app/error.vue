<template>
    <DefaultHeader />
    <DefaultMain>
        <span
            class="bg-gradient-hero lg:w-full lg:h-[22.25rem] xxl:h-[23.5rem] hidden lg:block lg:absolute lg:top-0"></span>
        <DefaultSection
            class="items-center py-6 px-4 md:p-8 lg:pt-[11.75rem] xxl:pt-52">

            <div class="lg:max-w-[53rem] flex flex-col text-center text-dark gap-2 lg:gap-4">
                <HeadingH1>Lo sentimos no encontramos la página que buscas</HeadingH1>
                <p class="text-sm md:text-base lg:text-[1.75rem] font-medium">Te invitamos a explorar nuestras
                    soluciones para tu día a día</p>
            </div>
            <UnikeMarcasCards :show-title="false" />
            <ButtonPrimary :to="ROUTES_NAMES.HOME">Volver a la página principal</ButtonPrimary>
        </DefaultSection>
    </DefaultMain>
    <DefaultFooter />
</template>

<script setup>
import { ROUTES_NAMES } from './constants/ROUTE_NAMES';
</script>