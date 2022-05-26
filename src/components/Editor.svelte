<script lang="ts">
  import * as monaco from 'monaco-editor'
  import { onDestroy, onMount, createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()

  let container: HTMLDivElement | null

  onMount(() => {
    if (container) {
      const editor = monaco.editor.create(container, {
        language: 'css',
        minimap: {
          enabled: false,
        },
        fontFamily: '"Cascadia Code", monospace',
        fontSize: 15,
        tabSize: 2,
      })

      const disposeOnDidChangeModelContentEvent =
        editor.onDidChangeModelContent(() => {
          dispatch('input', editor.getValue())
        })

      onDestroy(() => {
        disposeOnDidChangeModelContentEvent.dispose()
        editor.dispose()
      })
    }
  })
</script>

<div class="border-1 h-full" bind:this={container} />
