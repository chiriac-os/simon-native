import { StyleSheet, TouchableOpacity, View } from "react-native";

function ColoredButton({ color, ref, onPress }) {
    return (
        <View style={styles().view}>
            <TouchableOpacity ref={ref} style={styles(color).button} onPress={onPress} />
        </View>
    );
}

const styles = (color) => StyleSheet.create({
    view: {

    },
    button: {
        backgroundColor: color,
        margin: 25,
        height: 200,
        width: 200,
        border: "10px solid black",
        borderRadius: 20,
    },
});

export default ColoredButton;