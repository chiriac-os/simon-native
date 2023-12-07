import { Pressable, Text, StyleSheet } from "react-native";

function StartButton({ title, callback }) {
    return (
        <Pressable style={styles.button} onPress={callback}>
            <Text style={styles.text}>{title}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#FEF2BF",
        margin: 25,
        height: 100,
        width: 275,
        paddingHorizontal: 25,
        paddingVertical: 0,
        borderWidth: 10,
        borderColor: "#000",
        borderRadius: 15
    },
    text: {
        fontSize: 56,
        fontWeight: "bold",
        textAlign: "center",
        //font-family: 'Press Start 2P', cursive;
    }
});

export default StartButton;