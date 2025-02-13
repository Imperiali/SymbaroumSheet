import { openDB, type IDBPDatabase } from 'idb';
import type { Character } from '$lib/types/character';

const DB_NAME = 'symbaroum-offline';
const DB_VERSION = 1;

interface SymbaroumDB {
    characters: {
        key: string;
        value: Character & {
            lastModified: number;
            playerId: string;
        };
    };
}

export async function initDB() {
    return await openDB<SymbaroumDB>(DB_NAME, DB_VERSION, {
        upgrade(db) {
            if (!db.objectStoreNames.contains('characters')) {
                db.createObjectStore('characters');
            }
        },
    });
}

export async function saveCharacterLocally(character: Character & { playerId: string }) {
    const db = await initDB();
    const key = `${character.playerId}_${character.name}`;
    await db.put('characters', {
        ...character,
        lastModified: Date.now()
    }, key);
}

export async function getLocalCharacter(playerId: string, characterName: string) {
    const db = await initDB();
    const key = `${playerId}_${characterName}`;
    return await db.get('characters', key);
}

export async function getAllLocalCharacters() {
    const db = await initDB();
    return await db.getAll('characters');
}

export async function deleteLocalCharacter(playerId: string, characterName: string) {
    const db = await initDB();
    const key = `${playerId}_${characterName}`;
    await db.delete('characters', key);
}
