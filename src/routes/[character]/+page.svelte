<script lang="ts">
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import { CharacterService } from '$lib/firebase/character';
    import CharacterSheet from '$lib/components/character-sheet/CharacterSheet.svelte';
    import Toasts from '$lib/components/common/Toasts.svelte';
    import { goto } from '$app/navigation';

    const characterName = $page.params.character;
    let loading = true;
    let error = '';

    onMount(async () => {
        try {
            const exists = await CharacterService.characterExists(characterName);
            if (!exists) {
                await goto('/');
                return;
            }

            const character = await CharacterService.getCharacter(characterName);
            if (!character) {
                error = 'Erro ao carregar o personagem';
                await goto('/');
                return;
            }
        } catch (e) {
            error = 'Erro ao carregar o personagem';
            console.error(e);
            await goto('/');
        } finally {
            loading = false;
        }
    });
</script>

<main>
    <h1>Ficha de {characterName}</h1>
    <Toasts />
    
    {#if loading}
        <div class="loading">Carregando...</div>
    {:else if error}
        <div class="error">{error}</div>
    {:else}
        <CharacterSheet {characterName} />
    {/if}
</main>

<style>
    main {
        padding: 1rem;
    }

    .loading, .error {
        text-align: center;
        padding: 2rem;
    }

    .error {
        color: red;
    }

    @media print {
        :global(nav) {
            display: none;
        }
    }
</style>
