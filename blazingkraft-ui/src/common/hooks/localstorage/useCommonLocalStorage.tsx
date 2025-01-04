import { useCallback } from 'react';

export interface UseCommonLocalStorageProps {
    key: string;
    fallback?: string;
}

function useCommonLocalStorage({
    key,
    fallback,
}: UseCommonLocalStorageProps): [
    () => string | null,
    (value: string | null) => void,
    (value: string | null) => void,
] {
    const getItem = useCallback(() => {
        try {
            return localStorage.getItem(key);
        } catch (err) {
            console.error(
                `Error getting key => '${key}' from localStorage, Error => '${err}'`,
            );
            return fallback ?? null;
        }
    }, []);

    const setItem = useCallback((value: string | null) => {
        try {
            localStorage.setItem(key, value);
        } catch (err) {
            console.error(
                `Error setting key => '${key}' to localStorage, Error => '${err}'`,
            );
        }
    }, []);

    const removeItem = useCallback(() => {
        try {
            localStorage.removeItem(key);
        } catch (err) {
            console.error(
                `Error removing key => '${key}' from localStorage, Error => '${err}'`,
            );
        }
    }, []);

    return [getItem, setItem, removeItem];
}

export default useCommonLocalStorage;
