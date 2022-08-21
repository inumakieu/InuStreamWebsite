import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ["@nuxtjs/google-fonts", "@nuxtjs/moment", "nuxt-seo"],
  googleFonts: {
    families: {
      Inter: [0, 100, 200, 300, 400, 500, 600, 700, 800],
    },
  },
  ssr: true,
});
