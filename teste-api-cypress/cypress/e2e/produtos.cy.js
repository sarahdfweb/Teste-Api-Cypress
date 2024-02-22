/// <reference types= "cypress" />
import contrato from '../contratos/produtos.contratos'

describe('Teste de API em produtos', () => {

    let token
    beforeEach(() => {
        cy.token('beltrano@qa.com.br' , 'teste').then(tkn => {
          //expor o token
          token = tkn
        })
    });
    
    it('Deve validar contrato de produtos', () => {
        cy.request('produtos').then(response => {
            return contrato.validateAsync(response.body)
        })
    

    });

    it('Deve Listar produtos com sucesso- GET', () => {
        cy.request({
            method: 'GET',
            url: 'produtos',
        }).should((response) => {
            expect(response.status).equal(200)
            expect(response.body).to.have.property('produtos')

        })
        
    });
    //Caminho feliz
    //TODO: Criar Token Dinamicamente 
    it('Deve Cadastrar produto com sucesso - POST', () => {
        let produto = 'Produto' + Math.floor(Math.random() * 1000000000000)

        cy.cadastrarProduto(token, produto, 10, 'Cabo c', 50).should((response) => {
            expect(response.status).equal(201)
            expect(response.body.message).equal('Cadastro realizado com sucesso')
    
    });       
    });
    // Cenário Negativo
    it('Deve validar mensagem de produto cadastrado anteriormente - POST', () => {
        cy.cadastrarProduto(token, 'Cabo USB xy001', 10, 'Cabo c', 50)
        .should((response) => {
            expect(response.status).equal(400)
            expect(response.body.message).equal('Já existe produto com esse nome')
    

        })
        
    });
    it('Deve editar um produto com sucesso - PUT', () => {
        let produto = 'Prd' + Math.floor(Math.random() * 1000000000000)

        cy.cadastrarProduto(token, produto, 10, 'editado', 50)

        //Recuperando o ID
        .then(response => {
            let id = response.body._id
            cy.request({
                method:'PUT',
                url: `produtos/${id}`,
                headers: {authorization: token},
                body: {
                    "nome": produto,
                    "preco": 150,
                    "descricao": "Cabo USB do tipo ",
                    "quantidade": 81
                }
    
            }).should(response => {
                expect(response.body.message).to.equal('Registro alterado com sucesso')
                expect(response.status).to.equal(200)
            })
        })
    

});
it('Deve deletar um produto previamente cadastrado - DELETE', () => {
    let produto = `Produto EBAC ${Math.floor(Math.random() * 100000000)}`
    cy.cadastrarProduto(token, produto, 250, "Descrição do produto novo", 180)
    .then(response => {
        let id = response.body._id
        cy.request({
            method: 'DELETE',
            url: `produtos/${id}`,
            headers: {authorization: token}
        }).then(response =>{
            expect(response.body.message).to.equal('Registro excluído com sucesso')
            expect(response.status).to.equal(200)
            })
        })
    })
})

//Precisei realizar esse testes em um produto 
/*it('Deve deletar um determinado produto', () => {
    const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJlbHRyYW5vQHFhLmNvbS5iciIsInBhc3N3b3JkIjoidGVzdGUiLCJpYXQiOjE3MDg1NDU4NDUsImV4cCI6MTcwODU0NjQ0NX0.QbIJBCooxA75CdI_jLOFNHfHUxuoHGgc2pUvPw6HFDs'; // Certifique-se de substituir pelo token real
    const id = 'gGvOlF6Cp3XCOEK0'; // ID do produto a ser deletado

    cy.request({
        method: 'DELETE',
        url: `produtos/${id}`,
        headers: { authorization: token }
    }).then(response => {
        expect(response.body.message).to.equal('Registro excluído com sucesso');
        expect(response.status).to.equal(200);
    });
});*/