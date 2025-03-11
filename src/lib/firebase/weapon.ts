import type { Weapon } from '$lib/types/weapon';
import { db } from './config';
import { collection, getDocs, query, where, addDoc, doc, setDoc } from 'firebase/firestore';

const COLLECTION_NAME = 'weapons';

export class WeaponService {
  static async getWeapons(): Promise<Array<Weapon> | null> {
    const docRef = collection(db, COLLECTION_NAME);
    const docSnap = await getDocs(docRef);
    let weaponList: Array<Weapon> = [];

    if (docSnap.size > 0) {
      docSnap.forEach((doc) => {
        weaponList.push({ id: doc.id, ...doc.data() } as Weapon);
      });

      return weaponList;
    }
    return null;
  }

  static async getWeapon(param: string): Promise<Weapon | null> {
    const colRef = collection(db, COLLECTION_NAME);
    let q = await query(colRef, where('name', '==', param));

    let snapshot = await getDocs(q);

    if (snapshot.size > 0) {
      let result: Array<Weapon> = [];
      snapshot.forEach((doc) => {
        result.push({ id: doc.id, ...doc.data() } as Weapon);
      });
      return result[0];
    }

    return null;
  }

  static async addWeapon(weapon: Weapon): Promise<string | null> {
    try {
      const weaponData = { ...weapon };
      delete weaponData.id; // Remove o id antes de salvar
      
      const docRef = await addDoc(collection(db, COLLECTION_NAME), weaponData);
      return docRef.id;
    } catch (error) {
      console.error('Erro ao adicionar arma:', error);
      return null;
    }
  }

  static async updateWeapon(id: string, weapon: Weapon): Promise<boolean> {
    try {
      const weaponData = { ...weapon };
      delete weaponData.id; // Remove o id antes de salvar
      
      const docRef = doc(db, COLLECTION_NAME, id);
      await setDoc(docRef, weaponData, { merge: true });
      return true;
    } catch (error) {
      console.error('Erro ao atualizar arma:', error);
      return false;
    }
  }
}
