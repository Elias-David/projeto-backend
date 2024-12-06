const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');
const authMiddleware = require('../middleware/auth');

/**
 * @swagger
 * components:
 *   schemas:
 *     ProductImage:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         enabled:
 *           type: boolean
 *           example: true
 *         path:
 *           type: string
 *           example: '/images/product-1.jpg'
 *     
 *     ProductOption:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         title:
 *           type: string
 *           example: 'Tamanho'
 *         shape:
 *           type: string
 *           enum: [square, circle]
 *           example: 'square'
 *         radius:
 *           type: integer
 *           example: 4
 *         type:
 *           type: string
 *           enum: [text, color]
 *           example: 'text'
 *         values:
 *           type: string
 *           example: 'P,M,G,GG'
 *     
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         enabled:
 *           type: boolean
 *           example: true
 *         name:
 *           type: string
 *           example: 'Camiseta Básica'
 *         slug:
 *           type: string
 *           example: 'camiseta-basica'
 *         stock:
 *           type: integer
 *           example: 100
 *         description:
 *           type: string
 *           example: 'Camiseta 100% algodão'
 *         price:
 *           type: number
 *           format: float
 *           example: 89.90
 *         price_with_discount:
 *           type: number
 *           format: float
 *           example: 79.90
 *         images:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ProductImage'
 *         options:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ProductOption'
 *         category_ids:
 *           type: array
 *           items:
 *             type: integer
 *           example: [1, 2]
 *     
 *     ProductSearchResponse:
 *       type: object
 *       properties:
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Product'
 *         total:
 *           type: integer
 *           example: 50
 *         limit:
 *           type: integer
 *           example: 12
 *         page:
 *           type: integer
 *           example: 1
 */

/**
 * @swagger
 * tags:
 *   name: Produtos
 *   description: Gerenciamento de produtos
 */

/**
 * @swagger
 * /v1/product/search:
 *   get:
 *     summary: Lista produtos com filtros
 *     tags: [Produtos]
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
 *         example: name,price,images
 *       - in: query
 *         name: match
 *         schema:
 *           type: string
 *         description: Busca por nome ou descrição
 *         example: camiseta
 *       - in: query
 *         name: category_ids
 *         schema:
 *           type: string
 *         description: IDs das categorias (separados por vírgula)
 *         example: 1,2
 *       - in: query
 *         name: price-range
 *         schema:
 *           type: string
 *         description: Faixa de preço (min-max)
 *         example: 50-100
 *     responses:
 *       200:
 *         description: Lista de produtos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductSearchResponse'
 */
router.get('/search', ProductController.search);

/**
 * @swagger
 * /v1/product/{id}:
 *   get:
 *     summary: Busca um produto por ID
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do produto
 *     responses:
 *       200:
 *         description: Produto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Produto não encontrado
 */
router.get('/:id', ProductController.show);

/**
 * @swagger
 * /v1/product:
 *   post:
 *     summary: Cria um novo produto
 *     tags: [Produtos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - slug
 *               - price
 *               - price_with_discount
 *             properties:
 *               enabled:
 *                 type: boolean
 *               name:
 *                 type: string
 *               slug:
 *                 type: string
 *               stock:
 *                 type: integer
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               price_with_discount:
 *                 type: number
 *               category_ids:
 *                 type: array
 *                 items:
 *                   type: integer
 *               images:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     type:
 *                       type: string
 *                     content:
 *                       type: string
 *               options:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/ProductOption'
 *     responses:
 *       201:
 *         description: Produto criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Erro na criação
 *       401:
 *         description: Não autorizado
 */
router.post('/', authMiddleware, ProductController.store);

/**
 * @swagger
 * /v1/product/{id}:
 *   put:
 *     summary: Atualiza um produto
 *     tags: [Produtos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do produto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               enabled:
 *                 type: boolean
 *               name:
 *                 type: string
 *               slug:
 *                 type: string
 *               stock:
 *                 type: integer
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               price_with_discount:
 *                 type: number
 *               category_ids:
 *                 type: array
 *                 items:
 *                   type: integer
 *               images:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     deleted:
 *                       type: boolean
 *                     content:
 *                       type: string
 *               options:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     deleted:
 *                       type: boolean
 *                     title:
 *                       type: string
 *                     values:
 *                       type: string
 *     responses:
 *       204:
 *         description: Produto atualizado com sucesso
 *       400:
 *         description: Erro na atualização
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Produto não encontrado
 */
router.put('/:id', authMiddleware, ProductController.update);

/**
 * @swagger
 * /v1/product/{id}:
 *   delete:
 *     summary: Remove um produto
 *     tags: [Produtos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do produto
 *     responses:
 *       204:
 *         description: Produto removido com sucesso
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Produto não encontrado
 */
router.delete('/:id', authMiddleware, ProductController.delete);

module.exports = router;