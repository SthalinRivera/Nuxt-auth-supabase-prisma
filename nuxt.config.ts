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
  }], "@nuxt/ui"],
  pinia: {
    storesDirs: ['./stores/**']
  }
})