<script lang="ts">
  import JSONObject from './JSONObject.svelte'

  export let ast: object
</script>

<fluent-tree-view render-collapsed-nodes>
  {#if ast}
    <JSONObject object={ast} />
  {/if}
</fluent-tree-view>
