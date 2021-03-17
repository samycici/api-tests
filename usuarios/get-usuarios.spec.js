const faker = require('faker')
const testServer = require('../utils/testServer')

const rotaUsuarios = '/usuarios'

describe('Consultar usuário através da rota GET', () => {
  it('Listar usuários cadastrados', async () => {
    const response = await testServer.get(rotaUsuarios)
    expect(response.status).toBe(200)
  })

  it('Listar usuário por id inválido', async () => {
    const response = await testServer.get(rotaUsuarios).query({ _id: '123' })
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('quantidade', 0)
  })

  it('Listar usuário por id com sucesso', async () => {
    const usuario = {
      nome: faker.name.firstName() + ' ' + faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      administrador: `${faker.random.boolean()}`
    }

    const { body } = await testServer.post(rotaUsuarios).send(usuario).expect(201)
    const { body: bodyGet } = await testServer
      .get(rotaUsuarios)
      .query({ _id: `${body._id}` })
      .expect(200)
    expect(bodyGet).toHaveProperty('quantidade', 1)
  })
})
