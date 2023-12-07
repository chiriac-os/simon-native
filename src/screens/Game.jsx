import { View, StyleSheet } from "react-native";
import { useCallback, useMemo, useState } from "react";
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
    const resetLevel = () => {
        setLevel(0);
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
     * Starts the game
     */
    const startGame = () => {
        if (!started) {
            callNextSequence();
            handleStart(true);
        }
        if (over) handleOver(false);
    }

    /**
     * Start over function restarts the values
     */
    const endGame = () => {
        handleOver(false);
        resetLevel();
    }

    const callNextSequence = () => {
        // Increase level
        nextLevel();

        return Math.floor(Math.random() * 4);
    }

    return (
        <>
            <View style={styles.header}>
                <Header gameStatus={gameStatus} level={getLevel} />
            </View>
            <View style={styles.board}>
                <Board
                    started={getStarted}
                    callNextSequence={callNextSequence}
                    handleOver={handleOver}
                    startOver={endGame} />
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