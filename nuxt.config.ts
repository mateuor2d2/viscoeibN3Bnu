// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: ["@nuxt/ui-pro"],

  modules: [
    "@nuxt/content",
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/image",
    "@nuxt/ui",
    "@pinia/nuxt",
    "nuxt-file-storage",
    "@nuxt/image",
    "nuxt-jsoneditor",
  ],
  jsoneditor: {
    componentName: "JsonEditor",
    options: {
      /**
       *
       * SET GLOBAL OPTIONS
       *
       * */
    },
  },

  content: {
    markdown: {
      mdc: true, // Enable Markdown component support
    },
  },
  runtimeConfig: {
    AUTH_SECRET: process.env.AUTH_SECRET,
    NODE_ENV: process.env.NODE_ENV,
    HK_SERVER: process.env.HK_SERVER,
    HK_LOCAL: process.env.HK_LOCAL,
    NUXT_VPV_LICENSE_KEY: process.env.NUXT_VPV_LICENSE_KEY,
  },

  routeRules: {
    // Temporary workaround for prerender regression. see https://github.com/nuxt/nuxt/issues/27490
    "/": { prerender: true },
  },

  devtools: {
    enabled: true,
  },

  typescript: {
    strict: false,
  },

  future: {
    compatibilityVersion: 4,
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: "never",
        braceStyle: "1tbs",
      },
    },
  },
  build: {
    transpile: [
      (ctx) => (ctx.isServer ? "pdfjs-dist" : false),
      (ctx) => (ctx.isServer ? "@vue-pdf-viewer/viewer" : false),
    ],
  },

  compatibilityDate: "2024-07-11",
});
