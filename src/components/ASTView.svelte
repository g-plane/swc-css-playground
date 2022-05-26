<script lang="ts">
  import JSONObject from './JSONObject.svelte'

  export let ast: object
</script>

<fluent-tree-view render-collapsed-nodes>
  <JSONObject object={ast} />
</fluent-tree-view>
