import { NuxtConfig } from '@nuxt/types'


const config: NuxtConfig = {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Appquarium - admin',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        integrity:
          'sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/',
        crossorigin: 'anonymous',
        href: 'https://use.fontawesome.com/releases/v5.6.3/css/all.css',
      },
    ]
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/css/global.css'],
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~plugins/DateFormat.ts',
    '~plugins/Species.ts',
  ]  ,
  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    '@nuxtjs/dotenv'
  ],
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    [
      '@nuxtjs/apollo',
      {
        clientConfigs: {
          default: {
            httpEndpoint: process.env.HASURA_ENDPOINT ?? ''
          }
        }
      }
    ],
    [
      '@nuxtjs/firebase',
      {
        config: {
          apiKey: process.env.FIREBASE_API_KEY ?? '',
          authDomain: process.env.FIREBASE_AUTH_DOMAIN ?? '',
          projectId: process.env.FIREBASE_PROJECT_ID ?? '',
          storageBucket: process.env.FIREBASE_STORAGE_BUCKET ?? '',
          messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID ?? '',
          appId: process.env.FIREBASE_APP_ID ?? '',
          measurementId: process.env.FIREBASE_MEASUREMENT_ID ?? ''
        },
        services: {
          auth: true,
          firestore: true,
          storage: true
        }
      }
    ],
    ['cookie-universal-nuxt', {}],
    [
      '@nuxtjs/i18n',
      {
        locales: [
          {code: 'fr', file: 'fr.json'},
        ],
        langDir: '~/i18n/',
        defaultLocale: 'fr',
        vueI18n: {
          fallbackLocale: 'fr',
        }
      }
    ]
  ],
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extractCSS: true
  }
}

export default config
