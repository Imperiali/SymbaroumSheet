import { ArmorService } from "$lib/firebase/armor";
import { storageService } from "$lib/services/storage";
import type { Armor } from "$lib/types/armor";
import { writable } from "svelte/store";

const createArmorsStore = () => {
  const { subscribe, set, update } = writable<Array<Armor>>();

  return {
    subscribe,
    set: async (armors: Array<Armor>) => {
      set(armors);
      storageService.saveArmors(armors);
    },
    update: async (armors: Array<Armor>) => {
      set(armors);
    },
    load: async (param?: string) => {
      if (param) {
        try {
          const armor = await ArmorService.getArmorByName(param);
          return armor;
        } catch (error) {
          console.error('Erro ao carregar do Firebase:', error);
          return null;
        }
      }

      try {
        const armors = await ArmorService.getArmors();
        if (armors) {
          set(armors);
          storageService.saveArmors(armors);
          return armors;
        }
      } catch (error) {
        console.error('Erro ao carregar do Firebase:', error);
        return null;
      }
    },
    add: async (armor: Armor) => {
      try {
        const id = await ArmorService.addArmor(armor);
        if (id) {
          const updatedArmor = { ...armor, id };
          update(armors => {
            const newArmors = armors ? [...armors, updatedArmor] : [updatedArmor];
            storageService.saveArmors(newArmors);
            return newArmors;
          });
          return id;
        }
        return null;
      } catch (error) {
        console.error('Erro ao adicionar armadura:', error);
        return null;
      }
    },
    updateArmor: async (id: string, armor: Armor) => {
      try {
        await ArmorService.updateArmor(id, armor);
        const updatedArmor = { ...armor, id };
        update(armors => {
          if (!armors) return [updatedArmor];
          const newArmors = armors.map(a => a.id === id ? updatedArmor : a);
          storageService.saveArmors(newArmors);
          return newArmors;
        });
        return true;
      } catch (error) {
        console.error('Erro ao atualizar armadura:', error);
        return false;
      }
    }
  };
};

export const armorsStore = createArmorsStore();
