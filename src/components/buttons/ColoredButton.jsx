import React, { useImperativeHandle, useRef } from "react";
import { StyleSheet, TouchableOpacity, View, Animated, Pressable } from "react-native";
import { AnimationContext } from "../../../context/AnimationContext";

/**
 * Render a colored button
 * @param {{string, function}} props
 * @param {React.Ref} ref
 * @returns {React.ForwardRefExoticComponent<React.RefAttributes<React.JSX.Element>>}
 */
const ColoredButton = React.forwardRef((props, ref) => {
    /**
     * Props
     * @param {string} id button id equals to the color
     * @param {string} color button color for the style
     * @param {function} onPress function to call when the button is pressed
     */
    const { id, color, onPress } = props;

    /**
     * Hooks
     */
    const opacity = useRef(new Animated.Value(1)).current;

    /**
     * Animates the button by changing its opacity for 0.15 seconds
     */
    const animate = () => {
        Animated.sequence([
            Animated.timing(opacity, {
                toValue: 0.2,
                duration: 150,
                useNativeDriver: true,
            }),
            Animated.timing(opacity, {
                toValue: 1,
                duration: 150,
                useNativeDriver: true,
            }),
        ]).start();
    }

    /**
     * Expose animate function to parent component
     * @param {React.Ref} ref 
     * @returns {{animate: function, id: string}}
     */
    useImperativeHandle(ref, () => ({
        animate,
        id
    }));

    return (
        <AnimationContext.Provider value={{ animate }}>
            <View style={styles().view}>
                <Animated.View style={{ opacity }}>
                    <TouchableOpacity id={id} ref={ref} style={styles(color).button} onPress={() => onPress(id)} testID={id} />
                </Animated.View>
            </View>
        </AnimationContext.Provider>
    );
});

const styles = (color) => StyleSheet.create({
    view: {
        borderWidth: 10,
        borderColor: "#000",
        borderRadius: 20,
        margin: 5,
    },
    button: {
        backgroundColor: color,
        height: 150,
        width: 150,
        borderRadius: 10,
    },
});

export default ColoredButton;