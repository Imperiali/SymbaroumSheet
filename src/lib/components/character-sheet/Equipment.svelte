<script lang="ts">
	import { character } from '$lib/stores/character';
	import Section from '$lib/components/common/Section.svelte';

	function addEquipment() {
		character.update((char) => ({
			...char,
			equipment: [
				...char.equipment,
				{
					name: '',
					description: ''
				}
			]
		}));
	}

	function removeEquipment(index: number) {
		character.update((char) => ({
			...char,
			equipment: char.equipment.filter((_, i) => i !== index)
		}));
	}
</script>

<Section title="Equipamento" let:locked>
	{#each $character.equipment as item, index}
		<div class="equipment-item">
			<div class="field">
				<label for="equipment-name-{index}">Nome:</label>
				<input
					type="text"
					id="equipment-name-{index}"
					bind:value={item.name}
					disabled={locked}
				/>
			</div>
			<div class="field">
				<label for="equipment-description-{index}">Descrição:</label>
				<textarea
					id="equipment-description-{index}"
					bind:value={item.description}
					disabled={locked}
				></textarea>
			</div>
			{#if !locked}
				<button class="remove-btn" on:click={() => removeEquipment(index)}>
					<span class="material-icons">delete</span>
					Remover
				</button>
			{/if}
		</div>
	{/each}
	{#if !locked}
		<button class="add-btn" on:click={addEquipment}>
			<span class="material-icons">add</span>
			Adicionar Equipamento
		</button>
	{/if}
</Section>

<style>
	.equipment-item {
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

	textarea {
		padding: 8px;
		border: 1px solid var(--border-color);
		border-radius: 0;
		flex: 1;
		background: #fff;
		color: var(--text-color);
		resize: vertical;
	}

	textarea:focus {
		outline: none;
		border-color: var(--accent-color);
		box-shadow: 0 0 5px rgba(139, 115, 85, 0.2);
	}

	.add-btn {
		display: flex;
		align-items: center;
		gap: 8px;
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
		gap: 8px;
	}

	.add-btn:hover {
		background: #6b5642;
	}

	.remove-btn:hover {
		background: #6b2828;
	}
</style>
