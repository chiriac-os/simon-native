import { useState, useRef, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import ColoredButton from "../buttons/ColoredButton";

/**
 * Render the game board
 * @returns {JSX.Element}
 */
function Board({ started, ...restProps }) {
    const { checkAnswer, handleUserClickedPattern, handleOver, startOver } = restProps;
    /**
     * Hooks
     */

    const red = useRef();
    const blue = useRef();
    const green = useRef();
    const yellow = useRef();

    /**
     * Game variables
     */
    const btnRefs = [red, blue, green, yellow];

    /**
     * Handles click event over the colors
     * @param {MouseEvent} event 
     */
    const handleBtn = (event) => {
        // Do something only if the game has started
        if (!started) return

        console.log("I was clicked!")
        // Get user's choise and pushed in the user pattern 
        const userChosenColor = event.target.id;
        console.log("userChosenColor", userChosenColor);
        handleUserClickedPattern(userChosenColor);

        // Call linked audio and animation for the user clicked color
        //playSound(userChosenColor);
        //animatePress(userChosenColor);

        // Check game pattern
        checkAnswer();
    }


    return (
        <>
            <View style={styles.row}>
                <ColoredButton id="green" ref={green} color="green" onPress={handleBtn} />
                <ColoredButton id="red" ref={red} color="red" onPress={handleBtn} />
            </View>
            <View style={styles.row}>
                <ColoredButton id="yellow" ref={yellow} color="yellow" onPress={handleBtn} />
                <ColoredButton id="blue" ref={blue} color="blue" onPress={handleBtn} />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
    }
});

export default Board;