import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import sveltePreprocess from 'svelte-preprocess'
import UnoCSS from 'unocss/vite'
import presetWind from '@unocss/preset-wind'
import extractorSvelte from '@unocss/extractor-svelte'

export default defineConfig({
  plugins: [
    UnoCSS({
      extractors: [extractorSvelte()],
      presets: [presetWind()],
    }),
    svelte({
      preprocess: sveltePreprocess({ postcss: false }),
    }),
  ],
})
