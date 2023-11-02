import 'virtual:uno.css'
import '@unocss/reset/sanitize/sanitize.css'
import '@unocss/reset/sanitize/assets.css'
import {
  fluentSwitch,
  fluentTreeItem,
  fluentTreeView,
  provideFluentDesignSystem,
} from '@fluentui/web-components'
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import App from './components/App.svelte'

provideFluentDesignSystem().register(
  fluentTreeItem(),
  fluentTreeView(),
  fluentSwitch()
)

// @ts-expect-error
self.MonacoEnvironment = {
  getWorker: () => new cssWorker(),
}

new App({
  target: document.querySelector('#root')!,
})
