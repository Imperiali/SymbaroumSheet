import { db } from '$lib/firebase/admin';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
    const { username } = params;

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
            .get();

        const characters = charactersSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        return {
            player: { id: playerId, ...playerDoc.data() },
            characters
        };
    } catch (err) {
        console.error('Error loading player data:', err);
        throw error(500, 'Internal Server Error');
    }
};
