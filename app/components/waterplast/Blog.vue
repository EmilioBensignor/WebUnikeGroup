<template>
    <DefaultSection class="pb-6">
        <div class="bg-primary-gradient flex flex-col gap-4 p-4 pb-32">
            <div class="flex flex-col gap-2 text-white">
                <HeadingH2>Blog Unike Group</HeadingH2>
                <p class="text-sm font-medium">Enterate de las últimas novedades que tenemos para vos</p>
            </div>
            <ButtonPrimary class="!bg-white !text-primary">Ir al blog</ButtonPrimary>
        </div>
        <CarouselStatic class="-mt-28">
            <BlogCard v-for="(post, index) in posts" :key="index" :post="post" />
        </CarouselStatic>
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