/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                surface: {
                    primary: '#F9F7F2',
                },
                text: {
                    primary: '#1F1F1F',
                },
                accent: {
                    primary: '#5D6D54',
                },
                border: {
                    subtle: '#E6E1D6',
                }
            },
            fontFamily: {
                serif: ['"Playfair Display"', 'serif'],
                sans: ['"Montserrat"', 'sans-serif'],
                cormorant: ['"Cormorant Garamond"', 'serif'],
                lato: ['"Lato"', 'sans-serif'],
                oswald: ['"Oswald"', 'sans-serif'],
                opensans: ['"Open Sans"', 'sans-serif'],
                quicksand: ['"Quicksand"', 'sans-serif'],
                nunito: ['"Nunito"', 'sans-serif'],
                cinzel: ['"Cinzel"', 'serif'],
                raleway: ['"Raleway"', 'sans-serif'],
            },
            borderRadius: {
                'lg': 'var(--radius)',
                'md': 'calc(var(--radius) - 2px)',
                'sm': 'calc(var(--radius) - 4px)',
            },
        },
    },
    plugins: [],
}
