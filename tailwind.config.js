export default {
    theme: {
        screens: {
            'sm': '480px',
            'md': '768px',
            'lg': '1080px',
            'xl': '1280px',
            'xxl': '1440px',
        },
        extend: {
            colors: {
                primary: "#005CB9",
                secondary: "#3CB4E5",
                terciary: "#212C54",
                dark: "#010101",
                error: "#F03A36",
                gray: {
                    light: "#F9F9F9",
                    mid: "#E9E9E9",
                }
            },
            backgroundImage: {
                'primary-gradient': 'linear-gradient(180deg, #005CB9 0%, #212C54 100%)'
            },
            boxShadow: {
                '1': '0px 1px 4px 0px rgba(12, 12, 13, 0.15)',
            },
        }
    }
}