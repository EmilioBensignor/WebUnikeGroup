export const ROUTES_NAMES = {
    HOME: '/',
    CONTACTO: {
        TELEFONO: "+541142251531",
        MAIL: "info@unikegroup.com.ar",
        UBICACION: "Av. San Martín 2768, Lanús Buenos Aires, Argentina",
    },
    UNIKE: {
        SOBRE: "#",
        ROHERMET: "#",
        MURALLON: "#",
        BLOG: "/blog",
        BLOG_DETALLE: (slug) => `/blog/${slug}`,
    },
    AYUDA: {
        FAQS: "#",
        TUTORIALES: "https://www.youtube.com/channel/UCf7ptluQ34qdjBTtvmMhKmA",
        DISTRIBUIDORES: "#",
        BLOG: "#",
    },
    REDES: {
        INSTAGRAM: "https://www.instagram.com/unikegroupsa/",
        FACEBOOK: "https://www.facebook.com/unikegroupsa/?locale=es_LA",
        YOUTUBE: "https://www.youtube.com/channel/UCf7ptluQ34qdjBTtvmMhKmA",
        LINKEDIN: "https://www.linkedin.com/company/unike-group-sa/",
    },
    WATERPLAST: {
        HOME: "/waterplast",
        PRODUCTOS: "#",
        DISTRIBUIDORES: "#",
        BLOG: "#",
        CONTACTO: "#",
        CATEGORIA: (slug) => `/waterplast/${slug}`,
        PRODUCTO: (categoria, producto) => `/waterplast/${categoria}/${producto}`,
    },
}