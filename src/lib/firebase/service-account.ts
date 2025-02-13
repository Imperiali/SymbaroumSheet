import { VITE_FIREBASE_SERVICE_ACCOUNT } from '$env/static/private';

export function getServiceAccount() {
    if (!VITE_FIREBASE_SERVICE_ACCOUNT) {
        throw new Error('Missing Firebase service account configuration');
    }

    try {
        const decoded = Buffer.from(VITE_FIREBASE_SERVICE_ACCOUNT, 'base64').toString();
        return JSON.parse(decoded);
    } catch (error) {
        console.error('Error parsing service account:', error);
        throw new Error('Invalid Firebase service account configuration');
    }
}
