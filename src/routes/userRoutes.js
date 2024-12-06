const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const authMiddleware = require('../middleware/auth');

/**
 * @swagger
 * components:
 *   schemas:
 *     UserResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID do usuário
 *           example: 1
 *         firstname:
 *           type: string
 *           description: Nome do usuário
 *           example: John
 *         surname:
 *           type: string
 *           description: Sobrenome do usuário
 *           example: Doe
 *         email:
 *           type: string
 *           format: email
 *           description: Email do usuário
 *           example: john@example.com
 *     
 *     CreateUserRequest:
 *       type: object
 *       required:
 *         - firstname
 *         - surname
 *         - email
 *         - password
 *         - confirmPassword
 *       properties:
 *         firstname:
 *           type: string
 *           description: Nome do usuário
 *           example: John
 *         surname:
 *           type: string
 *           description: Sobrenome do usuário
 *           example: Doe
 *         email:
 *           type: string
 *           format: email
 *           description: Email do usuário
 *           example: john@example.com
 *         password:
 *           type: string
 *           format: password
 *           description: Senha do usuário
 *           example: "123@456"
 *         confirmPassword:
 *           type: string
 *           format: password
 *           description: Confirmação da senha
 *           example: "123@456"
 *     
 *     UpdateUserRequest:
 *       type: object
 *       properties:
 *         firstname:
 *           type: string
 *           description: Nome do usuário
 *           example: John
 *         surname:
 *           type: string
 *           description: Sobrenome do usuário
 *           example: Doe
 *         email:
 *           type: string
 *           format: email
 *           description: Email do usuário
 *           example: john@example.com
 *     
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           description: Mensagem de erro
 *           example: User not found
 */

/**
 * @swagger
 * tags:
 *   name: Usuários
 *   description: Gerenciamento de usuários
 */

/**
 * @swagger
 * /v1/user:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Usuários]
 *     description: Cria um novo usuário no sistema. Não requer autenticação.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserRequest'
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       400:
 *         description: Dados inválidos fornecidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/', UserController.store);

/**
 * @swagger
 * /v1/user/{id}:
 *   get:
 *     summary: Retorna os dados de um usuário
 *     tags: [Usuários]
 *     description: Busca um usuário pelo ID. Requer autenticação.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do usuário
 *         example: 1
 *     responses:
 *       200:
 *         description: Dados do usuário encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       404:
 *         description: Usuário não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Não autorizado - Token inválido ou não fornecido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/:id', authMiddleware, UserController.show);

/**
 * @swagger
 * /v1/user/{id}:
 *   put:
 *     summary: Atualiza os dados de um usuário
 *     tags: [Usuários]
 *     description: Atualiza os dados de um usuário existente. Requer autenticação.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do usuário
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUserRequest'
 *     responses:
 *       204:
 *         description: Usuário atualizado com sucesso
 *       400:
 *         description: Dados inválidos fornecidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Não autorizado - Token inválido ou não fornecido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Usuário não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.put('/:id', authMiddleware, UserController.update);

/**
 * @swagger
 * /v1/user/{id}:
 *   delete:
 *     summary: Remove um usuário
 *     tags: [Usuários]
 *     description: Remove um usuário existente. Requer autenticação.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do usuário
 *         example: 1
 *     responses:
 *       204:
 *         description: Usuário removido com sucesso
 *       401:
 *         description: Não autorizado - Token inválido ou não fornecido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Usuário não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.delete('/:id', authMiddleware, UserController.delete);

module.exports = router;