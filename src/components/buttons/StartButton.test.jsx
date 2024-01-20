import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import StartButton from './StartButton';

describe('StartButton', () => {
    it('renders correctly', () => {
        const { getByText } = render(<StartButton title="Start" callback={() => { }} />);
        expect(getByText('Start')).toBeTruthy();
    });

    it('calls the provided callback when pressed', () => {
        const callback = jest.fn();
        const { getByText } = render(<StartButton title="Start" callback={callback} />);
        fireEvent.press(getByText('Start'));
        expect(callback).toHaveBeenCalled();
    });

    it('does not call the provided callback when disabled', () => {
        const callback = jest.fn();
        const { getByText } = render(<StartButton title="Start" callback={callback} disabled />);
        fireEvent.press(getByText('Start'));
        expect(callback).not.toHaveBeenCalled();
    });
});