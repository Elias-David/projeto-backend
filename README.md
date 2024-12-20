# E-commerce Backend API

Backend de uma aplicação e-commerce desenvolvida como projeto do curso Geração Tech. A API fornece endpoints para gerenciamento de usuários, categorias e produtos, com autenticação JWT.

## Tecnologias Utilizadas

- **Node.js** - Ambiente de execução JavaScript
- **Express.js** - Framework web para criação de APIs
- **MySQL** - Banco de dados relacional
- **Sequelize** - ORM para MySQL
- **JWT** - Autenticação e autorização
- **bcrypt** - Criptografia de senhas
- **Jest** - Framework de testes
- **Dotenv** - Gerenciamento de variáveis de ambiente
- **Nodemon** - Ferramenta de desenvolvimento

## Estrutura do Projeto

```
project-root/
├── src/
│   ├── config/      # Configurações do projeto
│   ├── controllers/ # Controladores da aplicação
│   ├── middleware/  # Middlewares customizados
│   ├── models/      # Modelos do Sequelize
│   ├── routes/      # Rotas da API
│   ├── services/    # Camada de serviços
│   ├── app.js       # Configuração do Express
│   └── server.js    # Entrada da aplicação
├── tests/           # Testes automatizados
├── .env            # Variáveis de ambiente
├── .gitignore
└── package.json
```

## Modelagem do Banco de Dados

![Modelagem do Banco de Dados](bd_model.jpg)

A imagem acima representa o Diagrama de Entidade-Relacionamento (DER) do projeto, ilustrando as tabelas e seus relacionamentos:

- **Users**: Armazena informações dos usuários
- **Categories**: Gerencia as categorias dos produtos
- **Products**: Contém os dados dos produtos
- **Product_Images**: Armazena as imagens dos produtos
- **Product_Options**: Mantém as opções/variações dos produtos
- **Product_Categories**: Tabela pivot para relacionamento many-to-many entre produtos e categorias

## Instalação e Configuração

1. Clone o repositório
```bash
git clone https://github.com/Elias-David/projeto-backend.git
```

2. Instale as dependências:
```bash
npm install
```

3. Crie um banco de dados MySQL:
```sql
CREATE DATABASE ecommerce_db;
```

4. Configure as variáveis de ambiente:
   - Copie o arquivo `.env.example` para `.env`
   - Ajuste as variáveis conforme sua configuração local:
```env
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASS=sua_senha
DB_NAME=ecommerce_db
DB_PORT=3306
APP_KEY_TOKEN=sua_chave_secreta
```

5. Execute o script de setup do banco de dados:
```bash
npm run setup-db
```
Este comando irá:
- Criar todas as tabelas necessárias
- Inserir um usuário administrador (admin@example.com / admin123)
- Criar categorias e produtos de exemplo

6. Inicie o servidor:
```bash
npm run dev
```

## Scripts Disponíveis
- `npm start`: Inicia a aplicação em produção
- `npm run dev`: Inicia a aplicação em desenvolvimento com Nodemon
- `npm test`: Executa os testes unitários
- `npm run test:coverage`: Executa os testes e gera relatório de cobertura
- `npm run setup-db`: Configura o banco de dados com dados iniciais

## API Endpoints

### Usuários

- `GET /v1/user/:id` - Retorna dados de um usuário
- `POST /v1/user` - Cria novo usuário
- `PUT /v1/user/:id` - Atualiza dados do usuário
- `DELETE /v1/user/:id` - Remove usuário
- `POST /v1/user/token` - Gera token JWT

### Categorias

- `GET /v1/category/search` - Lista categorias com filtros
- `GET /v1/category/:id` - Retorna dados de uma categoria
- `POST /v1/category` - Cria nova categoria
- `PUT /v1/category/:id` - Atualiza categoria
- `DELETE /v1/category/:id` - Remove categoria

### Produtos

- `GET /v1/product/search` - Lista produtos com filtros
- `GET /v1/product/:id` - Retorna dados de um produto
- `POST /v1/product` - Cria novo produto
- `PUT /v1/product/:id` - Atualiza produto
- `DELETE /v1/product/:id` - Remove produto

## Autenticação

A API utiliza autenticação JWT. Para rotas protegidas, inclua o token no header:
```
Authorization: Bearer <seu_token>
```

Para obter um token, use o endpoint de autenticação com as credenciais do usuário admin criado durante o setup:
```json
{
  "email": "admin@example.com",
  "password": "admin123"
}
```

## Documentação Detalhada da API

A documentação completa da API, incluindo:
- Descrição detalhada de todos os endpoints
- Exemplos de requisição e resposta
- Parâmetros aceitos
- Códigos de status HTTP
- Formatos de payload

Está disponível no arquivo [API.md](API.md).

## Documentação Interativa com Swagger

A API possui documentação interativa através do Swagger UI, permitindo explorar e testar todos os endpoints diretamente pelo navegador.

### Como Acessar
1. Inicie o servidor:
```bash
npm run dev
```

2. Acesse no navegador:
```
http://localhost:3000/api-docs
```

### Como Usar

1. **Explorar Endpoints**:
   - Os endpoints estão organizados por tags (Usuários, Categorias, Produtos)
   - Clique em cada endpoint para ver detalhes dos parâmetros, respostas e exemplos
   - Cada rota mostra os possíveis códigos de resposta e formatos de dados

2. **Autenticação**:
   - Gere um token usando POST `/v1/user/token`
   - Clique no botão "Authorize" (ícone de cadeado) no topo da página
   - Insira o token no formato: `Bearer seu_token_aqui`
   - Agora você pode testar rotas protegidas

3. **Testar Endpoints**:
   - Clique no endpoint desejado
   - Clique no botão "Try it out"
   - Preencha os parâmetros necessários
   - Clique em "Execute"
   - Veja a resposta real da API

4. **Exemplos de Uso**:
   - A interface mostra exemplos de payloads para cada rota
   - Os schemas de dados são completamente documentados
   - Você pode ver os headers necessários para cada requisição
   - As respostas incluem todos os possíveis status codes

A documentação Swagger complementa a documentação estática fornecida em API.md, oferecendo uma forma interativa de explorar e testar a API.

## Testando a API com Insomnia

Para facilitar os testes dos endpoints, disponibilizamos uma collection do Insomnia na raiz do projeto.

### Como usar:
1. Faça download do [Insomnia](https://insomnia.rest/download)
2. No Insomnia, clique em `Create` e depois em `Import from File`
3. Selecione o arquivo `insomnia_backend_project.json` da raiz do projeto
4. A collection será importada com todos os endpoints organizados nas pastas:
   - Auth: Autenticação e geração de token
   - Users: Gerenciamento de usuários
   - Categories: Gerenciamento de categorias
   - Products: Gerenciamento de produtos

Os endpoints já estão configurados com:
- URLs corretas
- Headers necessários
- Exemplos de payload
- Variáveis de ambiente para o token JWT

## Referências

- [ORIENTAÇÕES PROJETO BACK-END](https://github.com/digitalcollegebr/projeto-backend)
- [DOCUMENTAÇÃO EXTRA - NOTION](https://dust-starburst-c57.notion.site/Desenvolvimento-Back-End-JavaScript-5038d9fff41d45688f698f7d88a5a19e)

## Autores

- [Elias David](https://github.com/Elias-David)
- [Ruth Siqueira](https://github.com/Ruth-sc)