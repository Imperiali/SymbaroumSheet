<script lang="ts">
    import { character } from '$lib/stores/character';
    import Modal from '$lib/components/common/Modal.svelte';
    import { weaponsStore } from '$lib/stores/weapons';
    import type { Weapon } from '$lib/types/weapon';

    export let locked: boolean;

    let showWeaponModal = false;
    let allWeapons: Weapon[] = [];
    let selectedWeapon: Weapon | undefined;

    async function addWeapon() {
        if (selectedWeapon) {
            try {
                await character.update(char => ({
                    ...char,
                    weapons: [...char.weapons, {
                        name: selectedWeapon!.name,
                        damage: selectedWeapon!.damage,
                        description: selectedWeapon!.description || '',
                        quality: selectedWeapon!.quality || '',
                        attribute: selectedWeapon!.attribute || '',
                        type: selectedWeapon!.type || '',
                        qualities: selectedWeapon!.qualities || []
                    }]
                }));
                console.log('Arma adicionada ao personagem e salva no Firebase');
                showWeaponModal = false;
                selectedWeapon = undefined;
            } catch (error) {
                console.error('Erro ao adicionar arma:', error);
            }
        }
    }

    async function openWeaponModal() {
        const result = await weaponsStore.load();
        if (result) {
            allWeapons = Array.isArray(result) ? result : [result];
        } else {
            allWeapons = [];
        }
        showWeaponModal = true;
    }

    async function removeWeapon(index: number) {
        try {
            await character.update(char => ({
                ...char,
                weapons: char.weapons.filter((_, i) => i !== index)
            }));
            console.log('Arma removida do personagem e atualizada no Firebase');
        } catch (error) {
            console.error('Erro ao remover arma:', error);
        }
    }

    async function updateWeapon(index: number, field: string, value: string | string[]) {
        try {
            await character.update(char => ({
                ...char,
                weapons: char.weapons.map((weapon, i) => 
                    i === index ? { ...weapon, [field]: value } : weapon
                )
            }));
            console.log(`Campo ${field} da arma atualizado e salvo no Firebase`);
        } catch (error) {
            console.error('Erro ao atualizar arma:', error);
        }
    }
</script>

<div class="subsection weapons">
    <h3>Armas</h3>
    {#if !locked}
        <div class="button-container">
            <button class="add-button secondary" on:click={openWeaponModal}>+ Adicionar Arma</button>
        </div>
    {/if}
    {#each $character.weapons as weapon, i}
        <div class="weapon-entry">
            <div class="field">
                <label for="weapon-name-{i}">Nome:</label>
                <input 
                    type="text" 
                    id="weapon-name-{i}" 
                    bind:value={weapon.name}
                    disabled={locked}
                    on:change={(e) => updateWeapon(i, 'name', e.currentTarget.value)}
                />
            </div>
            <div class="field">
                <label for="weapon-description-{i}">Descrição:</label>
                <input 
                    type="text" 
                    id="weapon-description-{i}" 
                    bind:value={weapon.description}
                    disabled={locked}
                    on:change={(e) => updateWeapon(i, 'description', e.currentTarget.value)}
                />
            </div>
            <div class="field">
                <label for="weapon-damage-{i}">Dano:</label>
                <input 
                    type="text" 
                    id="weapon-damage-{i}" 
                    bind:value={weapon.damage}
                    disabled={locked}
                    on:change={(e) => updateWeapon(i, 'damage', e.currentTarget.value)}
                />
            </div>
            <div class="field">
                <label for="weapon-type-{i}">Tipo:</label>
                <input 
                    type="text" 
                    id="weapon-type-{i}" 
                    bind:value={weapon.type}
                    disabled={locked}
                    on:change={(e) => updateWeapon(i, 'type', e.currentTarget.value)}
                />
            </div>
            <div class="field">
                <label for="weapon-qualities-{i}">Qualidades:</label>
                <input 
                    type="text" 
                    id="weapon-qualities-{i}" 
                    value={weapon.qualities ? weapon.qualities.join(', ') : ''}
                    disabled={locked}
                    on:change={(e) => updateWeapon(i, 'qualities', e.currentTarget.value.split(',').map(q => q.trim()).filter(q => q))}
                />
                <small>Separar por vírgulas</small>
            </div>
            {#if !locked}
                <button class="remove-button" on:click={() => removeWeapon(i)}>
                    <span class="material-icons">delete</span>
                    Remover
                </button>
            {/if}
        </div>
    {/each}
</div>

<Modal bind:visible={showWeaponModal}>
    <div class="add-modal">
        <h2>Nova Arma</h2>
        <div class="field">
            <select
                on:change={(e: any) =>
                    (selectedWeapon = allWeapons.find((weapon) => weapon.id == e.target.value))}
                id="weapon-selector"
            >
                <option value="">Selecione uma arma</option>
                {#each allWeapons as weapon}
                    <option value={weapon.id}>{weapon.name}</option>
                {/each}
            </select>
            
            {#if selectedWeapon}
                <div class="weapon-details">
                    <p><strong>Dano:</strong> {selectedWeapon.damage}</p>
                    {#if selectedWeapon.type}
                        <p><strong>Tipo:</strong> {selectedWeapon.type}</p>
                    {/if}
                    {#if selectedWeapon.qualities && selectedWeapon.qualities.length > 0}
                        <p><strong>Qualidades:</strong> {selectedWeapon.qualities.join(', ')}</p>
                    {/if}
                    {#if selectedWeapon.description}
                        <p><strong>Descrição:</strong> {selectedWeapon.description}</p>
                    {/if}
                    {#if selectedWeapon.quality}
                        <p><strong>Qualidade:</strong> {selectedWeapon.quality}</p>
                    {/if}
                    {#if selectedWeapon.attribute}
                        <p><strong>Atributo:</strong> {selectedWeapon.attribute}</p>
                    {/if}
                </div>
            {/if}
            
            <button
                disabled={selectedWeapon == undefined}
                class="add-btn"
                on:click={addWeapon}
            >
                <span class="material-icons">add</span>
                Adicionar Arma
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

    .weapon-entry {
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
    
    .weapon-details {
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
