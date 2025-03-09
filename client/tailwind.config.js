

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        clamp: "clamp(1.5rem, 3vw, 1.5rem)",
      },
      screens: {
        mobile: "375px",
        // => @media (min-width: 640px) { ... }
      },
    },
  },
  plugins: [],
};
