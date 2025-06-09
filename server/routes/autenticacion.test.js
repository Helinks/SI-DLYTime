const request = require('supertest');
const express = require('express');
const app = express();
const authRoutes = require('./autenticacion');

// Configuración básica de express
app.use(express.json());
app.use('/', authRoutes);

// Mock de la conexión a la base de datos
jest.mock('../config/db', () => ({
  query: jest.fn()
}));

const db = require('../Config/db');

describe('Pruebas de Autenticación', () => {
  beforeEach(() => {
    // Limpiar todos los mocks antes de cada prueba
    jest.clearAllMocks();
  });

  describe('POST /registro', () => {
    const nuevoUsuario = {
      numeroDocumento: '123456789',
      idRol: 1,
      idTipoIdentificacion: 1,
      nombre: 'Juan',
      apellido: 'Pérez',
      idGenero: 1,
      correo: 'juan.perez@test.com',
      clave: 'password123'
    };

    it('debería registrar un nuevo usuario exitosamente', async () => {
      // Mock de la consulta de verificación
      db.query.mockImplementationOnce((sql, params, callback) => {
        callback(null, []); // No existen usuarios duplicados
      });

      // Mock de la inserción
      db.query.mockImplementationOnce((sql, params, callback) => {
        callback(null, { insertId: 1 }); // Simulamos inserción exitosa
      });

      const response = await request(app)
        .post('/registro')
        .send(nuevoUsuario);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('message', 'Empleado registrado con éxito.');
    });

    it('debería rechazar un registro con correo duplicado', async () => {
        // Simula que ya existe un usuario con ese correo
        db.query.mockImplementationOnce((sql, params, callback) => {
          callback(null, [{ numeroDocumento: '99999999', correo: 'juan.perez@test.sebas' }]);
        });
      
        const usuarioDuplicado = {
          numeroDocumento: '88888888', // distinto número, pero mismo correo
          idRol: 1,
          idTipoIdentificacion: 1,
          nombre: 'Otro',
          apellido: 'Usuario',
          idGenero: 1,
          correo: 'juan.perez@test.sebas', // mismo correo que el simulado
          clave: 'password123'
        };
      
        const response = await request(app)
          .post('/registro')
          .send(usuarioDuplicado);
      
        expect(response.status).toBe(409);
        expect(response.body).toHaveProperty('exists', true);
        expect(response.body).toHaveProperty('message', 'El número de documento o correo ya existe.');
      });

    it('debería manejar errores de base de datos', async () => {
      // Mock de error en la consulta
      db.query.mockImplementationOnce((sql, params, callback) => {
        callback(new Error('Error de base de datos'), null);
      });

      const response = await request(app)
        .post('/registro')
        .send(nuevoUsuario);

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('message', 'Error interno del servidor.');
    });
  });
});