/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./app/**/*.{js,vue,ts}",
        "./components/**/*.{js,vue,ts}",
        "./layouts/**/*.{vue,js,ts}",
        "./pages/**/*.{vue,js,ts}",
        "./plugins/**/*.{js,ts}",
        "./error.vue",
    ],
    theme: {
        extend: {
            colors: {
                primary: "var(--text-color-primary)",
                secondary: "var(--text-color-secondary)",
                tertiary: "var(--text-color-tertiary)",
                background: "var(--main-bg-color)",
            },
            fontFamily: {
                primary: ["var(--font-family-primary)"],
            },
        },
    },
    plugins: [],
};
