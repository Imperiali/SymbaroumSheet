import { db } from './config';
import { collection, getDocs, query, where, addDoc, doc, setDoc } from 'firebase/firestore';
import type { Armor } from '$lib/types/armor';

const COLLECTION_NAME = 'armor';

export class ArmorService {
  static async getArmors(): Promise<Array<Armor> | null> {
    const docRef = collection(db, COLLECTION_NAME);
    const docSnap = await getDocs(docRef);
    let armorList: Array<Armor> = [];

    if (docSnap.size > 0) {
      docSnap.forEach((doc) => {
        armorList.push({ id: doc.id, ...doc.data() } as Armor);
      });
      return armorList;
    } else {
      return null;
    }
  }

  static async getArmorByName(name: string): Promise<Armor | null> {
    const q = query(collection(db, COLLECTION_NAME), where("name", "==", name));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      return { id: doc.id, ...doc.data() } as Armor;
    } else {
      return null;
    }
  }

  static async addArmor(armor: Armor): Promise<string | null> {
    try {
      const docRef = await addDoc(collection(db, COLLECTION_NAME), armor);
      return docRef.id;
    } catch (e) {
      console.error("Error adding armor: ", e);
      return null;
    }
  }

  static async updateArmor(id: string, armor: Partial<Armor>): Promise<void> {
    const docRef = doc(db, COLLECTION_NAME, id);
    await setDoc(docRef, armor, { merge: true });
  }
}
