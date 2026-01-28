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
                    primary: '#FFFFFF', // Clean white background
                    secondary: '#F4F4F4', // Light grey for sections
                },
                text: {
                    primary: '#1F1F1F',
                    secondary: '#555555',
                },
                primary: {
                    DEFAULT: '#4B2AD3', // Looka Purple
                    hover: '#3a1fcf',
                },
                border: {
                    subtle: '#E0E0E0',
                }
            },
            fontFamily: {
                sans: ['"Inter"', 'sans-serif'], // Geometric sans default
                serif: ['"Playfair Display"', 'serif'], // Keep for logo/headings if needed
                nunito: ['"Nunito"', 'sans-serif'],
            },
            borderRadius: {
                'lg': '12px',
                'xl': '16px',
                'md': '10px',
                'sm': '6px',
            },
            boxShadow: {
                'sm': '0 2px 8px rgba(0, 0, 0, 0.04)',
                'md': '0 4px 16px rgba(0, 0, 0, 0.08)',
            }
        },
    },
    plugins: [],
}
