<script lang="ts">
  import { selectedSpan } from '../store'
  import type { Span } from '../types'
  import JSONArray from './JSONArray.svelte'

  export let object: object & {
    type?: string,
    span?: Span,
  }

  $: properties = Object.entries(object).filter(
    ([key]) => key !== 'type' && key !== 'span'
  )

  function handleTreeItemClick() {
    const { span } = object
    $selectedSpan = span
      ? {
        start: span.start - 1,
        end: span.end - 1,
      }
      : null
  }
</script>

<fluent-tree-item expanded role="listitem" on:click|stopPropagation={handleTreeItemClick}>
  {#if 'type' in object}
    <span><b>{object.type}</b></span>
  {/if}
  {#if object.span}
    <span class="ml-2">({object.span.start}..{object.span.end})</span>
  {/if}
  {#each properties as [key, value] (key)}
    <fluent-tree-item expanded>
      <span>{key}</span>
      {#if Array.isArray(value)}
        <JSONArray array={value} />
      {:else if typeof value === 'object' && value != null}
        <svelte:self object={value} />
      {:else}: <code>{value}</code>
      {/if}
    </fluent-tree-item>
  {/each}
</fluent-tree-item>

<style>
  span {
    font-family: Inter, sans-serif;
  }

  code {
    margin-left: 4px;
    padding: 2px 4px;
    color: #760000;
    background: #eee;
    font-family: 'Cascadia Code', monospace;
  }
</style>
