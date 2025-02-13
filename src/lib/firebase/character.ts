import { db } from './config';
import { collection, doc, getDoc, setDoc, updateDoc, query, where, getDocs } from 'firebase/firestore';
import type { Character } from '$lib/types/character';
import { storageService } from '$lib/services/storage';

const COLLECTION_NAME = 'characters';

export class CharacterService {
    static async getUserCharacters(userId: string): Promise<Character[]> {
        try {
            const playerRef = doc(db, 'players', userId);
            const playerDoc = await getDoc(playerRef);

            if (!playerDoc.exists()) {
                return [];
            }

            const playerData = playerDoc.data();
            const characters: Character[] = [];

            for (const characterId of playerData.characters) {
                const characterDoc = await getDoc(doc(db, COLLECTION_NAME, characterId));
                if (characterDoc.exists()) {
                    characters.push(characterDoc.data() as Character);
                }
            }

            return characters;
        } catch (error) {
            console.error('Error getting user characters:', error);
            return [];
        }
    }

    static async characterExists(characterName: string, userId: string): Promise<boolean> {
        const charactersRef = collection(db, COLLECTION_NAME);
        const q = query(charactersRef, 
            where('name', '==', characterName),
            where('playerId', '==', userId)
        );
        const querySnapshot = await getDocs(q);
        return !querySnapshot.empty;
    }

    static async create(characterName: string, userId: string): Promise<Character> {
        try {
            const exists = await this.characterExists(characterName, userId);
            if (exists) {
                throw new Error('Personagem já existe');
            }

            const playerRef = doc(db, 'players', userId);
            const playerDoc = await getDoc(playerRef);

            if (!playerDoc.exists()) {
                throw new Error('Jogador não encontrado');
            }

            const characterData: Character = {
                name: characterName,
                playerId: userId,
                race: '',
                occupation: '',
                experience: 0,
                currentExperience: 0,
                shadow: '',
                quote: '',
                painThreshold: 0,
                vitality: {
                    current: 10,
                    max: 10
                },
                corruption: {
                    current: 0,
                    permanent: 0
                },
                corruptionThreshold: 4,
                attributes: {
                    accurate: 10,
                    cunning: 10,
                    discreet: 10,
                    persuasive: 10,
                    quick: 10,
                    resolute: 10,
                    strong: 10,
                    vigilant: 10
                },
                toughness: {
                    base: 10,
                    current: 10
                },
                armor: [],
                weapons: [],
                money: {
                    thaler: 0,
                    shilling: 0,
                    orteg: 0
                },
                equipment: [],
                abilities: [],
                companions: [],
                artifacts: [],
                notes: []
            };

            const characterRef = doc(collection(db, COLLECTION_NAME));
            await setDoc(characterRef, characterData);

            const playerData = playerDoc.data();
            const updatedCharacters = [...(playerData.characters || []), characterRef.id];

            await updateDoc(playerRef, {
                characters: updatedCharacters
            });

            storageService.saveCharacter(characterData);
            return characterData;
        } catch (error) {
            console.error('Error creating character:', error);
            throw error;
        }
    }

    static async get(characterName: string, userId: string): Promise<Character | null> {
        const charactersRef = collection(db, COLLECTION_NAME);
        const q = query(charactersRef, 
            where('name', '==', characterName),
            where('playerId', '==', userId)
        );
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            throw new Error('Character not found');
        }

        const characterDoc = querySnapshot.docs[0];
        const characterData = characterDoc.data() as Character;
        storageService.saveCharacter(characterData);
        return characterData;
    }

    static async update(characterName: string, userId: string, updates: Partial<Character>): Promise<Character> {
        const charactersRef = collection(db, COLLECTION_NAME);
        const q = query(charactersRef, 
            where('name', '==', characterName),
            where('playerId', '==', userId)
        );
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            throw new Error('Character not found');
        }

        const characterDoc = querySnapshot.docs[0];
        const characterData = characterDoc.data() as Character;

        const updatedCharacterData = { ...characterData, ...updates };
        await updateDoc(doc(db, COLLECTION_NAME, characterDoc.id), updatedCharacterData);

        storageService.saveCharacter(updatedCharacterData);
        return updatedCharacterData;
    }
}
