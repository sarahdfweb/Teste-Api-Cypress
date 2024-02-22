# Testes automatizado de API REST com Cypress ✨

Este repositório contém testes automatizados de API utilizando o framework Cypress. Os testes incluem cenários de login de usuário, cadastro de produto, listagem, edição e exclusão de produtos.

## Vídeo de Demonstração

Assista ao vídeo de demonstração da automação em ação 🍿:
[Assista ao vídeo](https://reccloud.com/pt/u/ec8d1ae)

## Funcionalidades Testadas 🚀

- **Login de Usuário**: Testa o login com credenciais válidas.
- **Cadastro de Produto**: Testa o cadastro de novos produtos com diferentes cenários.
- **Listagem de Produtos**: Verifica se a listagem de produtos está funcionando corretamente.
- **Edição de Produtos**: Testa a funcionalidade de edição de produtos.
- **Exclusão de Produtos**: Verifica se a exclusão de produtos está funcionando conforme o esperado.
- **Automação de Contrato**: Verifica se os tipos de dados permanece de acordo com os parâmetros 

## Métodos HTTP Utilizados 🌐

Os testes utilizam os seguintes métodos HTTP:

- **GET**: Para obter recursos, como a listagem de produtos.
- **POST**: Para criar novos recursos, como o cadastro de produtos.
- **PUT**: Para atualizar recursos existentes, como a edição de produtos.
- **DELETE**: Para excluir recursos, como a exclusão de produtos.

## Automação: Contratos
Os contratos são super importantes para manter os tipos funcionando, note nos parâmetros abaixo:

![image](https://github.com/sarahdfweb/Teste-API-Rest/assets/87348787/33170e55-d8de-4a4b-b4b9-dff703bbfdf2)

Cada um tem um tipo que deve receber por exemplo: string, integer etc a automação deve garantir que esses tipos especificados em contratos deve permanecer, pois se mudar um parâmetro, todos os sistemas que consomem essa API podem quebrar causando uma sequência de erros. Então, no teste de contrato deve passar cada um desses parâmetros e cada um desses tipos para garantir que tudo funcione perfeitamente. Usei nesses testes a biblioteca Joi (`npm install joi`) e ela fica instalada no `package.json`.

![image](https://github.com/sarahdfweb/Teste-API-Rest/assets/87348787/0caa9c65-6c55-4c35-bbf2-91c3d54d96f9)
Obs: no joi não tem inteiro, então podemos usar number

<!--
*## Estrutura do Projeto 📁

- `cypress/integration`: Contém os arquivos de teste Cypress.
- `cypress/support`: Contém os arquivos de suporte, como comandos personalizados.
- `cypress/fixtures`: Contém os dados de teste (por exemplo, JSON).
-->

## Configurações Personalizadas ⚙️

O arquivo `commands.js` contém comandos personalizados utilizados nos testes.
## Como Executar os Testes ▶️

1. Clone este repositório.
2. Instale o Cypress.
3. Execute os testes com o comando `npm test`.

## Contribuindo 🤝

Contribuições são bem-vindas!

