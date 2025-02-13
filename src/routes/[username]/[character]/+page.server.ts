import { db } from '$lib/firebase/config';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals }) => {
    const { username, character: characterName } = params;
    const userId = locals.user?.id;

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
        const characterQuery = query(charactersRef, 
            where('name', '==', characterName),
            where('playerId', '==', playerId)
        );
        const characterSnapshot = await getDocs(characterQuery);

        if (characterSnapshot.empty) {
            throw error(404, 'Character not found');
        }

        const characterDoc = characterSnapshot.docs[0];
        const character = characterDoc.data();

        return {
            username,
            character,
            isOwner: userId ? character.playerId === userId : false
        };
    } catch (e) {
        console.error('Error loading character:', e);
        throw error(404, 'Character not found');
    }
};
