<script lang="ts">
	import { character } from '$lib/stores/character';
	import Section from '$lib/components/common/Section.svelte';
	import type { Character } from '$lib/types/character';
	import { toasts } from '$lib/stores/toast';
	import type { Toast } from '$lib/types/toast';
	import dice from '$lib/images/d20-icon.png';
	import { getRaces, type Race } from '$lib/types/race';
	import { onMount } from 'svelte';
	import Modal from '$lib/components/common/Modal.svelte';

	let races: Race[] = [];
	let showEditModal = false;
	let tempAttributes = {
		accurate: 0,
		cunning: 0,
		discreet: 0,
		persuasive: 0,
		quick: 0,
		resolute: 0,
		strong: 0,
		vigilant: 0
	};
	let tempBonuses = {
		accurate: 0,
		cunning: 0,
		discreet: 0,
		persuasive: 0,
		quick: 0,
		resolute: 0,
		strong: 0,
		vigilant: 0
	};

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

	function formatAttributeBonus(name: AttributeName): string {
		const bonus = getAttributeBonus(name);
		return bonus > 0 ? `+${bonus}` : `${bonus}`;
	}

	function openEditModal() {
		attributes.forEach(attr => {
			tempAttributes[attr.name] = $character.attributes[attr.name];
			tempBonuses[attr.name] = getAttributeBonus(attr.name);
		});
		showEditModal = true;
	}

	function saveAttributes() {
		attributes.forEach(attr => {
			updateAttribute(attr.name, tempAttributes[attr.name]);
			updateAttributeBonus(attr.name, tempBonuses[attr.name]);
		});
		showEditModal = false;
		updateToast({
			id: Math.random() * 100,
			message: 'Atributos atualizados com sucesso!',
			timeout: 3000,
			type: 'success'
		});
	}

	const attributes: Array<{ name: AttributeName; label: string }> = [
		{ name: 'cunning', label: 'Astuto' },
		{ name: 'discreet', label: 'Discreto' },
		{ name: 'accurate', label: 'Preciso' },
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
					<div class="attribute-details">
						<div class="attribute-base">
							<div class="base-value">{$character.attributes[name]}</div>
							<span class="field-label">Base</span>
						</div>
						<div class="attribute-bonus">
							<div class="bonus-value">{formatAttributeBonus(name)}</div>
							<span class="field-label">Bônus</span>
						</div>
					</div>
				</div>
			</div>
		{/each}
	</div>
	{#if !locked}
		<div class="section-header">
			<button class="edit-button" on:click={openEditModal}>
				Editar Atributos
			</button>
		</div>
	{/if}
</Section>

<Modal bind:visible={showEditModal} onClose={() => showEditModal = false}>
	<div class="modal-header">
		<h2>Editar Atributos</h2>
	</div>
	<div class="modal-body">
		<div class="attributes-edit-grid">
			{#each attributes as { name, label }}
				<div class="attribute-edit">
					<label for={`edit-${name}`}>{label}</label>
					<div class="attribute-edit-fields">
						<div class="attribute-edit-field">
							<span class="field-label">Base</span>
							<input
								type="number"
								id={`edit-${name}`}
								min="5"
								max="15"
								bind:value={tempAttributes[name]}
							/>
						</div>
						<div class="attribute-edit-field">
							<span class="field-label">Bônus</span>
							<input
								type="number"
								id={`edit-${name}-bonus`}
								bind:value={tempBonuses[name]}
							/>
						</div>
						<div class="attribute-edit-total">
							<span class="field-label">Total</span>
							<div class="total-value">{tempAttributes[name] + tempBonuses[name]}</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
		<div class="modal-footer-spacer"></div>
	</div>
	<div class="modal-footer">
		<button class="cancel-button" on:click={() => showEditModal = false}>Cancelar</button>
		<button class="save-button" on:click={saveAttributes}>Salvar</button>
	</div>
</Modal>

<style>
	.attributes-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 15px;
	}
	.section-header {
		display: flex;
		justify-content: flex-end;
		margin-top: 15px;
	}
	.edit-button {
		background-color: var(--accent-color);
		color: white;
		border: none;
		padding: 8px 16px;
		border-radius: 4px;
		cursor: pointer;
		font-weight: bold;
	}
	.edit-button:hover {
		background-color: var(--accent-color);
	}
	.edit-button:disabled {
		background-color: #ccc;
		cursor: not-allowed;
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
		align-items: center;
		gap: 20px;
		align-self: center;
	}

	.attribute-details {
		display: flex;
		flex-direction: column;
		gap: 10px;
		flex: 1;
		gap: 20px;
	}

	.attribute-base, .attribute-bonus {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		gap: 10px;
		width: 100%;
	}

	.attribute-total {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		flex: 0 0 auto;
		background-color: var(--primary-color);
		border-radius: 50%;
		width: 80px;
		height: 80px;
		padding: 10px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
	}

	.field-label {
		font-size: 0.8em;
		color: var(--secondary-color);
		margin-bottom: 5px;
		text-align: center;
	}

	.attribute-total .field-label {
		color: rgba(255, 255, 255, 0.8);
		font-weight: 500;
	}

	.total-value {
		color: white;
		font-size: 2em;
		text-align: center;
		font-weight: bold;
		line-height: 1;
	}

	.modal-body .total-value { 
		color: black;
	}

	.base-value {
		padding: 5px 10px;
		color: var(--text-color);
		font-size: 1.4em;
		text-align: center;
		font-weight: bold;
		border-radius: 4px;
		background-color: #f5f5f5;
		border-bottom: 2px solid var(--accent-color);
		min-width: 40px;
	}

	.bonus-value {
		padding: 4px 8px;
		color: var(--secondary-color);
		font-size: 1.1em;
		text-align: center;
		font-style: italic;
		border-radius: 4px;
		background-color: #f9f9f9;
		min-width: 30px;
	}

	/* Estilos para o modal */
	.modal-header {
		margin-bottom: 20px;
		border-bottom: 1px solid var(--border-color);
		padding-bottom: 10px;
	}

	.modal-header h2 {
		margin: 0;
		color: var(--primary-color);
		font-family: var(--header-font);
	}

	.modal-body {
		padding-bottom: 20px;
		overflow-y: auto;
		flex: 1;
	}

	.modal-footer {
		display: flex;
		justify-content: flex-end;
		gap: 10px;
		border-top: 1px solid var(--border-color);
		padding: 15px 20px 0;
		background: white;
		z-index: 10;
		width: 100%;
		box-sizing: border-box;
		position: sticky;
	}
	
	.modal-footer-spacer {
		height: 10px;
	}

	.attributes-edit-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 15px;
	}

	.attribute-edit {
		margin-bottom: 15px;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
	}

	.attribute-edit-fields {
		display: flex;
		gap: 15px;
		margin-top: 10px;
		align-items: center;
	}

	.attribute-edit-field {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.attribute-edit-total {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	input {
		padding: 8px;
		border: 1px solid var(--border-color);
		border-radius: 4px;
		background: #fff;
		color: var(--text-color);
		width: 60px;
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

	.save-button {
		background-color: var(--accent-color);
		color: white;
		border: none;
		padding: 8px 16px;
		border-radius: 4px;
		cursor: pointer;
		font-weight: bold;
	}

	.save-button:hover {
		background-color: var(--accent-color);
	}

	.cancel-button {
		background-color: #f1f1f1;
		color: var(--text-color);
		border: 1px solid var(--border-color);
		padding: 8px 16px;
		border-radius: 4px;
		cursor: pointer;
	}

	.cancel-button:hover {
		background-color: #e1e1e1;
	}
</style>
