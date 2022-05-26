<script lang="ts">
  import { onDestroy, onMount, createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()

  let isEditorReady = false
  let container: HTMLDivElement | null

  onMount(async () => {
    if (container) {
      const monaco = await import('monaco-editor')
      const editor = monaco.editor.create(container, {
        language: 'css',
        minimap: {
          enabled: false,
        },
        fontFamily: '"Cascadia Code", monospace',
        fontSize: 15,
        tabSize: 2,
      })
      isEditorReady = true

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

<div class="h-full">
  {#if !isEditorReady}
    <div>Loading Monaco Editor...</div>
  {/if}
  <div
    class="border-1 h-full"
    class:invisible={!isEditorReady}
    bind:this={container}
  />
</div>
