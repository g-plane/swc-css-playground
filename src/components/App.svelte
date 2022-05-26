<script lang="ts">
  import { onMount } from 'svelte'
  import initParser, { parse } from '../../pkg'
  import Editor from './Editor.svelte'
  import ASTView from './ASTView.svelte'

  let isParserReady = false
  let code = ''

  $: parserResult = isParserReady ? parse(code, false) : null

  onMount(async () => {
    await initParser()
    isParserReady = true
  })
</script>

<div class="grid grid-cols-2 grid-rows-1 gap-x-3 p-3 h-90vh">
  <Editor on:input={(event) => (code = event.detail)} />
  <div class="overflow-y-auto">
    {#if parserResult}
      <ASTView ast={parserResult.ast} />
    {/if}
  </div>
</div>
