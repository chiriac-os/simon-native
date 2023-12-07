import React, { useEffect } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

/**
 * @param {{string, function}} props
 * @param {React.Ref} ref
 * @returns {React.ForwardRefExoticComponent<React.RefAttributes<React.JSX.Element>>}
 */
const ColoredButton = React.forwardRef((props, ref) => {
    const { color, onPress } = props;
    
    return (
        <View style={styles().view}>
            <TouchableOpacity ref={ref} style={styles(color).button} onPress={onPress} />
        </View>
    );
});

const styles = (color) => StyleSheet.create({
    view: {
        borderWidth: 10,
        borderColor: "#000",
        borderRadius: 20,
        margin: 10,
    },
    button: {
        backgroundColor: color,
        height: 150,
        width: 150,
        borderRadius: 10,
    },
});

export default ColoredButton;