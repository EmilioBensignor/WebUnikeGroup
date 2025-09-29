import { ROUTES_NAMES } from '@/constants/ROUTE_NAMES.js'

const footerSections = [
    {
        title: "Contacto",
        items: [
            {
                icon: 'phone-in-talk-outline-rounded',
                link: 'tel:' + ROUTES_NAMES.CONTACTO.TELEFONO,
                text: '+54 (011) 4225.1531/7449',
            },
            {
                icon: 'mail-outline-rounded',
                link: 'mailto:' + ROUTES_NAMES.CONTACTO.MAIL,
                text: ROUTES_NAMES.CONTACTO.MAIL,
            },
            {
                icon: 'location-on-outline-rounded',
                map: ROUTES_NAMES.CONTACTO.UBICACION,
            },
        ]
    },
    {
        title: "Unike Group",
        items: [
            {
                nombre: "Sobre nosotros",
                route: ROUTES_NAMES.UNIKE.SOBRE
            },
            {
                nombre: "Waterplast",
                route: ROUTES_NAMES.UNIKE.WATERPLAST
            },
            {
                nombre: "Rohermet",
                route: ROUTES_NAMES.UNIKE.ROHERMET
            },
            {
                nombre: "Murallón",
                route: ROUTES_NAMES.UNIKE.MURALLON
            },
        ]
    },
    {
        title: "Ayuda",
        items: [
            {
                nombre: "Preguntas frecuentes",
                route: ROUTES_NAMES.AYUDA.FAQS
            },
            {
                nombre: "Tutoriales de instalación",
                route: ROUTES_NAMES.AYUDA.TUTORIALES
            },
            {
                nombre: "Lista de distribuidores",
                route: ROUTES_NAMES.AYUDA.DISTRIBUIDORES
            },
            {
                nombre: "Blog",
                route: ROUTES_NAMES.AYUDA.BLOG
            },
        ]
    },
    {
        title: "Redes Sociales",
        items: [
            {
                img: 'Instagram',
                route: ROUTES_NAMES.REDES.INSTAGRAM,
            },
            {
                img: 'Facebook',
                route: ROUTES_NAMES.REDES.FACEBOOK,
            },
            {
                img: 'Youtube',
                route: ROUTES_NAMES.REDES.YOUTUBE,
            },
            {
                img: 'LinkedIn',
                route: ROUTES_NAMES.REDES.LINKEDIN,
            },
        ]
    }
];

export default footerSections;