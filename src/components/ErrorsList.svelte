<script lang="ts">
  import type { Error } from '../types'

  export let errors: Error[]
</script>

<ul class="mt-2 h-30 border-1 bg-white overflow-y-scroll">
  {#each errors as error}
    <li class="p-1 text-red-600 error-msg">
      {error.message} ({error.span.start}..{error.span.end})
    </li>
  {:else}
    <li class="p-1"><i>No errors.</i></li>
  {/each}
</ul>

<style>
  .error-msg {
    border-bottom: 1px solid #e5e7eb;
  }
</style>
