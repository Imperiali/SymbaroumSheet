<script lang="ts">
    import type { Character } from '$lib/types/character';
    import Section from '$lib/components/common/Section.svelte';

    export let character: Character;
    export let handleUpdate: (updates: Partial<Character>) => void;

    function updateMoney(currency: 'thaler' | 'shilling' | 'orteg', value: number) {
        handleUpdate({
            money: {
                ...character.money,
                [currency]: value
            }
        });
    }
</script>

<Section title="Riqueza" let:locked>
    <div class="field">
        <label for="thaler">Thalers:</label>
        <input 
            type="number" 
            id="thaler" 
            value={character.money.thaler} 
            on:input={(e) => updateMoney('thaler', +e.currentTarget.value)}
            min="0" 
            disabled={locked} 
        />
    </div>
    <div class="field">
        <label for="shilling">Shillings:</label>
        <input 
            type="number" 
            id="shilling" 
            value={character.money.shilling} 
            on:input={(e) => updateMoney('shilling', +e.currentTarget.value)}
            min="0" 
            disabled={locked} 
        />
    </div>
    <div class="field">
        <label for="orteg">Ortegs:</label>
        <input 
            type="number" 
            id="orteg" 
            value={character.money.orteg} 
            on:input={(e) => updateMoney('orteg', +e.currentTarget.value)}
            min="0" 
            disabled={locked} 
        />
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
