import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
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
    <View style={styles.container}>
      <Game />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#011F3F',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;