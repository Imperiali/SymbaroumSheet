import { db } from './config';
import { doc, getDoc, setDoc, updateDoc, collection, getDocs, query, where } from 'firebase/firestore';
import type { Trait } from "$lib/types/traits";
import { traitsStore } from '$lib/stores/traits';

const COLLECTION_NAME = 'traits';

export class TraitService {
  static async getTraits(): Promise<Array<Trait> | null> {
    const docRef = collection(db, COLLECTION_NAME);
    const docSnap = await getDocs(docRef);
    let traitList: Array<Trait> = [];

    if (docSnap.size > 0) {
      docSnap.forEach((doc) => {
        traitList.push(doc.data() as Trait);
      });

      return traitList;
    }
    return null;
  }

  static async getTrait(param: String): Promise<Trait | null> {
    const colRef = collection(db, COLLECTION_NAME);
    let q = await query(colRef, where('name', '==', param));

    let snapshot = await getDocs(q);



    if (snapshot.size > 0) {
      let result: Array<Trait> = [];
      snapshot.forEach((doc) => {
        result.push(doc.data() as Trait);
      });
      return result[0];
    }


    return null;
  }
}