import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import sveltePreprocess from 'svelte-preprocess'
import WindiCSS from 'vite-plugin-windicss'

export default defineConfig({
  plugins: [
    svelte({
      preprocess: sveltePreprocess({ postcss: false }),
    }),
    WindiCSS({
      scan: {
        fileExtensions: ['svelte', 'html'],
      },
    }),
  ],
})
