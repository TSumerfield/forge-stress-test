/** @type {import('tailwindcss').Config} */

module.exports = {

  content: [

    "./app/**/*.{js,ts,jsx,tsx,mdx}",

    "./components/**/*.{js,ts,jsx,tsx,mdx}",

  ],

  theme: {

    extend: {

      colors: {

        forge: {

          forest: {

            950: "#081A16",

            900: "#0D231D",

            800: "#102C24",

            700: "#183C31",

            600: "#245343",

          },

          bronze: {

            300: "#D7B07A",

            400: "#C79A5C",

            500: "#B9864A",

            600: "#9C6F3B",

          },

          ivory: {

            50: "#FBFAF7",

            100: "#F6F4EE",

            200: "#ECE8DE",

          },

          stone: {

            400: "#A7A49D",

            500: "#8C8B86",

            600: "#6F6E69",

          },

          charcoal: {

            800: "#1B1E1B",

            900: "#111311",

            950: "#0A0C0A",

          },

        },

      },

      fontFamily: {

        serif: ['"Source Serif 4"', "Georgia", "serif"],

        sans: ["Inter", "Arial", "sans-serif"],

      },

      maxWidth: {

        forge: "1280px",

      },

      spacing: {

        18: "4.5rem",

        22: "5.5rem",

        26: "6.5rem",

        30: "7.5rem",

      },

      borderRadius: {

        forge: "4px",

      },

      letterSpacing: {

        forge: "0.16em",

      },

      boxShadow: {

        forge: "0 18px 50px rgba(8, 26, 22, 0.18)",

      },

    },

  },

  plugins: [],

};