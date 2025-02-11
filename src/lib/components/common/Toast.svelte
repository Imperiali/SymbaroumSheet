<script>
    import { createEventDispatcher } from "svelte";
    import { fade } from "svelte/transition";
  
    const dispatch = createEventDispatcher();
  
    export let type = "error";
  </script>
  
  <article class={type} role="alert" transition:fade>
    {#if type === "success"}
    <span class="material-icons">check_circle</span>
    {:else if type === "error"}
    <span class="material-icons">error</span>
    {/if}
  
    <div style="width: 100%"class="text">
      <slot />
    </div>
  

      <button style="max-width: 20px;" class="close" on:click={() => dispatch("dismiss")}>
        <span class="material-icons">close</span>
      </button>

  </article>
  
  <style lang="postcss">
    article {
      color: white;
      padding: 0.75rem 1.5rem;
      border-radius: 0.2rem;
      display: flex;
      align-items: center;
      margin: 0 auto 0.5rem auto;
      width: 20rem;
    }
    .error {
      background:#2a2a2a;
    }
    .success {
      background: #8b7355;
    }
    .info {
      background: SkyBlue;
    }
    .text {
      margin-left: 1rem;
    }
    button {
      color: white;
      background: transparent;
      border: 0 none;
      padding: 0;
      margin: 0 0 0 auto;
      line-height: 1;
      font-size: 1rem;
    }

    .close {
      float: left;
    }
  </style>
  