<script lang="ts">
  import { onDestroy, onMount, createEventDispatcher } from 'svelte'
  import type * as monaco from 'monaco-editor'
  import { selectedSpan } from '../store'

  const dispatch = createEventDispatcher()

  export let initialCode = ''
  let monaco: typeof import('monaco-editor') | undefined
  let isEditorReady = false
  let container: HTMLDivElement | null
  let editor: monaco.editor.IStandaloneCodeEditor | undefined

  let decorations: string[] = []

  $: {
    const model = editor?.getModel()
    if (monaco && editor && model) {
      if ($selectedSpan) {
        const start = model.getPositionAt($selectedSpan.start)
        const end = model.getPositionAt($selectedSpan.end)
        const range = new monaco.Range(
          start.lineNumber,
          start.column,
          end.lineNumber,
          end.column
        )

        decorations = editor.deltaDecorations(decorations, [
          {
            range,
            options: { className: 'bg-indigo-100' },
          },
        ])
      } else {
        decorations = editor.deltaDecorations(decorations, [])
      }
    }
  }

  onMount(async () => {
    if (container) {
      monaco = await import('monaco-editor')
      monaco.languages.css.cssDefaults.setOptions({
        validate: false,
      })
      editor = monaco.editor.create(container, {
        language: 'css',
        minimap: {
          enabled: false,
        },
        fontFamily: '"Cascadia Code", monospace',
        fontSize: 15,
        tabSize: 2,
      })
      editor.setValue(initialCode)
      isEditorReady = true

      editor.onDidChangeModelContent(() => {
        dispatch('input', editor!.getValue())
      })
    }
  })

  onDestroy(() => {
    editor?.dispose()
  })
</script>

<div class="h-4/5">
  {#if !isEditorReady}
    <div>Loading Monaco Editor...</div>
  {/if}
  <div
    class="border-1 h-full"
    class:invisible={!isEditorReady}
    bind:this={container}
  />
</div>
