<script lang="ts">
    import type { Character } from '$lib/types/character';
    import Section from '$lib/components/common/Section.svelte';

    export let character: Character;
    export let handleUpdate: (updates: Partial<Character>) => void;
    export let readOnly = false;

    function addCompanion() {
        if (!readOnly) {
            handleUpdate({
                companions: [...character.companions, {
                    name: '',
                    race: '',
                    occupation: '',
                    player: ''
                }]
            });
        }
    }

    function removeCompanion(index: number) {
        if (!readOnly) {
            handleUpdate({
                companions: character.companions.filter((_, i) => i !== index)
            });
        }
    }

    function updateCompanion(index: number, field: string, value: string) {
        if (!readOnly) {
            const updatedCompanions = [...character.companions];
            updatedCompanions[index] = {
                ...updatedCompanions[index],
                [field]: value
            };
            handleUpdate({ companions: updatedCompanions });
        }
    }
</script>

<Section title="Amigos e Companheiros" let:locked {readOnly}>
    {#each character.companions as companion, index}
        <div class="companion-entry">
            <div class="field">
                <label for="companion-name-{index}">Nome:</label>
                <input 
                    type="text" 
                    id="companion-name-{index}" 
                    value={companion.name}
                    on:input={(e) => updateCompanion(index, 'name', e.currentTarget.value)}
                    disabled={locked || readOnly} 
                />
            </div>
            <div class="field">
                <label for="companion-race-{index}">Raça:</label>
                <input 
                    type="text" 
                    id="companion-race-{index}" 
                    value={companion.race}
                    on:input={(e) => updateCompanion(index, 'race', e.currentTarget.value)}
                    disabled={locked || readOnly} 
                />
            </div>
            <div class="field">
                <label for="companion-occupation-{index}">Ocupação:</label>
                <input 
                    type="text" 
                    id="companion-occupation-{index}" 
                    value={companion.occupation}
                    on:input={(e) => updateCompanion(index, 'occupation', e.currentTarget.value)}
                    disabled={locked || readOnly} 
                />
            </div>
            <div class="field">
                <label for="companion-player-{index}">Jogador:</label>
                <input 
                    type="text" 
                    id="companion-player-{index}" 
                    value={companion.player}
                    on:input={(e) => updateCompanion(index, 'player', e.currentTarget.value)}
                    disabled={locked || readOnly} 
                />
            </div>
            {#if !locked && !readOnly}
                <button class="remove-button" on:click={() => removeCompanion(index)}>
                    <span class="material-icons">delete</span>
                    Remover
                </button>
            {/if}
        </div>
    {/each}
    {#if !locked && !readOnly}
        <button class="add-button" on:click={addCompanion}>
            <span class="material-icons">add</span>
            Adicionar Companheiro
        </button>
    {/if}
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
        display: flex;
        align-items: center;
        gap: 8px;
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
