import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import renderer from "react-test-renderer";
import ColoredButton from "./ColoredButton";

describe('ColoredButton', () => {
    it('red renders correctly', () => {
        const red = renderer.create(<ColoredButton id="red" color="red" onPress={() => { }} />);
        expect(red).toBeTruthy();
    });
    it('blue renders correctly', () => {
        const blue = renderer.create(<ColoredButton id="blue" color="blue" onPress={() => { }} />);
        expect(blue).toBeTruthy();
    });
    it('green renders correctly', () => {
        const green = renderer.create(<ColoredButton id="green" color="green" onPress={() => { }} />);
        expect(green).toBeTruthy();
    });
    it('yellow renders correctly', () => {
        const yellow = renderer.create(<ColoredButton id="yellow" color="yellow" onPress={() => { }} />);
        expect(yellow).toBeTruthy();
    });
    it('red calls the provided onPress callback when pressed', () => {
        const onPress = jest.fn();
        const { getByTestId } = render(<ColoredButton id="red" color="red" onPress={onPress} />);
        fireEvent.press(getByTestId('red'));
        expect(onPress).toHaveBeenCalledWith('red');
    });
    it('blue calls the provided onPress callback when pressed', () => {
        const onPress = jest.fn();
        const { getByTestId } = render(<ColoredButton id="blue" color="blue" onPress={onPress} />);
        fireEvent.press(getByTestId('blue'));
        expect(onPress).toHaveBeenCalledWith('blue');
    });
    it('green calls the provided onPress callback when pressed', () => {
        const onPress = jest.fn();
        const { getByTestId } = render(<ColoredButton id="green" color="green" onPress={onPress} />);
        fireEvent.press(getByTestId('green'));
        expect(onPress).toHaveBeenCalledWith('green');
    });
    it('yellow calls the provided onPress callback when pressed', () => {
        const onPress = jest.fn();
        const { getByTestId } = render(<ColoredButton id="yellow" color="yellow" onPress={onPress} />);
        fireEvent.press(getByTestId('yellow'));
        expect(onPress).toHaveBeenCalledWith('yellow');
    });
});