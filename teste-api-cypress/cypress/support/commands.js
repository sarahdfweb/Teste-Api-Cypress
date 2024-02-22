// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('token', (email, senha) => {
  return cy.request({
      method: 'POST',
      url: 'login',
      body: {
          "email": email,
          "password": senha
      }
  }).then(response => {
      return response.body.authorization;
  });
});

Cypress.Commands.add('cadastrarProduto', (token, produto, preco, descricao, quantidade) => {
  return cy.request({
      method: 'POST',
      url: 'produtos',
      headers: { authorization: token },
      body: {
          "nome": produto,
          "preco": preco,
          "descricao": descricao,
          "quantidade": quantidade
      },
      failOnStatusCode: false
  });
});

Cypress.Commands.add('cadastrarUsuario', (token, nome, email, password, administrador) => {
    return cy.request({
        method: 'POST',
        url: 'usuarios',
        headers: { Authorization: `Bearer ${token}` },
        body: {
            nome: nome,
            email: email,
            password: password,
            administrador: administrador
        },
        failOnStatusCode: false
    });
});
