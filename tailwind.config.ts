import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

export default <Partial<Config>>{
  theme: {
    extend: {
      fontFamily: {
        sans: ["DM Sans", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        eminence: {
          "50": "#faf7fd",
          "100": "#f3ecfb",
          "200": "#e9ddf7",
          "300": "#d9c2f0",
          "400": "#c19ae6",
          "500": "#a973d9",
          "600": "#9355c8",
          "700": "#7e42ae",
          "800": "#613583",
          "900": "#573073",
          "950": "#3a1853",
        },
      },
    },
  },
};
