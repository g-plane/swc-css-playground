<script lang="ts">
  import { onMount } from 'svelte'
  import type { Switch } from '@fluentui/web-components'
  import { instantiate, parse } from '../../lib/swc_css_playground.generated'
  import HeaderBar from './HeaderBar.svelte'
  import Editor from './Editor.svelte'
  import ErrorsList from './ErrorsList.svelte'
  import ASTView from './ASTView.svelte'

  let isParserReady = false
  let code = ''
  const config = {
    allowWrongComments: true,
  }

  $: parserResult = isParserReady
    ? parse(code, config.allowWrongComments)
    : null

  onMount(async () => {
    await instantiate()
    isParserReady = true
  })

  function handleAllowWrongCommentsChange(event: Event) {
    config.allowWrongComments = (event.target as Switch).checked
  }
</script>

<HeaderBar />
<div class="grid grid-cols-2 grid-rows-1 gap-x-3 p-3 h-92vh">
  <div class="max-h-88vh flex flex-col">
    <Editor on:input={(event) => (code = event.detail)} />
    <div class="mt-2">
      <fluent-switch
        checked={config.allowWrongComments}
        on:change={handleAllowWrongCommentsChange}
      >
        <label for="cap-switch">Allow wrong comments</label>
      </fluent-switch>
    </div>
    {#if parserResult}
      <ErrorsList errors={parserResult.errors} />
    {/if}
  </div>
  <div class="overflow-y-auto">
    {#if !isParserReady}
      Loading WebAssembly modules...
    {/if}
    {#if parserResult}
      <ASTView ast={parserResult.ast} />
    {/if}
  </div>
</div>

<style>
  label {
    font-family: Inter, sans-serif;
  }
</style>
