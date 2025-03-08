import { OccupationService } from "$lib/firebase/occupation";
import { storageService } from "$lib/services/storage";
import type { Occupation, OccupationParams } from "$lib/types/occupation"
import { writable } from "svelte/store"

const createOccupationStore = () => {
  const { subscribe, set, update } = writable<Array<Occupation>>();

  return {
    subscribe,
    set: async (occupation: Array<Occupation>) => {
      set(occupation);
      storageService.saveOccupations(occupation);
    },
    update: async (occupations: Array<Occupation>) => {
      set(occupations);
    },
    load: async (param?: string) => {
      if (param) { }
    },
    loadWithParams: async (param: OccupationParams) => {
      try {
        let occupations: Array<Occupation> | Occupation | null = null;
        if (param.id) {
          occupations = await OccupationService.getOccupationById(param.id);
        }
        if (param.name) {
          occupations = await OccupationService.getOccupationByName(param.name);
        }
        if (param.job) {
          occupations = await OccupationService.getJobs();
        }
        return occupations;
      } catch (error) {
        console.error('Erro ao carregar do Firebase:', error);
        return null;
      }

    }
  }
}

export const occupationStore = createOccupationStore();