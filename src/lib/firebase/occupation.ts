import type { Occupation } from "$lib/types/occupation";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./config";

const COLLECTION_NAME = 'occupation';

export class OccupationService {
  static async getOccupations(): Promise<Array<Occupation> | null> {
    const docRef = collection(db, COLLECTION_NAME);
    const docSnap = await getDocs(docRef);
    let occupationList: Array<Occupation> = [];

    if (docSnap.size > 0) {
      docSnap.forEach((doc) => {
        occupationList.push(doc.data() as Occupation);
      });

      return occupationList;
    }
    return null;
  }

  static async getOccupationById(param: string): Promise<Occupation | null> {
    const colRef = collection(db, COLLECTION_NAME);
    let q = await query(colRef, where('id', '==', param));
    let snapshot = await getDocs(q);

    if (snapshot.size <= 0) return null;

    let result: Array<Occupation> = [];
    snapshot.forEach((doc) => {
      result.push(doc.data() as Occupation);
    });
    return result[0];

  }

  static async getOccupationByName(param: string): Promise<Occupation | null> {
    const colRef = collection(db, COLLECTION_NAME);
    let q = await query(colRef, where('name', '==', param));
    let snapshot = await getDocs(q);

    if (snapshot.size <= 0) return null;

    let result: Array<Occupation> = [];
    snapshot.forEach((doc) => {
      result.push(doc.data() as Occupation);
    });
    return result[0];
  }

  static async getJobs(): Promise<Array<Occupation> | null> {
    const colRef = collection(db, COLLECTION_NAME);
    let q = await query(colRef, where('job', '==', true));
    let snapshot = await getDocs(q);

    if (snapshot.size <= 0) return null;

    let result: Array<Occupation> = [];
    snapshot.forEach((doc) => {
      result.push(doc.data() as Occupation);
    });
    return result;
  }
}
