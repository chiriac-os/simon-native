import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Game from './src/screens/Game';

function App() {
    return (
        <View style={styles.container}>
            <Game />
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#011F3F',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default App;