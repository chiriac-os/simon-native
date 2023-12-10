import { useRef, useCallback, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import ColoredButton from "../buttons/ColoredButton";
import { useTimeout } from "../../../hooks/useTimeout";

/**
 * Render the game board
 * @param {boolean} started game status
 * @param {*} restProps
 * @returns {JSX.Element}
 */
function Board({ started, ...restProps }) {
    /**
     * Props
     * @param {number} level game level
     * @param {function} checkAnswer function to check the user answer
     * @param {function} handleUserClickedPattern function to handle the user clicked pattern
     * @param {function} nextSequenceColor function to get the next sequence color
     * @param {function} playSound function to play the sound
     */ 
    const { level, checkAnswer, handleUserClickedPattern, nextSequenceColor, playSound } = restProps;

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
     * Handles press event over the colors
     * @param {string} id color id from the button ref
     */
    const handleBtn = (id) => {
        // Does nothing if the game is not started
        if (!started) return;

        // Gets the user's choise and pushed in the user pattern and checks the answer
        const userChosenColor = id;
        handleUserClickedPattern(userChosenColor);

        // Call linked audio and animation for the user clicked color
        playSound(userChosenColor);

        checkAnswer();
    }

    /**
     * Animates the button to show to the user next sequence color
     * @param {string} color
     */
    const animateBtn = useCallback((color) => {
        if (!color) return;

        const btn = btnRefs.find(btn => btn.current.id === color);
        if (!btn) return;
        btn.current.animate();
    }, [nextSequenceColor]);

    /**
     * Custom hook to animate the button after 1 second on level change
     */
    useTimeout(() => {
        animateBtn(nextSequenceColor);
        playSound(nextSequenceColor);
    }, 1000, [level]);

    return (
        <>
            <View style={styles.row}>
                <ColoredButton id="green" ref={green} color="green" onPress={(id) => handleBtn(id)} />
                <ColoredButton id="red" ref={red} color="red" onPress={(id) => handleBtn(id)} />
            </View>
            <View style={styles.row}>
                <ColoredButton id="yellow" ref={yellow} color="yellow" onPress={(id) => handleBtn(id)} />
                <ColoredButton id="blue" ref={blue} color="blue" onPress={(id) => handleBtn(id)} />
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