import { useState, useRef } from "react";
import { View, StyleSheet } from "react-native";
import ColoredButton from "../buttons/ColoredButton";

/**
 * Render the game board
 * @returns {JSX.Element}
 */
function Board() {
    /**
     * Hooks
     */
    const [gamePattern, setGamePattern] = useState([]);
    const red = useRef();
    const blue = useRef();
    const green = useRef();
    const yellow = useRef();

    const seeRef = (ref) => { console.log(ref) }

    return (
        <View style={styles.view}>
            <View style={styles.row}>
                <ColoredButton ref={green} color="green" onPress={() => seeRef(green)} />
                <ColoredButton ref={red} color="red" onPress={() => seeRef(red)} />
            </View>
            <View style={styles.row}>
                <ColoredButton ref={yellow} color="yellow" onPress={() => seeRef(yellow)} />
                <ColoredButton ref={blue} color="blue" onPress={() => seeRef(blue)} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    view: {

    },
    row: {
        flexDirection: "row",
    }
});

export default Board;