import { svelte } from '@sveltejs/vite-plugin-svelte'
import extractorSvelte from '@unocss/extractor-svelte'
import presetWind from '@unocss/preset-wind'
import sveltePreprocess from 'svelte-preprocess'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'

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
