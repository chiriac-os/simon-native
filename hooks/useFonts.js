import * as Font from 'expo-font';
import { useEffect } from 'react';

/**
 * Loads fonts
 * @returns {Promise<void>}
 */
const loadFonts = async () =>
    await Font.loadAsync({
        "simon": {
            uri: require("../assets/fonts/PressStart2P-Regular.ttf"),
            display: Font.FontDisplay.FALLBACK,
        },
    });

/**
 * Custom hook to load fonts
 * @param {function} callback - function to execute after fonts are loaded
 * @param {array} dependecies - array of dependecies for useEffect
 * @returns {void}
 */
const useFonts = (callback, dependecies) => {
    useEffect(() => {
        loadFonts()
        callback();
    }, dependecies);
}

export default useFonts;