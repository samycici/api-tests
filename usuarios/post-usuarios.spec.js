const faker = require('faker')
const testServer = require('../utils/testServer')

const rotaUsuarios = '/usuarios'

const novoUsuarioSucesso = {
  nome: faker.name.firstName() + ' ' + faker.name.lastName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  administrador: `${faker.random.boolean()}`
}

describe('Criar um usuário através da rota POST', () => {
  it('Cadastrar um novo usuário com sucesso', async () => {
    const response = await testServer.post(rotaUsuarios).send(novoUsuarioSucesso)
    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('message', 'Cadastro realizado com sucesso')
  })

  it('Cadastrar um novo usuário com um email já em uso', async () => {
    const response = await testServer.post(rotaUsuarios).send({
      nome: 'Teste da Silva',
      email: 'fulano@qa.com',
      password: '123456',
      administrador: 'false'
    })
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('message', 'Este email já está sendo usado')
  })
})
