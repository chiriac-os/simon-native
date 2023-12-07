import { View, StyleSheet } from "react-native";
import { useCallback, useMemo, useRef, useState } from "react";
import Board from "../components/game/Board";
import StartButton from "../components/buttons/StartButton";
import Header from "../components/header/Header";

/**
 * Render the game screen and its logic
 * @returns {JSX.Element}
 */
function Game() {
    /**
      * Hooks
      */
    const [show, setShow] = useState(true);
    const [started, setStarted] = useState(false);
    const [over, setOver] = useState(false);
    const [level, setLevel] = useState(0);
    const gamePattern = useRef([]);
    const userClickedPattern = useRef([]);

    /**
     * Game variables
     */
    const buttonColors = ['red', 'blue', 'green', 'yellow'];

    /**
     * Memoize game status
     */
    const gameStatus = useMemo(() => {
        if (show && !started && !over) {
            return "show";
        } else if (started && !over) {
            return "started";
        } else if (!started && over) {
            return "over";
        }
    }, [show, started, over]);

    /**
     * Memoize started state
     */
    const getStarted = useMemo(() => started, [started]);

    /**
     * Level getter
     * @returns {number}
     */
    const getLevel = useMemo(() => {
        return level;
    }, [level]);

    /**
     * Increments the level
     */
    const nextLevel = () => {
        setLevel((prev) => prev + 1);
    }

    /**
     * Sets the level to 0
     */
    const resetGame = () => {
        setLevel(0);
        gamePattern.current = [];
    }

    /**
     * Resets the user clicked pattern
     */ 
    const resetPattern = () => {
        userClickedPattern.current = [];
    }

    /**
     * Handles show state
     */
    const handleShow = useCallback((prop) => {
        setShow((prevShow) => prevShow = prop);
    }, [show]);

    /**
     * Handles start state
     */
    const handleStart = useCallback((prop) => {
        setStarted((prevStarted) => prevStarted = prop);
    }, [started]);

    /**
     * Handles over state
     */
    const handleOver = useCallback((prop) => {
        setOver((prevOver) => prevOver = prop);
    }, [over]);

    /**
     * Handles user click pattern
     */
    const handleUserClickedPattern = (prop) => {
        userClickedPattern.current.push(prop);
    };

    /**
     * Starts the game
     */
    const startGame = () => {
        if (!over) {
            console.log("Game started!");
            nextSequence();
            handleStart(true);
        } else {
            handleOver(false);
            startGame();
        }
    }

    /**
     * Start over function restarts the values
     */
    const endGame = () => {
        handleOver(false);
        handleStart(false);
        resetGame();
    }

    const nextSequence = () => {
        // Increase the level
        nextLevel();

        // Generate a random color
        const randomNumber = Math.floor(Math.random() * 4);
        const randomChosenColor = buttonColors[randomNumber];

        // Push the random color in the game pattern
        gamePattern.current.push(randomChosenColor);
        console.log("Chosen color in game.jsx: ", randomChosenColor);

        // Return the random color for the board child component
        return randomChosenColor;
    }

    /**
     * Check if the given answer is correct, otherwise handles gameover
     * @param {number} currentLevel 
     */
    const checkAnswer = () => {
        console.log("I was called from a child");
        console.log("gamePattern: ", gamePattern.current);
        console.log("userClickedPattern: ", userClickedPattern.current);
        // If the last push in the 'gamePattern' and in the 'userClickedPattern' are the same, will continue
        console.log("itera", userClickedPattern.current.length, getLevel)
        if (userClickedPattern.current[userClickedPattern.current.length - 1] === gamePattern.current[userClickedPattern.current.length - 1]) {
            console.log("success");
            // If the user got the last color right, will continue
            if (userClickedPattern.current.length === getLevel) {
                console.log("Success!");
                setTimeout(() => {
                    nextSequence();
                    resetPattern();
                }, 1000);

                clearTimeout();
            }
        } else {
            console.log("wrong");
            handleOver(true);
            resetGame();
            resetPattern();
        }
    }

    return (
        <>
            <View style={styles.header}>
                <Header gameStatus={gameStatus} level={getLevel} />
            </View>
            <View style={styles.board}>
                <Board
                    started={getStarted}
                    handleUserClickedPattern={handleUserClickedPattern}
                    checkAnswer={checkAnswer}
                />
            </View>
            <View style={styles.start}>
                {!started && <StartButton title="Start" callback={startGame} />}
                {over && <StartButton title="Restart" callback={endGame} />}
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    header: {
        paddingVertical: 50,
    },
    board: {
        marginBottom: 50,
    },
    start: {
        position: "absolute",
        bottom: 0,
    }
});

export default Game;