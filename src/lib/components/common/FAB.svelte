<script lang="ts">
    import { sectionVisibility, type SectionVisibility } from '$lib/stores/visibility';
	import { slide } from 'svelte/transition';

    let isOpen = false;
    let sections: { id: keyof SectionVisibility; label: string }[]  = [
        { id: 'basicInfo', label: 'Informações Básicas' },
        { id: 'attributes', label: 'Atributos' },
        { id: 'personal', label: 'Informações Pessoais' },
        { id: 'combat', label: 'Combate' },
        { id: 'abilitiesAndPowers', label: 'Habilidades e Poderes' },
        { id: 'notes', label: 'Anotações' },
        { id: 'companions', label: 'Companheiros' },
        { id: 'artifacts', label: 'Artefatos' },
        { id: 'equipment', label: 'Equipamento' },
        { id: 'wealth', label: 'Riqueza' },
    ];

    function toggleSection(sectionId: keyof SectionVisibility) {
        sectionVisibility.update(current => ({
            ...current,
            [sectionId]: !current[sectionId]
        }));
    }

    function toggleMenu() {
        isOpen = !isOpen;
    }
</script>

<div class="fab-container">
    <button class="fab" on:click={toggleMenu} class:open={isOpen}>
        <span class="material-icons">
            {isOpen ? 'close' : 'visibility'}
        </span>
    </button>
    
    {#if isOpen}
        <div class="menu" transition:slide>
            {#each sections as section}
                <label class="menu-item">
                    <input
                        type="checkbox"
                        checked={$sectionVisibility[section.id]}
                        on:change={() => toggleSection(section.id)}
                    />
                    {section.label}
                </label>
            {/each}
        </div>
    {/if}
</div>

<style>
    .fab-container {
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        z-index: 1000;
    }

    .fab {
        width: 56px;
        height: 56px;
        border-radius: 50%;
        background-color: #2c3e50;
        color: white;
        border: none;
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: transform 0.3s ease;
    }

    .fab:hover {
        transform: scale(1.1);
    }

    .fab.open {
        background-color: #e74c3c;
    }

    .menu {
        position: absolute;
        bottom: 70px;
        right: 0;
        background: white;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        padding: 1rem;
        min-width: 200px;
    }

    .menu-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem;
        cursor: pointer;
        transition: background-color 0.2s;
    }

    .menu-item:hover {
        background-color: #f5f5f5;
    }

    input[type="checkbox"] {
        margin: 0;
    }
</style>
