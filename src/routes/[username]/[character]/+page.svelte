<script lang="ts">
    import { user } from '$lib/stores/auth';
    import { character } from '$lib/stores/character';
    import { goto } from '$app/navigation';
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
            <Toasts />
            <CharacterSheet character={data.character} />
        </main>
    {/if}
</div>

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
