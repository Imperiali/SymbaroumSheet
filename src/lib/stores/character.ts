import { writable } from 'svelte/store';
import type { Character } from '$lib/types/character';
import { CharacterService } from '$lib/firebase/character';
import { user } from './auth';
import { get } from 'svelte/store';
import { storageService } from '$lib/services/storage';
import { debounce } from 'lodash-es';

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
        artifacts: [],
        notes: [],
        playerId: ''
    };

    const storedCharacter = storageService.loadCharacter();
    const { subscribe, set, update } = writable<Character>(storedCharacter || defaultCharacter);

    const debouncedUpdate = debounce(async (character: Character) => {
        try {
            const currentUser = get(user);
            if (!currentUser?.uid) return;

            await CharacterService.update(character.name, currentUser.uid, character);
            storageService.saveCharacter(character);
        } catch (error) {
            console.error('Error updating character:', error);
            const lastGoodState = storageService.loadCharacter();
            if (lastGoodState) {
                set(lastGoodState);
            }
        }
    }, 1000);

    return {
        subscribe,
        loadCharacter: (character: Character) => {
            storageService.saveCharacter(character);
            set(character);
        },
        updateCharacter: (updates: Partial<Character>) => {
            update(currentCharacter => {
                const updatedCharacter = { ...currentCharacter, ...updates };
                storageService.saveCharacter(updatedCharacter);
                debouncedUpdate(updatedCharacter);
                return updatedCharacter;
            });
        },
        reset: () => {
            storageService.saveCharacter(defaultCharacter);
            set(defaultCharacter);
        }
    };
};

export const character = createCharacterStore();
