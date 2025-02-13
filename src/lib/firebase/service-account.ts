export function getServiceAccount() {
    const serviceAccountBase64 = import.meta.env.VITE_FIREBASE_SERVICE_ACCOUNT;
    if (!serviceAccountBase64) {
        throw new Error('Missing Firebase service account configuration');
    }

    try {
        const decoded = Buffer.from(serviceAccountBase64, 'base64').toString();
        return JSON.parse(decoded);
    } catch (error) {
        console.error('Error parsing service account:', error);
        throw new Error('Invalid Firebase service account configuration');
    }
}
