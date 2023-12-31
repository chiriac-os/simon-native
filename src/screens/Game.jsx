import { View, StyleSheet, Animated } from "react-native";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Audio } from "expo-av";
import Board from "../components/game/Board";
import StartButton from "../components/buttons/StartButton";
import Header from "../components/header/Header";
import { useGame, useGameDispatch } from "../../context/GameContextProvider";


/**
 * Render the game screen and its logic
 * @returns {JSX.Element}
 */
function Game() {
    /**
      * Game Hooks
      */
    const { status, level } = useGame();
    const dispatch = useGameDispatch();
    const gamePattern = useRef([]);
    const userClickedPattern = useRef([]);

    /**
     * Game variables
     */
    const buttonColors = ['red', 'blue', 'green', 'yellow'];
    const soundFiles = {
        wrong: require('../../assets/sounds/wrong.mp3'),
        red: require('../../assets/sounds/red.mp3'),
        blue: require('../../assets/sounds/blue.mp3'),
        green: require('../../assets/sounds/green.mp3'),
        yellow: require('../../assets/sounds/yellow.mp3'),
    }

    /**
     * Memoize game status
     */
    const gameStatus = useMemo(() => status, [status]);
    const isGameStarted = useMemo(() => status === "started", [status]);
    const isGameOver = useMemo(() => status === "over", [status]);

    /**
     * Level getter
     * @returns {number}
     */
    const getLevel = useMemo(() => level, [level]);

    /**
     * Increments the level
     */
    const nextLevel = () => {
        dispatch({ type: "SET_NEXT_LEVEL" });
    }

    /**
     * Sets the level to 0
     */
    const resetGame = () => {
        dispatch({ type: "RESET_GAME" });
        gamePattern.current = [];
    }

    /**
     * Resets the user clicked pattern
     */
    const resetPattern = () => {
        userClickedPattern.current = [];
    }

    // /**
    //  * Handles start state
    //  */
    const handleGameStart = useCallback(() => {
        dispatch({ type: "SET_GAME_STARTED" });
    }, [status]);

    /**
     * Handles over state
     */
    const handleGameOver = useCallback(() => {
        dispatch({ type: "SET_GAME_OVER" });
    }, [status]);

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
        handleGameStart();
        nextSequence();
    }

    /**
     * Handles game over
     * Sets the game over state and resets the game and the pattern
     */
    const endGame = () => {
        handleGameOver();
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
            console.log("Wrong!!");
            endGame();
        }
    }


    /**
     * Animations and game effects hooks
     */
    const gameOverAnimation = useRef(new Animated.Value(0)).current;
    const sound = useRef();

    /**
     * Handles game over animation to change the background color to red when user loses
     */
    const handleGameOverAnimation = useCallback(() => {
        Animated.sequence([
            Animated.timing(gameOverAnimation, {
                toValue: 1,
                duration: 200,
                useNativeDriver: false,
            }),
            Animated.timing(gameOverAnimation, {
                toValue: 0,
                duration: 200,
                useNativeDriver: false,
            })
        ]).start();
    }, [status]);

    /**
     * Interpolates the background color for the game over animation
     */
    const handleBackgroundColor = gameOverAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: ['#011F3F', 'red']
    });

    /**
     * Handles game over animation when the game is over
     */
    useLayoutEffect(() => {
        if (isGameOver) {
            handleGameOverAnimation();
            playSound("wrong");
        }
    }, [status]);

    /**
     * Plays a sound depending on the given file namae
     * @param {string} file 
     * @returns {Promise<void>}
     */
    const playSound = async (file) => {
        if (!file) return;
        try {
            const { sound } = await Audio.Sound.createAsync(soundFiles[file]);
            sound.current = sound;

            await sound.playAsync();
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Clean up sound when the component unmounts or when the sound changes
     */
    useEffect(() => {
        return sound.current
            ? () => {
                console.log('Unloading Sound');
                sound.unloadAsync();
            }
            : undefined;
    }, [sound.current]);

    return (
        <>
            <Animated.View style={[styles.container, { backgroundColor: handleBackgroundColor }]}>
                <View style={styles.header}>
                    <Header gameStatus={gameStatus} level={getLevel} />
                </View>
                <View style={styles.board}>
                    <Board
                        started={isGameStarted}
                        level={getLevel}
                        handleUserClickedPattern={handleUserClickedPattern}
                        nextSequenceColor={gamePattern.current[getLevel - 1]}
                        playSound={playSound}
                        checkAnswer={checkAnswer}
                    />
                </View>
                <View style={styles.start}>
                    {isGameStarted ?
                        <StartButton title="Start" callback={startGame} disabled={true} />
                        :
                        <StartButton title="Start" callback={startGame} disabled={false} />
                    }
                </View>
            </Animated.View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: '#011F3F',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        paddingVertical: 50,
    },
    board: {
        marginBottom: 50,
    },
});

export default Game;