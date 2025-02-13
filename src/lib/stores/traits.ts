import { TraitService } from "$lib/firebase/trait";
import { storageService } from "$lib/services/storage";
import type { Trait } from "$lib/types/traits"
import { writable } from "svelte/store";

const createTraitsStore = () => {

  const { subscribe, set, update } = writable<Array<Trait>>();

  return {
    subscribe,
    set: async (traits: Array<Trait>) => {
      set(traits);
      storageService.saveTraits(traits);
    },
    update: async (traits: Array<Trait>) => {
      set(traits);
    },
    load: async (param?: string) => {
      if (param) {
        try {
          const trait = await TraitService.getTrait(param);
        } catch (error) {
          console.error('Erro ao carregar do Firebase:', error);
          return null;
        }
        return;
      }

      try {
        const traits = await TraitService.getTraits();
        if (traits) {
          set(traits);
          storageService.saveTraits(traits);
          return traits;
        }
      } catch (error) {
        console.error('Erro ao carregar do Firebase:', error);
        return null;
      }
    }
  }
}

export const traitsStore = createTraitsStore();