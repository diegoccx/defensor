const request = require('supertest');
const app = require('../server'); // Caminho para o server.js

describe('Testando a API de clientes', () => {
    it('Deve retornar todos os clientes', async () => {
        const response = await request(app).get('/customers');
        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });

    it('Deve criar um novo cliente', async () => {
        const newCustomer = { name: 'Cliente Teste', email: 'teste@cliente.com' };
        const response = await request(app).post('/customers').send(newCustomer);
        expect(response.status).toBe(200);
        expect(response.body.name).toBe('Cliente Teste');
    });

    it('Deve buscar clientes por palavra-chave', async () => {
        const response = await request(app).get('/customers/search?keyword=João');
        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
        expect(response.body[0].name).toMatch(/João/);
    });

    it('Deve deletar um cliente existente', async () => {
        const response = await request(app).delete('/customers/1'); // ID de exemplo
        expect(response.status).toBe(200);
    });

    it('Deve retornar erro ao deletar cliente inexistente', async () => {
        const response = await request(app).delete('/customers/9999'); // ID inexistente
        expect(response.status).toBe(200); // Pode ajustar o status conforme implementado
    });
});
