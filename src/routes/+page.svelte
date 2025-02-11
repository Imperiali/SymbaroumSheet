<script lang="ts">
    import CharacterSheet from '$lib/components/character-sheet/CharacterSheet.svelte';
	import Toasts from '$lib/components/common/Toasts.svelte';
</script>

<main>
    <h1>Ficha de Personagem Symbaroum</h1>
    <Toasts />
    <CharacterSheet />
</main>

<style>
    main {
        padding: 20px;
    }

    h1 {
        color: #2c3e50;
        text-align: center;
        margin-bottom: 30px;
    }
    @media screen and (max-width: 768px) {
        h1 {
            display: none;
        }
    }
</style>
