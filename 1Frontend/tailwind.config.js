/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,css}"
  ],
  theme: {
    extend: {
      animation: {
        shake: "shake 1s ease-in-out infinite",
        colorChange: "colorChange 3s ease-in-out infinite",
      },
      keyframes: {
        shake: {
          "0%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(-5px)" },
          "50%": { transform: "translateX(5px)" },
          "75%": { transform: "translateX(-5px)" },
          "100%": { transform: "translateX(0)" },
        },
        colorChange: {
          "0%": { color: "#FFCC00" },
          "50%": { color: "#00FFCC" },
          "100%": { color: "#FFCC00" },
        },
      },
    },
  },
  plugins: [],
}


