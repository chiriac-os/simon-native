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
        borderWidth: 10,
        borderColor: "#000",
        borderRadius: 20,
        margin: 25,
    },
    button: {
        backgroundColor: color,
        height: 200,
        width: 200,
        borderRadius: 20,
    },
});

export default ColoredButton;