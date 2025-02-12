<script lang="ts">
	import type { Character } from '$lib/types/character';
	import Section from '$lib/components/common/Section.svelte';

	export let character: Character;
	export let handleUpdate: (updates: Partial<Character>) => Promise<void>;

	function updateField(field: string, value: string) {
		handleUpdate({
			[field]: value
		});
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
							value={character.idade ?? ''}
							on:input={(e) => updateField('idade', e.currentTarget.value)}
						/>
					</div>
					<div class="field">
						<label for="altura">ALTURA</label>
						<input
							type="text"
							id="altura"
							disabled={locked}
							value={character.altura ?? ''}
							on:input={(e) => updateField('altura', e.currentTarget.value)}
						/>
					</div>
					<div class="field">
						<label for="peso">PESO</label>
						<input
							type="text"
							id="peso"
							disabled={locked}
							value={character.peso ?? ''}
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
						value={character.aparencia ?? ''}
						on:input={(e) => updateField('aparencia', e.currentTarget.value)}
					></textarea>
				</div>
				<div class="field">
					<label for="historico">HISTÓRICO</label>
					<textarea
						id="historico"
						disabled={locked}
						value={character.historico ?? ''}
						on:input={(e) => updateField('historico', e.currentTarget.value)}
					></textarea>
				</div>
				<div class="field">
					<label for="objetivoPessoal">OBJETIVO PESSOAL</label>
					<textarea
						id="objetivoPessoal"
						disabled={locked}
						value={character.objetivoPessoal ?? ''}
						on:input={(e) => updateField('objetivoPessoal', e.currentTarget.value)}
					></textarea>
				</div>
			</div>
		</div>

		<div class="character-image">
			<div class="image-container">
				{#if character.imagemUrl}
					<div class="image-wrapper">
						<img src={character.imagemUrl} alt="Imagem do Personagem" />
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
							placeholder="URL da imagem"
							value={character.imagemUrl ?? ''}
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

	input,
	textarea {
		padding: 0.5rem;
		border: 1px solid var(--border-color);
		border-radius: 4px;
		width: 100%;
		background-color: var(--input-background);
		color: var(--text-color);
	}

	input:disabled,
	textarea:disabled {
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
		min-height: 300px;
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
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		transition: background-color 0.2s;
	}

	.reset-btn:hover {
		background: rgba(0, 0, 0, 0.7);
	}

	.reset-btn:disabled {
		background: rgba(0, 0, 0, 0.3);
		cursor: not-allowed;
	}

	.image-placeholder {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1rem;
	}

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	@media (max-width: 768px) {
		.personal-info {
			grid-template-columns: 1fr;
		}

		.info-row {
			grid-template-columns: 1fr;
			gap: 0.75rem;
		}

		.field {
			margin-bottom: 0.75rem;
		}

		textarea {
			min-height: 60px;
		}

		.image-container {
			min-height: 200px;
		}

		label {
			font-size: 0.75rem;
		}

		input,
		textarea {
			padding: 0.4rem;
			font-size: 0.9em;
		}
	}

	@media (min-width: 769px) and (max-width: 1024px) {
		.personal-info {
			grid-template-columns: 1fr 250px;
		}

		.info-row {
			gap: 0.75rem;
		}
	}

	@media (max-width: 480px) {
		.personal-info {
			gap: 0.75rem;
		}

		.info-fields {
			gap: 0.75rem;
		}

		.field {
			margin-bottom: 0.5rem;
		}

		textarea {
			min-height: 50px;
		}

		.image-container {
			min-height: 150px;
		}

		label {
			font-size: 0.7rem;
		}

		input,
		textarea {
			padding: 0.35rem;
			font-size: 0.85em;
		}

		.reset-btn {
			width: 28px;
			height: 28px;
			top: 4px;
			right: 4px;
		}
	}
</style>
