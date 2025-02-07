<script lang="ts">
    import { character } from '$lib/stores/character';
    import Section from '$lib/components/common/Section.svelte';
    import type { Character } from '$lib/types/character';
    
    type AttributeName = keyof Character['attributes'];
    
    function updateAttribute(name: AttributeName, value: number) {
        character.update(char => ({
            ...char,
            attributes: {
                ...char.attributes,
                [name]: value
            }
        }));
    }

    const attributes: Array<{ name: AttributeName; label: string }> = [
        { name: 'accurate', label: 'Preciso' },
        { name: 'cunning', label: 'Astuto' },
        { name: 'discreet', label: 'Discreto' },
        { name: 'persuasive', label: 'Persuasivo' },
        { name: 'quick', label: 'Ágil' },
        { name: 'resolute', label: 'Resoluto' },
        { name: 'strong', label: 'Forte' },
        { name: 'vigilant', label: 'Vigilante' }
    ];
</script>

<Section title="Atributos">
    <div class="attributes-grid">
        {#each attributes as { name, label }}
            <div class="attribute">
                <label for={name}>{label}:</label>
                <input
                    type="number"
                    id={name}
                    min="5"
                    max="15"
                    bind:value={$character.attributes[name]}
                    on:input={(e) => updateAttribute(name, parseInt(e.currentTarget.value) || 10)}
                />
            </div>
        {/each}
    </div>
</Section>

<style>
    .attributes-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 15px;
    }

    .attribute {
        display: flex;
        flex-direction: column;
        background: #fff;
        padding: 10px;
        border: 1px solid var(--border-color);
    }

    label {
        font-weight: bold;
        color: var(--primary-color);
        font-family: var(--header-font);
        font-size: 0.9em;
        text-transform: uppercase;
        margin-bottom: 5px;
    }

    input {
        padding: 8px;
        border: 1px solid var(--border-color);
        border-radius: 0;
        background: #fff;
        color: var(--text-color);
        width: 80px;
        text-align: center;
        align-self: center;
    }

    input:focus {
        outline: none;
        border-color: var(--accent-color);
        box-shadow: 0 0 5px rgba(139, 115, 85, 0.2);
    }

    input[type="number"] {
        -moz-appearance: textfield;
    }

    input[type="number"]::-webkit-outer-spin-button,
    input[type="number"]::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
</style>
