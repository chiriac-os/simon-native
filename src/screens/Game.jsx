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
    const [level, setLevel] = useState(1);

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
        setLevel(1);
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
     * Starts the game and sets the game over on false
     */
    const startGame = useCallback(() => {
        handleStart(true);
        handleOver(false);
    });

    /**
     * Ends the game and sets the game over on true
     */
    const endGame = useCallback(() => {
        handleStart(false);
        handleOver(true);
    });

    return (
        <>
            <View style={styles.header}>
                <Header gameStatus={gameStatus} level={getLevel} />
            </View>
            <View style={styles.board}>
                <Board />
            </View>
            <View style={styles.start}>
                {(!started || over) ? (
                    <StartButton title="Start" callback={startGame} />
                ) : (
                    <StartButton title="Restart" callback={endGame} />
                )}
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    header: {
        paddingVertical: 50,
    },
    board: {
        marginBottom: 100,
    },
    start: {
        position: "absolute",
        bottom: 50,
    }
});

export default Game;