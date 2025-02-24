<script lang="ts">
	import { character } from '$lib/stores/character';
	import Section from '$lib/components/common/Section.svelte';
	import type { Character } from '$lib/types/character';
	import { toasts } from '$lib/stores/toast';
	import type { Toast } from '$lib/types/toast';
	import dice from '$lib/images/d20-icon.png';
	import { getRaces, type Race } from '$lib/types/race';
	import { getOccupations, type Occupation } from '$lib/types/occupation';
	import { onMount } from 'svelte';

	let races: Race[] = [];
	let occupations: Occupation[] = [];
	onMount(async () => {
		races = await getRaces();
		occupations = await getOccupations();
	});

	type AttributeName = keyof Character['attributes'];

	function updateAttribute(name: AttributeName, value: number) {
		character.update((char) => ({
			...char,
			attributes: {
				...char.attributes,
				[name]: value
			}
		}));
	}

	function updateToast(newToast: Toast) {
		toasts.add(newToast);
		toasts.load();
	}

	function rollD20(threshold: number, attribute: string) {
		const roll = Math.floor(Math.random() * 20) + 1;
		updateToast({
			id: Math.random() * 100,
			message: `${attribute}: ${roll <= threshold ? 'Sucesso' : 'Falha'}! O resultado foi ${roll}`,
			timeout: 3000,
			type: roll <= threshold ? 'success' : 'error'
		});
	}

	const attributes: Array<{ name: AttributeName; label: string }> = [
		{ name: 'accurate', label: 'Preciso' },
		{ name: 'cunning', label: 'Astuto' },
		{ name: 'discreet', label: 'Discreto' },
		{ name: 'persuasive', label: 'Persuasivo' },
		{ name: 'quick', label: 'Rápido' },
		{ name: 'resolute', label: 'Resoluto' },
		{ name: 'strong', label: 'Vigoroso' },
		{ name: 'vigilant', label: 'Vigilante' }
	];
</script>

<Section title="Atributos" let:locked>
	<div class="attributes-grid">
		{#each attributes as { name, label }}
			<div class="attribute">
				<div class="header-container">
					<label for={name}>{label}:</label>
					<button on:click={() => rollD20($character.attributes[name], label)}>
						<img src={dice} alt="dice icon" />
					</button>
				</div>
				<input
					type="number"
					id={name}
					min="5"
					max="15"
					bind:value={$character.attributes[name]}
					on:input={(e) => updateAttribute(name, parseInt(e.currentTarget.value) || 10)}
					disabled={locked}
				/>
			</div>
		{/each}
	</div>
</Section>

<style>
	.attributes-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 15px;
	}
	.header-container {
		display: flex;
		justify-content: space-between;
		button {
			width: fit-content;
		}
	}
	img {
		width: 20px;
		height: 20px;
	}
	.attribute {
		display: flex;
		flex-direction: column;
		background: #fff;
		padding: 10px;
		border: 1px solid var(--border-color);
	}

	label {
		font-weight: bold;
		color: var(--primary-color);
		font-family: var(--header-font);
		font-size: 0.9em;
		text-transform: uppercase;
		margin-bottom: 5px;
	}

	input {
		padding: 8px;
		border: 1px solid var(--border-color);
		border-radius: 0;
		background: #fff;
		color: var(--text-color);
		width: 80px;
		text-align: center;
		align-self: center;
	}

	input:focus {
		outline: none;
		border-color: var(--accent-color);
		box-shadow: 0 0 5px rgba(139, 115, 85, 0.2);
	}

	input[type='number'] {
		-moz-appearance: textfield;
	}

	input[type='number']::-webkit-outer-spin-button,
	input[type='number']::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	@media (max-width: 480px) {
		.attributes-grid {
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
			gap: 15px;
		}

		label {
			font-size: 0.75em;
		}
	}
</style>
