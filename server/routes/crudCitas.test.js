const request = require('supertest');
const express = require('express');
const citasRouter = require('./crudCitas');
const db = require('../Config/db');

const app = express();
app.use(express.json());
app.use('/', citasRouter);

// Mock del módulo de base de datos
jest.mock('../Config/db');

describe('POST /addCita - Integration Test', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('debería agendar una cita exitosamente', async () => {
        const mockConnection = {
            query: jest.fn((sql, params, callback) => {
                if (sql.includes('INSERT INTO diagnostico')) {
                    return callback(null, { insertId: 101 });
                } else if (sql.includes('UPDATE horario')) {
                    return callback(null, { affectedRows: 1 });
                } else if (sql.includes('INSERT INTO cita')) {
                    return callback(null, { insertId: 202 });
                } else if (sql.includes('INSERT INTO detalleCita')) {
                    return callback(null, { affectedRows: 1 });
                } else {
                    return callback(new Error('SQL inesperado: ' + sql));
                }
            }),
            beginTransaction: jest.fn(cb => cb(null)),
            commit: jest.fn(cb => cb(null)),
            rollback: jest.fn(cb => cb(null)),
            release: jest.fn()
        };

        db.getConnection.mockImplementationOnce(callback => callback(null, mockConnection));

        const appointmentData = {
            NumeroDocumentoCliente: '123456789',
            NumeroDocumentoOftalmologo: '987654321',
            idHorario: 1,
            idTipoConsulta: 1
        };

        const response = await request(app).post('/addCita').send(appointmentData);

        expect(response.statusCode).toBe(201);
        expect(response.text).toBe('Cita agregada exitosamente');
        expect(mockConnection.commit).toHaveBeenCalled();
        expect(mockConnection.rollback).not.toHaveBeenCalled();
        expect(mockConnection.release).toHaveBeenCalled();
    });
});

it('debería actualizar la cita correctamente y cambiar los horarios', async () => {
    const mockConnection = {
        query: jest.fn((sql, params, callback) => {
            if (sql.includes('UPDATE detallecita')) {
                return callback(null, { affectedRows: 1 });
            } else if (sql.includes('UPDATE horario') && params[0] === 5) {
                return callback(null, { affectedRows: 1 }); // nuevo horario
            } else if (sql.includes('UPDATE horario') && params[0] === 3) {
                return callback(null, { affectedRows: 1 }); // horario anterior
            } else {
                return callback(new Error('SQL inesperado: ' + sql));
            }
        }),
        beginTransaction: jest.fn(cb => cb(null)),
        commit: jest.fn(cb => cb(null)),
        rollback: jest.fn(cb => cb(null)),
        release: jest.fn()
    };

    db.getConnection.mockImplementationOnce(callback => callback(null, mockConnection));

    const respuesta = await request(app)
        .patch('/updateCita')
        .send({
            idCita: 1,
            idHorario: 5,
            idTipoConsulta: 2,
            idHorario1: 3
        });

    expect(respuesta.status).toBe(201);
    expect(respuesta.body.message).toBe('Cita actualizada');
    expect(mockConnection.commit).toHaveBeenCalled();
    expect(mockConnection.rollback).not.toHaveBeenCalled();
    expect(mockConnection.release).toHaveBeenCalled();
}, 10000); // Timeout extendido opcionalmente

it('debería cancelar la cita correctamente y liberar el horario', async () => {
    const mockConnection = {
        query: jest.fn((sql, params, callback) => {
            if (sql.includes('UPDATE horario')) {
                return callback(null, { affectedRows: 1 });
            } else if (sql.includes('UPDATE detallecita')) {
                return callback(null, { affectedRows: 1 });
            } else {
                return callback(new Error('Consulta inesperada'));
            }
        }),
        beginTransaction: jest.fn(cb => cb(null)),
        commit: jest.fn(cb => cb(null)),
        rollback: jest.fn(cb => cb(null)),
        release: jest.fn()
    };

    db.getConnection.mockImplementationOnce(callback => callback(null, mockConnection));

    const data = {
        idCita: 1,
        idEstadoCita: 1,       // actualmente activa → se cancelará
        idHorario: 5,
        idEstadoHorario: 2     // actualmente ocupado → se libera
    };

    const res = await request(app).patch('/cancelCita').send(data);

    expect(res.status).toBe(201);
    expect(res.text).toBe("Cita cancelada");
    expect(mockConnection.query).toHaveBeenCalledWith(
        expect.stringContaining('UPDATE horario'),
        [1, data.idHorario], // horario se libera
        expect.any(Function)
    );
    expect(mockConnection.query).toHaveBeenCalledWith(
        expect.stringContaining('UPDATE detallecita'),
        [3, data.idCita], // cita se cancela
        expect.any(Function)
    );
    expect(mockConnection.commit).toHaveBeenCalled();
    expect(mockConnection.rollback).not.toHaveBeenCalled();
    expect(mockConnection.release).toHaveBeenCalled();
}, 10000);

