/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        acessiPrimary: "#854d0e",
        acessiSecondary: "#ca8a0455",
        acessiSecondary75: "#ca8a0475",
      },
    },
  },
  plugins: [],
};
