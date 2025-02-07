<script lang="ts">
    import { character } from '$lib/stores/character';

    function addArtifact() {
        character.update(char => ({
            ...char,
            artifacts: [...char.artifacts, {
                name: '',
                powers: '',
                corruption: '',
                bonus: ''
            }]
        }));
    }

    function removeArtifact(index: number) {
        character.update(char => ({
            ...char,
            artifacts: char.artifacts.filter((_, i) => i !== index)
        }));
    }
</script>

<div class="section artifacts">
    <h2>Artefatos e Tesouros Místicos</h2>
    <button class="add-button" on:click={addArtifact}>+ Adicionar Artefato</button>
    {#each $character.artifacts as artifact, i}
        <div class="artifact-entry">
            <div class="field">
                <label for="artifact-name-{i}">Nome:</label>
                <input type="text" id="artifact-name-{i}" bind:value={artifact.name} />
            </div>
            <div class="field">
                <label for="artifact-powers-{i}">Poderes:</label>
                <input type="text" id="artifact-powers-{i}" bind:value={artifact.powers} />
            </div>
            <div class="field">
                <label for="artifact-corruption-{i}">Corrupção:</label>
                <input type="text" id="artifact-corruption-{i}" bind:value={artifact.corruption} />
            </div>
            <div class="field">
                <label for="artifact-bonus-{i}">Bônus/Efeito:</label>
                <input type="text" id="artifact-bonus-{i}" bind:value={artifact.bonus} />
            </div>
            <button class="remove-button" on:click={() => removeArtifact(i)}>Remover</button>
        </div>
    {/each}
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
