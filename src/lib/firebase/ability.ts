import { db } from './config';
import { doc, getDoc, setDoc, updateDoc, collection, getDocs, query, where } from 'firebase/firestore';
import type { Ability } from "$lib/types/ability";

const COLLECTION_NAME = 'abilities';

export class AbilityService {
  static async getAbilities(): Promise<Array<Ability> | null> {
    const docRef = collection(db, COLLECTION_NAME);
    const docSnap = await getDocs(docRef);
    let abilityList: Array<Ability> = [];

    if (docSnap.size > 0) {
      docSnap.forEach((doc) => {
        abilityList.push(doc.data() as Ability);
      });

      return abilityList;
    }
    return null;
  }

  static async getAbility(param: String): Promise<Ability | null> {
    const colRef = collection(db, COLLECTION_NAME);
    let q = await query(colRef, where('name', '==', param));

    let snapshot = await getDocs(q);

    if (snapshot.size > 0) {
      let result: Array<Ability> = [];
      snapshot.forEach((doc) => {
        result.push(doc.data() as Ability);
      });
      return result[0];
    }

    return null;
  }
}
