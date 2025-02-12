<script lang="ts">
    import { signUp } from '$lib/services/auth';
    import { goto } from '$app/navigation';
    import Toasts from '$lib/components/common/Toasts.svelte';

    let name = '';
    let email = '';
    let password = '';
    let error = '';
    let loading = false;

    const handleSignUp = async () => {
        if (!name || !email || !password) {
            error = 'Por favor, preencha todos os campos';
            return;
        }

        loading = true;
        error = '';

        try {
            await signUp(email, password, name);
            goto('/');
        } catch (e) {
            error = 'Erro ao criar conta. Verifique suas informações.';
        } finally {
            loading = false;
        }
    };
</script>

<main>
    <div class="login-container">
        <div class="header">
            <h1>Symbaroum</h1>
            <p>Criar Nova Conta</p>
        </div>

        <form on:submit|preventDefault={handleSignUp}>
            {#if error}
                <div class="error">
                    <span class="material-icons">error</span>
                    <span>{error}</span>
                </div>
            {/if}

            <div class="form-group">
                <label for="name">Nome</label>
                <input
                    type="text"
                    id="name"
                    bind:value={name}
                    required
                    placeholder="Seu nome"
                    disabled={loading}
                />
            </div>

            <div class="form-group">
                <label for="email">Email</label>
                <input
                    type="email"
                    id="email"
                    bind:value={email}
                    required
                    placeholder="seu@email.com"
                    disabled={loading}
                />
            </div>

            <div class="form-group">
                <label for="password">Senha</label>
                <input
                    type="password"
                    id="password"
                    bind:value={password}
                    required
                    placeholder="••••••••"
                    disabled={loading}
                />
            </div>

            <button type="submit" class="button" disabled={loading}>
                {#if loading}
                    <span class="material-icons spinning">sync</span>
                    <span>Criando conta...</span>
                {:else}
                    <span>Criar conta</span>
                {/if}
            </button>

            <div class="divider">
                <span>Já tem uma conta?</span>
            </div>

            <a href="/" class="button secondary">Fazer login</a>
        </form>
    </div>
</main>

<Toasts />

<style>
    main {
        display: flex;
        min-height: 100vh;
        align-items: center;
        justify-content: center;
        background-color: var(--bg-color);
        padding: var(--spacing-md);
        font-family: var(--body-font);
    }

    .login-container {
        width: 100%;
        max-width: 400px;
        background-color: var(--section-bg);
        border-radius: var(--border-radius-sm);
        box-shadow: var(--box-shadow);
        padding: var(--spacing-xl);
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

    form {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-lg);
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

    input {
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
    }

    .button:hover:not(:disabled) {
        background-color: var(--accent-color);
    }

    .button:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }

    .button.secondary {
        background-color: transparent;
        border: 1px solid var(--border-color);
        color: var(--text-color);
        text-decoration: none;
        text-align: center;
    }

    .button.secondary:hover {
        background-color: var(--bg-color);
    }

    .divider {
        position: relative;
        text-align: center;
        margin: var(--spacing-md) 0;
    }

    .divider::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 0;
        right: 0;
        border-top: 1px solid var(--border-color);
    }

    .divider span {
        position: relative;
        background-color: var(--section-bg);
        padding: 0 var(--spacing-sm);
        color: var(--text-color);
        font-size: 0.875rem;
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
