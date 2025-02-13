import { auth, db } from '$lib/firebase/config';
import type { Character } from '$lib/types/character';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export interface Player {
    name: string;
    token: string;
    characters: Character[];
}

export const signUp = async (email: string, password: string, name: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, 'players', userCredential.user.uid), {
        name,
        token: userCredential.user.uid,
        characters: []
    });
    const token = await userCredential.user.getIdToken();
    document.cookie = `auth-token=${token}; path=/; max-age=${60 * 60 * 24 * 5}; SameSite=Strict`;
    return userCredential.user;
};

export const login = async (email: string, password: string) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const playerDoc = await getDoc(doc(db, 'players', userCredential.user.uid));
    
    if (!playerDoc.exists()) {
        throw new Error('Jogador não encontrado');
    }

    const playerData = playerDoc.data() as Player;
    const token = await userCredential.user.getIdToken();
    document.cookie = `auth-token=${token}; path=/; max-age=${60 * 60 * 24 * 5}; SameSite=Strict`;
    return {
        user: userCredential.user,
        player: playerData
    };
};

export const getPlayer = async (userId: string): Promise<Player | null> => {
    const playerDoc = await getDoc(doc(db, 'players', userId));
    
    if (!playerDoc.exists()) {
        return null;
    }

    return playerDoc.data() as Player;
};

export const logout = async () => {
    await signOut(auth);
    document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
};
