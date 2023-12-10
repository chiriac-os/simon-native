import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import useFonts from './hooks/useFonts';
import Game from './src/screens/Game';
import Loading from './src/screens/Loading';

function App() {
    /**
     * Hooks
     */
    const [loading, setLoading] = useState(true);

    /**
     * Fetches the fonts
     */
    const fetchFonts = async () => {
        await useFonts().then(() => setLoading(false));
    };

    if (loading) {
        fetchFonts();
        return (
            <Loading />
        );
    }

    return (
        <>
            <Game />
            <StatusBar style="auto" />
        </>
    );
}

export default App;