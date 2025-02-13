import { db } from '$lib/firebase/admin';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals }) => {
    const { username, character: characterName } = params;

    try {
        const playersSnapshot = await db
            .collection('players')
            .where('name', '==', username)
            .get();

        if (playersSnapshot.empty) {
            throw error(404, 'Player not found');
        }

        const playerDoc = playersSnapshot.docs[0];
        const playerId = playerDoc.id;

        const charactersSnapshot = await db
            .collection('characters')
            .where('playerId', '==', playerId)
            .where('name', '==', characterName)
            .get();

        if (charactersSnapshot.empty) {
            throw error(404, 'Character not found');
        }

        const characterDoc = charactersSnapshot.docs[0];
        const isOwner = locals.user?.id === playerId;

        return {
            character: {
                id: characterDoc.id,
                ...characterDoc.data()
            },
            isOwner
        };
    } catch (err) {
        console.error('Error loading character:', err);
        throw error(500, 'Internal Server Error');
    }
};
