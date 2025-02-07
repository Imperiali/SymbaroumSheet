<script lang="ts">
    export let title: string;
    let visible = true;
</script>

<div class="section">
    <h2 on:click={() => (visible = !visible)}>{title}</h2>
    {#if visible}
        <slot />
    {/if}
</div>

<style>
    .section {
        background: #fff;
        border: 2px solid var(--border-color);
        border-radius: 0;
        padding: 20px;
        margin-bottom: 20px;
        position: relative;
    }

    .section::before {
        content: '';
        position: absolute;
        top: 5px;
        left: 5px;
        right: 5px;
        bottom: 5px;
        border: 1px solid var(--border-color);
        pointer-events: none;
    }

    h2 {
        font-family: var(--header-font);
        color: var(--primary-color);
        margin: -20px -20px 20px -20px;
        padding: 10px 20px;
        background: var(--background-color);
        border-bottom: 2px solid var(--border-color);
        text-transform: uppercase;
        font-size: 1.2em;
        text-align: center;
        letter-spacing: 1px;
        cursor: pointer;
        user-select: none;
    }

    h2:hover {
        background: var(--hover-color, #f5f5f5);
    }
</style>
