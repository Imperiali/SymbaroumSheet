import { WeaponService } from "$lib/firebase/weapon";
import { storageService } from "$lib/services/storage";
import type { Weapon } from "$lib/types/weapon";
import { writable } from "svelte/store";

const createWeaponsStore = () => {
  const { subscribe, set, update } = writable<Array<Weapon>>();

  return {
    subscribe,
    set: async (weapons: Array<Weapon>) => {
      set(weapons);
      storageService.saveWeapons(weapons);
    },
    update: async (weapons: Array<Weapon>) => {
      set(weapons);
    },
    load: async (param?: string) => {
      if (param) {
        try {
          const weapon = await WeaponService.getWeapon(param);
          return weapon;
        } catch (error) {
          console.error('Erro ao carregar do Firebase:', error);
          return null;
        }
      }

      try {
        const weapons = await WeaponService.getWeapons();
        if (weapons) {
          set(weapons);
          storageService.saveWeapons(weapons);
          return weapons;
        }
      } catch (error) {
        console.error('Erro ao carregar do Firebase:', error);
        return null;
      }
    },
    add: async (weapon: Weapon) => {
      try {
        const id = await WeaponService.addWeapon(weapon);
        if (id) {
          const updatedWeapon = { ...weapon, id };
          update(weapons => {
            const newWeapons = weapons ? [...weapons, updatedWeapon] : [updatedWeapon];
            storageService.saveWeapons(newWeapons);
            return newWeapons;
          });
          return id;
        }
        return null;
      } catch (error) {
        console.error('Erro ao adicionar arma:', error);
        return null;
      }
    },
    updateWeapon: async (id: string, weapon: Weapon) => {
      try {
        const success = await WeaponService.updateWeapon(id, weapon);
        if (success) {
          const updatedWeapon = { ...weapon, id };
          update(weapons => {
            if (!weapons) return [updatedWeapon];
            const newWeapons = weapons.map(w => w.id === id ? updatedWeapon : w);
            storageService.saveWeapons(newWeapons);
            return newWeapons;
          });
          return true;
        }
        return false;
      } catch (error) {
        console.error('Erro ao atualizar arma:', error);
        return false;
      }
    }
  }
}

export const weaponsStore = createWeaponsStore();
