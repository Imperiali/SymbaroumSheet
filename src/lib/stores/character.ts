import { writable } from 'svelte/store';
import type { Character } from '$lib/types/character';
import { CharacterService } from '$lib/firebase/character';
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
        artifacts: [],
        notes: [],
        traits: []
    };

    let currentCharacterName: string | null = null;
    const { subscribe, set, update } = writable<Character>(defaultCharacter);

    return {
        subscribe,
        setCharacterName: (name: string) => {
            currentCharacterName = name;
        },
        set: async (character: Character) => {
            if (!currentCharacterName) throw new Error('Character name not set');
            set(character);
            storageService.saveCharacter(character);
            await CharacterService.updateCharacter(currentCharacterName, character);
        },
        update: async (fn: (character: Character) => Character) => {
            if (!currentCharacterName) throw new Error('Character name not set');
            update(char => {
                const updated = fn(char);
                storageService.saveCharacter(updated);
                CharacterService.updateCharacter(currentCharacterName!, updated);
                return updated;
            });
        },
        reset: async () => {
            if (!currentCharacterName) throw new Error('Character name not set');
            set(defaultCharacter);
            storageService.saveCharacter(defaultCharacter);
            await CharacterService.updateCharacter(currentCharacterName, defaultCharacter);
        },
        load: async (characterName: string) => {
            currentCharacterName = characterName;
            try {
                const character = await CharacterService.getCharacter(characterName);
                if (character) {
                    set(character);
                    storageService.saveCharacter(character);
                    return;
                }
            } catch (error) {
                console.error('Erro ao carregar do Firebase:', error);
            }

            const localCharacter = storageService.loadCharacter();
            if (localCharacter) {
                set(localCharacter);
                CharacterService.updateCharacter(characterName, localCharacter).catch(error => {
                    console.error('Erro ao sincronizar com Firebase:', error);
                });
            }
        }
    };
};

export const character = createCharacterStore();
