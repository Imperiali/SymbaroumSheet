<script lang="ts">
    import { user } from '$lib/stores/auth';
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    import Toasts from '$lib/components/common/Toasts.svelte';
    import { CharacterService } from '$lib/firebase/character.js';
    import { getPlayer, type Player } from '$lib/services/auth';
    import type { PageData } from './$types';

    export let data: PageData;

    let characters = data.characters;
    let newCharacterName = '';
    let loading = false;
    let error = '';
    let player: Player | null = null;

    onMount(async () => {
        if ($user) {
            player = await getPlayer($user.uid);
            
            console.log(data);
            console.log(player);

            if (!player) {
                goto('/');
                return;
            }

            if (player.name !== data.player.name) {
                goto('/');
                return;
            }
        }
    });

    const handleCreateCharacter = async () => {
        if (!newCharacterName.trim()) {
            error = 'Por favor, insira um nome para o personagem';
            return;
        }

        loading = true;
        error = '';

        try {
            const character = await CharacterService.create(newCharacterName, $user?.uid || '');
            characters = [...characters, character];
            newCharacterName = '';
            error = '';
        } catch (e) {
            error = 'Erro ao criar personagem. Verifique se o nome já está em uso.';
        } finally {
            loading = false;
        }
    };

    const handleCharacterClick = (characterName: string) => {
        if (player) {
            goto(`/${player.name}/${characterName}`);
        }
    };
</script>

<main>
    <div class="container">
        <div class="header">
            <h1>Symbaroum</h1>
            <p>Seus Personagens</p>
        </div>

        <div class="content">
            {#if error}
                <div class="error">
                    <span class="material-icons">error</span>
                    <span>{error}</span>
                </div>
            {/if}

            <div class="create-character">
                <form on:submit|preventDefault={handleCreateCharacter}>
                    <div class="form-group">
                        <label for="character-name">Novo Personagem</label>
                        <div class="input-group">
                            <input
                                type="text"
                                id="character-name"
                                bind:value={newCharacterName}
                                placeholder="Nome do personagem"
                                disabled={loading}
                            />
                            <button type="submit" class="button" disabled={loading}>
                                {#if loading}
                                    <span class="material-icons spinning">sync</span>
                                {:else}
                                    <span class="material-icons">add</span>
                                {/if}
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            <div class="character-list">
                {#if characters.length === 0}
                    <div class="empty-state">
                        <span class="material-icons">person_outline</span>
                        <p>Você ainda não tem personagens</p>
                        <p class="subtitle">Crie seu primeiro personagem usando o formulário acima</p>
                    </div>
                {:else}
                    {#each characters as character}
                        <button
                            class="character-card"
                            on:click={() => handleCharacterClick(character.name)}
                        >
                            <span class="material-icons">person</span>
                            <span class="name">{character.name}</span>
                            <span class="material-icons arrow">chevron_right</span>
                        </button>
                    {/each}
                {/if}
            </div>
        </div>
    </div>
</main>

<Toasts />

<style>
    main {
        display: flex;
        min-height: 100vh;
        background-color: var(--bg-color);
        padding: var(--spacing-md);
        font-family: var(--body-font);
    }

    .container {
        width: 100%;
        max-width: 800px;
        margin: 0 auto;
        padding-top: var(--spacing-xl);
    }

    .header {
        text-align: center;
        margin-bottom: var(--spacing-xl);
    }

    h1 {
        font-family: var(--header-font);
        font-size: 2rem;
        font-weight: 700;
        color: var(--heading-color);
        margin-bottom: var(--spacing-xs);
    }

    p {
        color: var(--text-color);
        font-size: 1.1rem;
    }

    .content {
        background-color: var(--section-bg);
        border-radius: var(--border-radius-sm);
        box-shadow: var(--box-shadow);
        padding: var(--spacing-xl);
    }

    .error {
        display: flex;
        align-items: center;
        gap: var(--spacing-sm);
        padding: var(--spacing-sm);
        background-color: var(--bg-color);
        border: 1px solid var(--danger-color);
        border-radius: var(--border-radius-sm);
        color: var(--danger-color);
        font-size: 0.875rem;
        margin-bottom: var(--spacing-lg);
    }

    .create-character {
        margin-bottom: var(--spacing-xl);
    }

    .form-group {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-xs);
    }

    label {
        font-size: 0.875rem;
        font-weight: 700;
        color: var(--text-color);
    }

    .input-group {
        display: flex;
        gap: var(--spacing-sm);
    }

    input {
        flex: 1;
        padding: var(--spacing-sm);
        background-color: var(--input-bg);
        border: 1px solid var(--border-color);
        border-radius: var(--border-radius-sm);
        font-size: 0.875rem;
        color: var(--text-color);
    }

    input:focus {
        outline: none;
        border-color: var(--accent-color);
    }

    input:disabled {
        background-color: var(--bg-color);
        cursor: not-allowed;
    }

    .button {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: var(--spacing-sm);
        padding: var(--spacing-sm) var(--spacing-md);
        background-color: var(--primary-color);
        color: white;
        border: none;
        border-radius: var(--border-radius-sm);
        font-size: 0.875rem;
        font-weight: 700;
        cursor: pointer;
        transition: background-color 0.2s;
        min-width: 42px;
    }

    .button:hover:not(:disabled) {
        background-color: var(--accent-color);
    }

    .button:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }

    .character-list {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-sm);
    }

    .empty-state {
        text-align: center;
        padding: var(--spacing-xl) 0;
        color: var(--text-color);
    }

    .empty-state .material-icons {
        font-size: 48px;
        margin-bottom: var(--spacing-sm);
        opacity: 0.5;
    }

    .empty-state .subtitle {
        font-size: 0.875rem;
        opacity: 0.7;
        margin-top: var(--spacing-xs);
    }

    .character-card {
        display: flex;
        align-items: center;
        gap: var(--spacing-md);
        padding: var(--spacing-md);
        background-color: var(--item-bg);
        border: 1px solid var(--border-color);
        border-radius: var(--border-radius-sm);
        transition: all 0.2s;
        text-align: left;
    }

    .character-card:hover {
        background-color: var(--bg-color);
        border-color: var(--accent-color);
    }

    .character-card .material-icons {
        color: var(--accent-color);
    }

    .character-card .name {
        flex: 1;
        font-weight: 500;
        color: var(--text-color);
    }

    .character-card .arrow {
        color: var(--text-color);
        opacity: 0.5;
    }

    .spinning {
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
</style>
