/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: false,
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        "signin-image": "url('/public/background.jpg')",
      }),
      colors: {
        primary: "#86198f",
        primaryDark: "#701a75",
        secondary: "#FFB7E4",
        secondaryDark: "#de8cbf",
      },
    },
    fontFamily: {
      sans: ['"poppins"', "sans-serif"],
    },
  },
  plugins: [],
};
