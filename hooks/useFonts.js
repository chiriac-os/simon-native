import * as Font from 'expo-font';

const useFonts = async () =>
    await Font.loadAsync({
        simon: require("../assets/fonts/PressStart2P-Regular.ttf"),
    });

export default useFonts;