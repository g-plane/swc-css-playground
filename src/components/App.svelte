<script lang="ts">
  import { onMount } from 'svelte'
  import type { Switch } from '@fluentui/web-components'
  import initParser, { parse } from '../../pkg'
  import HeaderBar from './HeaderBar.svelte'
  import Editor from './Editor.svelte'
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
    await initParser()
    isParserReady = true
  })

  function handleAllowWrongCommentsChange(event: Event) {
    config.allowWrongComments = (event.target as Switch).checked
  }
</script>

<HeaderBar />
<div class="grid grid-cols-2 grid-rows-1 gap-x-3 p-3 h-92vh">
  <div class="h-88vh">
    <Editor on:input={(event) => (code = event.detail)} />
    <div class="mt-2">
      <fluent-switch
        checked={config.allowWrongComments}
        on:change={handleAllowWrongCommentsChange}
      >
        <label for="cap-switch">Allow wrong comments</label>
      </fluent-switch>
    </div>
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
