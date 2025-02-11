import { writable } from 'svelte/store';

export interface SectionVisibility {
    basicInfo: boolean;
    attributes: boolean;
    personal: boolean;
    combat: boolean;
    abilitiesAndPowers: boolean;
    notes: boolean;
    companions: boolean;
    artifacts: boolean;
    equipment: boolean;
    wealth: boolean;
}

const STORAGE_KEY = 'symbaroum-section-visibility';

const defaultVisibility: SectionVisibility = {
    basicInfo: true,
    attributes: true,
    personal: true,
    combat: true,
    abilitiesAndPowers: true,
    notes: true,
    companions: true,
    artifacts: true,
    equipment: true,
    wealth: true,
};

const loadSavedVisibility = (): SectionVisibility => {
    if (typeof window === 'undefined') return defaultVisibility;
    
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return defaultVisibility;
    
    try {
        return JSON.parse(saved);
    } catch {
        return defaultVisibility;
    }
};

export const sectionVisibility = writable<SectionVisibility>(loadSavedVisibility());

sectionVisibility.subscribe((value) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    }
});