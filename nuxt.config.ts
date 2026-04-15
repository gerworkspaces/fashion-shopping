// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // runtimeConfig: {
  //   //Only available on the server
  //   DB_HOST: process.env.localhost,
  //   DB_USER: process.env.root,
  //   DB_PASSWORD: process.env.DB_PASSWORD,
  //   JWT_SECRET: process.env.JWT_SECRET,
  // },
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  app: {
    pageTransition: { name: "page", mode: "out-in" },
    head: {
      script: [
        {
          src: "",
          type: "text/javascript"
        }
      ]
    }

  },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxt/fonts",
    "nuxt-file-storage",
    "nuxt-paypal",
  ],
  fileStorage: {
    mount: "/Users/quavo/Documents/fashion-shopping/public",
  },
  routeRules: {
    //User
    "/": { redirect: "/home" },
    "/foods": { redirect: "/foods" },
    "/news": { redirect: "/news" },
    "/vouchers": { redirect: "/vouchers" },
    "/menu": { redirect: "/menu" },
    "/order": { redirect: "/order" },

    "/profile": { redirect: "/profile" },
    "/cart": { redirect: "/cart" },
    "/checkout": { redirect: "/checkout" },
    "/orders": { redirect: "/orders" },
    "/orders/detail": { redirect: "/orders/detail" },
    // "/logout": { redirect: "/logout" },
    // "/forgot-password": { redirect: "/forgot-password" },
    // "/reset-password": { redirect: "/reset-password" },
    // "/verify-email": { redirect: "/verify-email" },
    // "/verify-email-sent": { redirect: "/verify-email-sent" },
    // "/verify-email-success": { redirect: "/verify-email-success" },
    // "/verify-email-failed": { redirect: "/verify-email-failed" },
    // "/change-password": { redirect: "/change-password" },
    // "/change-password-success": { redirect: "/change-password-success" },
    // "/change-password-failed": { redirect: "/change-password-failed" },
    // "/change-password-sent": { redirect: "/change-password-sent" },


    //Admin
    "/admin/foods-management": { redirect: "/admin/foods-management" },
    "/admin/user-management": { redirect: "/admin/user-management" },
    "/admin/role-management": { redirect: "/admin/role-management" },
    "/admin/new-management": { redirect: "/admin/new-management" },
    "/admin/category-management": { redirect: "/admin/category-management" },
    "/admin/orders-management": { redirect: "/admin/orders-management" },
    "/admin/settings-management": { redirect: "/admin/settings-management" },
    "/register": { redirect: "/register-account" },
  },
  ssr: false,
  nitro: {
    preset: "node-server",
  },
  css: ["@/assets/css/main.css", "@/assets/css/global.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
