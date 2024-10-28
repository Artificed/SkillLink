/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        custom: ["IBMPlexSans"],
      },
      fontWeight: {
        regular: 400,
        bold: 700,
      },
    },
  },
  plugins: [],
};
