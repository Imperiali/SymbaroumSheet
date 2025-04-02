<script lang="ts">
	import Section from '$lib/components/common/Section.svelte';
	import { abilitiesStore } from '$lib/stores/abilities';
	import { character } from '$lib/stores/character';
	import type { Ability } from '$lib/types/ability';
	import { createEventDispatcher } from 'svelte';
	import Modal from '../common/Modal.svelte';

	const dispatch = createEventDispatcher();

	export const abilities: {
		name: string;
		effect: string;
		type: string;
		classification: 'N' | 'A' | 'M';
	}[] = [];

	let currentItemEditting: number | null = null;

	let showModal = false;

	let allAbilities: Ability[] = [];

	let selectedAbility: Ability | undefined;


	function addAbility(newAbility: Ability) {
		character.update((char) => ({
			...char,
			abilities: [
				...char.abilities,
				newAbility
			]
		}));
	}

	async function openModal() {
		let result = await abilitiesStore.load();
		allAbilities = (result as Array<Ability>) ?? [];
		showModal = true;
	}

	function removeAbility(index: number) {
		character.update((char) => ({
			...char,
			abilities: char.abilities.filter((_, i) => i !== index)
		}));
	}

	function toggleEdit(i?: number) {
		if (i != undefined) {
			if (currentItemEditting == i) {
				currentItemEditting = null;
			} else {
				currentItemEditting = i!;
			}
		} else {
			currentItemEditting = null;
		}

		dispatch('lockChange', currentItemEditting);
	}
</script>

<Section title="Habilidades e Poderes" let:locked>
	<div class="abilities-list">
		{#each $character.abilities as ability, i}
			<div class="ability-item">
				<div class="field">
					<label for="ability-name-{i}">Nome:</label>
					<input id="ability-name-{i}" type="text" bind:value={ability.name} disabled={locked} />
				</div>

				<div class="field">
					<label for="ability-effect-{i}">Efeito:</label>
					<textarea id="ability-effect-{i}" bind:value={ability.effect} disabled={locked}
					></textarea>
				</div>

				<div class="field">
					<label for="ability-type-{i}">Tipo:</label>
					<input id="ability-type-{i}" type="text" bind:value={ability.type} disabled={locked} />
				</div>

				<div class="field">
					<label for="ability-classification-{i}">Classificação:</label>
					<select
						id="ability-classification-{i}"
						bind:value={ability.classification}
						disabled={locked}
					>
						<option value="N">Novato</option>
						<option value="A">Adepto</option>
						<option value="M">Mestre</option>
					</select>
				</div>

				{#if !locked}
					<button class="remove-btn" on:click={() => removeAbility(i)}>
						<span class="material-icons">delete</span>
						Remover
					</button>
				{/if}
			</div>
		{/each}

		{#if !locked}
			<button class="add-btn" on:click={openModal}>
				<span class="material-icons">add</span>
				Adicionar Habilidade
			</button>
		{/if}
	</div>
</Section>
<Modal bind:visible={showModal}>
	<div class="add-trait-modal">
		<h2>Nova Habilidade ou Poder</h2>
		<div class="field">
			<select
				on:change={(e: any) =>
					(selectedAbility = allAbilities.find((trait) => trait.id == e.target.value))}
				id="trait-classification"
			>
				{#each allAbilities as ability}
					<option value={ability.id}>{ability.name}</option>
				{/each}
			</select>
			<p>{selectedAbility?.description}</p>
			{#if selectedAbility?.novice}
				<div class="classification-container">
					<div class="label-container">
						<span class="label">Novato</span>
						<!-- <span class="classification-action">{getTraitActionType(selectedAbility.novice)}</span> -->
					</div>
					<span class="description">{selectedAbility.novice.description}</span>
				</div>
			{/if}
			{#if selectedAbility?.adept}
				<div class="classification-container">
					<div class="label-container">
						<span class="label">Adepto</span>
						<!-- <span class="classification-action">{getTraitActionType(selectedAbility.adept)}</span> -->
					</div>
					<span class="description">{selectedAbility.adept.description}</span>
				</div>
			{/if}
			{#if selectedAbility?.master}
				<div class="classification-container">
					<div class="label-container">
						<span class="label">Mestre</span>
						<!-- <span class="classification-action">{getTraitActionType(selectedAbility.master)}</span> -->
					</div>
					<span class="description">{selectedAbility.master.description}</span>
				</div>
			{/if}
			<button
				disabled={selectedAbility == undefined}
				class="add-btn"
				on:click={() => addAbility(selectedAbility!)}
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

	.ability-item {
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

	.classification-container {
		display: grid;
		width: fit-content;
		gap: 20px 10px;
		align-items: center;
		margin-bottom: 10px;

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

	.add-trait-modal {
		.field {
			margin-top: 5px;
		}

		h2 {
			text-align: center;
			text-transform: uppercase;
		}
	}
</style>
