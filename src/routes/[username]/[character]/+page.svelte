<script lang="ts">
    import { user } from '$lib/stores/auth';
    import { character } from '$lib/stores/character';
    import type { Character } from '$lib/types/character';
    import Toasts from '$lib/components/common/Toasts.svelte';
    import CharacterSheet from '$lib/components/character-sheet/CharacterSheet.svelte';
    import type { PageData } from './$types';
    import { onMount } from 'svelte';

    export let data: PageData;

    onMount(() => {
        if (data.character) {
            character.loadCharacter(data.character);
        }
    });

</script>

<div class="container mx-auto px-4 py-8">
    {#if data.character}
        <main>
            {#if !data.isOwner}
                <div class="view-only-notice">
                    <p>Você está visualizando a ficha de {data.character.name}. Como você não é o dono desta ficha, ela está em modo somente leitura.</p>
                </div>
            {/if}
            <Toasts />
            <CharacterSheet character={data.character} readOnly={!data.isOwner} />
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
