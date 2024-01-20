import { ActivityIndicator, View, Text, StyleSheet } from "react-native";

/**
 * Renders the loading screen
 * @returns {JSX.Element}
 */
function Loading() {
    return (
        <View style={styles.view}>
            <View style={styles.activityIndicator__view}>
                <ActivityIndicator size="large" color="#fff" />
            </View>
            <Text style={styles.text}>Loading...</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        backgroundColor: "#011F3F",
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        color: "#fff",
        fontSize: 30,
        fontFamily: "system-ui",
    },
    activityIndicator__view: {
        padding: 20,
    }
});

export default Loading;