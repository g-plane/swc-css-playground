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

<div class="border-1" bind:this={container} />
