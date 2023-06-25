<script lang="ts">
  import { onMount } from 'svelte'
  import type { Switch } from '@fluentui/web-components'
  import { inflate, deflate } from 'pako'
  import { Base64 } from 'js-base64'
  import { instantiate, parse } from '../../lib/swc_css_playground.generated'
  import HeaderBar from './HeaderBar.svelte'
  import Editor from './Editor.svelte'
  import ErrorsList from './ErrorsList.svelte'
  import ASTView from './ASTView.svelte'

  let isParserReady = false
  let code = ''
  const config = {
    allowWrongComments: true,
    cssModules: false,
    legacyNesting: false,
  }

  try {
    const raw = new URLSearchParams(location.search).get('code')
    if (raw) {
      code = inflate(Base64.toUint8Array(raw), { to: 'string' })
    }
  } catch (error) {
    console.error(`Failed to parse code from URL: ${error}`)
  }

  $: parserResult = isParserReady
    ? parse(
        code,
        config.allowWrongComments,
        config.cssModules,
        config.legacyNesting
      )
    : null

  onMount(async () => {
    await instantiate()
    isParserReady = true
  })

  $: {
    const searchParams = new URLSearchParams()
    searchParams.set('code', Base64.fromUint8Array(deflate(code), true))
    const url = new URL(location.href)
    url.search = searchParams.toString()
    window.history.replaceState(null, '', url.toString())
  }

  function handleAllowWrongCommentsChange(event: Event) {
    config.allowWrongComments = (event.target as Switch).checked
  }

  function handleCssModulesChange(event: Event) {
    config.cssModules = (event.target as Switch).checked
  }

  function handleLegacyNestingChange(event: Event) {
    config.legacyNesting = (event.target as Switch).checked
  }
</script>

<div class="h-100vh bg-sky-50 font-sans">
  <HeaderBar />
  <div class="grid grid-cols-2 grid-rows-1 gap-x-3 p-3 h-92vh">
    <div class="max-h-88vh flex flex-col">
      <Editor initialCode={code} on:input={(event) => (code = event.detail)} />
      <div class="mt-2">
        <fluent-switch
          checked={config.allowWrongComments}
          on:change={handleAllowWrongCommentsChange}
        >
          <label for="cap-switch">Allow wrong comments</label>
        </fluent-switch>
        <fluent-switch
          checked={config.cssModules}
          on:change={handleCssModulesChange}
        >
          <label for="cap-switch">Enable CSS modules</label>
        </fluent-switch>
        <fluent-switch
          checked={config.legacyNesting}
          on:change={handleLegacyNestingChange}
        >
          <label for="cap-switch">Allow legacy nesting</label>
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
</div>

<style>
  label {
    font-family: Inter, sans-serif;
  }
</style>
