export const ROUTES_NAMES = {
    HOME: '/',
    CONTACTO: {
        TELEFONO: "+54 (011) 4225.1531/7449",
        MAIL: "info@unikegroup.com.ar",
        UBICACION: "Av. San Martín 2768, Lanús Buenos Aires, Argentina",
    },
    UNIKE: {
        SOBRE: "#",
        ROHERMET: "#",
        MURALLON: "#",
    },
    AYUDA: {
        FAQS: "#",
        TUTORIALES: "#",
        DISTRIBUIDORES: "#",
        BLOG: "#",
    },
    REDES: {
        INSTAGRAM: "#",
        FACEBOOK: "#",
        YOUTUBE: "#",
        LINKEDIN: "#",
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