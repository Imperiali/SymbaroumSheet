import { writable } from 'svelte/store';
import type { Character } from '$lib/types/character';
import { storageService } from '$lib/services/storage';

const createCharacterStore = () => {
    const defaultCharacter: Character = {
        name: '',
        race: '',
        occupation: '',
        experience: 0,
        shadow: '',
        quote: '',
        attributes: {
            accurate: 10,
            cunning: 10,
            discreet: 10,
            persuasive: 10,
            quick: 10,
            resolute: 10,
            strong: 10,
            vigilant: 10
        },
        corruption: {
            temporary: 0,
            permanent: 0
        },
        toughness: {
            base: 10,
            current: 10
        },
        painThreshold: 0,
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
        artifacts: []
    };

    const { subscribe, set, update } = writable<Character>(defaultCharacter);

    return {
        subscribe,
        set: (character: Character) => {
            set(character);
            storageService.saveCharacter(character);
        },
        update: (fn: (character: Character) => Character) => {
            update(char => {
                const updated = fn(char);
                storageService.saveCharacter(updated);
                return updated;
            });
        },
        reset: () => {
            set(defaultCharacter);
            storageService.saveCharacter(defaultCharacter);
        },
        load: () => {
            const saved = storageService.loadCharacter();
            if (saved) {
                set(saved);
            }
        }
    };
};

export const character = createCharacterStore();
