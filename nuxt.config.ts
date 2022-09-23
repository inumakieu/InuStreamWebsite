import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ["@nuxtjs/moment", "@nuxtjs/sitemap"],
  ssr: true,
  router: {
    mode: "history",
  },
  css: ["~/assets/css/main.css"],
});
