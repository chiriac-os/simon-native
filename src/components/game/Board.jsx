import { useState, useRef } from "react";
import { View, StyleSheet } from "react-native";
import ColoredButton from "../buttons/ColoredButton";

/**
 * Render the game board
 * @returns {JSX.Element}
 */
function Board({ started, ...restProps }) {
    const { callNextSequence, handleOver, startOver } = restProps;
    /**
     * Hooks
     */
    const [gamePattern, setGamePattern] = useState([]);
    const red = useRef();
    const blue = useRef();
    const green = useRef();
    const yellow = useRef();

    /**
     * Game variables
     */
    const btnRefs = [red, blue, green, yellow];
    const buttonColors = ['red', 'blue', 'green', 'yellow'];
    let userClickedPattern = []; // Saves the user clicked color pattern

    const seeRef = (ref) => { console.log(ref) }

    /**
     * Reset level and game pattern
     */
    const resetPattern = () => {
        startOver();
        setGamePattern(prevPattern => prevPattern = []);
    }

    /**
     * Handles click event over the colors
     * @param {MouseEvent} event 
     */
    const handleBtn = (event) => {
        // Do something only if the game has started
        if (!started) return


        // Get user's choise and pushed in the user pattern 
        const userChosenColor = event.target.id;
        userClickedPattern.push(userChosenColor);

        // Call linked audio and animation for the user clicked color
        //playSound(userChosenColor);
        //animatePress(userChosenColor);

        // Check game pattern
        checkAnswer(userClickedPattern.length - 1);
    }

    /**
     * Manages the level
     */
    const nextSequence = () => {
        // Reset the array for the next level
        userClickedPattern = [];

        // Generates the random number and a random color everytime
        let randomNumber = callNextSequence();
        let randomChosenColor = buttonColors[randomNumber];
        setGamePattern([...gamePattern, randomChosenColor]);

        // Makes the flash animation
        // btnRefs.forEach(btnRef => {
        //     if (btnRef.current.id === randomChosenColor) {
        //         btnRef.current.classList.remove("show");
        //         setTimeout(() => {
        //             btnRef.current.classList.add("show");
        //         }, 100);

        //         clearTimeout();
        //     }
        // });

        // Linked with the play audio function for the random color
       // playSound(randomChosenColor);
    }

    /**
     * Check if the given answer is correct, otherwise handles gameover
     * @param {number} currentLevel 
     */
    const checkAnswer = (currentLevel) => {
        // If the last push in the 'gamePattern' and in the 'userClickedPattern' are the same, will continue
        if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
            console.log("Success!");

            // If both length are correct, will continue the game with a new random color
            if (gamePattern.length === userClickedPattern.length) {
                setTimeout(() => {
                    nextSequence();
                }, 1000);

                clearTimeout();
            }
        } else {
            console.log("Wrong!");

            // Play the "wrong" audio
           // const audio = new Audio("./src/assets/sounds/wrong.mp3");
           // audio.play();

            // Set gameover state
            handleOver(true);

            // Adds to the body a red background for 200ms
            //const body = document.body;
            //body.classList.add("game-over");
            setTimeout(() => {
                //body.classList.remove("game-over");
            }, 200);

            clearTimeout();

            // Call restart function
            resetPattern();
        }
    }

    return (
        <>
            <View style={styles.row}>
                <ColoredButton ref={green} color="green" onPress={handleBtn} />
                <ColoredButton ref={red} color="red" onPress={handleBtn} />
            </View>
            <View style={styles.row}>
                <ColoredButton ref={yellow} color="yellow" onPress={handleBtn} />
                <ColoredButton ref={blue} color="blue" onPress={handleBtn} />
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