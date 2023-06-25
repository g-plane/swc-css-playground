import 'virtual:uno.css'
import '@unocss/reset/sanitize/sanitize.css'
import '@unocss/reset/sanitize/assets.css'
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import {
  provideFluentDesignSystem,
  fluentTreeItem,
  fluentTreeView,
  fluentSwitch,
} from '@fluentui/web-components'
import App from './components/App.svelte'

provideFluentDesignSystem().register(
  fluentTreeItem(),
  fluentTreeView(),
  fluentSwitch()
)

self.MonacoEnvironment = {
  getWorker: () => new cssWorker(),
}

new App({
  target: document.querySelector('#root')!,
})
