import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
    const authToken = event.cookies.get('auth-token');

    if (authToken) {
        try {
            const [, payload] = authToken.split('.');
            const decodedPayload = JSON.parse(Buffer.from(payload, 'base64').toString());
            
            event.locals.user = {
                id: decodedPayload.user_id || decodedPayload.sub,
                email: decodedPayload.email
            };
        } catch (error) {
            event.locals.user = null;
            event.cookies.delete('auth-token', { path: '/' });
        }
    } else {
        event.locals.user = null;
    }

    return resolve(event);
};
