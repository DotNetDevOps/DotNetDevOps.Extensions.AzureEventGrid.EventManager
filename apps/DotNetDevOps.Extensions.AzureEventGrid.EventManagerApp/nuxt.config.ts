import "vue-tsx-support/enable-check"
const nodeExternals = require('webpack-node-externals')

module.exports = {
    mode:"spa",
    srcDir: 'src/',
    generate: {
        
    },
    router: {
        mode: "hash",
        middleware: ['authenticated'],
        routeNameSplitter: '/'
    },
    env: {
        "resourceApi": process.env.resourceApi || "https://api.io-board.com",
        "authority": process.env.authority || "https://login.io-board.com"
    },
    head: {
        title: 'Azure EventGrid Manager',
         meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.5' }
        ],
        link: [
            { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900|Material+Icons' },
        ]
    },
    manifest: {
        name: 'Azure EventGrid Manager',
        short_name: 'AEG Manager'
    },
    meta: {
        name: 'AEG Manager',
        description: 'Managed Azure EventGrid Smart',
        themeColor: '#ffffff',
        msTileColor: '#f87f2e',
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: '#344675',
        workboxPluginMode: 'GenerateSW',
    },
    plugins: [
        '~/plugins/vuetify',
        '~/plugins/auth',
    ],
    buildModules: [
        // Simple usage
        '@nuxtjs/vuetify',

        // With options
        // ['@nuxtjs/vuetify', { /* module options */ }]
        '@nuxt/typescript-build',
        '@nuxtjs/svg-sprite'
    ],
    vuetify: {

        theme: {
            options: {
                customProperties: true
            },
            themes: { light: { primary: '#f87f2e' } }
        }
    },
   
    svgSprite: {
        input: '~/assets/svg/'
    },
    build: {

        parallel: true,
        transpile: [/^vuetify/, /^ol/],
        extend(config, { isDev, isClient }) {

            if (!isDev) {
                // relative links, please.
                config.output.publicPath = './_nuxt/'
            }

            if (process.server) {
                config.externals = [
                    nodeExternals({
                        whitelist: [/^vuetify/]
                    })
                ]
 
            }
        }
    }

}