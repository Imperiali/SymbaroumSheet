<script lang="ts">
	import { character } from '$lib/stores/character';
	import Section from '$lib/components/common/Section.svelte';

	let visible = true;

	function updateField(field: string, value: string | number) {
		character.update((char) => ({
			...char,
			[field]: value
		}));
	}

	$: vitalityPercentage =
		$character?.vitality?.current != null && $character?.vitality?.max != null
			? ($character.vitality.current / $character.vitality.max) * 100
			: 0;
	$: vitalityColor =
		vitalityPercentage > 50 ? '#4CAF50' : vitalityPercentage > 30 ? '#FFC107' : '#F44336';
</script>

<Section title="Informações Básicas" let:locked>
	<div class="basic-info-grid">
		<div class="field player-name">
			<label for="name">Nome:</label>
			<input
				disabled={locked}
				type="text"
				id="name"
				bind:value={$character.name}
				on:input={(e) => updateField('name', e.currentTarget.value)}
			/>
		</div>

		<div class="field occupation-field">
			<label for="occupation">Ocupação:</label>
			<input
				disabled={locked}
				type="text"
				id="occupation"
				bind:value={$character.occupation}
				on:input={(e) => updateField('occupation', e.currentTarget.value)}
			/>
		</div>

		<div class="field multiple vitality-field">
			<div class="header-container">
				<span class="material-icons">chevron_left</span>
				<span>Vitalidade</span>
				<span class="material-icons">chevron_right</span>
			</div>
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
							disabled={locked}
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
							disabled={locked}
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
					<div class="field-container">
						<label for="painThreshold">Limiar:</label>
						<input
							disabled={locked}
							type="number"
							id="painThreshold"
							bind:value={$character.painThreshold}
							on:input={(e) => updateField('painThreshold', parseInt(e.currentTarget.value) || 0)}
						/>
					</div>
				</div>
			</div>
		</div>
		<div class="field multiple exp-field">
			<span>Experiência</span>
			<div class="field-container">
				<input
					disabled={locked}
					type="number"
					id="current-experience"
					bind:value={$character.currentExperience}
					on:input={(e) => updateField('currentExperience', parseInt(e.currentTarget.value) || 0)}
				/>
				<label class="text-left" for="current-experience">Disponível</label>
			</div>
			<div class="field-container">
				<input
					disabled={locked}
					type="number"
					id="experience"
					bind:value={$character.experience}
					on:input={(e) => updateField('experience', parseInt(e.currentTarget.value) || 0)}
				/>
				<label class="text-left" for="experience">Total</label>
			</div>
		</div>
		<!-- <div class="field threshold-container">
			<span>Limiar</span>
			<div class="field-container">
				<label for="painThreshold">Dor:</label>
				<input
					disabled={locked}
					type="number"
					id="painThreshold"
					bind:value={$character.painThreshold}
					on:input={(e) => updateField('painThreshold', parseInt(e.currentTarget.value) || 0)}
				/>
			</div>
			
		</div> -->

		<div class="field multiple corruption-field">
			<span>Corrupção</span>
			<div class="corruption-container">
				<div class="field-container">
					<label for="currentCorruption">Atual:</label>
					<input
						disabled={locked}
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
						disabled={locked}
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
        <div class="field-container">
          <label for="corruptionThreshold">Limiar:</label>
          <input
            disabled={locked}
            type="number"
            id="corruptionThreshold"
            bind:value={$character.corruptionThreshold}
            on:input={(e) => updateField('corruptionThreshold', parseInt(e.currentTarget.value) || 0)}
          />
        </div>
			</div>
		</div>

		<div class="subsection">
			<button class="toggle-btn" on:click={() => (visible = !visible)}
				><h3>Informações Adicionais</h3></button
			>
			{#if visible}
				<div class="field race-field">
					<label for="race">Raça:</label>
					<input
						disabled={locked}
						type="text"
						id="race"
						bind:value={$character.race}
						on:input={(e) => updateField('race', e.currentTarget.value)}
					/>
				</div>

				<div class="field shadow-field">
					<label for="shadow">Sombra:</label>
					<input
						disabled={locked}
						type="text"
						id="shadow"
						bind:value={$character.shadow}
						on:input={(e) => updateField('shadow', e.currentTarget.value)}
					/>
				</div>
				<div class="field quote-field">
					<label for="quote">Citação:</label>
					<textarea
						id="quote"
						bind:value={$character.quote}
						on:input={(e) => updateField('quote', e.currentTarget.value)}
					></textarea>
				</div>
			{/if}
		</div>
	</div>
</Section>

<style>
	.toggle-btn {
		background: none;
		border: none;
		padding: 0;
		cursor: pointer;
		width: 100%;
	}

	.toggle-btn:disabled {
		cursor: not-allowed;
	}
	.toggle-btn:hover h3 {
		background: var(--hover-color, #f5f5f5);
	}
	.field {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.field.multiple {
		flex-direction: column;
	}

	.field-container {
		display: flex;
		gap: 0.5rem;
		align-items: center;
	}

	.vitality-container {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		width: 100%;
	}

	.vitality-fields-container {
		display: flex;
		gap: 1rem;
		justify-content: space-between;
	}

	.corruption-container {
		display: flex;
		gap: 1rem;
		justify-content: space-between;
	}

	.threshold-container {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		width: 100%;
	}

	.vitality-bar {
		width: 100%;
		height: 20px;
		background-color: #e0e0e0;
		border-radius: 3px;
		overflow: hidden;
		border: 1px solid var(--border-color);
	}

	.vitality-progress {
		height: 100%;
		transition: width 0.3s ease;
	}

	input,
	textarea {
		padding: 0.5rem;
		border: 1px solid #ccc;
		border-radius: 4px;
		width: 100%;
	}

	input[type='number'] {
		width: 80px;
		text-align: center;
	}

	textarea {
		resize: vertical;
		min-height: 100px;
	}

	label {
		font-weight: 500;
		/* min-width: 80px; */
	}

	.field-container .text-left {
		text-align: left;
	}

	.basic-info-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1.5rem;
		padding: 1rem;
		max-width: 1200px;
		margin: 0 auto;
	}

	/* Grid Layout */
	.player-name {
		grid-column: 1 / span 2;
		grid-row: 1;
	}

	.vitality-field {
		grid-column: 1 / span 3;
		grid-row: 2;
		align-self: center;
	}

	.shadow-field {
		grid-column: 3;
		grid-row: 1;
	}

	.race-field {
		grid-column: 1;
		grid-row: 2;
	}

	.occupation-field {
		grid-column: 3 / span 2;
		grid-row: 1;
	}

	.corruption-field {
		grid-column: 4 / span 3;
		grid-row: 2;
		align-self: center;
	}

	/* .threshold-container {
		grid-column: 1;
		grid-row: 2;
		align-items: end;
	} */

	.exp-field {
		grid-column: 5 / span 2;
		grid-row: 1;
		align-items: start;
	}

	.quote-field {
		grid-column: 1 / 4;
		grid-row: 5;
	}

	/* Field Styling */
	.vitality-field,
	.corruption-field,
	.threshold-container,
	.exp-field {
		background-color: rgba(0, 0, 0, 0.02);
		padding: 1rem;
		border-radius: 8px;
	}

	.field span {
		text-align: center;
		font-weight: 600;
		margin-bottom: 0.5rem;
	}

	.field-container label {
		text-align: right;
	}

	.header-container {
		display: flex;
		width: 100%;
		justify-content: space-between;
		align-items: center;

		span {
			min-width: 50px;
		}
	}

	.subsection {
		margin: 8px 0;
		padding: 15px;
		background: #fff;
		border: 1px solid var(--border-color);
		position: relative;
		order: 5;
		grid-row: 4;
    grid-column: 1 / span 6 ;

		h3 {
			font-family: var(--header-font);
			color: var(--primary-color);
			margin-bottom: 15px;
			font-size: 1.1em;
			border-bottom: 1px solid var(--border-color);
			padding-bottom: 5px;
		}
	}

	/* Responsive adjustments */
	@media (max-width: 768px) {
		.basic-info-grid {
			grid-template-columns: 1fr;
			gap: 1rem;
			padding: 0.5rem;
		}

		.field, .subsection {
			grid-column: 1 !important;
			grid-row: auto !important;
		}

		.vitality-fields-container,
		.corruption-container {
			flex-direction: column;
			gap: 0.5rem;
		}

		.field-container {
			width: 100%;
			justify-content: space-between;
		}

		input[type='number'] {
			width: 120px;
		}

		.vitality-bar {
			height: 16px;
		}

		.field.multiple {
			padding: 0.75rem;
		}

		label {
			min-width: 60px;
			font-size: 0.9em;
		}

		.field span {
			font-size: 1em;
			margin-bottom: 0.25rem;
		}

		.exp-field,
		.vitality-field,
		.threshold-container {
			text-align: center;
			span {
				width: 100%;
			}
		}
		.field-container {
			label {
				text-align: right;
			}
		}

    .subsection {
      grid-column: 1;
    }
	}

	@media (max-width: 480px) {
		.basic-info-grid {
			padding: 0.25rem;
			gap: 0.75rem;
		}

		input,
		textarea {
			padding: 0.35rem;
			font-size: 0.9em;
		}

		.field.multiple {
			padding: 0.5rem;
		}

		label {
			min-width: 50px;
			font-size: 0.85em;
			text-transform: uppercase;
		}

		.race-field {
			order: 1;
		}

		.player-name {
			order: 0;
		}
		.vitality-field,
		.corruption-field {
			order: 0;
      grid-row: 2;
      grid-column: 1;
		}


		.occupation-field {
			order: 0;
		}

    .subsection {
      order: 4;
      grid-row: 5;
    }
	}
</style>
