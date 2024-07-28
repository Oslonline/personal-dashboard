/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            backgroundImage: {
                "clock": "url('/static/clock-bg.jpg')"
            },
        },
    },
    plugins: [],
};
