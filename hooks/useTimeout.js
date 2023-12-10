import { useEffect } from "react";

/**
 * Custom hook to use setTimeout in a functional component.
 * @param {Function} callback - The function to be executed after delay.
 * @param {Number} delay - The delay in milliseconds.
 * @param {Array} dependencies - The dependencies to be passed to useEffect.
 */
export function useTimeout(callback, delay, dependencies) {
    useEffect(() => {
        const id = setTimeout(callback, delay);
        return () => clearTimeout(id);
    }, [dependencies]);
}