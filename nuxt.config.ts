// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/strapi",
    "nuxt-icon",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "@element-plus/nuxt"
  ],
  colorMode: {
    classSuffix: ""
  },
  runtimeConfig: {
    public: {
      strapiURL: process.env.STRAPI_URL,
      googleMapsKEY: process.env.GOOGLE_MAPS_API_KEY,
    }
  }
})