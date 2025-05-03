import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import Index from './Views/Home/index';

describe ("<Index />", () => {
    test("Se renderiza el componente index", () =>{
        render(<Index />);
        const title = screen.getByText(/TusLentesShop/i);

        expect(title).toBeInTheDocument();
    });
});