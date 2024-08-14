import {resolve} from 'path'
import {defineConfig} from "vite";

export default defineConfig({
    server: {
        host: true,
        port: 8000,
        watch: {
            usePolling: true
        }
    },
    build: {
        rollupOptions: {
            input: {
                waiting: resolve(__dirname, 'pages/waiting.html'),
                about: resolve(__dirname, 'pages/about.html'),
                main: resolve(__dirname, 'pages/index.html'),
                approve: resolve(__dirname, 'pages/approve.html'),
                policy: resolve(__dirname, 'pages/privacy-policy.html'),
                offer: resolve(__dirname, 'pages/public-offer.html'),
                processing: resolve(__dirname, 'pages/personal-processing.html'),
            }
        },
        minify: 'esbuild'
    }
})