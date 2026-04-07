<template>
    <DefaultSection class="relative lg:-mt-32">
        <picture class="w-full">
            <NuxtImg src="/images/unike/contacto/Contacto-Unike-1440.png" alt="Unike Group" format="webp" quality="75"
                fetchpriority="high" decoding="async"
                class="hidden xxl:block w-full h-[32rem] object-cover object-center" />

            <NuxtImg src="/images/unike/contacto/Contacto-Unike-1080.png" alt="Unike Group" format="webp" quality="75"
                fetchpriority="high" decoding="async"
                class="hidden lg:block xxl:hidden w-full h-[34rem] object-cover object-right xxl:object-center" />

            <NuxtImg src="/images/unike/contacto/Contacto-Unike-768.png" alt="Unike Group" format="webp" quality="75"
                fetchpriority="high" decoding="async" class="hidden md:block lg:hidden w-full h-full object-cover" />

            <NuxtImg src="/images/unike/contacto/Contacto-Unike-320.webp" alt="Unike Group" quality="75"
                decoding="async" class="block md:hidden w-full h-full object-cover" />
        </picture>

        <div class="md:absolute md:inset-0 bg-primary-gradient md:bg-none py-6 px-4 md:px-8 lg:p-16">
            <div
                class="xxl:w-full xxl:max-w-[1304px] md:h-full flex flex-col md:justify-center lg:justify-end gap-2 md:gap-3 lg:gap-4 text-white mx-auto">
                <HeadingH1 class="md:max-w-[20rem] lg:max-w-full xxl:max-w-[45rem]">
                    Información de contacto
                </HeadingH1>
                <p class="md:max-w-[25rem] lg:max-w-[35rem] xxl:max-w-[40rem] text-sm md:text-base lg:text-xl xxl:text-2xl font-medium">
                    Si tienes alguna duda o deseas más información sobre nuestros productos puedes escribirnos y nos
                    pondremos en contacto a la brevedad
                </p>
            </div>
        </div>
    </DefaultSection>
</template>