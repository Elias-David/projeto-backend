# Documentação da API

## Endpoints

### Autenticação

#### Gerar Token
```http
POST /v1/user/token
```
**Headers:**
- `Content-Type: application/json`

**Body:**
```json
{
  "email": "user@mail.com",
  "password": "123@123"
}
```

**Response (200 OK):**
```json
{
  "token": "<JWT Token>"
}
```

### Usuários 

#### Criar Usuário
```http
POST /v1/user
```
**Headers:**
- `Content-Type: application/json`

**Body:**
```json
{
  "firstname": "John",
  "surname": "Doe", 
  "email": "john@example.com",
  "password": "123@123",
  "confirmPassword": "123@123"
}
```

**Response (201 Created):**
```json
{
  "id": 1,
  "firstname": "John",
  "surname": "Doe",
  "email": "john@example.com"
}
```

#### Buscar Usuário
```http
GET /v1/user/:id
```
**Headers:**
- `Authorization: Bearer <token>`

**Response (200 OK):**
```json
{
  "id": 1,
  "firstname": "John",
  "surname": "Doe",
  "email": "john@example.com"
}
```

#### Atualizar Usuário
```http
PUT /v1/user/:id
```
**Headers:**
- `Authorization: Bearer <token>`
- `Content-Type: application/json`

**Body:**
```json
{
  "firstname": "John",
  "surname": "Doe",
  "email": "john@example.com"
}
```

**Response (204 No Content)**

#### Deletar Usuário
```http
DELETE /v1/user/:id
```
**Headers:**
- `Authorization: Bearer <token>`

**Response (204 No Content)**

### Categorias

#### Listar Categorias
```http
GET /v1/category/search
```
**Query Params (opcionais):**
- `limit`: Limite de itens por página (default: 12, use -1 para todos)
- `page`: Número da página (default: 1)
- `fields`: Campos a serem retornados (ex: name,slug)
- `use_in_menu`: Filtrar por uso no menu (true/false)

**Response (200 OK):**
```json
{
  "data": [
    {
      "id": 1,
      "name": "Shoes",
      "slug": "shoes",
      "use_in_menu": true
    }
  ],
  "total": 1,
  "limit": 12,
  "page": 1
}
```

#### Buscar Categoria
```http
GET /v1/category/:id
```

**Response (200 OK):**
```json
{
  "id": 1,
  "name": "Shoes",
  "slug": "shoes",
  "use_in_menu": true
}
```

#### Criar Categoria
```http
POST /v1/category
```
**Headers:**
- `Authorization: Bearer <token>`
- `Content-Type: application/json`

**Body:**
```json
{
  "name": "Shoes",
  "slug": "shoes",
  "use_in_menu": true
}
```

**Response (201 Created)**

#### Atualizar Categoria
```http
PUT /v1/category/:id
```
**Headers:**
- `Authorization: Bearer <token>`
- `Content-Type: application/json`

**Body:**
```json
{
  "name": "Shoes",
  "slug": "shoes",
  "use_in_menu": true
}
```

**Response (204 No Content)**

#### Deletar Categoria
```http
DELETE /v1/category/:id
```
**Headers:**
- `Authorization: Bearer <token>`

**Response (204 No Content)**

### Produtos

#### Listar Produtos
```http
GET /v1/product/search
```
**Query Params (opcionais):**
- `limit`: Limite de itens por página (default: 12, use -1 para todos)
- `page`: Número da página (default: 1)
- `fields`: Campos a serem retornados (ex: name,images,price)
- `match`: Busca por nome ou descrição
- `category_ids`: IDs das categorias (ex: 15,24)
- `price-range`: Faixa de preço (ex: 100-200)
- `option[45]`: Filtro por opções (ex: GG,PP)

**Response (200 OK):**
```json
{
  "data": [
    {
      "id": 1,
      "enabled": true,
      "name": "Produto 01",
      "slug": "produto-01",
      "stock": 10,
      "description": "Descrição do produto 01",
      "price": 119.90,
      "price_with_discount": 99.90,
      "category_ids": [1],
      "images": [
        {
          "id": 1,
          "content": "https://store.com/media/product-01/image-01.png"
        }
      ],
      "options": [
        {
          "id": 1,
          "title": "Tamanho",
          "values": ["P", "M", "G"]
        }
      ]
    }
  ],
  "total": 1,
  "limit": 12,
  "page": 1
}
```

#### Buscar Produto
```http
GET /v1/product/:id
```

**Response (200 OK):**
```json
{
  "id": 1,
  "enabled": true,
  "name": "Produto 01",
  "slug": "produto-01",
  "stock": 10,
  "description": "Descrição do produto 01",
  "price": 119.90,
  "price_with_discount": 99.90,
  "category_ids": [1],
  "images": [
    {
      "id": 1,
      "content": "https://store.com/media/product-01/image-01.png"
    }
  ],
  "options": [
    {
      "id": 1,
      "title": "Tamanho",
      "values": ["P", "M", "G"]
    }
  ]
}
```

#### Criar Produto
```http
POST /v1/product
```
**Headers:**
- `Authorization: Bearer <token>`
- `Content-Type: application/json`

**Body:**
```json
{
  "enabled": true,
  "name": "Produto 01",
  "slug": "produto-01",
  "stock": 10,
  "description": "Descrição do produto 01",
  "price": 119.90,
  "price_with_discount": 99.90,
  "category_ids": [1],
  "images": [
    {
      "type": "image/png",
      "content": "base64 da imagem 1"
    }
  ],
  "options": [
    {
      "title": "Tamanho",
      "shape": "square",
      "radius": "4",
      "type": "text",
      "values": ["P", "M", "G"]
    }
  ]
}
```

**Response (201 Created)**

#### Atualizar Produto
```http
PUT /v1/product/:id
```
**Headers:**
- `Authorization: Bearer <token>`
- `Content-Type: application/json`

**Body:**
```json
{
  "enabled": true,
  "name": "Produto 01 Atualizado",
  "slug": "produto-01-atualizado",
  "stock": 20,
  "description": "Descrição atualizada",
  "price": 129.90,
  "price_with_discount": 89.90,
  "category_ids": [1],
  "images": [
    {
      "id": 1,
      "deleted": true
    }
  ],
  "options": [
    {
      "id": 1,
      "values": ["PP", "P", "M", "G", "GG"]
    }
  ]
}
```

**Response (204 No Content)**

#### Deletar Produto
```http
DELETE /v1/product/:id
```
**Headers:**
- `Authorization: Bearer <token>`

**Response (204 No Content)**

## Status Codes

A API retorna os seguintes status codes:

| Status Code | Descrição |
|------------|-----------|
| 200 | OK - Requisição executada com sucesso |
| 201 | Created - Novo recurso criado com sucesso |
| 204 | No Content - Requisição executada com sucesso (sem conteúdo no corpo da resposta) |
| 400 | Bad Request - Erro nos dados da requisição |
| 401 | Unauthorized - Token não fornecido ou inválido |
| 404 | Not Found - Recurso não encontrado |