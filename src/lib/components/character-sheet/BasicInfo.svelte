<script lang="ts">
	import { character } from '$lib/stores/character';
	let visible = true;

	function toggleVisibility() {
		visible = !visible;
	}

	function updateField(field: string, value: string | number) {
		character.update((char) => ({
			...char,
			[field]: value
		}));
	}
</script>

<div class="section basic-info">
	<h2 on:click={toggleVisibility}>Informações Básicas</h2>
	{#if visible}
		<div class="field">
			<label for="name">Nome:</label>
			<input
				type="text"
				id="name"
				bind:value={$character.name}
				on:input={(e) => updateField('name', e.currentTarget.value)}
			/>
		</div>
		<div class="field">
			<label for="race">Raça:</label>
			<input
				type="text"
				id="race"
				bind:value={$character.race}
				on:input={(e) => updateField('race', e.currentTarget.value)}
			/>
		</div>
		<div class="field">
			<label for="occupation">Ocupação:</label>
			<input
				type="text"
				id="occupation"
				bind:value={$character.occupation}
				on:input={(e) => updateField('occupation', e.currentTarget.value)}
			/>
		</div>
		<div class="field">
			<span>Experiência</span>
		</div>
		<div class="field multiple">
			<div class="field-container">
				<label for="current-experience">Disponível:</label>
				<input
					type="number"
					id="current-xperience"
					bind:value={$character.currentExperience}
					on:input={(e) => updateField('currentExperience', parseInt(e.currentTarget.value) || 0)}
				/>
			</div>
			<div class="field-container">
				<label for="experience">Total:</label>
				<input
					type="number"
					id="experience"
					bind:value={$character.experience}
					on:input={(e) => updateField('experience', parseInt(e.currentTarget.value) || 0)}
				/>
			</div>
		</div>
		<div class="field">
			<label for="shadow">Sombra:</label>
			<input
				type="text"
				id="shadow"
				bind:value={$character.shadow}
				on:input={(e) => updateField('shadow', e.currentTarget.value)}
			/>
		</div>
		<div class="field">
			<label for="quote">Citação:</label>
			<textarea
				id="quote"
				bind:value={$character.quote}
				on:input={(e) => updateField('quote', e.currentTarget.value)}
			></textarea>
		</div>
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

	.field {
		display: flex;
		margin-bottom: 12px;
		align-items: center;
		gap: 20px;
		justify-content: space-between;
	}

	.field span,
	label {
		width: 120px;
		font-weight: bold;
		color: var(--primary-color);
		font-family: var(--header-font);
		font-size: 0.9em;
		text-transform: uppercase;
	}

	input,
	textarea {
		padding: 8px;
		border: 1px solid var(--border-color);
		border-radius: 0;
		flex: 1;
		background: #fff;
		color: var(--text-color);
	}

	textarea {
		min-height: 60px;
		resize: vertical;
	}

	input:focus,
	textarea:focus {
		outline: none;
		border-color: var(--accent-color);
		box-shadow: 0 0 5px rgba(139, 115, 85, 0.2);
	}

	input[type='number'] {
		width: 80px;
		text-align: center;
	}

	@media screen and (max-width: 768px) {
		.field-container {
			display: grid;
		}

		label {
			max-width: 120px;
			overflow: hidden;
			white-space: nowrap;
		}
	}
</style>
