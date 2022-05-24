<script lang="ts">
  import { onMount } from 'svelte'
  import initParser, { parse } from '../../pkg'
  import ASTView from './ASTView.svelte'

  let isParserReady = false
  let code = ''

  $: parserResult = isParserReady ? parse(code, false) : null

  onMount(async () => {
    await initParser()
    isParserReady = true
  })
</script>

<input type="text" bind:value={code} />
<ASTView ast={parserResult?.ast} />
