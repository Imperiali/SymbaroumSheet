<script lang="ts">
    import type { Character } from '$lib/types/character';
    import Section from '$lib/components/common/Section.svelte';

    export let character: Character;
    export let handleUpdate: (updates: Partial<Character>) => void;
    export let readOnly = false;

    $: artifacts = character.artifacts || [];

    function addArtifact() {
        if (!readOnly) {
            const updatedArtifacts = [...artifacts, {
                name: '',
                powers: '',
                corruption: '',
                bonus: ''
            }];
            handleUpdate({
                artifacts: updatedArtifacts
            });
        }
    }

    function removeArtifact(index: number) {
        if (!readOnly) {
            const updatedArtifacts = artifacts.filter((_, i) => i !== index);
            handleUpdate({ artifacts: updatedArtifacts });
        }
    }

    function updateArtifact(index: number, field: string, value: string) {
        if (!readOnly) {
            const updatedArtifacts = [...artifacts];
            updatedArtifacts[index] = {
                ...updatedArtifacts[index],
                [field]: value
            };
            handleUpdate({ artifacts: updatedArtifacts });
        }
    }
</script>

<Section title="Artefatos e Tesouros Místicos" let:locked {readOnly}>
    {#each artifacts as artifact, i}
        <div class="artifact-entry">
            <div class="field">
                <label for="artifact-name-{i}">Nome:</label>
                <input 
                    type="text" 
                    id="artifact-name-{i}" 
                    value={artifact.name}
                    on:input={(e) => updateArtifact(i, 'name', e.currentTarget.value)}
                    disabled={locked || readOnly} 
                />
            </div>
            <div class="field">
                <label for="artifact-powers-{i}">Poderes:</label>
                <input 
                    type="text" 
                    id="artifact-powers-{i}" 
                    value={artifact.powers}
                    on:input={(e) => updateArtifact(i, 'powers', e.currentTarget.value)}
                    disabled={locked || readOnly} 
                />
            </div>
            <div class="field">
                <label for="artifact-corruption-{i}">Corrupção:</label>
                <input 
                    type="text" 
                    id="artifact-corruption-{i}" 
                    value={artifact.corruption}
                    on:input={(e) => updateArtifact(i, 'corruption', e.currentTarget.value)}
                    disabled={locked || readOnly} 
                />
            </div>
            <div class="field">
                <label for="artifact-bonus-{i}">Bônus/Efeito:</label>
                <input 
                    type="text" 
                    id="artifact-bonus-{i}" 
                    value={artifact.bonus}
                    on:input={(e) => updateArtifact(i, 'bonus', e.currentTarget.value)}
                    disabled={locked || readOnly} 
                />
            </div>
            {#if !locked && !readOnly}
                <button class="remove-button" on:click={() => removeArtifact(i)}>
                    <span class="material-icons">delete</span>
                    Remover
                </button>
            {/if}
        </div>
    {/each}
    {#if !locked && !readOnly}
        <button class="add-button" on:click={addArtifact}>
            <span class="material-icons">add</span>
            Adicionar Artefato
        </button>
    {/if}
</Section>

<style>
    .artifact-entry {
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
