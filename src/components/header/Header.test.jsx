import React from "react";
import Header from "./Header";
import { render } from "@testing-library/react-native";

describe('Header', () => {
    it('render properly', () => {
        const { getByTestId } = render(<Header gameStatus="pending" level={0} />);
        expect(getByTestId('title')).toBeTruthy();
        expect(getByTestId('subtitle')).toBeTruthy();        
    });
    it('pending status titles', () => {
        const { getByTestId } = render(<Header gameStatus="pending" level={0} />);
        expect(getByTestId('title')).toHaveTextContent('Simon Game');
        expect(getByTestId('subtitle')).toHaveTextContent('Press Start to play');
    });
    it('started game status titles', () => {
        const { getByTestId } = render(<Header gameStatus="started" level={4} />);
        expect(getByTestId('title')).toHaveTextContent('Level 4');
        expect(getByTestId('subtitle')).toHaveTextContent('');
    });
    it('over game status titles', () => {
        const { getByTestId } = render(<Header gameStatus="over" level={4} />);
        expect(getByTestId('title')).toHaveTextContent('Game Over');
        expect(getByTestId('subtitle')).toHaveTextContent('Press Start to play again');
    });
});