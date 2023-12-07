import { Pressable, Text, StyleSheet, TouchableHighlight } from "react-native";

/**
 * Render a start button
 * @param {string} title
 * @param {function} callback 
 * @returns 
 */
function StartButton({ title, callback }) {
    return (
        <TouchableHighlight style={styles.button} underlayColor="#F7ECB5" onPress={callback}>
            <Text style={styles.text}>{title}</Text>
        </TouchableHighlight>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#FEF2BF",
        margin: 25,
        height: 100,
        width: 300,
        paddingHorizontal: 25,
        paddingVertical: 0,
        borderWidth: 10,
        borderColor: "#000",
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        fontFamily: "simon",
        fontSize: 28,
        fontWeight: "bold",
    }
});

export default StartButton;