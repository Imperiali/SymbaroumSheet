import { browser } from '$app/environment';
import type { Ability } from '$lib/types/ability';
import type { Armor } from '$lib/types/armor';
import type { Character } from '$lib/types/character';
import type { Occupation } from '$lib/types/occupation';
import type { Toast } from '$lib/types/toast';
import type { Trait } from '$lib/types/traits';
import type { Weapon } from '$lib/types/weapon';

const STORAGE_KEY_SHEET = 'symbaroum-character';
const STORAGE_KEY_TOASTS = 'toast-list';
const STORAGE_KEY_TRAITS = 'traits-list';
const STORAGE_KEY_OCCUPATIONS = 'occupation-list';
const STORAGE_KEY_ABILITIES = 'abilities-list';
const STORAGE_KEY_WEAPONS = 'weapons-list';
const STORAGE_KEY_ARMORS = 'armors-list';

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
  },
  saveTraits: (traits: Array<Trait>): void => {
    if (browser) {
      try {
        localStorage.setItem(STORAGE_KEY_TRAITS, JSON.stringify(traits));
      } catch (error) {
        console.error('Error saving traits:', error);
      }
    }
  },
  loadTraits: (): Array<Trait> | null => {
    if (browser) {
      try {
        const stored = localStorage.getItem(STORAGE_KEY_TRAITS);
        return stored ? JSON.parse(stored) : null;
      } catch (error) {
        console.error('Error loading traits:', error);
        return null;
      }
    }
    return null;
  },
  saveOccupations: (occupations: Array<Occupation>): void => {
    if (browser) {
      try {
        localStorage.setItem(STORAGE_KEY_OCCUPATIONS, JSON.stringify(occupations));
      } catch (error) {
        console.error('Error saving occupations', error);
      }
    }
  },
  loadOccupations: (): Array<Occupation> | null => {
    if (browser) {
      try {
        const stored = localStorage.getItem(STORAGE_KEY_OCCUPATIONS);
        return stored ? JSON.parse(stored) : null;
      } catch (error) {
        console.error('Error loading occupations:', error);
        return null;
      }
    }
    return null;
  },
  saveAbilities(abilities: Array<Ability>): void {
    if (browser) {
      try {
        localStorage.setItem(STORAGE_KEY_ABILITIES, JSON.stringify(abilities));
      } catch (error) {
        console.error('Error saving abilities:', error);
      }
    }
  },
  loadAbilities(): Array<Ability> | null {
    if (browser) {
      try {
        const stored = localStorage.getItem(STORAGE_KEY_ABILITIES);
        return stored ? JSON.parse(stored) : null;
      } catch (error) {
        console.error('Error loading abilities:', error);
        return null;
      }
    }
    return null;
  },
  saveWeapons(weapons: Array<Weapon>): void {
    if (browser) {
      try {
        localStorage.setItem(STORAGE_KEY_WEAPONS, JSON.stringify(weapons));
      } catch (error) {
        console.error('Error saving weapons:', error);
      }
    }
  },

  loadWeapons(): Array<Weapon> | null {
    if (browser) {
      try {
        const stored = localStorage.getItem(STORAGE_KEY_WEAPONS);
        return stored ? JSON.parse(stored) : null;
      } catch (error) {
        console.error('Error loading weapons:', error);
        return null;
      }
    }
    return null;
  },
  saveArmors(armors: Array<Armor>): void {
    if (browser) {
      try {
        localStorage.setItem(STORAGE_KEY_ARMORS, JSON.stringify(armors));
      } catch (error) {
        console.error('Error saving armors:', error);
      }
    }
  },

  loadArmors(): Array<Armor> | null {
    if (browser) {
      try {
        const stored = localStorage.getItem(STORAGE_KEY_ARMORS);
        return stored ? JSON.parse(stored) : null;
      } catch (error) {
        console.error('Error loading armors:', error);
        return null;
      }
    }
    return null;
  }
};