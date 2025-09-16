<template>
    <DefaultSection class="md:bg-gray-light md:pt-0 md:pb-8 lg:pb-12 md:px-8 lg:px-16">
        <div class="xxl:max-w-[1304px] xxl:w-full md:flex md:flex-col md:gap-6 xxl:gap-8 relative md:rounded-[48px] pb-6 md:py-8 md:px-12 lg:px-16 overflow-hidden">
            <picture class="absolute inset-0 w-full h-full hidden md:block">
                <source media="(min-width: 1440px)" srcset="/images/waterplast/blog/Blog-1440.webp">
                <source media="(min-width: 1080px)" srcset="/images/waterplast/blog/Blog-1080.webp">
                <img src="/images/waterplast/blog/Blog-768.webp" alt="Blog background" 
                    class="w-full h-full object-cover">
            </picture>
            <div
                class="flex flex-col md:items-start gap-4 md:gap-6 xxl:gap-8 bg-primary-gradient md:bg-none p-4 pb-32 md:pb-0">
                <div class="flex flex-col gap-2 md:gap-3 xxl:gap-4 text-white">
                    <HeadingH2>Blog Unike Group</HeadingH2>
                    <p class="text-sm lg:text-xl font-medium">Enterate de las últimas novedades que tenemos para vos</p>
                </div>
                <ButtonPrimary class="sm:self-start !bg-white md:!bg-primary !text-primary md:!text-white !px-12">Ir al
                    blog
                </ButtonPrimary>
            </div>
            <CarouselStatic :slides-per-view="{ base: 1.4, sm: 2.5, md: 3, lg: 3, xl: 4, xxl: 4 }" :button-position="{
                top: '50%',
                transform: 'translateY(-50%)',
                left: {
                    md: '-5rem',
                    lg: '-1.5rem',
                    xl: '-1.5rem',
                    xxl: '-1.5rem',
                },
                right: {
                    md: '-5rem',
                    lg: '-1.5rem',
                    xl: '-1.5rem',
                    xxl: '-1.5rem',
                }
            }" class="-mt-28 md:mt-0 lg:!px-0">
                <BlogCard v-for="(post, index) in posts" :key="index" :post="post" />
            </CarouselStatic>
        </div>
    </DefaultSection>
</template>

<script setup>
const posts = [
    {
        img: "/images/waterplast/blog/Post.png",
        titulo: "Con Waterplast, la aldea Guaporaity tiene agua",
        autor: "Waterplast",
        fecha: "19/02/25",
    },
    {
        img: "/images/waterplast/blog/Post.png",
        titulo: "Con Waterplast, la aldea Guaporaity tiene agua",
        autor: "Waterplast",
        fecha: "19/02/25",
    },
    {
        img: "/images/waterplast/blog/Post.png",
        titulo: "Con Waterplast, la aldea Guaporaity tiene agua",
        autor: "Waterplast",
        fecha: "19/02/25",
    },
    {
        img: "/images/waterplast/blog/Post.png",
        titulo: "Con Waterplast, la aldea Guaporaity tiene agua",
        autor: "Waterplast",
        fecha: "19/02/25",
    },
    {
        img: "/images/waterplast/blog/Post.png",
        titulo: "Con Waterplast, la aldea Guaporaity tiene agua",
        autor: "Waterplast",
        fecha: "19/02/25",
    },
    {
        img: "/images/waterplast/blog/Post.png",
        titulo: "Con Waterplast, la aldea Guaporaity tiene agua",
        autor: "Waterplast",
        fecha: "19/02/25",
    },
    {
        img: "/images/waterplast/blog/Post.png",
        titulo: "Con Waterplast, la aldea Guaporaity tiene agua",
        autor: "Waterplast",
        fecha: "19/02/25",
    },
    {
        img: "/images/waterplast/blog/Post.png",
        titulo: "Con Waterplast, la aldea Guaporaity tiene agua",
        autor: "Waterplast",
        fecha: "19/02/25",
    },
];
</script>