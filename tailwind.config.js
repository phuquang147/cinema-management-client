/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  darkMode: "class",
  content: [
    "./public/**/*.html",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layout/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#f45e61",
        "light-bg-primary": "#f1ece5",
        "light-bg-secondary": "#fff",
        "dark-bg-primary": "#222831",
        "dark-bg-secondary": "#1d222a",
        light: "#f1ece5",
        "light-gray-bg": "#f7f7f7",
        "light-pink": "#ff55a5",
        "light-red": "#ff5860",
        "light-text": "#ccc",
        "gray-text": "#333",
      },
      keyframes: {
        floatTop: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(0)" },
        },
        floatRight: {
          "0%": { transform: "translateX(100%)", opacity: 0 },
          "100%": { transform: "translateX(0)", opacity: 100 },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "100" },
        },
        fadeOut: {
          "0%": { opacity: "100" },
          "100%": { opacity: "0" },
        },
      },
      animation: {
        "float-top": "floatTop 0.5s linear",
        "float-right": "floatRight 0.5s linear",
        "fade-in": "fadeIn 0.2s linear",
        "fade-out": "fadeOut 0.2s linear",
      },
      dropShadow: {
        text: "3px 3px 0px #f45e61",
      },
      boxShadow: {
        red: "0 0 20px 0 rgba(255, 88, 96, 0.5)",
      },
      backgroundImage: {
        footer: "url('~/assets/images/footer-bg.svg')",
        auth: "url('~/assets/images/bg.jpg')",
      },
      brightness: {
        110: "1.1",
      },
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        ".container": {
          maxWidth: "100%",
          padding: "16px",
          "@media (min-width: 640px)": {
            maxWidth: "600px",
            padding: "16px",
          },
          "@media (min-width: 768px)": {
            maxWidth: "768px",
            padding: "16px",
          },
          "@media (min-width: 1024px)": {
            maxWidth: "1024px",
            padding: "16px",
          },
          "@media (min-width: 1280px)": {
            maxWidth: "1280px",
            padding: "20px",
          },
        },
      });
    },
    require("@tailwindcss/line-clamp"),
  ],
};
