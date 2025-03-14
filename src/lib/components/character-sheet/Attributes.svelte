<script lang="ts">
	import { character } from '$lib/stores/character';
	import Section from '$lib/components/common/Section.svelte';
	import type { Character } from '$lib/types/character';
	import { toasts } from '$lib/stores/toast';
	import type { Toast } from '$lib/types/toast';
	import dice from '$lib/images/d20-icon.png';
	import { getRaces, type Race } from '$lib/types/race';
	import { onMount } from 'svelte';

	let races: Race[] = [];
	onMount(async () => {
		races = await getRaces();
		
		character.update((char) => {
			if (!char.attributesBonuses) {
				return {
					...char,
					attributesBonuses: {
						accurate: 0,
						cunning: 0,
						discreet: 0,
						persuasive: 0,
						quick: 0,
						resolute: 0,
						strong: 0,
						vigilant: 0
					}
				};
			}
			return char;
		});
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

	function updateAttributeBonus(name: AttributeName, value: number) {
		character.update((char) => {
			const currentBonuses = char.attributesBonuses || {};
			
			return {
				...char,
				attributesBonuses: {
					...currentBonuses,
					[name]: value
				}
			};
		});
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

	function getTotalAttributeValue(name: AttributeName): number {
		const baseValue = $character?.attributes[name];
		const bonusValue = $character?.attributesBonuses?.[name] || 0;
		return baseValue + bonusValue;
	}

	function getAttributeBonus(name: AttributeName): number {
		return $character?.attributesBonuses?.[name] || 0;
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
					<button on:click={() => rollD20(getTotalAttributeValue(name), label)}>
						<img src={dice} alt="dice icon" />
					</button>
				</div>
				<div class="attribute-values">
					<div class="attribute-total">
						<span class="field-label">Total</span>
						<div class="total-value">{getTotalAttributeValue(name)}</div>
					</div>
					<div class="attribute-fields">
						<div class="attribute-field base">
							<span class="field-label">Base</span>
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
						<div class="attribute-field bonus">
							<span class="field-label">Bônus</span>
							<input
								type="number"
								id={`${name}-bonus`}
								value={getAttributeBonus(name)}
								on:input={(e) => updateAttributeBonus(name, parseInt(e.currentTarget.value) || 0)}
								disabled={locked}
							/>
						</div>
					</div>
				</div>
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
		margin-bottom: 10px;
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

	.attribute-values {
		display: flex;
		justify-content: space-between;
		gap: 10px;
	}

	.attribute-fields {
		display: flex;
		gap: 10px;
	}

	.attribute-field {
		display: flex;
		flex-direction: column;
		align-items: center;
		flex: 1;
	}

	.attribute-field.base > input {
		border-radius: 50%;
		border: 1px solid var(--border-color);
		width: 60px;
		height: 60px;
		text-align: center;
		color: var(--text-color);
		font-size: 1.2em;
		font-weight: bold;
		outline: none;
		box-shadow: 0 0 5px rgba(139, 115, 85, 0.2);
	}

	.attribute-field.bonus {
		justify-content: space-between;
	}

	.attribute-field.bonus > input {
		width: 60px;
	}

	.attribute-total {
		display: flex;
		flex-direction: column;
		align-items: center;
		flex: 1;
	}

	.field-label {
		font-size: 0.8em;
		color: var(--secondary-color);
		margin-bottom: 5px;
		text-align: center;
	}

	.total-value {
		padding: 8px;
		color: var(--text-color);
		font-size: 1.8em;
		text-align: center;
		font-weight: bold;
	}

	label {
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
		background: #fff;
		color: var(--text-color);
		width: 80px;
		text-align: center;
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

</style>
