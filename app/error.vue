<template>
    <DefaultHeader />
    <DefaultMain>
        <span class="bg-gradient-hero lg:w-full lg:h-[22.25rem] xxl:h-[23.5rem] hidden lg:block lg:absolute lg:top-0"></span>
        <DefaultSection class="items-center gap-6 md:gap-8 lg:gap-12 xxl:gap-16 py-6 px-4 md:p-8 lg:pt-[11.75rem] xxl:pt-52">

            <div class="lg:max-w-[53rem] flex flex-col text-center text-dark gap-2 lg:gap-4">
                <HeadingH1>Lo sentimos no encontramos la página que buscas</HeadingH1>
                <p class="text-sm md:text-base lg:text-[1.75rem] font-medium">Te invitamos a explorar nuestras
                    soluciones para tu día a día</p>
            </div>
            <div class="flex justify-center flex-wrap md:flex-nowrap gap-2 lg:gap-4">
                <NuxtLink :to="ROUTES_NAMES.HOME"
                    class="w-72 md:w-[14.5rem] lg:w-[19.25rem] xxl:w-[23rem] flex flex-col gap-2.5 bg-white rounded-2xl shadow-md shadow-black/20 p-4 lg:p-6">
                    <NuxtImg src="/images/404/Waterplast.webp" alt="Waterplast" class="w-full h-40 md:h-32 lg:h-40 xxl:h-52" />
                    <p class="text-xs lg:text-base text-dark font-medium">Soluciones en almacenamiento y manejo del
                        agua.</p>
                </NuxtLink>
                <div
                    class="w-72 md:w-[14.5rem] lg:w-[19.25rem] xxl:w-[23rem] flex flex-col gap-2.5 bg-white rounded-2xl shadow-md shadow-black/20 p-4 lg:p-6">
                    <div class="w-full relative">
                        <NuxtImg src="/images/404/Rohermet-Dev.webp" alt="Rohermet"
                            class="w-full h-40 md:h-32 lg:h-40 xxl:h-52" />
                        <span
                            class="w-max absolute top-1/2 left-0 right-0 -translate-y-1/2 bg-primary rounded-full text-sm text-white font-semibold py-1 px-4 mx-auto">Web
                            en desarrollo</span>
                    </div>
                    <p class="text-xs lg:text-base text-dark font-medium">Desarrollo en instalaciones y componentes
                        sanitarios.</p>
                </div>
                <div
                    class="w-72 md:w-[14.5rem] lg:w-[19.25rem] xxl:w-[23rem] flex flex-col gap-2.5 bg-white rounded-2xl shadow-md shadow-black/20 p-4 lg:p-6">
                    <div class="w-full relative">
                        <NuxtImg src="/images/404/Murallon-Dev.webp" alt="Murallón"
                            class="w-full h-40 md:h-32 lg:h-40 xxl:h-52" />
                        <span
                            class="w-max absolute top-1/2 left-0 right-0 -translate-y-1/2 bg-primary rounded-full text-sm text-white font-semibold py-1 px-4 mx-auto">Web
                            en desarrollo</span>
                    </div>
                    <p class="text-xs lg:text-base text-dark font-medium">Pinturas para varierdad de espacios de tu
                        casa. </p>
                </div>
            </div>
            <ButtonPrimary :to="ROUTES_NAMES.HOME">Volver a la página principal</ButtonPrimary>
        </DefaultSection>
    </DefaultMain>
    <DefaultFooter />
</template>

<script setup>
import { ROUTES_NAMES } from './constants/ROUTE_NAMES';
</script>