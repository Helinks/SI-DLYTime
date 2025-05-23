import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Index from '../index';

describe("<Index />", () => {
    // Ejemplo 1
    test("Se renderiza mensaje de error", () => {
        render(<MiComponente />);

        const Error = screen.getByRole('alert');
        expect(Error).toBeVisible();
    })

    // Ejemplo 2
    test('renderiza el mensaje correcto', () => {
        render(<MiComponente />);

        const mensajeElement = screen.getByText('¡Hola, mundo!');
        expect(mensajeElement).toBeInTheDocument();
    });

    // Ejemplo 3
    test('llama a la función onClick cuando se hace clic', () => {
        const handleClick = jest.fn();
        render(<MiComponente />);
        const botonElement = screen.getByRole('button', { name: 'Haz clic aquí' });
        fireEvent.click(botonElement);
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    // Ejemplo 4
    test('actualiza el valor cuando se escribe en el input', () => {
        const handleChange = jest.fn();
        render(<MiComponente />);
        const inputElement = screen.getByRole('textbox');
        fireEvent.change(inputElement, { target: { value: 'Texto de prueba' } });
        expect(handleChange).toHaveBeenCalledTimes(1);
        expect(handleChange).toHaveBeenCalledWith(expect.objectContaining({ target: { value: 'Texto de prueba' } }));
        expect(inputElement).toHaveValue('Texto de prueba');
    });

    // Ejemplo 5
    test('encuentra elementos por su rol y texto accesible', () => {
        render(<MiComponente />);
        const encabezado = screen.getByRole('heading', { level: 1, name: 'Título Principal' });
        const imagen = screen.getByRole('img', { alt: 'Imagen descriptiva' });
        const link = screen.getByRole('link', { name: 'Enlace importante' });
        expect(encabezado).toBeInTheDocument();
        expect(imagen).toBeInTheDocument();
        expect(link).toBeInTheDocument();
    });
    
    // Ejemplo 6
    test('no renderiza el mensaje oculto', () => {
        render(<MiComponente />);
        const mensajeElement = screen.queryByText('Este mensaje debería estar oculto');
        expect(mensajeElement).toBeNull();
    });

    // Ejemplo 7
    test('renderiza tres elementos de la lista', () => {
        const items = ['Elemento 1', 'Elemento 2', 'Elemento 3'];
        render(<MiComponente items={items}/>);
        const listaItems = screen.getAllByRole('listitem');
        expect(listaItems).toHaveLength(3);
        expect(listaItems[0]).toHaveTextContent('Elemento 1');
        expect(listaItems[1]).toHaveTextContent('Elemento 2');
        expect(listaItems[2]).toHaveTextContent('Elemento 3');
    });

    // Ejemplo 8
    test('llama a la función onSubmit cuando se envía el formulario', () => {
        const handleSubmit = jest.fn();
        render(<MiComponente />);
        const botonEnviar = screen.getByRole('button', { name: 'Enviar' });
        fireEvent.click(botonEnviar); // Simula un clic en el botón de envío
        expect(handleSubmit).toHaveBeenCalledTimes(1);
    });

    // Ejemplo 9
    test('aplica la clase correcta al elemento', () => {
        render(<MiComponente />);
        const elemento = screen.getByTestId('mi-elemento');
        expect(elemento).toHaveClass('estilo-principal');
    });

    // Ejemplo 10
    test('llama a las funciones onFocus y onBlur correctamente', () => {
        const handleFocus = jest.fn();
        const handleBlur = jest.fn();
        render(<MiComponente />);
        const inputElement = screen.getByRole('textbox');
        fireEvent.focus(inputElement);
        expect(handleFocus).toHaveBeenCalledTimes(1);
        fireEvent.blur(inputElement);
        expect(handleBlur).toHaveBeenCalledTimes(1);
    });

    



    test("Se renderiza el baner del index", () => {
        render(<Index />);
        const title = screen.getByText(/TusLentesShop/i);

        expect(title).toBeInTheDocument();
    });

    test("Se renderizan el titulo de los horarios", () => {
        render(<Index />);
        const scheduleTitle = screen.getByText(/Horarios de Atención/i);

        expect(scheduleTitle).toBeInTheDocument();
    });
    test("Se renderiza el modal cuando se hace click en el boton soporte", () => {
        render(<Index />);
        const supportButton = screen.getByRole('button', { name: /Soporte/i });
        fireEvent.click(supportButton);
        const modalTitle = screen.getByText(/Soporte Modal/i);
        expect(modalTitle).toBeInTheDocument();
    });

    test("Se muestra un mensaje de error cuando se ingresa un correo invalido", () => {
        render(<Index />);
        const supportButton = screen.getByRole('button', { name: /Soporte/i });
        fireEvent.click(supportButton);
        const emailInput = screen.getByLabelText(/Digita un correo al que te podamos contactar:/i);
        const submitButton = screen.getByText(/Enviar/i);
        fireEvent.change(emailInput, { target: { value: 'holaquetal' } });
        fireEvent.click(submitButton);
        const errorMessage = screen.getByText(/Por favor ingresa un correo valido/i);
        expect(errorMessage).toBeInTheDocument();
    });

    test("Se muestra un mensaje de error cuando el campo de correo esta vacío", () => {
        render(<Index />);
        const supportButton = screen.getByRole('button', { name: /Soporte/i });
        fireEvent.click(supportButton);
        const emailInput = screen.getByLabelText(/Digita un correo al que te podamos contactar:/i);
        const submitButton = screen.getByText(/Enviar/i);
        fireEvent.change(emailInput, { target: { value: '' } });
        fireEvent.click(submitButton);
        const errorMessage = screen.getByText(/Por favor ingresa tu correo/i);
        expect(errorMessage).toBeInTheDocument();
    });
    test("Se muestra un mensaje de error cuando todos los campos del modal soporte estan vacíos", () => {
        render(<Index />);
        const supportButton = screen.getByRole('button', { name: /Soporte/i });
        fireEvent.click(supportButton);
        const emailInput = screen.getByLabelText(/Digita un correo al que te podamos contactar:/i);
        const problemInput = screen.getByLabelText(/Tipo de problema:/i);
        const messageInput = screen.getByLabelText(/Mensaje:/i);
        const submitButton = screen.getByText(/Enviar/i);

        fireEvent.change(emailInput, { target: { value: 'ejemplo@gmail.com' } });
        fireEvent.change(problemInput, { target: { value: '' } });
        fireEvent.change(messageInput, { target: { value: '' } });

        fireEvent.click(submitButton);
        const errorMessage = screen.getByText(/Por favor llena todos los campos/i);
        expect(errorMessage).toBeInTheDocument();
    });
    test("Se limpia el mensaje de error al cerrar el modal", () => {
        render(<Index />);
        const supportButton = screen.getByRole('button', { name: /Soporte/i });
        fireEvent.click(supportButton);
        const closeButton = screen.getByText(/Cerrar/i);
        fireEvent.click(closeButton);
        const errorMessage = screen.queryByText(/Por favor ingresa tu correo/i);
        expect(errorMessage).not.toBeInTheDocument();
    });

    test("Se muestra un mensaje de éxito al enviar el formulario correctamente", () => {
        jest.spyOn(global, 'alert').mockImplementation(() => { });
        render(<Index />);
        const supportButton = screen.getByRole('button', { name: /Soporte/i });
        fireEvent.click(supportButton);

        const emailInput = screen.getByLabelText(/Digita un correo al que te podamos contactar:/i);
        const problemInput = screen.getByLabelText(/Tipo de problema:/i);
        const messageInput = screen.getByLabelText(/Mensaje:/i);
        const submitButton = screen.getByText(/Enviar/i);

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(problemInput, { target: { value: 'Problema al iniciar sesión' } });
        fireEvent.change(messageInput, { target: { value: 'Testing' } });

        fireEvent.click(submitButton);

        expect(global.alert).not.toHaveBeenCalledWith("Hubo un error al enviar el mensaje.");
        global.alert.mockRestore();
    });
    test("Se renderizan los botones de ayuda correctamente", () => {
        render(<Index />);
        // 3 botones de ayuda + 1 botón de soporte
        expect(screen.getByText(/Asesoria Personalizada/i)).toBeInTheDocument();
        expect(screen.getByText(/Jornadas de Salud Visual/i)).toBeInTheDocument();
        expect(screen.getByText(/Lentes y Monturas/i)).toBeInTheDocument();
    });
    test("Se renderiza correctamente el mapa de ubicación", () => {
        render(<Index />);
        const mapIframe = screen.getByTitle(/mapa/i);
        expect(mapIframe).toBeInTheDocument();
        expect(mapIframe).toHaveAttribute('src', expect.stringContaining('https://www.google.com/maps'));
    });
    test("Se renderizan los iconos de redes sociales", () => {
        render(<Index />);
        const instagramLink = screen.getByLabelText(/Instagram/i);
        const facebookLink = screen.getByLabelText(/Facebook/i);

        expect(instagramLink).toBeInTheDocument();
        expect(instagramLink).toHaveAttribute('href', 'https://www.instagram.com/tuslentesshop/');
        expect(facebookLink).toBeInTheDocument();
        expect(facebookLink).toHaveAttribute('href', 'https://www.facebook.com/tuslentesshop');
    });
});









