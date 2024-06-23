import inject from '@rollup/plugin-inject';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  typescript: {
    typeCheck: true
  },
  ssr: false,
  modules: [
    '@nuxt/eslint',
    ["@nuxtjs/google-fonts", {
      families: {
        Roboto: [400, 500, 700, 900],
        Inter: true,
        'Open+Sans': true
      }
    }]
  ],
  postcss: {
    plugins: {
      'postcss-apply': {},
      'postcss-nested': {},
      'postcss-preset-env': {
        features: {
          'nesting-rules': false,
          'custom-properties': {
            disableDeprecationNotice: true,
          },
        },
      },
    }
  },
  css: [
    '~/assets/css/index.css'
  ],
  app: {
    head: {
      link: [{ rel: 'icon', type: 'image/svg+xml', href: "/overleap.svg" }],
      meta: [
        { name: 'title', content: 'Overleap' },
        { name: 'description', content: 'Prove your intent to connect by rewarding the reader with a tiny commission.' },
        { name: 'og:title', content: 'Overleap' },
        { name: 'og:description', content: 'Prove your intent to connect by rewarding the reader with a tiny commission.' },
        { name: 'og:image', content: '/overleap-1200x630.png' },
        { name: 'twitter:card', content: 'summary' },
      ],
    }
  },
  eslint: {
    // options here
  },
  vite: {
    plugins: [
      // inject({ Buffer: ['buffer/', 'Buffer'] }),
      // inject({ nacl: ['tweetnacl-util/', 'tweetnacl-util'] })
    ]
  },
  runtimeConfig: {
    tonCenterApiKey: '',
    telegramBotKey: '',
    redisUrl: '',
    redisToken: '',
    sqidsAlphabet: '',
    // Keys within public, will be also exposed to the client-side
    public: {
      tonconnectManifestUrl: 'https://raw.githubusercontent.com/vleushin/overleap/master/tonconnect-manifest.json',
      botName: 'jumpover_bot',
      overleapRouterAddress: 'EQBr7Nj2lBZfUyMQOmg4s3WBSHXae0GhFdjDEqv-lW2nqITC',
      apiBase: '/api',
      defaultPrice: '0.1'
    }
  }
});
