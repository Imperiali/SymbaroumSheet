<!-- Personal.svelte -->
<script lang="ts">
    import { character } from '$lib/stores/character';
    import Section from '$lib/components/common/Section.svelte';

    function updateField(field: string, value: string) {
        character.update((char) => ({
            ...char,
            [field]: value
        }));
    }
</script>

<Section title="Informações Pessoais" let:locked>
    <div class="personal-info">
        <div class="info-fields">
            <div class="basic-info">
                <div class="info-row">
                    <div class="field">
                        <label for="idade">IDADE</label>
                        <input 
                            type="text" 
                            id="idade" 
                            disabled={locked}
                            value={$character.idade ?? ''}
                            on:input={(e) => updateField('idade', e.currentTarget.value)} 
                        />
                    </div>
                    <div class="field">
                        <label for="altura">ALTURA</label>
                        <input 
                            type="text" 
                            id="altura" 
                            disabled={locked}
                            value={$character.altura ?? ''}
                            on:input={(e) => updateField('altura', e.currentTarget.value)} 
                        />
                    </div>
                    <div class="field">
                        <label for="peso">PESO</label>
                        <input 
                            type="text" 
                            id="peso" 
                            disabled={locked}
                            value={$character.peso ?? ''}
                            on:input={(e) => updateField('peso', e.currentTarget.value)} 
                        />
                    </div>
                </div>
            </div>

            <div class="text-fields">
                <div class="field">
                    <label for="aparencia">APARÊNCIA</label>
                    <textarea 
                        id="aparencia" 
                        disabled={locked}
                        value={$character.aparencia ?? ''}
                        on:input={(e) => updateField('aparencia', e.currentTarget.value)}
                    ></textarea>
                </div>
                <div class="field">
                    <label for="historico">HISTÓRICO</label>
                    <textarea 
                        id="historico" 
                        disabled={locked}
                        value={$character.historico ?? ''}
                        on:input={(e) => updateField('historico', e.currentTarget.value)}
                    ></textarea>
                </div>
                <div class="field">
                    <label for="objetivoPessoal">OBJETIVO PESSOAL</label>
                    <textarea 
                        id="objetivoPessoal" 
                        disabled={locked}
                        value={$character.objetivoPessoal ?? ''}
                        on:input={(e) => updateField('objetivoPessoal', e.currentTarget.value)}
                    ></textarea>
                </div>
            </div>
        </div>

        <div class="character-image">
            <div class="image-container">
                {#if $character.imagemUrl}
                    <div class="image-wrapper">
                        <img src={$character.imagemUrl} alt="Imagem do Personagem" />
                        <button 
                            class="reset-btn"
                            disabled={locked}
                            on:click={() => updateField('imagemUrl', '')}
                            title="Limpar imagem"
                        >
                            <span class="material-icons">restart_alt</span>
                        </button>
                    </div>
                {:else}
                    <div class="image-placeholder">
                        <input 
                            type="text" 
                            disabled={locked}
                            placeholder="URL da imagem do personagem"
                            value={$character.imagemUrl ?? ''}
                            on:input={(e) => updateField('imagemUrl', e.currentTarget.value)}
                        />
                    </div>
                {/if}
            </div>
        </div>
    </div>
</Section>

<style>
    .personal-info {
        display: grid;
        grid-template-columns: 1fr 300px;
        gap: 1rem;
    }

    .info-fields {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .basic-info {
        margin-bottom: 1rem;
    }

    .info-row {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1rem;
    }

    .field {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        margin-bottom: 1rem;
    }

    .text-fields {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    label {
        font-family: var(--header-font);
        color: var(--primary-color);
        font-size: 0.8rem;
    }

    input, textarea {
        padding: 0.5rem;
        border: 1px solid var(--border-color);
        border-radius: 4px;
        width: 100%;
        background-color: var(--input-background);
        color: var(--text-color);
    }

    input:disabled, textarea:disabled {
        background-color: var(--disabled-background);
        color: var(--disabled-text);
    }

    textarea {
        resize: vertical;
        min-height: 80px;
    }

    .character-image {
        width: 100%;
    }

    .image-container {
        width: 100%;
        height: 100%;
        border: 2px dashed var(--border-color);
        border-radius: 8px;
        overflow: hidden;
        position: relative;
    }

    .image-wrapper {
        width: 100%;
        height: 100%;
        position: relative;
    }

    .reset-btn {
        position: absolute;
        top: 8px;
        right: 8px;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: rgba(0, 0, 0, 0.5);
        border: none;
        color: white;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        transition: background-color 0.2s;
    }

    .reset-btn:hover:not(:disabled) {
        background: rgba(0, 0, 0, 0.7);
    }

    .reset-btn:disabled {
        opacity: 0.5;
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .image-placeholder {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 1rem;
    }
</style>
