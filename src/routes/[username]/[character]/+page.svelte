<script lang="ts">
    import { user } from '$lib/stores/auth';
    import { character } from '$lib/stores/character';
    import type { Character } from '$lib/types/character';
    import Toasts from '$lib/components/common/Toasts.svelte';
    import CharacterSheet from '$lib/components/character-sheet/CharacterSheet.svelte';
    import type { PageData } from './$types';
    import { onMount } from 'svelte';
    import { getLocalCharacter } from '$lib/utils/db';
    import { page } from '$app/stores';

    export let data: PageData;
    let offlineMode = false;

    onMount(async () => {
        try {
            if (data.character) {
                character.loadCharacter(data.character);
            }
        } catch (error) {
            const { username, character: characterName } = $page.params;
            const localCharacter = await getLocalCharacter(username, characterName);
            if (localCharacter) {
                offlineMode = true;
                character.loadCharacter(localCharacter);
            }
        }
    });
</script>

<div class="container mx-auto px-4 py-8">
    {#if offlineMode}
        <div class="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4" role="alert">
            <p>Você está visualizando uma versão offline da ficha. Algumas funcionalidades podem estar limitadas.</p>
        </div>
    {/if}

    {#if $character}
        <main>
            {#if !data.isOwner && !offlineMode}
                <div class="view-only-notice">
                    <p>Você está visualizando a ficha de {$character.name}. Como você não é o dono desta ficha, ela está em modo somente leitura.</p>
                </div>
            {/if}
            <Toasts />
            <CharacterSheet character={$character} readOnly={!data.isOwner && !offlineMode} />
        </main>
    {/if}
</div>

<style>
    main {
        padding: 1rem;
    }

    .view-only-notice {
        background-color: #f0f0f0;
        border: 1px solid #ddd;
        border-radius: 4px;
        padding: 1rem;
        margin-bottom: 1rem;
    }

    .view-only-notice p {
        margin: 0;
        color: #666;
    }

    @media print {
        :global(nav) {
            display: none;
        }
    }
</style>
