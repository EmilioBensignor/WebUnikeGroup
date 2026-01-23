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
                primary: "var(--brand-primary)",
                secondary: "var(--brand-secondary)",
                terciary: "var(--brand-terciary)",
                dark: "#010101",
                error: "#F03A36",
                gray: {
                    light: "#F9F9F9",
                    mid: "#E9E9E9",
                    blue: "#E1E7F3",
                    dark: "#959393",
                }
            },
            backgroundImage: {
                'primary-gradient': 'linear-gradient(180deg, var(--brand-primary) 0%, var(--brand-terciary) 100%)',
                'primary-reverse-gradient': 'linear-gradient(0deg, var(--brand-terciary) 0%, var(--brand-primary) 100%)',
                'gradient-hero': 'linear-gradient(0deg, rgba(0, 0, 0, 0) 0%, var(--brand-primary) 100%)'
            },
            boxShadow: {
                '1': '0px 1px 4px 0px rgba(12, 12, 13, 0.15)',
            },
        }
    }
}