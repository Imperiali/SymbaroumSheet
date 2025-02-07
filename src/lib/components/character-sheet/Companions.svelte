<script lang="ts">
    import { character } from '$lib/stores/character';
    import Section from '$lib/components/common/Section.svelte';

    function addCompanion() {
        character.update(char => ({
            ...char,
            companions: [...char.companions, {
                name: '',
                race: '',
                occupation: '',
                player: ''
            }]
        }));
    }

    function removeCompanion(index: number) {
        character.update(char => ({
            ...char,
            companions: char.companions.filter((_, i) => i !== index)
        }));
    }
</script>

<Section title="Amigos e Companheiros">
    <button class="add-button" on:click={addCompanion}>+ Adicionar Companheiro</button>
    {#each $character.companions as companion, i}
        <div class="companion-entry">
            <div class="field">
                <label for="companion-name-{i}">Nome:</label>
                <input type="text" id="companion-name-{i}" bind:value={companion.name} />
            </div>
            <div class="field">
                <label for="companion-race-{i}">Raça:</label>
                <input type="text" id="companion-race-{i}" bind:value={companion.race} />
            </div>
            <div class="field">
                <label for="companion-occupation-{i}">Ocupação:</label>
                <input type="text" id="companion-occupation-{i}" bind:value={companion.occupation} />
            </div>
            <div class="field">
                <label for="companion-player-{i}">Dinheiro:</label>
                <input type="text" id="companion-player-{i}" bind:value={companion.player} />
            </div>
            <button class="remove-button" on:click={() => removeCompanion(i)}>Remover</button>
        </div>
    {/each}
</Section>

<style>
    .companion-entry {
        background: #fff;
        padding: 15px;
        margin: 10px 0;
        border: 1px solid var(--border-color);
        position: relative;
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
        flex: 1;
        background: #fff;
        color: var(--text-color);
    }

    input:focus {
        outline: none;
        border-color: var(--accent-color);
        box-shadow: 0 0 5px rgba(139, 115, 85, 0.2);
    }

    .add-button {
        background: var(--accent-color);
        color: white;
        border: none;
        padding: 8px 16px;
        cursor: pointer;
        margin-bottom: 10px;
        font-family: var(--header-font);
        font-size: 0.9em;
        text-transform: uppercase;
        letter-spacing: 1px;
        transition: all 0.2s ease;
    }

    .remove-button {
        background: #8b3535;
        color: white;
        border: none;
        padding: 4px 8px;
        cursor: pointer;
        font-family: var(--header-font);
        font-size: 0.8em;
        transition: all 0.2s ease;
    }

    .add-button:hover {
        background: #6b5642;
    }

    .remove-button:hover {
        background: #6b2828;
    }
</style>
