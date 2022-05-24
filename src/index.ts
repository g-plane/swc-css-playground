import {
  provideFluentDesignSystem,
  fluentTreeItem,
  fluentTreeView,
} from '@fluentui/web-components'
import App from './components/App.svelte'

provideFluentDesignSystem().register(fluentTreeItem(), fluentTreeView())

new App({
  target: document.querySelector('#root')!,
})
