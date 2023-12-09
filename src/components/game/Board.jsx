import { useRef, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import ColoredButton from "../buttons/ColoredButton";

/**
 * Render the game board
 * @param {boolean} started game status
 * @param {*} restProps
 * @returns {JSX.Element}
 */
function Board({ started, ...restProps }) {
    /**
     * Props
     * @param {function} checkAnswer function to check the user answer
     * @param {function} handleUserClickedPattern function to handle the user clicked pattern
     * @param {function} nextSequenceColor function to get the next sequence color
     */ 
    const { checkAnswer, handleUserClickedPattern, nextSequenceColor } = restProps;

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
        if (!started) return;

        // Get user's choise and pushed in the user pattern 
        const userChosenColor = event.target.id;
        handleUserClickedPattern(userChosenColor);

        // Call linked audio and animation for the user clicked color
        //playSound(userChosenColor);
        //animatePress(userChosenColor);

        // Check game pattern
        checkAnswer();
    }

    /**
     * Animates the button to show to the user next sequence color
     */
    const animateBtn = useCallback((color) => {
        if (!color) return;

        const btn = btnRefs.find(btn => btn.current.id === color);
        if (!btn) return;

        btn.current.animate();
    }, [nextSequenceColor]);

    animateBtn(nextSequenceColor);

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