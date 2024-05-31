/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(circle, rgba(14,165,233,1) 20%, rgba(9,9,11,1) 100%)",
                "clock": "url('/static/clock-bg.jpg')"
            },
        },
    },
    plugins: [],
};
