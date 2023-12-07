import { View, StyleSheet } from "react-native";
import Board from "../components/game/Board";

function Game() {
    return (
        <View style={styles.view}>
            <Board />
        </View>
    )
}

const styles = StyleSheet.create({
    view: {

    },
});

export default Game;