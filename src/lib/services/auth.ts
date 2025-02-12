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
    return userCredential.user;
};

export const login = async (email: string, password: string) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const playerDoc = await getDoc(doc(db, 'players', userCredential.user.uid));
    
    if (!playerDoc.exists()) {
        throw new Error('Jogador não encontrado');
    }

    const playerData = playerDoc.data() as Player;
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
};
