<script lang="ts">
	import { character } from '$lib/stores/character';

  let visible = true;

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

<div class="section equipment">
	<h2 on:click={() => (visible = !visible)}>Equipamento</h2>
  {#if visible}

	<button class="add-button" on:click={addEquipment}>+ Adicionar Item</button>
	{#each $character.equipment as item, i}
		<div class="equipment-entry">
			<div class="field">
				<label for="equipment-name-{i}">Nome:</label>
				<input type="text" id="equipment-name-{i}" bind:value={item.name[i]} />
			</div>
			<div class="field">
				<label for="equipment-name-{i}">Descrição:</label>
				<input type="text" id="equipment-description-{i}" bind:value={item.description[i]} />
			</div>
			<button class="remove-button" on:click={() => removeEquipment(i)}>Remover</button>
		</div>
	{/each}
  {/if}
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

	.equipment-entry {
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
