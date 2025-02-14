<script lang="ts">
    import Toasts from '$lib/components/common/Toasts.svelte';
    import { goto } from '$app/navigation';
    import { CharacterService } from '$lib/firebase/character';
    import { FEATURES } from '$lib/config/features';

    let characterName = '';
    let loading = false;
    let error = '';

    async function handleSubmit() {
        if (!characterName.trim()) {
            error = 'O nome do personagem é obrigatório';
            return;
        }

        loading = true;
        error = '';
        
        try {
            const exists = await CharacterService.characterExists(characterName);
            
            if (FEATURES.VERIFY_CHARACTER_EXISTS && !exists) {
                error = 'Personagem não encontrado';
            } else {
                if (!exists) {
                    await CharacterService.createCharacter(characterName, {
                        name: characterName,
                        race: '',
                        experience: 0,
                        currentExperience: 0,
                        shadow: '',
                        quote: '',
                        painThreshold: 0,
                        vitality: {
                            current: 0,
                            max: 0
                        },
                        corruption: {
                            current: 0,
                            permanent: 0
                        },
                        corruptionThreshold: 0,
                        attributes: {
                            accurate: 0,
                            cunning: 0,
                            discreet: 0,
                            persuasive: 0,
                            quick: 0,
                            resolute: 0,
                            strong: 0,
                            vigilant: 0
                        },
                        toughness: {
                            base: 0,
                            current: 0
                        },
                        armor: [],
                        weapons: [],
                        money: {
                            thaler: 0,
                            shilling: 0,
                            orteg: 0
                        },
                        equipment: [],
                        abilities: [],
                        companions: [],
                        artifacts: [],
                        notes: [],
                        traits: []
                    });
                }
                await goto(`/${characterName}`);
            }
        } catch (e) {
            error = 'Ocorreu um erro ao processar sua solicitação';
            console.error(e);
        } finally {
            loading = false;
        }
    }
</script>

<main>
    <div class="container">
        <h1>Ficha de Personagem Symbaroum</h1>
        <Toasts />
        <form on:submit|preventDefault={handleSubmit}>
            <div class="form-group">
                <label for="characterName">Nome do Personagem</label>
                <input
                    type="text"
                    id="characterName"
                    bind:value={characterName}
                    placeholder="Digite o nome do seu personagem"
                    disabled={loading || FEATURES.VERIFY_CHARACTER_EXISTS}
                />
                {#if error}
                    <span class="error">{error}</span>
                {/if}
                {#if FEATURES.VERIFY_CHARACTER_EXISTS}
                    <span class="error">Criação de personagens desabilitada</span>
                {/if}
            </div>
            <button type="submit" disabled={loading}>
                {loading ? 'Carregando...' : 'Continuar'}
            </button>
        </form>
    </div>
</main>

<style>
    main {
        padding: 20px;
    }

    h1 {
        color: #2c3e50;
        text-align: center;
        margin-bottom: 30px;
    }
    @media screen and (max-width: 768px) {
        h1 {
            display: none;
        }
    }

    .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 2rem;
        text-align: center;
    }

    .form-group {
        margin-bottom: 1rem;
    }

    label {
        display: block;
        margin-bottom: 0.5rem;
    }

    input {
        width: 100%;
        padding: 0.5rem;
        font-size: 1rem;
        border: 1px solid #ccc;
        border-radius: 4px;
    }

    button {
        padding: 0.5rem 1rem;
        font-size: 1rem;
        background-color: #4a4a4a;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }

    button:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }

    .error {
        color: red;
        font-size: 0.875rem;
        display: block;
        margin-top: 0.25rem;
    }
</style>
