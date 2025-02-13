import { writable } from 'svelte/store';
import type { Character } from '$lib/types/character';
import { saveCharacterLocally, getLocalCharacter } from '$lib/utils/db';

function createCharacterStore() {
    const { subscribe, set, update } = writable<Character | null>(null);

    return {
        subscribe,
        loadCharacter: async (character: Character & { playerId: string }) => {
            set(character);
            await saveCharacterLocally(character);
        },
        updateCharacter: async (updates: Partial<Character>) => {
            update(char => {
                if (!char) return null;
                const updatedChar = { ...char, ...updates };
                if ('playerId' in char) {
                    saveCharacterLocally(updatedChar as Character & { playerId: string });
                }
                return updatedChar;
            });
        },
        reset: () => set(null)
    };
}

export const character = createCharacterStore();
