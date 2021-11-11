import { render, screen } from '@testing-library/react'
import Footer from '../Footer'

describe('Footer', () => {

    test('should render Footer component and check text',() => {
        render(<Footer />);
        const footerElement = screen.getByTestId('footer');
        expect(footerElement).toBeInTheDocument();
        expect(footerElement).toHaveTextContent('Brightwheel');
    });

});