import { getApps, initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import { getServiceAccount } from './service-account';

function initAdmin() {
    if (!getApps().length) {
        const serviceAccount = getServiceAccount();

        initializeApp({
            credential: cert(serviceAccount)
        });
    }
    return {
        db: getFirestore(),
        auth: getAuth()
    };
}

export const { db, auth } = initAdmin();
