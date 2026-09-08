/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      container: {
        "center": true,
        padding: 16,
      },
      colors: {
        primary: "white",
        action: "#10B981"
      },
      fontFamily: {
        regular: ["Inter-Regular", "sans-serif"],
        amedium: ["Inter-Medium", "sans-serif"],
        bold: ["Inter-Bold", "sans-serif"],
        sbold: ["Inter-SemiBold", "sans-serif"],
        light: ["Inter-Light", "sans-serif"],
      },
    },
  },
  plugins: [],
};
1