import daisyui from "daisyui";

console.log("TAILWIND CONFIG LOADED");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  plugins: [require("@tailwindcss/typography"), require("daisyui")],

  daisyui: {
    themes: ["forest", "dark"],
    darkTheme: "dark",
  },
};
