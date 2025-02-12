// Feature flags
export const FEATURES = {
    VERIFY_CHARACTER_EXISTS: import.meta.env.VITE_FEATURE_VERIFY_CHARACTER_EXISTS === 'true'
} as const;
