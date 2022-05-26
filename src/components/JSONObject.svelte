<script lang="ts">
  import JSONArray from './JSONArray.svelte'

  export let object: object & { type?: string }

  $: properties = Object.entries(object).filter(
    ([key]) => key !== 'type' && key !== 'span'
  )
</script>

<fluent-tree-item expanded>
  {#if 'type' in object}
    <span><b>{object.type}</b></span>
  {/if}
  {#each properties as [key, value] (key)}
    <fluent-tree-item expanded>
      <span>{key}</span>{#if Array.isArray(value)}
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
