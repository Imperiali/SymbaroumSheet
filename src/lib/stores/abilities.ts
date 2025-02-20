import { AbilityService } from "$lib/firebase/ability";
import { storageService } from "$lib/services/storage";
import type { Ability } from "$lib/types/ability"
import { writable } from "svelte/store";

const createAbilitiesStore = () => {
  const { subscribe, set, update } = writable<Array<Ability>>();

  return {
    subscribe,
    set: async (abilities: Array<Ability>) => {
      set(abilities);
      storageService.saveAbilities(abilities);
    },
    update: async (abilities: Array<Ability>) => {
      set(abilities);
    },
    load: async (param?: string) => {
      if (param) {
        try {
          const ability = await AbilityService.getAbility(param);
        } catch (error) {
          console.error('Erro ao carregar do Firebase:', error);
          return null;
        }
        return;
      }

      try {
        const abilities = await AbilityService.getAbilities();
        if (abilities) {
          set(abilities);
          storageService.saveAbilities(abilities);
          return abilities;
        }
      } catch (error) {
        console.error('Erro ao carregar do Firebase:', error);
        return null;
      }
    }
  }
}

export const abilitiesStore = createAbilitiesStore();
