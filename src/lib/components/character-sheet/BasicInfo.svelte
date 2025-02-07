<script lang="ts">
	import { character } from '$lib/stores/character';
	import Section from '$lib/components/common/Section.svelte';

	function updateField(field: string, value: string | number) {
		character.update((char) => ({
			...char,
			[field]: value
		}));
	}

    $: vitalityPercentage = ($character.vitality.current / $character.vitality.max) * 100;
    $: vitalityColor = vitalityPercentage > 50 ? '#4CAF50' : 
                       vitalityPercentage > 30 ? '#FFC107' : 
                       '#F44336';
</script>

<Section title="Informações Básicas">
	<div class="field">
		<label for="name">Nome:</label>
		<input
			type="text"
			id="name"
			bind:value={$character.name}
			on:input={(e) => updateField('name', e.currentTarget.value)}
			/>
    </div>
    <div class="field">
        <label for="race">Raça:</label>
        <input
            type="text"
            id="race"
            bind:value={$character.race}
            on:input={(e) => updateField('race', e.currentTarget.value)}
        />
    </div>
    <div class="field">
        <label for="occupation">Ocupação:</label>
        <input
            type="text"
            id="occupation"
            bind:value={$character.occupation}
            on:input={(e) => updateField('occupation', e.currentTarget.value)}
        />
    </div>
    <div class="field">
        <span>Experiência</span>
    </div>
    <div class="field multiple">
        <div class="field-container">
            <label for="current-experience">Disponível:</label>
            <input
                type="number"
                id="current-xperience"
                bind:value={$character.currentExperience}
                on:input={(e) => updateField('currentExperience', parseInt(e.currentTarget.value) || 0)}
            />
        </div>
        <div class="field-container">
            <label for="experience">Total:</label>
            <input
                type="number"
                id="experience"
                bind:value={$character.experience}
                on:input={(e) => updateField('experience', parseInt(e.currentTarget.value) || 0)}
            />
        </div>
    </div>
    <div class="field">
        <label for="shadow">Sombra:</label>
        <input
            type="text"
            id="shadow"
            bind:value={$character.shadow}
            on:input={(e) => updateField('shadow', e.currentTarget.value)}
        />
    </div>
    <div class="field">
        <label for="quote">Citação:</label>
        <textarea
            id="quote"
            bind:value={$character.quote}
            on:input={(e) => updateField('quote', e.currentTarget.value)}
        ></textarea>
    </div>

    <div class="field">
        <label for="painThreshold">Limiar de Dor:</label>
        <input
            type="number"
            id="painThreshold"
            bind:value={$character.painThreshold}
            on:input={(e) => updateField('painThreshold', parseInt(e.currentTarget.value) || 0)}
        />
    </div>

    <div class="field multiple">
        <span>Vitalidade</span>
        <div class="vitality-container">
            <div class="vitality-bar">
                <div 
                    class="vitality-progress" 
                    style="width: {vitalityPercentage}%; background-color: {vitalityColor};"
                ></div>
            </div>
            <div class="vitality-fields-container">
                <div class="field-container">
                    <label for="currentVitality">Atual:</label>
                    <input
                        type="number"
                        id="currentVitality"
                        bind:value={$character.vitality.current}
                        on:input={(e) => {
                            character.update((char) => ({
                                ...char,
                                vitality: {
                                    ...char.vitality,
                                    current: parseInt(e.currentTarget.value) || 0
                                }
                            }));
                        }}
                    />
                </div>
                <div class="field-container">
                    <label for="maxVitality">Máxima:</label>
                    <input
                        type="number"
                        id="maxVitality"
                        bind:value={$character.vitality.max}
                        on:input={(e) => {
                            character.update((char) => ({
                                ...char,
                                vitality: {
                                    ...char.vitality,
                                    max: parseInt(e.currentTarget.value) || 0
                                }
                            }));
                        }}
                    />
                </div>
            </div>
        </div>
    </div>

    <div class="field multiple">
        <span>Corrupção</span>
        <div class="corruption-container">
            <div class="field-container">
                <label for="currentCorruption">Atual:</label>
                <input
                    type="number"
                    id="currentCorruption"
                    bind:value={$character.corruption.current}
                    on:input={(e) => {
                        character.update((char) => ({
                            ...char,
                            corruption: {
                                ...char.corruption,
                                current: parseInt(e.currentTarget.value) || 0
                            }
                        }));
                    }}
                />
            </div>
            <div class="field-container">
                <label for="permanentCorruption">Permanente:</label>
                <input
                    type="number"
                    id="permanentCorruption"
                    bind:value={$character.corruption.permanent}
                    on:input={(e) => {
                        character.update((char) => ({
                            ...char,
                            corruption: {
                                ...char.corruption,
                                permanent: parseInt(e.currentTarget.value) || 0
                            }
                        }));
                    }}
                />
            </div>
        </div>
    </div>

    <div class="field">
        <label for="corruptionThreshold">Limiar de Corrupção:</label>
        <input
            type="number"
            id="corruptionThreshold"
            bind:value={$character.corruptionThreshold}
            on:input={(e) => updateField('corruptionThreshold', parseInt(e.currentTarget.value) || 0)}
        />
    </div>
</Section>

<style>
	.field {
		display: flex;
		margin-bottom: 12px;
		align-items: center;
		gap: 20px;
		justify-content: space-between;
	}

	.field span,
	label {
		width: 120px;
		font-weight: bold;
		color: var(--primary-color);
		font-family: var(--header-font);
		font-size: 0.9em;
		text-transform: uppercase;
	}

	input,
	textarea {
		padding: 8px;
		border: 1px solid var(--border-color);
		border-radius: 0;
		flex: 1;
		background: #fff;
		color: var(--text-color);
	}

	textarea {
		min-height: 60px;
		resize: vertical;
	}

	input:focus,
	textarea:focus {
		outline: none;
		border-color: var(--accent-color);
		box-shadow: 0 0 5px rgba(139, 115, 85, 0.2);
	}

	input[type='number'] {
		width: 80px;
		text-align: center;
	}

	.vitality-container {
        display: flex;
        flex-direction: column;
        gap: 8px;
        flex: 1;
    }

    .vitality-bar {
        width: 100%;
        height: 20px;
        background-color: #e0e0e0;
        border-radius: 10px;
        overflow: hidden;
        margin-bottom: 8px;
    }

    .vitality-progress {
        height: 100%;
        transition: width 0.3s ease-in-out, background-color 0.3s ease-in-out;
    }

    .field-container {
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .field-container label {
        width: auto;
        min-width: 60px;
    }

    .field-container input {
        width: 60px;
    }

    .corruption-container, .vitality-fields-container {
        display: flex;
        gap: 16px;
        flex: 1;
    }

    .corruption-container .field-container,
    .vitality-fields-container .field-container {
        flex: 1;
    }

	@media screen and (max-width: 768px) {
		.field-container {
			display: grid;
		}

		label {
			max-width: 120px;
			overflow: hidden;
			white-space: nowrap;
		}
	}
</style>
