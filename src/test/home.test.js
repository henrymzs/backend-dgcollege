const app = require('../src/app');
const request = require('supertest');

let server

beforeAll(async () =>{
    server = await app.listen(9002)
})
afterAll(async () =>{
    server.close()
})

test('deve retornar a mensagem de boas-vindas', async () => {
    const response = await request(app).get('/');

    expect(response.status).toBe(200); 
    expect(response.body).toEqual({
        message: 'Bem-vindo',
    });
});