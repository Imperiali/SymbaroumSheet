import { env } from '$env/dynamic/private';
import type { Platform } from '@sveltejs/adapter-cloudflare';

export function getServiceAccount(platform?: Platform) {
    const serviceAccount = platform?.env?.PRIVATE_FIREBASE_SERVICE_ACCOUNT || env.PRIVATE_FIREBASE_SERVICE_ACCOUNT;
    
    if (!serviceAccount) {
        throw new Error('Missing Firebase service account configuration');
    }

    try {
        const decoded = Buffer.from(serviceAccount, 'base64').toString();
        return JSON.parse(decoded);
    } catch (error) {
        console.error('Error parsing service account:', error);
        throw new Error('Invalid Firebase service account configuration');
    }
}
