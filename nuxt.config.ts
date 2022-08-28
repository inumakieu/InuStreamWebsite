import { defineNuxtConfig } from "nuxt";
import { dragscroll } from "vue-dragscroll";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/google-fonts",
    "@nuxtjs/moment",
    "nuxt-seo",
    "@nuxtjs/sitemap",
  ],
  googleFonts: {
    families: {
      Inter: [0, 100, 200, 300, 400, 500, 600, 700, 800],
    },
  },
  ssr: true,
  sitemap: {
    hostname: "https://inu.watch",
    gzip: true,
  },
});
