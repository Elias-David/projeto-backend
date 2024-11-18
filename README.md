# Digital Store - Projeto de Back-End

## Introdução

Bem-vindos ao projeto de Back-End! Este projeto foi desenvolvido como parte do curso de Desenvolvimento Web, com foco na criação de uma API robusta e segura para gerenciar uma aplicação de e-commerce. A base deste trabalho foi a [documentação oficial do projeto](https://github.com/digitalcollegebr/projeto-backend).

## Escopo do Projeto

A implementação deste projeto utilizou as seguintes tecnologias:

- **Node.js** para execução de JavaScript no servidor.
- **Express.js** para criação das rotas de API.
- **Dotenv** para gerenciar configurações com segurança.
- **Nodemon** para produtividade no desenvolvimento.
- **MySQL** para persistência de dados.
- **Sequelize** para abstração e gerenciamento do banco de dados.
- **JWT** para autenticação e segurança nas rotas de API.
- **JEST** para testes automatizados e garantia de qualidade do código.

## Estrutura de Diretórios

```plaintext
project-root/
├── src/
│   ├── config/          # Configurações da aplicação
│   ├── controllers/     # Lógica de controle
│   ├── middleware/      # Middlewares para segurança e validações
│   ├── models/          # Definição do banco de dados (ORM)
│   ├── routes/          # Rotas da API
│   ├── services/        # Regras de negócio
│   ├── app.js           # Inicialização da aplicação
│   └── server.js        # Servidor
├── tests/               # Testes automatizados
├── .env                 # Variáveis de ambiente
├── .gitignore           # Arquivos ignorados pelo Git
└── package.json         # Dependências e scripts do projeto
```

## Response Status Codes

A API utiliza os seguintes status codes para respostas HTTP:

- **200 OK**: Ação realizada com sucesso.
- **201 CREATED**: Recurso criado com sucesso.
- **204 NO CONTENT**: Requisição bem-sucedida, mas sem conteúdo de retorno.
- **400 BAD REQUEST**: Erro nos dados enviados pelo cliente.
- **401 UNAUTHORIZED**: Falta de autenticação válida.
- **404 NOT FOUND**: Recurso não encontrado.

## Funcionalidades Principais

### Banco de Dados

- Modelagem eficiente utilizando o Sequelize.
- Tabelas principais:
  - **Usuários**: Cadastro, autenticação e gerenciamento.
  - **Categorias**: Organização dos produtos por tipo.
  - **Produtos**: Cadastro, edição e listagem de itens disponíveis.
  - **Imagens**: Associação de imagens a produtos.
  - **Opções de Produtos**: Variações como tamanho e cor.

### Endpoints

- **Usuários**:
  - Cadastro de usuário.
  - Autenticação via JWT.
  - Atualização e exclusão de perfil.

- **Categorias**:
  - CRUD completo (Create, Read, Update, Delete).
  - Filtros e paginação.

- **Produtos**:
  - CRUD completo com gerenciamento de imagens e opções.
  - Filtros avançados como preço, categorias e opções.

## Requisitos de Avaliação

### Funcionalidades Essenciais

- Implementação correta dos endpoints e CRUD completo.
- Autenticação JWT em rotas sensíveis.
- Tratamento de erros e respostas padronizadas.

### Qualidade do Código

- Código limpo e modular.
- Organização seguindo boas práticas (MVC).
- Testes automatizados com cobertura significativa.

### Documentação

- Descrição clara dos endpoints (Swagger ou Postman Collection).
- Instruções para setup e uso da aplicação.

## Como Rodar a Aplicação

### Pré-requisitos

- **Node.js** (versão 14 ou superior)
- **npm** ou **yarn**
- **MySQL**

### Passos

1. Clone o repositório:
   ```bash
   git clone https://github.com/digitalcollegebr/projeto-backend.git
   cd projeto-backend
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente no arquivo `.env`.

4. Rode as migrations e seeds:
   ```bash
   npx sequelize-cli db:migrate
   npx sequelize-cli db:seed:all
   ```

5. Inicie o servidor:
   ```bash
   npm run dev
   ```

6. Acesse `http://localhost:3000`.

## Desenvolvedores

- **Elias David Oliveira Sousa**
- **Ruth Siqueira Carvalho**

## Links Úteis

- [Documentação do Sequelize](https://sequelize.org/)
- [Guia do Express.js](https://expressjs.com/)
- [JWT (JSON Web Tokens)](https://jwt.io/)

---

Agradecemos pela oportunidade de desenvolver este projeto e esperamos que ele atenda às expectativas!