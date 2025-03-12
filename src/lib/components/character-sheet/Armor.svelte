<script lang="ts">
    import { character } from '$lib/stores/character';
    import Modal from '$lib/components/common/Modal.svelte';
    import { armorsStore } from '$lib/stores/armors';
    import type { Armor } from '$lib/types/armor';

    export let locked: boolean;

    let showArmorModal = false;
    let allArmors: Armor[] = [];
    let selectedArmor: Armor | undefined;

    async function addArmor() {
        if (selectedArmor) {
            try {
                await character.update(char => ({
                    ...char,
                    armor: [...char.armor, {
                        name: selectedArmor!.name,
                        protection: selectedArmor!.protection,
                        quality: selectedArmor!.quality || '',
                        qualities: selectedArmor!.qualities || [],
                        type: selectedArmor!.type || '',
                        cost: selectedArmor!.cost || 0
                    }]
                }));
                console.log('Armadura adicionada ao personagem e salva no Firebase');
                showArmorModal = false;
                selectedArmor = undefined;
            } catch (error) {
                console.error('Erro ao adicionar armadura:', error);
            }
        }
    }

    async function openArmorModal() {
        const result = await armorsStore.load();
        if (result) {
            allArmors = Array.isArray(result) ? result : [result];
        } else {
            allArmors = [];
        }
        showArmorModal = true;
    }

    async function removeArmor(index: number) {
        try {
            await character.update(char => ({
                ...char,
                armor: char.armor.filter((_, i) => i !== index)
            }));
            console.log('Armadura removida do personagem e atualizada no Firebase');
        } catch (error) {
            console.error('Erro ao remover armadura:', error);
        }
    }

    async function updateArmor(index: number, field: string, value: string | number | string[]) {
        try {
            await character.update(char => ({
                ...char,
                armor: char.armor.map((armor, i) => 
                    i === index ? { ...armor, [field]: value } : armor
                )
            }));
            console.log(`Campo ${field} da armadura atualizado e salvo no Firebase`);
        } catch (error) {
            console.error('Erro ao atualizar armadura:', error);
        }
    }
</script>

<div class="subsection armor">
    <h3>Armadura</h3>
    {#if !locked}
        <div class="button-container">
            <button class="add-button secondary" on:click={openArmorModal}>+ Adicionar Armadura</button>
        </div>
    {/if}
    {#each $character.armor as armor, i}
        <div class="armor-entry">
            <div class="field">
                <label for="armor-name-{i}">Nome:</label>
                <input 
                    type="text" 
                    id="armor-name-{i}" 
                    bind:value={armor.name}
                    disabled={locked}
                    on:change={(e) => updateArmor(i, 'name', e.currentTarget.value)}
                />
            </div>
            <div class="field">
                <label for="armor-protection-{i}">Proteção:</label>
                <input 
                    type="text" 
                    id="armor-protection-{i}" 
                    bind:value={armor.protection}
                    disabled={locked}
                    on:change={(e) => updateArmor(i, 'protection', e.currentTarget.value || 0)}
                />
            </div>
            <div class="field">
                <label for="armor-type-{i}">Tipo:</label>
                <input 
                    type="text" 
                    id="armor-type-{i}" 
                    bind:value={armor.type}
                    disabled={locked}
                    on:change={(e) => updateArmor(i, 'type', e.currentTarget.value)}
                />
            </div>
            <div class="field">
                <label for="armor-qualities-{i}">Qualidades:</label>
                <input 
                    type="text" 
                    id="armor-qualities-{i}" 
                    value={armor.qualities ? armor.qualities.join(', ') : ''}
                    disabled={locked}
                    on:change={(e) => updateArmor(i, 'qualities', e.currentTarget.value.split(',').map(q => q.trim()).filter(q => q))}
                />
                <small>Separar por vírgulas</small>
            </div>
            <div class="field">
                <label for="armor-cost-{i}">Custo:</label>
                <input 
                    type="number" 
                    id="armor-cost-{i}" 
                    bind:value={armor.cost}
                    disabled={locked}
                    on:change={(e) => updateArmor(i, 'cost', parseInt(e.currentTarget.value) || 0)}
                />
            </div>
            {#if !locked}
                <button class="remove-button" on:click={() => removeArmor(i)}>
                    <span class="material-icons">delete</span>
                    Remover
                </button>
            {/if}
        </div>
    {/each}
</div>

<Modal bind:visible={showArmorModal}>
    <div class="add-modal">
        <h2>Nova Armadura</h2>
        <div class="field">
            <select
                on:change={(e: any) =>
                    (selectedArmor = allArmors.find((armor) => armor.id == e.target.value))}
                id="armor-selector"
            >
                <option value="">Selecione uma armadura</option>
                {#each allArmors as armor}
                    <option value={armor.id}>{armor.name}</option>
                {/each}
            </select>
            
            {#if selectedArmor}
                <div class="armor-details">
                    <p><strong>Proteção:</strong> {selectedArmor.protection}</p>
                    <p><strong>Qualidade:</strong> {selectedArmor.qualities ? selectedArmor.qualities.join(', ') : ''}</p>
                    <p><strong>Tipo:</strong> {selectedArmor.type}</p>
                    <p><strong>Custo:</strong> {selectedArmor.cost}</p>
                </div>
            {/if}
            
            <button
                disabled={selectedArmor == undefined}
                class="add-btn"
                on:click={addArmor}
            >
                <span class="material-icons">add</span>
                Adicionar Armadura
            </button>
        </div>
    </div>
</Modal>

<style>
    h3 {
        font-family: var(--header-font);
        color: var(--primary-color);
        margin-bottom: 15px;
        font-size: 1.1em;
        border-bottom: 1px solid var(--border-color);
        padding-bottom: 5px;
    }

    .subsection {
        margin: 15px 0;
        padding: 15px;
        background: #fff;
        border: 1px solid var(--border-color);
        position: relative;
    }

    .armor-entry {
        background: #fff;
        padding: 15px;
        margin: 10px 0;
        border: 1px solid var(--border-color);
        position: relative;
    }

    .field {
        display: flex;
        margin-bottom: 10px;
        align-items: flex-start;
        flex-direction: column;
        gap: 5px;
    }

    label {
        font-weight: bold;
        color: var(--primary-color);
        font-family: var(--header-font);
        text-transform: uppercase;
        font-size: 0.9em;
    }

    input, select {
        padding: 8px;
        border: 1px solid var(--border-color);
        border-radius: 0;
        flex: 1;
        width: 100%;
        background: #fff;
        color: var(--text-color);
    }

    .button-container {
        display: flex;
        gap: 10px;
        margin-bottom: 15px;
    }

    .add-button {
        background: var(--primary-color);
        color: #fff;
        border: none;
        padding: 8px 15px;
        cursor: pointer;
        font-family: var(--header-font);
        text-transform: uppercase;
        font-size: 0.9em;
    }

    .add-button.secondary {
        background: var(--accent-color);
    }

    .remove-button {
        background: #8b3535;
        color: white;
        border: none;
        padding: 4px 8px;
        cursor: pointer;
        font-family: var(--header-font);
        font-size: 0.8em;
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
    }

    .remove-button .material-icons {
        font-size: 16px;
        margin-right: 5px;
    }
    
    .add-modal {
        padding: 20px;
    }
    
    .add-modal h2 {
        font-family: var(--header-font);
        color: var(--primary-color);
        margin-bottom: 20px;
        text-align: center;
    }
    
    .armor-details {
        margin: 20px 0;
        padding: 15px;
        border: 1px solid var(--border-color);
        background: #f9f9f9;
    }
    
    .add-btn {
        width: 100%;
        background: var(--primary-color);
        color: #fff;
        border: none;
        padding: 10px;
        cursor: pointer;
        font-family: var(--header-font);
        text-transform: uppercase;
        font-size: 0.9em;
        margin-top: 15px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .add-btn .material-icons {
        margin-right: 5px;
    }
    
    .add-btn:disabled {
        background: #ccc;
        cursor: not-allowed;
    }
</style>
