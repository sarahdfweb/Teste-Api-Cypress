/// <reference types="cypress" />
import contrato from '..//contratos/usuarios.contratos'


describe('Teste de API - Login', () => {
    it('Deve validar contrato de usuários - POST', () => {
      cy.request({
        method: 'POST',
        url: 'login',
        body: {
          "email": "beltrano@qa.com.br",
          "password": "teste" 
        }
    
    });
})

    it('Deve listar usuários cadastrados - GET', () => {
        cy.request({
            method: 'GET',
            url: 'usuarios',
        }).should((response) => {
            expect(response.status).equal(200)
            expect(response.body).to.have.property('usuarios')

    })
        
    });
  
    it('Deve Cadastrar um Usuário com Sucesso - POST', () => {
        cy.wrap('Usuario' + Math.floor(Math.random() * 1000000000000)).as('usuario');
    
        cy.get('@usuario').then((usuario) => {
            const dadosUsuario = {
                nome: usuario,
                email: 'T@qa.com.br',
                password: 'teste',
                administrador: 'true'
            };
    
            cy.request({
                method: 'POST',
                url: '/usuarios',
                body: dadosUsuario,
                failOnStatusCode: false
            }).then(response => {
                expect(response.status).to.equal(400);
                expect(response.body.message).to.eq('Este email já está sendo usado');
            });
        });
    });
    
   
    it('Deve Validar um Usuário com e-mail Inválido - POST', () => {
            // Define os dados do usuário com e-mail inválido
            const usuarioInvalido = {
                nome: 'Fulano da Silva',
                email: 'emailinvalido', // E-mail inválido
                password: 'senha123',
                administrador: 'true'
            };
        
            cy.request({
                method: 'POST',
                url: '/usuarios',
                body: usuarioInvalido,
                failOnStatusCode: false
            }).then(response => {
                // Verifica se o status da resposta é 400 (Bad Request) ou outro código de erro apropriado
                expect(response.status).to.equal(400)
                //expect(response.body.message).to.exist('email deve ser um email válido') // Verifique se existe uma mensagem de erro
            });
        });
        
    });
  
    it('Deve Editar um usuário previamente cadastrado - PUT', () => {
        
            const usuarioEditar = {
                // Editando os dados
                nome: 'Usuario777',
                email: 'rano@qa.com.br',
                password: 'teste',
                administrador: 'true',
                _id: '1252oZSqmXp5cDjD'
            };
        
            // Realiza a requisição PUT para editar o usuário
            cy.request({
                method: 'PUT',
                url: `/usuarios/${usuarioEditar._id}`,
                body: {
                    nome: usuarioEditar.nome,
                    email: usuarioEditar.email,
                    password: usuarioEditar.password,
                    administrador: usuarioEditar.administrador
                },
                failOnStatusCode: false
            }).then(response => {
                expect(response.status).to.equal(200);
                expect(response.body.message).to.exist; 
        });
        
    })
    
    
  
    it('Deve Deletar um Usuário Previamente Cadastrado - DELETE', () => {

           const idUsuarioDeletar = '1252oZSqmXp5cDjD';
            cy.request({
                method: 'DELETE',
                url: `/usuarios/${idUsuarioDeletar}`,
                failOnStatusCode: false
            }).then(response => {
                expect(response.status).to.equal(200);
                expect(response.body.message).to.equal('Registro excluído com sucesso');
            });
        })
        
      
    

  
  
  