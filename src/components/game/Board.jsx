import { View, StyleSheet} from "react-native";
import ColoredButton from "../buttons/ColoredButton";

function Board() {
    return (
        <View style={styles.view}>
            <ColoredButton color="red" />
        </View>
    )
}

const styles = StyleSheet.create({
    view: {

    },
});

export default Board;