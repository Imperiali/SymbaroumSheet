<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let title: string;
	export let locked = true;
	let visible = true;

	function toggleLock() {
		locked = !locked;
		dispatch('lockChange', locked);
	}
</script>

<div class="section">
	<div class="header">
		<button class="toggle-btn" on:click={() => (visible = !visible)}><h2>{title}</h2></button>
		<button
			class="lock-btn"
			on:click={toggleLock}
			title={locked ? 'Desbloquear seção' : 'Bloquear seção'}
		>
			<span class="material-icons">{locked ? 'lock' : 'lock_open'}</span>
		</button>
	</div>
	{#if visible}
		<slot {locked} />
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

	.header {
		display: grid;
		grid-template-columns: 1fr auto;
		align-items: center;
		margin: -20px -20px 20px -20px;
		background: var(--background-color);
		border-bottom: 2px solid var(--border-color);
	}

	.toggle-btn {
		background: none;
		border: none;
		padding: 0;
		cursor: pointer;
		width: 100%;
	}

	.toggle-btn:disabled {
		cursor: not-allowed;
	}

	h2 {
		font-family: var(--header-font);
		color: var(--primary-color);
		padding: 10px 20px;
		text-transform: uppercase;
		font-size: 1.2em;
		text-align: center;
		letter-spacing: 1px;
		user-select: none;
		margin: 0;
	}

	.toggle-btn:hover h2 {
		background: var(--hover-color, #f5f5f5);
	}

	.lock-btn {
		flex: 1;
		background: none;
		border: none;
		padding: 10px;
		cursor: pointer;
		color: var(--primary-color);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.lock-btn:hover {
		background: var(--hover-color, #f5f5f5);
	}

	:global(.material-icons) {
		font-size: 20px;
	}
</style>
