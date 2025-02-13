import { getAdmin } from '$lib/firebase/admin';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const PATCH: RequestHandler = async ({ params, request, platform }) => {
    const { id } = params;
    const updates = await request.json();
    const { db } = getAdmin(platform);

    try {
        await db.collection('characters').doc(id).update(updates);
        return json({ success: true });
    } catch (err) {
        console.error('Error updating character:', err);
        return new Response(JSON.stringify({ error: 'Failed to update character' }), {
            status: 500
        });
    }
};
