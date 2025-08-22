<template>
    <DefaultSection class="md:bg-gray-light md:pt-0 md:pb-8 lg:pb-12 md:px-8 lg:px-16">
        <div
            class="xxl:max-w-[1375px] xxl:w-full md:flex md:flex-col md:gap-6 xxl:gap-8 md:bg-[url('/images/waterplast/blog/Fondo.png')] md:bg-cover md:bg-no-repeat md:bg-center md:rounded-[48px] pb-6 md:py-8 md:px-12 lg:px-16">
            <div class="flex flex-col md:items-start gap-4 md:gap-6 xxl:gap-8 bg-primary-gradient md:bg-none p-4 pb-32 md:pb-0">
                <div class="flex flex-col gap-2 md:gap-3 xxl:gap-4 text-white">
                    <HeadingH2>Blog Unike Group</HeadingH2>
                    <p class="text-sm lg:text-xl font-medium">Enterate de las últimas novedades que tenemos para vos</p>
                </div>
                <ButtonPrimary class="!bg-white md:!bg-primary !text-primary md:!text-white !px-12">Ir al blog
                </ButtonPrimary>
            </div>
            <CarouselStatic :slides-per-view="{ base: 1.4, sm: 2.5, md: 3, lg: 3, xl: 4, xxl: 4 }"
                class="-mt-28 md:mt-0 lg:!px-0">
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