import { render, screen, cleanup } from '@testing-library/react'
import Main from '../Main'

describe('Main', () => {

    test('should render Main component',() => {
        render(<Main />);
        const mainElement = screen.getByTestId('main');
        expect(mainElement).toBeInTheDocument();
    });

});