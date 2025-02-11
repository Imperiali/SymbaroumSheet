import { browser } from '$app/environment';
import type { Character } from '$lib/types/character';
import type { Toast } from '$lib/types/toast';

const STORAGE_KEY_SHEET = 'symbaroum-character';
const STORAGE_KEY_TOASTS = 'toast-list'

export const storageService = {
  saveCharacter: (character: Character): void => {
    if (browser) {
      try {
        localStorage.setItem(STORAGE_KEY_SHEET, JSON.stringify(character));
      } catch (error) {
        console.error('Error saving character:', error);
      }
    }
  },

  loadCharacter: (): Character | null => {
    if (browser) {
      try {
        const stored = localStorage.getItem(STORAGE_KEY_SHEET);
        return stored ? JSON.parse(stored) : null;
      } catch (error) {
        console.error('Error loading character:', error);
        return null;
      }
    }
    return null;
  },
  saveToast: (toast: Array<Toast>): void => {
    if (browser) {
      try {
        localStorage.setItem(STORAGE_KEY_TOASTS, JSON.stringify(toast));
      } catch (error) {
        console.error('Error saving toasts:', error);
      }
    }
  },

  loadToast: (): Array<Toast> | null => {
    if (browser) {
      try {
        const stored = localStorage.getItem(STORAGE_KEY_TOASTS);
        return stored ? JSON.parse(stored) : null;
      } catch (error) {
        console.error('Error loading toasts:', error);
        return null;
      }
    }
    return null;
  }
};