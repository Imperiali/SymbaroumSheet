import { writable } from 'svelte/store';
import type { Character } from '$lib/types/character';
import { storageService } from '$lib/services/storage';

const createCharacterStore = () => {
    const defaultCharacter: Character = {
        name: '',
        race: '',
        occupation: '',
        experience: 0,
        currentExperience: 0,
        shadow: '',
        quote: '',
        painThreshold: 0,
        vitality: {
            current: 10,
            max: 10
        },
        corruption: {
            current: 0,
            permanent: 0
        },
        corruptionThreshold: 4,
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
        toughness: {
            base: 10,
            current: 10
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
