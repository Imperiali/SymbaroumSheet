<script lang="ts">
    import { character } from '$lib/stores/character';
    import Section from '$lib/components/common/Section.svelte';
</script>

<Section title="Riqueza">
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
</Section>

<style>
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
