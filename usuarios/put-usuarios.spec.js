const faker = require('faker')
const testServer = require('../utils/testServer')

const rotaUsuarios = '/usuarios'

describe('Editar um usuário através da rota PUT', () => {
  it('Editar um usuário com id não encontrado', async () => {
    const response = await testServer.put(`${rotaUsuarios + '/123'}`).send({
      nome: faker.name.firstName() + ' ' + faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      administrador: `${faker.random.boolean()}`
    })
    expect(response.status).toBe(201)
  })

  it('Registro alterado com sucesso', async () => {
    const usuario = {
      nome: faker.name.firstName() + ' ' + faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      administrador: `${faker.random.boolean()}`
    }

    const { body } = await testServer.post(rotaUsuarios).send(usuario).expect(201)
    const { body: bodyPut } = await testServer.put(`${rotaUsuarios}/${body._id}`).send(usuario).expect(200)
    expect(bodyPut).toHaveProperty('message', 'Registro alterado com sucesso')
  })

  it('Editar um usuário com um email já em uso', async () => {
    const response = await testServer.put(`${rotaUsuarios + '/P2Jvc1FKQnlUs2F'} `).send({
      nome: 'Fulano da Silva',
      email: 'fulano@qa.com',
      password: faker.internet.password(),
      administrador: `${faker.random.boolean()}`
    })
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('message', 'Este email já está sendo usado')
  })
})
