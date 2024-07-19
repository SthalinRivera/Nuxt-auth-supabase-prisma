import { vueI18nConfigs } from "#build/i18n.options.mjs";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  alias: {
    css: "/<rootDir>/assets/css"
  },
  components: [{ path: "~/shared/icons", prefix: "Icon" }, "~/components"],
  css: [
    '@/assets/css/main.css',
  ],
  modules: [// ...
  '@pinia/nuxt', '@pinia-plugin-persistedstate/nuxt', ["@nuxtjs/i18n", {
    vueI18n: "./i18n"
  }], "@nuxt/ui", "nuxt-auth-utils"],
  pinia: {
    storesDirs: ['./stores/**']
  },
  runtimeConfig: {
    oauth: {
      Google: {
        clientId: process.env.NUXT_OAUTH_GOOGLE_CLIENT_ID,
        clientSecret: process.env.NUXT_OAUTH_GOOGLE_CLIENT_SECRET,
      },
    },
  },
  app: {
    pageTransition: { name: "page", mode: "out-in" },
    layoutTransition: { name: "layout", mode: "out-in" },
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
    },
  },
})