<script lang="ts">
    import type { Character } from '$lib/types/character';
    import Section from '$lib/components/common/Section.svelte';

    export let character: Character;
    export let handleUpdate: (updates: Partial<Character>) => Promise<void>;
    export let readOnly = false;

    function addWeapon() {
        if (!readOnly) {
            handleUpdate({
                weapons: [...character.weapons, {
                    name: '',
                    grace: '',
                    damage: '',
                    quality: '',
                    attribute: ''
                }]
            });
        }
    }

    function removeWeapon(index: number) {
        if (!readOnly) {
            handleUpdate({
                weapons: character.weapons.filter((_, i) => i !== index)
            });
        }
    }

    function addArmor() {
        if (!readOnly) {
            handleUpdate({
                armor: [...character.armor, {
                    name: '',
                    protection: 0,
                    quality: ''
                }]
            });
        }
    }

    function removeArmor(index: number) {
        if (!readOnly) {
            handleUpdate({
                armor: character.armor.filter((_, i) => i !== index)
            });
        }
    }

    function updateWeapon(index: number, field: string, value: string) {
        if (!readOnly) {
            handleUpdate({
                weapons: character.weapons.map((weapon, i) => 
                    i === index ? { ...weapon, [field]: value } : weapon
                )
            });
        }
    }

    function updateArmor(index: number, field: string, value: string | number) {
        if (!readOnly) {
            handleUpdate({
                armor: character.armor.map((armor, i) => 
                    i === index ? { ...armor, [field]: value } : armor
                )
            });
        }
    }
</script>

<Section title="Armas e Armadura" let:locked {readOnly}>
    <div class="subsection weapons">
        <h3>Armas</h3>
        {#if !locked && !readOnly}
            <button class="add-button" on:click={addWeapon}>+ Adicionar Arma</button>
        {/if}
        {#each character.weapons as weapon, i}
            <div class="weapon-entry">
                <div class="field">
                    <label for="weapon-name-{i}">Nome:</label>
                    <input 
                        type="text" 
                        id="weapon-name-{i}" 
                        value={weapon.name}
                        disabled={locked || readOnly}
                        on:input={(e) => updateWeapon(i, 'name', e.currentTarget.value)}
                    />
                </div>
                <div class="field">
                    <label for="weapon-grace-{i}">Graça:</label>
                    <input 
                        type="text" 
                        id="weapon-grace-{i}" 
                        value={weapon.grace}
                        disabled={locked || readOnly}
                        on:input={(e) => updateWeapon(i, 'grace', e.currentTarget.value)}
                    />
                </div>
                <div class="field">
                    <label for="weapon-damage-{i}">Dano:</label>
                    <input 
                        type="text" 
                        id="weapon-damage-{i}" 
                        value={weapon.damage}
                        disabled={locked || readOnly}
                        on:input={(e) => updateWeapon(i, 'damage', e.currentTarget.value)}
                    />
                </div>
                <div class="field">
                    <label for="weapon-quality-{i}">Qualidade:</label>
                    <input 
                        type="text" 
                        id="weapon-quality-{i}" 
                        value={weapon.quality}
                        disabled={locked || readOnly}
                        on:input={(e) => updateWeapon(i, 'quality', e.currentTarget.value)}
                    />
                </div>
                <div class="field">
                    <label for="weapon-attribute-{i}">Atributo:</label>
                    <input 
                        type="text" 
                        id="weapon-attribute-{i}" 
                        value={weapon.attribute}
                        disabled={locked || readOnly}
                        on:input={(e) => updateWeapon(i, 'attribute', e.currentTarget.value)}
                    />
                </div>
                {#if !locked && !readOnly}
                    <button class="remove-button" on:click={() => removeWeapon(i)}>
                        <span class="material-icons">delete</span>
                        Remover
                    </button>
                {/if}
            </div>
        {/each}
    </div>

    <div class="subsection armor">
        <h3>Armadura</h3>
        {#if !locked && !readOnly}
            <button class="add-button" on:click={addArmor}>+ Adicionar Armadura</button>
        {/if}
        {#each character.armor as armor, i}
            <div class="armor-entry">
                <div class="field">
                    <label for="armor-name-{i}">Nome:</label>
                    <input 
                        type="text" 
                        id="armor-name-{i}" 
                        value={armor.name}
                        disabled={locked || readOnly}
                        on:input={(e) => updateArmor(i, 'name', e.currentTarget.value)}
                    />
                </div>
                <div class="field">
                    <label for="armor-protection-{i}">Proteção:</label>
                    <input 
                        type="number" 
                        id="armor-protection-{i}" 
                        value={armor.protection}
                        disabled={locked || readOnly}
                        on:input={(e) => updateArmor(i, 'protection', parseInt(e.currentTarget.value) || 0)}
                    />
                </div>
                <div class="field">
                    <label for="armor-quality-{i}">Qualidade:</label>
                    <input 
                        type="text" 
                        id="armor-quality-{i}" 
                        value={armor.quality}
                        disabled={locked || readOnly}
                        on:input={(e) => updateArmor(i, 'quality', e.currentTarget.value)}
                    />
                </div>
                {#if !locked && !readOnly}
                    <button class="remove-button" on:click={() => removeArmor(i)}>
                        <span class="material-icons">delete</span>
                        Remover
                    </button>
                {/if}
            </div>
        {/each}
    </div>
</Section>

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

    .weapon-entry, .armor-entry {
        background: #fff;
        padding: 15px;
        margin: 10px 0;
        border: 1px solid var(--border-color);
        position: relative;
    }

    .field {
        display: flex;
        margin-bottom: 12px;
        align-items: center;
    }

    label {
        width: 120px;
        font-weight: bold;
        color: var(--primary-color);
        font-family: var(--header-font);
        font-size: 0.9em;
        text-transform: uppercase;
    }

    input {
        padding: 8px;
        border: 1px solid var(--border-color);
        border-radius: 0;
        flex: 1;
        background: #fff;
        color: var(--text-color);
    }

    input[type="number"] {
        width: 80px;
        text-align: center;
    }

    input:focus {
        outline: none;
        border-color: var(--accent-color);
        box-shadow: 0 0 5px rgba(139, 115, 85, 0.2);
    }

    .add-button {
        background: var(--accent-color);
        color: white;
        border: none;
        padding: 8px 16px;
        cursor: pointer;
        margin-bottom: 10px;
        font-family: var(--header-font);
        font-size: 0.9em;
        text-transform: uppercase;
        letter-spacing: 1px;
        transition: all 0.2s ease;
    }

    .remove-button {
        display: flex;
        align-items: center;
        gap: 8px;
        background: #8b3535;
        color: white;
        border: none;
        padding: 4px 8px;
        cursor: pointer;
        font-family: var(--header-font);
        font-size: 0.8em;
        transition: all 0.2s ease;
    }

    .add-button:hover {
        background: #6b5642;
    }

    .remove-button:hover {
        background: #6b2828;
    }
</style>
