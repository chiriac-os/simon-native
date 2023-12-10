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
        if (started && !over) {
            return "started";
        } else if (over) {
            return "over";
        }
    }, [started, over]);

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
        console.log("Game started!");
        over && handleOver(false);
        handleStart(true);
        nextSequence();
    }

    /**
     * Start over function restarts the values
     */
    const endGame = () => {
        handleOver(true);
        handleStart(false);
        resetGame();
        resetPattern();
    }

    /**
     * Generates a random color and pushes it in the game pattern
     * @returns {string} random color
     */ 
    const nextSequence = () => {
        // Increase the level
        nextLevel();

        // Generate a random color
        const randomNumber = Math.floor(Math.random() * 4);
        const randomChosenColor = buttonColors[randomNumber];

        // Push the random color in the game pattern
        gamePattern.current.push(randomChosenColor);

        // Return the random color for the board child component
        return randomChosenColor;
    }

    /**
     * Check if the given answer is correct, otherwise handles gameover
     */
    const checkAnswer = () => {
        // If the last push in the 'gamePattern' and in the 'userClickedPattern' are the same, will continue
        if (userClickedPattern.current[userClickedPattern.current.length - 1] === gamePattern.current[userClickedPattern.current.length - 1]) {
            // If the user got the last color right, will continue
            if (userClickedPattern.current.length === getLevel) {
                console.log("Success!");
                resetPattern();
                nextSequence();
            }
        } else {
            console.log("wrong");
            endGame();
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
                    level={getLevel}
                    handleUserClickedPattern={handleUserClickedPattern}
                    nextSequenceColor={gamePattern.current[getLevel - 1]}
                    checkAnswer={checkAnswer}
                />
            </View>
            <View style={styles.start}>
                {started ? 
                    <StartButton title="Start" callback={startGame} disabled={true} />
                :
                    <StartButton title="Start" callback={startGame} disabled={false} />
                }
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
});

export default Game;