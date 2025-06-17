import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        nastaliq: ["Roboto", "sans-serif"],
      },
      colors: {
        "dark-gray": "#313131",
        "dark-azure": "#254A7C",
        "taupe-gray": "#8F8F8F",
        "azure-blue": "#3874FF",
        "primary": "#231F20",
        "dim-gray": "#787878",
        "charcoal-gray": "#4f4f4f",
        "cyan-blue": "#F4F8FB",
        "deep-black": "#161D1A",
        "gunmetal-green": "#3D4842",
        "light-gray": "#C4C4C4",
        "deep-navy": "#003366",
        "tomato-red": "#F64545",
        "steel-gray": "#52525B",
        "ghost-white": "#F7F7F7",
      },

      fontSize: {
        heading: [
          "40px",
          {
            lineHeight: "54px",

            fontWeight: "700",
          },
        ],
        "heading-sm": [
          "22px",
          {
            lineHeight: "32px",

            fontWeight: "600",
          },
        ],
        "section-title": [
          "32px",
          {
            lineHeight: "40px",
            fontWeight: "600",
          },
        ],
        "section-title-sm": [
          "22px",
          {
            lineHeight: "30px",
            fontWeight: "600",
          },
        ],
        subtitle: [
          "24px",
          {
            lineHeight: "36px",
            fontWeight: "600",
          },
        ],
        "subtitle-sm": [
          "20px",
          {
            lineHeight: "30px",
            fontWeight: "600",
          },
        ],
        content: [
          "16px",
          {
            lineHeight: "28px",
            fontWeight: "400",
          },
        ],
        "content-sm": [
          "15px",
          {
            lineHeight: "26px",
            fontWeight: "400",
          },
        ],
      },
    },
  },
  plugins: [],
} satisfies Config;
