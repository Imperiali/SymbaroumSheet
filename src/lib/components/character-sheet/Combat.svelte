<script lang="ts">
    import { character } from '$lib/stores/character';

    function addWeapon() {
        character.update(char => ({
            ...char,
            weapons: [...char.weapons, {
                name: '',
                grace: '',
                damage: '',
                quality: '',
                attribute: ''
            }]
        }));
    }

    function removeWeapon(index: number) {
        character.update(char => ({
            ...char,
            weapons: char.weapons.filter((_, i) => i !== index)
        }));
    }

    function addArmor() {
        character.update(char => ({
            ...char,
            armor: [...char.armor, {
                name: '',
                protection: 0,
                quality: ''
            }]
        }));
    }

    function removeArmor(index: number) {
        character.update(char => ({
            ...char,
            armor: char.armor.filter((_, i) => i !== index)
        }));
    }

    function updateWeapon(index: number, field: string, value: string) {
        character.update(char => ({
            ...char,
            weapons: char.weapons.map((weapon, i) => 
                i === index ? { ...weapon, [field]: value } : weapon
            )
        }));
    }

    function updateArmor(index: number, field: string, value: string | number) {
        character.update(char => ({
            ...char,
            armor: char.armor.map((item, i) => 
                i === index ? { ...item, [field]: value } : item
            )
        }));
    }
</script>

<div class="section combat">
    <h2>Armas e Armadura</h2>
    
    <div class="subsection weapons">
        <h3>Armas</h3>
        <button class="add-button" on:click={addWeapon}>+ Adicionar Arma</button>
        {#each $character.weapons as weapon, index}
            <div class="weapon-entry">
                <div class="field">
                    <label for="weapon-name-{index}">Nome:</label>
                    <input
                        type="text"
                        id="weapon-name-{index}"
                        bind:value={weapon.name}
                        on:input={(e) => updateWeapon(index, 'name', e.currentTarget.value)}
                    />
                </div>
                <div class="field">
                    <label for="weapon-grace-{index}">Graça:</label>
                    <input
                        type="text"
                        id="weapon-grace-{index}"
                        bind:value={weapon.grace}
                        on:input={(e) => updateWeapon(index, 'grace', e.currentTarget.value)}
                    />
                </div>
                <div class="field">
                    <label for="weapon-damage-{index}">Dano:</label>
                    <input
                        type="text"
                        id="weapon-damage-{index}"
                        bind:value={weapon.damage}
                        on:input={(e) => updateWeapon(index, 'damage', e.currentTarget.value)}
                    />
                </div>
                <div class="field">
                    <label for="weapon-quality-{index}">Qualidade:</label>
                    <input
                        type="text"
                        id="weapon-quality-{index}"
                        bind:value={weapon.quality}
                        on:input={(e) => updateWeapon(index, 'quality', e.currentTarget.value)}
                    />
                </div>
                <div class="field">
                    <label for="weapon-attribute-{index}">Atributo:</label>
                    <input
                        type="text"
                        id="weapon-attribute-{index}"
                        bind:value={weapon.attribute}
                        on:input={(e) => updateWeapon(index, 'attribute', e.currentTarget.value)}
                    />
                </div>
                <button class="remove-button" on:click={() => removeWeapon(index)}>Remover</button>
            </div>
        {/each}
    </div>

    <div class="subsection armor">
        <h3>Armadura</h3>
        <button class="add-button" on:click={addArmor}>+ Adicionar Armadura</button>
        {#each $character.armor as armor, index}
            <div class="armor-entry">
                <div class="field">
                    <label for="armor-name-{index}">Nome:</label>
                    <input
                        type="text"
                        id="armor-name-{index}"
                        bind:value={armor.name}
                        on:input={(e) => updateArmor(index, 'name', e.currentTarget.value)}
                    />
                </div>
                <div class="field">
                    <label for="armor-protection-{index}">Proteção:</label>
                    <input
                        type="number"
                        id="armor-protection-{index}"
                        bind:value={armor.protection}
                        on:input={(e) => updateArmor(index, 'protection', parseInt(e.currentTarget.value) || 0)}
                    />
                </div>
                <div class="field">
                    <label for="armor-quality-{index}">Qualidade:</label>
                    <input
                        type="text"
                        id="armor-quality-{index}"
                        bind:value={armor.quality}
                        on:input={(e) => updateArmor(index, 'quality', e.currentTarget.value)}
                    />
                </div>
                <button class="remove-button" on:click={() => removeArmor(index)}>Remover</button>
            </div>
        {/each}
    </div>
</div>

<style>
    .section {
        background: #fff;
        border: 2px solid var(--border-color);
        border-radius: 0;
        padding: 20px;
        margin-bottom: 20px;
        position: relative;
    }

    .section::before {
        content: '';
        position: absolute;
        top: 5px;
        left: 5px;
        right: 5px;
        bottom: 5px;
        border: 1px solid var(--border-color);
        pointer-events: none;
    }

    h2 {
        font-family: var(--header-font);
        color: var(--primary-color);
        margin: -20px -20px 20px -20px;
        padding: 10px 20px;
        background: var(--background-color);
        border-bottom: 2px solid var(--border-color);
        text-transform: uppercase;
        font-size: 1.2em;
        text-align: center;
        letter-spacing: 1px;
    }

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
