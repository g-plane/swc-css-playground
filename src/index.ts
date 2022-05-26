import 'virtual:windi.css'
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import {
  provideFluentDesignSystem,
  fluentTreeItem,
  fluentTreeView,
} from '@fluentui/web-components'
import App from './components/App.svelte'

provideFluentDesignSystem().register(fluentTreeItem(), fluentTreeView())

// @ts-expect-error
self.MonacoEnvironment = {
  getWorker: () => new cssWorker(),
}

new App({
  target: document.querySelector('#root')!,
})
