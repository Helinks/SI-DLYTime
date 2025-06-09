import {render, screen, fireEvent,waitFor} from '@testing-library/react';
import CrudCita from '../complements/CrudCita';
import {server} from '../mocks/server';
import {http, HttpResponse} from 'msw'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Link: ({ to, children }) => <a href={to}>{children}</a>,
}));

describe('CrudCita - Agendamiento de Cita', () => {
  beforeEach(() => {
    // Resetea los handlers antes de cada test para asegurar un estado limpio
    server.resetHandlers();
  });

  test('permite agendar una nueva cita exitosamente con datos válidos', async () => {
    render(<CrudCita />);

    // 1. Abrir el modal de agendar cita
    const agendarCitaButton = screen.getByRole('button', { name: /agendar cita/i });
    fireEvent.click(agendarCitaButton);

    // Esperar a que el modal se haga visible (o sus elementos)
    await waitFor(() => {
      expect(screen.getByText(/agendar cita/i, { selector: 'h1' })).toBeInTheDocument();
    });

    // 2. Llenar los campos del formulario
    const fechaInput = screen.getByLabelText(/fecha:/i);
    fireEvent.change(fechaInput, { target: { value: '2025-12-25' } }); // Una fecha para la que tenemos horarios mockeados

    // Esperar a que los horarios se carguen y aparezcan
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /09:00:00/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /10:00:00/i })).toBeInTheDocument();
    });

    // Seleccionar una hora
    const horaButton = screen.getByRole('button', { name: /09:00:00/i });
    fireEvent.click(horaButton);

    const documentoClienteInput = screen.getByLabelText(/documento cliente:/i);
    fireEvent.change(documentoClienteInput, { target: { value: '123456789' } });

    // Buscar cliente (hacer clic en el botón de búsqueda)
    const buscarClienteButton = screen.getByRole('button', { name: /buscar cliente/i });
    fireEvent.click(buscarClienteButton);

    // Esperar a que la información del cliente aparezca
    await waitFor(() => {
      expect(screen.getByText(/cliente test/i)).toBeInTheDocument();
      expect(screen.getByText(/cliente@test.com/i)).toBeInTheDocument();
    });

    const documentoOftalmologoSelect = screen.getByLabelText(/documento oftalmologo:/i);
    fireEvent.change(documentoOftalmologoSelect, { target: { value: '987654321' } }); // Seleccionar Dr. Oftalmologo

    const tipoConsultaSelect = screen.getByLabelText(/tipo de consulta:/i);
    fireEvent.change(tipoConsultaSelect, { target: { value: '1' } }); // Seleccionar Consulta General

    // 3. Simular el envío del formulario
    const agendarModalButton = screen.getByRole('button', { name: /agendar/i });
    expect(agendarModalButton).toBeEnabled(); // Asegurarse de que el botón esté habilitado
    fireEvent.click(agendarModalButton);
    await waitFor(() => {

        expect(screen.getByText(/Cita agregada correctamente/i)).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  test('muestra un mensaje de error si el agendamiento falla', async () => {
    // Sobreescribe el handler de MSW para simular un error 500
    server.use(
      http.post('http://localhost:3001/crudCitas/addCita', () => {
        return HttpResponse.text('Error durante la transacción: Algo salió mal', { status: 500 });
      })
    );

    render(<CrudCita />);

    // 1. Abrir el modal
    const agendarCitaButton = screen.getByRole('button', { name: /agendar cita/i });
    fireEvent.click(agendarCitaButton);

    await waitFor(() => {
      expect(screen.getByText(/agendar cita/i, { selector: 'h1' })).toBeInTheDocument();
    });

    // 2. Llenar los campos (igual que el test de éxito para que el formulario se habilite)
    const fechaInput = screen.getByLabelText(/fecha:/i);
    fireEvent.change(fechaInput, { target: { value: '2025-12-25' } });

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /09:00:00/i })).toBeInTheDocument();
    });
    fireEvent.click(screen.getByRole('button', { name: /09:00:00/i }));

    const documentoClienteInput = screen.getByLabelText(/documento cliente:/i);
    fireEvent.change(documentoClienteInput, { target: { value: '123456789' } });
    fireEvent.click(screen.getByRole('button', { name: /buscar cliente/i }));
    await waitFor(() => {
      expect(screen.getByText(/cliente test/i)).toBeInTheDocument();
    });

    fireEvent.change(screen.getByLabelText(/documento oftalmologo:/i), { target: { value: '987654321' } });
    fireEvent.change(screen.getByLabelText(/tipo de consulta:/i), { target: { value: '1' } });

    // 3. Simular el envío
    const agendarModalButton = screen.getByRole('button', { name: /agendar/i });
    expect(agendarModalButton).toBeEnabled();
    fireEvent.click(agendarModalButton);

    // 4. Verificar el mensaje de error
    // En este caso, el error se muestra en setMensajeModal.
    // Si el modal se cierra al fallar, el mensaje debería ser visible en el componente principal.
    await waitFor(() => {
      expect(screen.getByText(/Error al agregar cita:/i)).toBeInTheDocument(); // O el mensaje específico que tu `catch` muestre
    }, { timeout: 3000 });
  });

  test('el botón de agendar está deshabilitado si faltan campos requeridos', async () => {
    render(<CrudCita />);

    const agendarCitaButton = screen.getByRole('button', { name: /agendar cita/i });
    fireEvent.click(agendarCitaButton);

    await waitFor(() => {
        expect(screen.getByText(/agendar cita/i, { selector: 'h1' })).toBeInTheDocument();
    });

    const agendarModalButton = screen.getByRole('button', { name: /agendar/i });
    
    // Inicialmente debería estar deshabilitado
    expect(agendarModalButton).toBeDisabled();

    // Solo llenamos algunos campos, dejando otros pendientes
    const fechaInput = screen.getByLabelText(/fecha:/i);
    fireEvent.change(fechaInput, { target: { value: '2025-12-25' } });

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /09:00:00/i })).toBeInTheDocument();
    });
    fireEvent.click(screen.getByRole('button', { name: /09:00:00/i })); // Hora seleccionada

    const documentoClienteInput = screen.getByLabelText(/documento cliente:/i);
    fireEvent.change(documentoClienteInput, { target: { value: '123456789' } });
    fireEvent.click(screen.getByRole('button', { name: /buscar cliente/i }));
    await waitFor(() => {
      expect(screen.getByText(/cliente test/i)).toBeInTheDocument();
    });

    // Faltan el oftalmólogo y el tipo de consulta
    expect(agendarModalButton).toBeDisabled();

    // Seleccionar oftalmólogo
    fireEvent.change(screen.getByLabelText(/documento oftalmologo:/i), { target: { value: '987654321' } });
    expect(agendarModalButton).toBeDisabled(); // Todavía falta el tipo de consulta

    // Seleccionar tipo de consulta
    fireEvent.change(screen.getByLabelText(/tipo de consulta:/i), { target: { value: '1' } });

    // Ahora debería estar habilitado
    expect(agendarModalButton).toBeEnabled();
  });
});