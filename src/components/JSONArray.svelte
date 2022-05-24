<script lang="ts">
  import JSONObject from './JSONObject.svelte'

  export let array: object[]
</script>

{#each array as item}
  <JSONObject object={item} />
{/each}
