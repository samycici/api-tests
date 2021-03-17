const faker = require('faker')
const testServer = require('../utils/testServer')

const rotaUsuarios = '/usuarios'
const rotaLogin = '/login'
const rotaProdutos = '/produtos'
const rotaCarrinhos = '/carrinhos'

// const usuarioMock = {
//   nome: faker.name.firstName() + ' ' + faker.name.lastName(),
//   email: faker.internet.email(),
//   password: faker.internet.password(),
//   administrador: 'true'
// }

// const postUser = async () => {
//   const { body } = await testServer.post(rotaUsuarios).send(usuarioMock)

//   return body
// }

// const getAdminUserById = async id => {
//   const { body } = await testServer.get(rotaUsuarios).query({ administrador: 'true' })
//   const { usuarios } = body

//   return usuarios[0] // pega o primeiro usuário do retorno do request
// }

describe('Deletar um usuário através da rota DELETE', () => {
  it('Deletar um usuário com id não encontrado', async () => {
    const response = await testServer.delete(`${rotaUsuarios + '/123'}`).send({
      nome: faker.name.firstName() + ' ' + faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      administrador: `${faker.random.boolean()}`
    })
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('message', 'Nenhum registro excluído')
  })

  it('Registro deletado com sucesso', async () => {
    const usuario = {
      nome: faker.name.firstName() + ' ' + faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      administrador: `${faker.random.boolean()}`
    }

    const { body } = await testServer.post(rotaUsuarios).send(usuario).expect(201)
    const { body: bodyDelete } = await testServer.delete(`${rotaUsuarios}/${body._id}`).expect(200)
    expect(bodyDelete).toHaveProperty('message', 'Registro excluído com sucesso')
  })

  // it('Deletar usuário com carrinho', async () => {
  //   const { _id } = await postUser()

  //   const { email, password } = await getAdminUserById(_id)

  //   const { body } = await testServer.post(rotaLogin).send({ email, password })

  //   const { body: bodyPost } = await testServer
  //     .post(rotaProdutos)
  //     .set('Content-type', 'application/json')
  //     .set('Authorization', `${body.authorization}`)
  //     .send({
  //       nome: faker.commerce.productName(),
  //       preco: faker.commerce.price(),
  //       descricao: faker.commerce.productDescription(),
  //       quantidade: faker.random.number()
  //     })

  //   expect(bodyPost).toHaveProperty('message', 'Cadastro realizado com sucesso')

  //   // garantir que nenhum carrinho está vinculado ao usuário
  //   const carrinhoRemovido = await testServer
  //     .delete(`${rotaCarrinhos}/cancelar-compra`)
  //     .set('Content-type', 'application/json')
  //     .set('Authorization', `${body.authorization}`)

  //   expect(carrinhoRemovido.status).toBe(200)

  //   const carrinho = await testServer
  //     .post(rotaCarrinhos)
  //     .set('Content-type', 'application/json')
  //     .set('Authorization', `${body.authorization}`)
  //     .send({
  //       produtos: [
  //         {
  //           idProduto: 'BeeJh5lz3k6kSIzA',
  //           quantidade: 1
  //         }
  //       ]
  //     })

  //   expect(carrinho.status).toBe(201)
  //   expect(carrinho.body).toHaveProperty('message', 'Cadastro realizado com sucesso')

  //   const deletarUser = await testServer.delete(`${rotaUsuarios}/${_id}`)
  //   expect(deletarUser.status).toBe(400)
  //   expect(deletarUser.body).toHaveProperty('message', 'Não é permitido excluir usuário com carrinho cadastrado')
})
