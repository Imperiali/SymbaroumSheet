<script lang="ts">
  import {onMount, onDestroy} from 'svelte';
  
  export let visible = false;

  export const openModal = () => {
    visible = true;
  };

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === "Escape") {
      onClose();
    }
  }

  onMount(() => {
    window.addEventListener("keydown", handleKeydown);
  });

  onDestroy(() => {
    window.removeEventListener("keydown", handleKeydown);
  });

  export let onClose = () => {
    visible = false;
  };

</script>
{#if visible}
<section>
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <div class="modal-overlay" on:click={onClose}>
    <div class="modal-content" on:click|stopPropagation>
      <slot />
    </div>
  </div>
</section>
{/if}

<style lang="postcss">
	.modal-overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		width: 100vw;
    height: 100vh;
		display: flex;
		justify-content: center;
		flex-direction: column;
    justify-content: center;
		z-index: 999;
		background-color: rgba(0, 0, 0, 0.6);
	}

  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 2px;
    min-width: 400px;
    max-width: 90%;
    max-height: 400px;
    overflow-y: scroll;
    overflow-x: hidden;
    margin: 0 auto;
    border: 2px solid var(--border-color);
    position: relative;
    scrollbar-color: var(--border-color) white;
    scrollbar-width: thin;
  }
</style>
