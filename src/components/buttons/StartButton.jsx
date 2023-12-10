import { Pressable, Text, StyleSheet, TouchableHighlight } from "react-native";

/**
 * Render a start button
 * @param {string} title
 * @param {function} callback 
 * @returns 
 */
function StartButton({ title, callback, disabled }) {
    return (
        <TouchableHighlight disabled={disabled} onPress={callback} style={[styles.button, disabled ? styles.disabled : styles.enabled]} underlayColor="#F7ECB5" >
            <Text style={styles.text}>{title}</Text>
        </TouchableHighlight>
    );
}

const styles = StyleSheet.create({
    button: {
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
    enabled: {
        backgroundColor: "#FEF2BF",
    }, disabled: {
        backgroundColor: "#C4C4C4",
    },
    text: {
        fontFamily: "simon",
        fontSize: 28,
        fontWeight: "bold",
    }
});

export default StartButton;