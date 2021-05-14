const express = require('express');
const auth = require('../../middlewares/auth');
const photoController = require('../../controllers/photo.controller');

const router = express.Router();

router.route('/').post(auth(), photoController.uploadPhoto);
// .get(auth(), photoController.getItems);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Items
 *   description: Item management and retrieval
 */

/**
 * @swagger
 * /items:
 *   post:
 *     summary: Create an item
 *     description: Only admins can create other items.
 *     tags: [Items]
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
 *               - description
 *             properties:
 *               name:
 *                 type: string
 *                 required: true
 *               description:
 *                 type: string
 *               public:
 *                 type: boolean
 *                 default: false
 *               owned:
 *                 type: boolean
 *                 default: true
 *               qty:
 *                 type: number
 *               price:
 *                 type: number
 *               photos:
 *                 type: array
 *                 items:
 *                   type: string
 *               urls:
 *                 type: array
 *                 items:
 *                   type: string
 *               details:
 *                 type: object
 *                 properties:
 *                   maker:
 *                     type: string
 *                   model:
 *                     type: string
 *                   color:
 *                     type: string
 *               lists:
 *                 type: array
 *                 items:
 *                   type: string
 *               order:
 *                 type: string
 *               user:
 *                 type: string
 *                 required: true
 *             example:
 *               name: TOFU60
 *               description: black case
 *               owned: true
 *               public: true
 *               qty: 1
 *               price: 9999
 *               photos: [https://via.placeholder.com/150, https://via.placeholder.com/250]
 *               urls: [https://geekhack.org, https://reddit.com/r/mechmarket]
 *               lists: [listId1, listId2]
 *               order: orderId
 *               user: userId
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Item'
 *
 *   get:
 *     summary: Get all items
 *     description: Only admins can retrieve all items.
 *     tags: [Items]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Item name
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: sort by query in the form of field:desc/asc (ex. name:asc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of items
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Item'
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 totalResults:
 *                   type: integer
 *                   example: 1
 */

/**
 * @swagger
 * /items/{id}:
 *   get:
 *     summary: Get an item
 *     description: Logged in users can fetch only their own item information. Only admins can fetch other items.
 *     tags: [Items]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Item id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Item'
 *
 *   patch:
 *     summary: Update an item
 *     description: Logged in users can only update their own information. Only admins can update other items.
 *     tags: [Items]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Item id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               public:
 *                 type: boolean
 *               qty:
 *                 type: number
 *             example:
 *               name: TOFU60
 *               description: black case
 *               qty: 1
 *               public: true
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Item'
 *
 *   delete:
 *     summary: Delete an item
 *     description: Logged in users can delete only their own items. Only admins can delete other items.
 *     tags: [Items]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Item id
 *     responses:
 *       "200":
 *         description: No content
 */
