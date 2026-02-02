/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Opsional: definisikan teal-500 jika ingin custom
        primary: "#14b8a6",
      },
    },
  },
  plugins: [],
};
