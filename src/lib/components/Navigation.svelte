<script lang="ts">
    import { user } from '$lib/stores/auth';
    import { goto } from '$app/navigation';
    import { logout, getPlayer, type Player } from '$lib/services/auth';
    import { onMount } from 'svelte';

    let loading = false;
    let playerData: Player | null = null;

    onMount(async () => {
        if ($user) {
            playerData = await getPlayer($user.uid);
        }
    });

    const handleLogout = async () => {
        loading = true;
        try {
            await logout();
            goto('/');
        } finally {
            loading = false;
        }
    };
</script>

<nav>
    <div class="nav-content">
        {#if $user}
            <a href="/{playerData?.name || ''}" class="nav-link">
                <span class="material-icons">person</span>
                <span>{playerData?.name || 'Carregando...'}</span>
            </a>
            <button class="nav-link danger" on:click={handleLogout} disabled={loading}>
                {#if loading}
                    <span class="material-icons spinning">sync</span>
                    <span>Saindo...</span>
                {:else}
                    <span class="material-icons">logout</span>
                    <span>Sair</span>
                {/if}
            </button>
        {:else}
            <a href="/" class="nav-link">
                <span class="material-icons">login</span>
                <span>Entrar</span>
            </a>
        {/if}
    </div>
</nav>

<style>
    nav {
        background-color: var(--primary-color);
        padding: var(--spacing-sm) var(--spacing-md);
        box-shadow: var(--box-shadow);
        font-family: var(--body-font);
    }

    .nav-content {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        gap: var(--spacing-md);
        max-width: 1200px;
        margin: 0 auto;
    }

    .nav-link {
        display: flex;
        align-items: center;
        gap: var(--spacing-sm);
        color: white;
        text-decoration: none;
        font-size: 0.875rem;
        padding: var(--spacing-sm) var(--spacing-md);
        border-radius: var(--border-radius-sm);
        transition: all 0.2s;
        border: none;
        background: none;
        cursor: pointer;
        font-family: inherit;
    }

    .nav-link:hover {
        background-color: var(--accent-color);
    }

    .nav-link.danger:hover {
        background-color: var(--danger-color);
    }

    .nav-link:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }

    .nav-link .material-icons {
        font-size: 1.25rem;
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
