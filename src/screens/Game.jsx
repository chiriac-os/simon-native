import { View, StyleSheet } from "react-native";
import { useCallback, useState } from "react";
import Board from "../components/game/Board";
import StartButton from "../components/buttons/StartButton";

function Game() {
    /**
      * Hooks
      */
    const [game, setGame] = useState({
        show: true,
        started: false,
        over: false,
    });

    const handleShow = useCallback((prop) => {
        setGame((prevGame) => ({
            ...prevGame,
            show: prop,
        }))
    }, [game.show]);

    const handleStart = useCallback((prop) => {
        setGame((prevGame) => ({
            ...prevGame,
            started: prop,
        }))
    }, [game.started]);

    const handleOver = useCallback((prop) => {
        setGame((prevGame) => ({
            ...prevGame,
            over: prop,
        }))
    }, [game.over]);

    const startGame = useCallback(() => {
        handleStart(true);
        handleOver(false);
    });

    const endGame = useCallback(() => {
        handleStart(false);
        handleOver(true);
    });

    return (
        <>
            <View style={styles.header}>

            </View>
            <View style={styles.board}>
                <Board />
            </View>
            <View style={styles.start}>
                {(!game.started || game.over) ? (
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