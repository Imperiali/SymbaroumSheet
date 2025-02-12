import { db } from './config';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import type { Character } from '$lib/types/character';

const COLLECTION_NAME = 'characters';

export class CharacterService {
    static async getCharacter(characterName: string): Promise<Character | null> {
        const docRef = doc(db, COLLECTION_NAME, characterName);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
            return docSnap.data() as Character;
        }
        
        return null;
    }

    static async createCharacter(characterName: string, characterData: Character): Promise<void> {
        const docRef = doc(db, COLLECTION_NAME, characterName);
        await setDoc(docRef, characterData);
    }

    static async updateCharacter(characterName: string, updates: Partial<Character>): Promise<void> {
        const docRef = doc(db, COLLECTION_NAME, characterName);
        await updateDoc(docRef, updates);
    }

    static async characterExists(characterName: string): Promise<boolean> {
        const docRef = doc(db, COLLECTION_NAME, characterName);
        const docSnap = await getDoc(docRef);
        return docSnap.exists();
    }
}
