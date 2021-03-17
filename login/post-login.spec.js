const faker = require('faker')
const testServer = require('../utils/testServer')

const rotaUsuarios = '/login'

const loginUsuarioSucesso = {
  email: 'fulano@qa.com',
  password: 'teste'
}

const loginDadosBranco = {
  email: '',
  password: ''
}

const loginDadosInvalidos = {
  email: 'fulano@qa.com',
  password: '12346'
}

describe('Realizar o login de um usuário através da rota POST', () => {
  it('Login usuário com sucesso', async () => {
    const response = await testServer.post(rotaUsuarios).send(loginUsuarioSucesso)
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('message', 'Login realizado com sucesso')
  })

  it('Login dados em branco', async () => {
    const response = await testServer.post(rotaUsuarios).send(loginDadosBranco)
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('email', 'email não pode ficar em branco')
    expect(response.body).toHaveProperty('password', 'password não pode ficar em branco')
  })

  it('Login com dados inválidos', async () => {
    const response = await testServer.post(rotaUsuarios).send(loginDadosInvalidos)
    expect(response.status).toBe(401)
    expect(response.body).toHaveProperty('message', 'Email e/ou senha inválidos')
  })
})
