import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Board from './Board';

describe('Board', () => {
    it('renders correctly', () => {
        const { getByTestId } = render(
            <Board
                started={true}
                level={1}
                checkAnswer={() => {}}
                handleUserClickedPattern={() => {}}
                nextSequenceColor={() => {}}
                playSound={() => {}}
            />
        );
        expect(getByTestId('green')).toBeTruthy();
        expect(getByTestId('red')).toBeTruthy();
        expect(getByTestId('yellow')).toBeTruthy();
        expect(getByTestId('blue')).toBeTruthy();
    });

    it('calls the provided callbacks when a button is pressed', () => {
        const handleUserClickedPattern = jest.fn();
        const playSound = jest.fn();
        const checkAnswer = jest.fn();

        const { getByTestId } = render(
            <Board
                started={true}
                level={1}
                checkAnswer={checkAnswer}
                handleUserClickedPattern={handleUserClickedPattern}
                nextSequenceColor={() => {}}
                playSound={playSound}
            />
        );

        fireEvent.press(getByTestId('green'));
        expect(handleUserClickedPattern).toHaveBeenCalledWith('green');
        expect(playSound).toHaveBeenCalledWith('green');
        expect(checkAnswer).toHaveBeenCalled();
    });
});