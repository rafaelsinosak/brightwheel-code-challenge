import { render, screen } from '@testing-library/react'
import Header from '../Header'

describe('Header', () => {

    test('should render Footer component and check text',() => {
        render(<Header />);
        const headerElement = screen.getByTestId('header');
        expect(headerElement).toBeInTheDocument();
        expect(headerElement).toHaveTextContent('Brightwheel');
    });

});