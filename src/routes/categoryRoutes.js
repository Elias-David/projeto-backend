const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/CategoryController');
const authMiddleware = require('../middleware/auth');

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID da categoria
 *           example: 1
 *         name:
 *           type: string
 *           description: Nome da categoria
 *           example: Eletrônicos
 *         slug:
 *           type: string
 *           description: Slug para URL
 *           example: eletronicos
 *         use_in_menu:
 *           type: boolean
 *           description: Indica se a categoria deve aparecer no menu
 *           example: true
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *     
 *     CategoryRequest:
 *       type: object
 *       required:
 *         - name
 *         - slug
 *       properties:
 *         name:
 *           type: string
 *           example: Eletrônicos
 *         slug:
 *           type: string
 *           example: eletronicos
 *         use_in_menu:
 *           type: boolean
 *           example: true
 *     
 *     CategorySearchResponse:
 *       type: object
 *       properties:
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Category'
 *         total:
 *           type: integer
 *           description: Total de registros encontrados
 *           example: 10
 *         limit:
 *           type: integer
 *           description: Limite de itens por página
 *           example: 12
 *         page:
 *           type: integer
 *           description: Página atual
 *           example: 1
 */

/**
 * @swagger
 * tags:
 *   name: Categorias
 *   description: Gerenciamento de categorias
 */

/**
 * @swagger
 * /v1/category/search:
 *   get:
 *     summary: Lista categorias com filtros
 *     tags: [Categorias]
 *     description: Retorna uma lista paginada de categorias com opções de filtro
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Número de itens por página (use -1 para todos)
 *         example: 12
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Número da página
 *         example: 1
 *       - in: query
 *         name: fields
 *         schema:
 *           type: string
 *         description: Campos a serem retornados (separados por vírgula)
 *         example: name,slug
 *       - in: query
 *         name: use_in_menu
 *         schema:
 *           type: boolean
 *         description: Filtrar por uso no menu
 *         example: true
 *     responses:
 *       200:
 *         description: Lista de categorias
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CategorySearchResponse'
 *       400:
 *         description: Erro na busca
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/search', CategoryController.search);

/**
 * @swagger
 * /v1/category/{id}:
 *   get:
 *     summary: Busca uma categoria por ID
 *     tags: [Categorias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da categoria
 *         example: 1
 *     responses:
 *       200:
 *         description: Categoria encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: Categoria não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/:id', CategoryController.show);

/**
 * @swagger
 * /v1/category:
 *   post:
 *     summary: Cria uma nova categoria
 *     tags: [Categorias]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CategoryRequest'
 *     responses:
 *       201:
 *         description: Categoria criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       400:
 *         description: Erro na criação
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Não autorizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/', authMiddleware, CategoryController.store);

/**
 * @swagger
 * /v1/category/{id}:
 *   put:
 *     summary: Atualiza uma categoria
 *     tags: [Categorias]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da categoria
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CategoryRequest'
 *     responses:
 *       204:
 *         description: Categoria atualizada com sucesso
 *       400:
 *         description: Erro na atualização
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Não autorizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Categoria não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.put('/:id', authMiddleware, CategoryController.update);

/**
 * @swagger
 * /v1/category/{id}:
 *   delete:
 *     summary: Remove uma categoria
 *     tags: [Categorias]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da categoria
 *         example: 1
 *     responses:
 *       204:
 *         description: Categoria removida com sucesso
 *       401:
 *         description: Não autorizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Categoria não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.delete('/:id', authMiddleware, CategoryController.delete);

module.exports = router;