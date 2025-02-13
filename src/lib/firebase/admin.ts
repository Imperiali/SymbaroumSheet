import { getApps, initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import { getServiceAccount } from './service-account';
import type { Platform } from '@sveltejs/adapter-cloudflare';

function initAdmin(platform?: Platform) {
    if (!getApps().length) {
        const serviceAccount = getServiceAccount(platform);

        initializeApp({
            credential: cert(serviceAccount)
        });
    }
    return {
        db: getFirestore(),
        auth: getAuth()
    };
}

let adminInstance: ReturnType<typeof initAdmin>;

export function getAdmin(platform?: Platform) {
    if (!adminInstance) {
        adminInstance = initAdmin(platform);
    }
    return adminInstance;
}

export const { db, auth } = initAdmin();
