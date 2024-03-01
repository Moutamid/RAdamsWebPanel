/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "./node_modules/primereact/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      colors: {
        customGray: "#eef1f1f0",
        customText: "#3c4858",
        grayCustom: {
          50: "#F9FAFB",
          100: "#F2F4F7",
          200: "#E4E7EC",
          300: "#D0D5DD",
          500: "#667085",
          700: "#344054",
          800: "#1D2939",
          900: "#101828",
        },
        error: {
          50: "#FEF3F2",
          100: "#FEE4E2",
          200: "#FECDCA",
          300: "#FDA29B",
          500: "#F04438",
          600: "#D92D20",
          700: "#B42318",
        },
        success: {
          50: "#ECFDF3",
          500: "#12B76A",
          600: "#039855",
          700: "#027A48",
        },
        blueCustom: {
          50: "#EFF8FF",
          700: "#175CD3",
        },
        indigoCustom: {
          50: "#EEF4FF",
          700: "#3538CD",
        },
        bluePrimary: {
          25: "#F5FBFF",
          50: "#F0F9FF",
          100: "#E0F2FE",
          200: "#B9E6FE",
          300: "#7CD4FD",
          400: "#36BFFA",
          500: "#0BA5EC",
          600: "#0086C9",
          700: "#026AA2",
          800: "#065986",
          900: "#0B4A6F",
        },
        primary: {
          25: "#F5FBFF",
          50: "#F0F9FF",
          100: "#E0F2FE",
          200: "#B9E6FE",
          300: "#7CD4FD",
          400: "#36BFFA",
          500: "#0BA5EC",
          600: "#0086C9",
          700: "#026AA2",
          800: "#065986",
          900: "#0B4A6F",
        },
        warning: {
          50: "#FFFAEB",
          700: "#B54708",
        },
      },
    },
  },
  plugins: [],
};
