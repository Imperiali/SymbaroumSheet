<script lang="ts">
	import type { Character } from '$lib/types/character';
	import Section from '$lib/components/common/Section.svelte';

	export let character: Character;
	export let handleUpdate: (updates: Partial<Character>) => Promise<void>;

	function addAbility() {
		handleUpdate({
			abilities: [
				...character.abilities,
				{
					name: '',
					effect: '',
					type: '',
					classification: 'N'
				}
			]
		});
	}

	function removeAbility(index: number) {
		handleUpdate({
			abilities: character.abilities.filter((_, i) => i !== index)
		});
	}

	function updateAbility(index: number, field: string, value: string) {
		handleUpdate({
			abilities: character.abilities.map((ability, i) =>
				i === index ? { ...ability, [field]: value } : ability
			)
		});
	}
</script>

<Section title="Habilidades e Poderes" let:locked>
	<div class="abilities-list">
		{#each character.abilities as ability, i}
			<div class="ability-item">
				<div class="field">
					<label for="ability-name-{i}">Nome:</label>
					<input 
						id="ability-name-{i}" 
						type="text" 
						value={ability.name} 
						disabled={locked}
						on:input={(e) => updateAbility(i, 'name', e.currentTarget.value)}
					/>
				</div>

				<div class="field">
					<label for="ability-effect-{i}">Efeito:</label>
					<textarea 
						id="ability-effect-{i}" 
						value={ability.effect} 
						disabled={locked}
						on:input={(e) => updateAbility(i, 'effect', e.currentTarget.value)}
					></textarea>
				</div>

				<div class="field">
					<label for="ability-type-{i}">Tipo:</label>
					<input 
						id="ability-type-{i}" 
						type="text" 
						value={ability.type} 
						disabled={locked}
						on:input={(e) => updateAbility(i, 'type', e.currentTarget.value)}
					/>
				</div>

				<div class="field">
					<label for="ability-classification-{i}">Classificação:</label>
					<select
						id="ability-classification-{i}"
						value={ability.classification}
						disabled={locked}
						on:change={(e) => updateAbility(i, 'classification', e.currentTarget.value)}
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
			<button class="add-btn" on:click={addAbility}>
				<span class="material-icons">add</span>
				Adicionar Habilidade
			</button>
		{/if}
	</div>
</Section>

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
</style>
