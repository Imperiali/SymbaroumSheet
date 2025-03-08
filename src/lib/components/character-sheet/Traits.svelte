<script lang="ts">
	import Section from '$lib/components/common/Section.svelte';
	import { character } from '$lib/stores/character';
	import { traitsStore } from '$lib/stores/traits';
	import { getTraitActionType, type Trait } from '$lib/types/traits';
	import Modal from '../common/Modal.svelte';

	export const traits: Trait[] = [];

	let showModal = false;

	let allTraits: Trait[] = [];

	let selectedTrait: Trait | undefined;

	function addTrait(newTrait: Trait) {
		character.update((char) => ({
			...char,
			traits: [...char.traits, newTrait]
		}));
		showModal = false;
		selectedTrait = undefined;
	}

	async function openModal() {
		let result = await traitsStore.load();
		allTraits = result ?? [];
		showModal = true;
	}

	function removeTrait(index: number) {
		character.update((trait) => ({
			...trait,
			traits: trait.traits.filter((_, i) => i !== index)
		}));
	}
</script>

<Section title="Traços, Dádivas e Fardos" let:locked>
	<div class="abilities-list">
		{#each $character.traits as trait, i}
			<div class="trait-item">
				<div class="field">
					<label for="trait-name-{i}">Nome:</label>
					<input id="trait-name-{i}" type="text" bind:value={trait.name} disabled={locked} />
				</div>

				<div class="field">
					<label for="trait-effect-{i}">Descrição:</label>
					<textarea id="trait-effect-{i}" bind:value={trait.description} disabled={locked}
					></textarea>
				</div>

				<div class="field">
					<label for="trait-type-{i}">Tipo:</label>
					<input id="trait-type-{i}" type="text" bind:value={trait.type} disabled={locked} />
				</div>

				<div class="field">
					<label for="trait-classification-{i}">Classificação:</label>
					<select
						id="trait-classification-{i}"
						bind:value={trait.classification}
						disabled={locked}
					>
						<option value="N">Novato</option>
						<option value="A">Adepto</option>
						<option value="M">Mestre</option>
					</select>
				</div>

				{#if !locked}
					<button class="remove-btn" on:click={() => removeTrait(i)}>
						<span class="material-icons">delete</span>
						Remover
					</button>
				{/if}
			</div>
		{/each}

		{#if !locked}
			<button class="add-btn" on:click={() => openModal()}>
				<span class="material-icons">add</span>
				Adicionar Traço
			</button>
		{/if}
	</div>
</Section>
<Modal bind:visible={showModal}>
	<div class="add-trait-modal">
		<h2>Novo Traço</h2>
		<div class="field">
			<select
				on:change={(e: any) =>
					(selectedTrait = allTraits.find((trait) => trait.id == e.target.value))}
				id="trait-classification"
			>
				{#each allTraits as trait}
					<option value={trait.id}>{trait.name}</option>
				{/each}
			</select>
			<p>{selectedTrait?.description}</p>
			{#if selectedTrait?.novice}
				<div class="classification-container">
					<div class="label-container">
						<span class="label">Novato</span>
						<span class="classification-action">{getTraitActionType(selectedTrait.novice)}</span>
					</div>
					<span class="description">{selectedTrait.novice.description}</span>
				</div>
			{/if}
      {#if selectedTrait?.adept}
				<div class="classification-container">
					<div class="label-container">
						<span class="label">Adepto</span>
						<span class="classification-action">{getTraitActionType(selectedTrait.adept)}</span>
					</div>
					<span class="description">{selectedTrait.adept.description}</span>
				</div>
			{/if}
      {#if selectedTrait?.master}
				<div class="classification-container">
					<div class="label-container">
						<span class="label">Mestre</span>
						<span class="classification-action">{getTraitActionType(selectedTrait.master)}</span>
					</div>
					<span class="description">{selectedTrait.master.description}</span>
				</div>
			{/if}
			<button
				disabled={selectedTrait == undefined}
				class="add-btn"
				on:click={() => addTrait(selectedTrait!)}
			>
				<span class="material-icons">add</span>
				Adicionar Traço
			</button>
		</div>
	</div>
</Modal>

<style>
	.abilities-list {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.trait-item {
		background: #fff;
		padding: 15px;
		margin: 10px 0;
		border: 1px solid var(--border-color);
		position: relative;
	}

	.field {
		display: flex;
		margin-bottom: 12px;
		align-items: flex-start;

		flex-direction: column;
		gap: 0.5rem;

		input,
		textarea,
		select {
			width: 100%;
		}
	}

	label {
		/* width: 120px; */
		font-weight: bold;
		color: var(--primary-color);
		font-family: var(--header-font);
		font-size: 0.9em;
		text-transform: uppercase;
	}

	input,
	select,
	textarea {
		padding: 8px;
		border: 1px solid var(--border-color);
		border-radius: 0;
		flex: 1;
		background: #fff;
		color: var(--text-color);
	}

	select option:hover {
		box-shadow: 0 0 10px 100px #2c3e50 inset;
	}

	textarea {
		resize: vertical;
		min-height: 60px;
	}

	input:focus,
	select:focus,
	textarea:focus {
		outline: none;
		border-color: var(--accent-color);
		box-shadow: 0 0 5px rgba(139, 115, 85, 0.2);
	}

	.add-btn {
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
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.remove-btn {
		background: #8b3535;
		color: white;
		border: none;
		padding: 4px 8px;
		cursor: pointer;
		font-family: var(--header-font);
		font-size: 0.8em;
		transition: all 0.2s ease;
		display: flex;
		align-items: center;
	}

	.add-btn:hover {
		background: #6b5642;
	}

	.remove-btn:hover {
		background: #6b2828;
	}

	.add-trait-modal {
		.field {
			margin-top: 5px;
		}

		h2 {
			text-align: center;
			text-transform: uppercase;
		}

		.classification-container {
			display: grid;
			width: fit-content;
			gap: 20px 10px;
      align-items: center;

      .label-container {
        grid-row: 1;
				grid-column: 1;
      }
			.label {
				font-weight: 600;
				
			}
			.classification-action {
				
				font-style: oblique;
			}
			.description {
				grid-row: 1;
        grid-column: 2;
			}
		}
	}
</style>
