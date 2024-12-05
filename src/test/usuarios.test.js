const app = require('../src/app');
const request = require('supertest');
const usuarios = require('../src/models/tabelaUsuarios')
const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');




let server
let token

describe('testes de usuários',()=>{

    jest.mock('../src/models/tabelaUsuarios')

    beforeAll(async () =>{
        server = await app.listen(9004)

        const response = await request(app)
        .post('/v1/user/token')
        .send({
                email: process.env.EMAIL_USER,
                password: process.env.SENHA_USER
            })
        expect(response.status).toBe(200)
        token = response.body.detalhes
         expect(token).toBeDefined()

    })
    afterAll(async () =>{
        server.close()
    })

     // limpando os mocks
     beforeEach(() => {
        jest.resetAllMocks(); 
      });
    
    // teste do método GET
    test('Usuário não encontrado', async () => { 


        const response = await request(app).get('/v1/usuarios/123')
    
        expect(response.status).toBe(404)
     })
    

    test('Usuário encontrado', async () => { 
        const response = await request(app).get('/v1/usuarios/14')
    
        expect(response.status).toBe(200)
        expect(response.body).toEqual({
            status: "200",
            mensagem: "Usuário encontrado",
            detalhes: {
                id: 14,
                firstname: "Luis",
                surname: "Cesar",
                email: "luiscesar@example.com",
                password: "$2b$10$I3gbxzSQ85Taq0ADmWFR4.mKGTb/d4XcbhXiEWjXWM26/zcKer8cC",
            }
        })
     })


    // teste do método POST
     test('Tentativa de criar usuário com email existente',async ()=>{

        const senhaCriptografada = await bcrypt.hash('123456', 10)
        
        const response = await request(app).post('/v1/usuarios')
        .set('Authorization', token) 
        .send({
            firstname: 'Maria' ,
            surname: 'Eduarda',
            email: process.env.EMAIL_USER,
            password: senhaCriptografada
        })

        expect(response.status).toBe(400)
        console.log(response.body)
        expect(response.body).toEqual({
            status: "400",
            mensagem: "Email já existe"
        })
     })


     test('Tentativa de criar usuário com um token inválido',async ()=>{

        const senhaCriptografada = await bcrypt.hash('123456', 10)
        
        const response = await request(app).post('/v1/usuarios')
        .set('Authorization', `tokenInvalido`) 
        .send({
            firstname: 'Maria' ,
            surname: 'Eduarda',
            email: process.env.EMAIL_USER,
            password: senhaCriptografada
        })

        expect(response.status).toBe(401)
        expect(response.body).toEqual({
            status: "401",
            mensagem: "Token inválido"
            
        })
     })


     test('Tentativa de criar usuário com informação faltando',async ()=>{

        const senhaCriptografada = await bcrypt.hash('123456', 10)
        
        const response = await request(app).post('/v1/usuarios')
        .set('Authorization', token) 
        .send({
            firstname: 'Maria' ,
            surname: 'Eduarda',
            password: senhaCriptografada
        })

        expect(response.status).toBe(400)
        expect(response.body).toEqual({
            status: "400",
            mensagem: "Os campos são obrigatórios"
            
        })
     })

     
     test('Criando um novo usuário', async () => {
        usuarios.create = jest.fn();
        
       
        usuarios.create.mockResolvedValue({
            id: 1,
            firstname: 'Maria',
            surname: 'Eduarda',
            email: 'maria.eduarda@example.com',
            password: await bcrypt.hash('123456', 10)
        })
    
        
        
        const response = await request(app)
        .post('/v1/usuarios')
        .set('Authorization', token) 
        .send({
            firstname: 'Maria' ,
            surname: 'Eduarda',
            email: 'maria.eduarda@example.com',
            password: '123456'
        })
        
       expect(response.status).toBe(201)
        expect(response.body).toEqual({
            status: "201",
            mensagem: "Usuário criado com sucesso",
            detalhes: {
                firstname: "Maria",
                surname: "Eduarda",
                email: 'maria.eduarda@example.com'
            }
        })

      });

//Teste do método PUT
      test('Atualizando usuário com token inválido', async ()=>{
        const response = await request(app)
        .put('/v1/usuarios/1')
        .set('Authorization', 'tokenInvalido') 
        .send({
            firstname: 'Maria' ,
            surname: 'Eduarda',
        })

        expect(response.status).toBe(401)
        expect(response.body).toEqual({
            status: "401",
            mensagem: "Token inválido"
        })

      })


      test('Atualizando sem enviar informações', async ()=>{
        const response = await request(app)
        .put('/v1/usuarios/1')
        .set('Authorization', token) 
        .send({  })

        expect(response.status).toBe(400)
        expect(response.body).toEqual({
            status: "400",
            mensagem: "Todos os campos não podem estar vazios"
        })

      })


      test('Atualizando informações com usuário inválido', async ()=>{
        const response = await request(app)
        .put('/v1/usuarios/41235')
        .set('Authorization', token) 
        .send({ 
            firstname: 'Maria' ,
            surname: 'Eduarda',
         })

        expect(response.status).toBe(404)
        expect(response.body).toEqual({
            status: "404",
            mensagem: "Usuário não encontrado"
        })

      })

      test('Atualizando sem enviar informações', async ()=>{
        const response = await request(app)
        .put('/v1/usuarios/1')
        .set('Authorization', token) 
        .send({  })

        expect(response.status).toBe(400)
        expect(response.body).toEqual({
            status: "400",
            mensagem: "Todos os campos não podem estar vazios"
        })

      })


      test('Atualizando informações', async ()=>{
        usuarios.update = jest.fn();
        
       
        usuarios.update.mockResolvedValue({
            firstname: 'Eduarda',
            surname: 'Maria',
            email: 'eduarda@example.com',
        })

        const response = await request(app)
        .put('/v1/usuarios/22')
        .set('Authorization', token) 
        .send({ 
            firstname: 'Eduarda',
            surname: 'Maria',
            email: 'eduarda@example.com'
        })

        expect(response.status).toBe(204)

      })


// Teste métodos de DELETE
      test('Deletando usuário sem token', async ()=>{
        const response = await request(app)
        .delete('/v1/usuarios/22')
        .set('Authorization', 'tokenInvalido') 

        expect(response.status).toBe(401)
        expect(response.body).toEqual({ 
            status: '401', 
            mensagem: 'Token inválido' 
        })
      })

      test('Deletando usuário inválido', async ()=>{
        const response = await request(app)
        .delete('/v1/usuarios/123473')
        .set('Authorization', token) 

        expect(response.status).toBe(404)
        expect(response.body).toEqual({ 
            status: '404', 
            mensagem: 'Usuário com id= 123473 não foi encontrado' 
        })
      })

      test('Deletando usuário', async ()=>{
        usuarios.destroy = jest.fn();

        usuarios.destroy.mockResolvedValue(4); // Simula uma exclusão bem-sucedida
        const response = await request(app)
          .delete('/v1/usuarios/4')
          .set('Authorization', token);
    
        expect(response.status).toBe(204);
        
      })

})
