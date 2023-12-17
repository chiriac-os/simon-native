import React, { useContext, useReducer } from "react";

/**
 * Game contexts
 */
const GameContext = React.createContext(null);
const GameDispatchContext = React.createContext(null);

/**
 * Game Provider is a functional component that wraps the entire game application with its contexts and state reducer
 * @param { React.ReactNode } children 
 * @returns { React.JSX.Element }
 */
function GameProvider({ children }) {
    /**
     * State
     */
    const [state, dispatch] = useReducer(gameReducer, initialState);

    return (
        <GameContext.Provider value={state}>
            <GameDispatchContext.Provider value={dispatch}>
                {children}
            </GameDispatchContext.Provider>
        </GameContext.Provider>
    );
}

/**
 * Game hook to access the game state
 * @returns { { status: string, level: number } }
 */
function useGame() {
    const context = useContext(GameContext);
    if (context === undefined) {
        throw new Error("useGame must be used within a GameProvider");
    }
    return context;
}

/**
 * Game dispatch hook to access the game state reducer
 * @returns { React.Dispatch<{ type: string }> }
 */
function useGameDispatch() {
    const context = useContext(GameDispatchContext);
    if (context === undefined) {
        throw new Error("useGameDispatch must be used within a GameProvider");
    }
    return context;
}

/**
 * Game state reducer with actions to update the game state
 * Following actions are supported:
 * - SET_GAME_STARTED - sets the game status to started
 * - SET_GAME_OVER - sets the game status to over
 * - SET_NEXT_LEVEL - increments the game level by 1
 * - RESET_GAME - resets the game level to 0
 * 
 * @param { { status: string, level: number } } state 
 * @param { { type: string } } action 
 * @returns 
 */
function gameReducer(state, action) {
    switch (action.type) {
        case "SET_GAME_STARTED":
            return { ...state, status: "started" };
        case "SET_GAME_OVER":
            return { ...state, status: "over" };
        case "SET_NEXT_LEVEL":
            return { ...state, level: state.level + 1 };
        case "RESET_GAME":
            return { ...state, level: 0 };
        default:
            throw new Error(`Unknown action: ${action.type}`);
    }
}

/**
 * Initial game state sets the game status to pending and level to 0
 */
const initialState = {
    status: "pending",
    level: 0
};

export { GameProvider, useGame, useGameDispatch };