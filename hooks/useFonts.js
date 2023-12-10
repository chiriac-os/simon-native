import * as Font from 'expo-font';

/**
 * Custom hook to load fonts
 * @returns {Promise<void>}
 */
const useFonts = async () =>
    await Font.loadAsync({
        simon: require("../assets/fonts/PressStart2P-Regular.ttf"),
    });

export default useFonts;