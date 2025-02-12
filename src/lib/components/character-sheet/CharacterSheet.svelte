<script lang="ts">
    import type { Character } from '$lib/types/character';
    import { character as characterStore } from '$lib/stores/character';
    import Toasts from '$lib/components/common/Toasts.svelte';
    import BasicInfo from './BasicInfo.svelte';
    import Attributes from './Attributes.svelte';
    import Combat from './Combat.svelte';
    import Companions from './Companions.svelte';
    import Artifacts from './Artifacts.svelte';
    import Equipment from './Equipment.svelte';
    import Wealth from './Wealth.svelte';
    import AbilitiesAndPowers from './AbilitiesAndPowers.svelte';
    import Personal from './Personal.svelte';
    import Notes from './Notes.svelte';
    import FAB from '$lib/components/common/FAB.svelte';
    import { sectionVisibility } from '$lib/stores/visibility';

    export let character: Character;

    $: if (character) {
        characterStore.loadCharacter(character);
    }

    $: currentCharacter = $characterStore;

    let error = '';
    let saveStatus = '';

    const handleUpdate = async (updates: Partial<Character>) => {
        try {
            console.log('Updating character with:', updates);
            await characterStore.updateCharacter(updates);
            console.log('Character updated successfully');
            saveStatus = 'Salvo!';
            setTimeout(() => {
                saveStatus = '';
            }, 2000);
        } catch (e) {
            console.error('Error updating character:', e);
            error = 'Error updating character';
        }
    };
</script>

<div class="character-sheet">
    <Toasts />
    
    <div class="save-status" class:visible={saveStatus !== ''}>
        {saveStatus}
    </div>

    <div class="page full">
        {#if $sectionVisibility.basicInfo}
            <BasicInfo character={currentCharacter} {handleUpdate} />
        {/if}
        {#if $sectionVisibility.attributes}
            <Attributes character={currentCharacter} {handleUpdate} />
        {/if}
    </div>

    <div class="page-container">
        <div class="page left-page">
            {#if $sectionVisibility.personal}
                <Personal character={currentCharacter} {handleUpdate} />
            {/if}
            {#if $sectionVisibility.combat}
                <Combat character={currentCharacter} {handleUpdate} />
            {/if}
            {#if $sectionVisibility.abilitiesAndPowers}
                <AbilitiesAndPowers character={currentCharacter} {handleUpdate} />
            {/if}
            {#if $sectionVisibility.companions}
                <Companions character={currentCharacter} {handleUpdate} />
            {/if}
            {#if $sectionVisibility.notes}
                <Notes character={currentCharacter} {handleUpdate} />
            {/if}
        </div>

        <div class="page right-page">
            {#if $sectionVisibility.artifacts}
                <Artifacts character={currentCharacter} {handleUpdate} />
            {/if}
            {#if $sectionVisibility.equipment}
                <Equipment character={currentCharacter} {handleUpdate} />
            {/if}
            {#if $sectionVisibility.wealth}
                <Wealth character={currentCharacter} {handleUpdate} />
            {/if}
        </div>
    </div>

    <FAB />
</div>

<style>
    .character-sheet {
        display: flex;
        gap: 40px;
        flex-wrap: wrap;
        max-width: 1200px;
        margin: 0 auto;
        padding: 20px;
        background: #fff;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
        border: 1px solid var(--border-color);
        border-radius: 8px;
    }

    .full {
        flex: 2;
        align-self: flex-start;
        width: 100%;
        margin-bottom: 1rem;
    }

    .page {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 20px;
        position: relative;
    }

    .page::before {
        content: '';
        position: absolute;
        top: 0;
        left: -20px;
        right: -20px;
        bottom: 0;
        background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 50l-10-10 10-10 10 10-10 10zm0 0l10 10-10 10-10-10 10-10z' stroke='%238b735510' fill='none' stroke-width='1'/%3E%3C/path%3E%3C/svg%3E");
        z-index: -1;
    }

    .save-status {
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--accent-color);
        color: white;
        padding: 10px 20px;
        border-radius: 4px;
        opacity: 0;
        transform: translateY(-20px);
        transition: all 0.3s ease;
        font-family: var(--header-font);
        z-index: 1000;
    }

    .save-status.visible {
        opacity: 1;
        transform: translateY(0);
    }

    .page-container {
        display: flex;
        gap: 1rem;
        width: 100%;
    }

    @media (max-width: 1200px) {
        .character-sheet {
        flex-direction: column;
        gap: 20px;
            padding: 12px;
            margin: 0;
            border-radius: 0;
    }

        .page::before {
            left: 0;
            right: 0;
    }
    }

    @media (max-width: 768px) {
        .page-container {
            flex-direction: column;
        }

        .page {
            width: 100%;
        }

        .character-sheet {
            padding: 8px;
        }

        .save-status {
            top: 10px;
            right: 10px;
            padding: 8px 16px;
            font-size: 0.9em;
        }
    }
</style>
