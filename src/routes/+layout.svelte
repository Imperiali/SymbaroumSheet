<script lang="ts">
    import '../app.css';
    import { onMount } from 'svelte';
    import { auth } from '$lib/firebase/config';
    import { user, loading } from '$lib/stores/auth';
    import { onAuthStateChanged } from 'firebase/auth';
    import Navigation from '$lib/components/Navigation.svelte';

    onMount(() => {
        return onAuthStateChanged(auth, (currentUser) => {
            user.set(currentUser);
            loading.set(false);
        });
    });

    let { children } = $props();
</script>

<svelte:head>
    <title>Ficha de Personagem Symbaroum</title>
</svelte:head>

{#if $loading}
    <div class="flex h-screen items-center justify-center">
        <div class="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-gray-900"></div>
    </div>
{:else}
    <Navigation />
    {@render children()}
{/if}
