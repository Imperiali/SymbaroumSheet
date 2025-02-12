import { db } from '$lib/firebase/config';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
    const { username } = params;

    try {
        const playersRef = collection(db, 'players');
        const q = query(playersRef, where('name', '==', username));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            throw error(404, 'Player not found');
        }

        const playerDoc = querySnapshot.docs[0];
        const playerId = playerDoc.id;

        const charactersRef = collection(db, 'characters');
        const characterQuery = query(charactersRef, where('playerId', '==', playerId));
        const characterSnapshot = await getDocs(characterQuery);

        const characters = characterSnapshot.docs.map(doc => doc.data());

        return {
            username,
            characters
        };
    } catch (e) {
        console.error('Error loading player data:', e);
        throw error(404, 'Player not found');
    }
};
