import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
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
        "gray-bg": "#f6f6f5",
        "taupe-gray": "#8F8F8F",
        "azure-blue": "#3874FF",
        "primary": "#231F20",
        "dim-gray": "#787878",
        "charcoal-gray": "#4f4f4f",
        "cyan-blue": "#F4F8FB",
        "deep-black": "#161D1A",
        "primary-green": "#22c55e",
        "light-gray": "#C4C4C4",
        "deep-navy": "#003366",
        "tomato-red": "#F64545",
        "steel-gray": "#52525B",
        "ghost-white": "#F7F7F7",
        "dark-yellow": "#efe909",
      },

      fontSize: {
        heading: [
          "50px",
          {
            lineHeight: "67px",

            fontWeight: "700",
          },
        ],
        "heading-sm": [
          "26px",
          {
            lineHeight: "32px",

            fontWeight: "600",
          },
        ],
        subheading: [
          "40px",
          {
            lineHeight: "55px",
            fontWeight: "700",
          },
        ],
        "subheading-sm": [
          "28px",
          {
            lineHeight: "32px",

            fontWeight: "600",
          },
        ],
        title: [
          "22px",
          {
            lineHeight: "36px",
            fontWeight: "500",
          },
        ],
        "title-sm": [
          "18px",
          {
            lineHeight: "27px",
            fontWeight: "500",
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
        subtitle2: [
          "18px",
          {
            lineHeight: "30px",
            fontWeight: "400",
          },
        ],
        "subtitle2-sm": [
          "16px",
          {
            lineHeight: "20px",
            fontWeight: "400",
          },
        ],
        subtitle3: [
          "14px",
          {
            lineHeight: "20px",
            fontWeight: "400",
          },
        ],
        "subtitle3-sm": [
          "13px",
          {
            lineHeight: "20px",
            fontWeight: "400",
          },
        ],
        "card-title": [
          "17px",
          {
            lineHeight: "22px",
            fontWeight: "500",
          },
        ],
        "card-title-sm": [
          "16px",
          {
            lineHeight: "20px",
            fontWeight: "500",
          },
        ],
        content: [
          "16px",
          {
            lineHeight: "26px",
            fontWeight: "400",
          },
        ],
        "content-sm": [
          "15px",
          {
            lineHeight: "24px",
            fontWeight: "400",
          },
        ],
      },
    },
  },
  plugins: [],
} satisfies Config;
