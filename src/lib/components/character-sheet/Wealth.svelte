<script lang="ts">
    import { character } from '$lib/stores/character';

    let visible = true;
</script>



<div class="section wealth">
    <h2 on:click={() => (visible = !visible)}>Riqueza</h2>
    {#if visible}
    <div class="field">
        <label for="thaler">Thalers:</label>
        <input type="number" id="thaler" bind:value={$character.money.thaler} min="0" />
    </div>
    <div class="field">
        <label for="shilling">Shillings:</label>
        <input type="number" id="shilling" bind:value={$character.money.shilling} min="0" />
    </div>
    <div class="field">
        <label for="orteg">Ortegs:</label>
        <input type="number" id="orteg" bind:value={$character.money.orteg} min="0" />
    </div>
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
    }

    .field {
        display: flex;
        margin-bottom: 12px;
        align-items: center;
    }

    label {
        width: 120px;
        font-weight: bold;
        color: var(--primary-color);
        font-family: var(--header-font);
        font-size: 0.9em;
        text-transform: uppercase;
    }

    input {
        padding: 8px;
        border: 1px solid var(--border-color);
        border-radius: 0;
        width: 80px;
        text-align: center;
        background: #fff;
        color: var(--text-color);
    }

    input:focus {
        outline: none;
        border-color: var(--accent-color);
        box-shadow: 0 0 5px rgba(139, 115, 85, 0.2);
    }
</style>
