<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<svelte:head>
    <title>Ficha de Personagem Symbaroum</title>
</svelte:head>

{@render children()}
