import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import useFonts from './hooks/useFonts';
import Game from './src/screens/Game';
import Loading from './src/screens/Loading';
import { GameProvider } from './context/GameContextProvider';

function App() {
    /**
     * Hooks
     */
    const [loading, setLoading] = useState(true);

    /**
     * Fetches the fonts
     */
    useFonts(() => {
        const timeout = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timeout);
    }, []);

    if (loading) {
        return <Loading />;
    }

    return (
        <GameProvider>
            <Game />
        </GameProvider>
    );
}

export default App;