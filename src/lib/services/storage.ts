import { browser } from '$app/environment';
import type { Character } from '$lib/types/character';

const STORAGE_KEY = 'symbaroum-character';

export const storageService = {
    saveCharacter: (character: Character): void => {
        if (browser) {
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(character));
            } catch (error) {
                console.error('Error saving character:', error);
            }
        }
    },

    loadCharacter: (): Character | null => {
        if (browser) {
            try {
                const stored = localStorage.getItem(STORAGE_KEY);
                return stored ? JSON.parse(stored) : null;
            } catch (error) {
                console.error('Error loading character:', error);
                return null;
            }
        }
        return null;
    }
};
