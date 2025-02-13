import { db } from './config';
import { doc, getDoc, setDoc, updateDoc, collection, getDocs } from 'firebase/firestore';
import type { Trait } from "$lib/types/traits";
import { traitsStore } from '$lib/stores/traits';

const COLLECTION_NAME = 'traits';

export class TraitService {
  static async getTraits(): Promise<Array<Trait> | null> {
    const docRef = collection(db, COLLECTION_NAME);
    const docSnap = await getDocs(docRef);
    let traitList: Array<Trait>  = [];
    
    if (docSnap.size > 0) {
      docSnap.forEach((doc) => {
        traitList.push(doc.data() as Trait);
      });

      return traitList;
    }
    return null;
  }

  static async getTrait(param: String): Promise<Trait | null> {
    let traitList = await this.getTraits();
    
    if(traitList == null || traitList == undefined || traitList?.length <= 0 ) {
      return null;
    }

    return traitList.find((trait => trait.name == param))  ?? null;
    
  }
}