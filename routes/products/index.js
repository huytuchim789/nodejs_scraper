const express = require('express')
const router = express.Router()

const {
  getProducts,
  shopeeProducts,
  tikiProducts,
} = require('./../../controllers/products')
/**
 * @swagger
 *  tags:
 *    name: Products
 *    description: get products from tiki ,lazada,shopee
 */
/**
 * @swagger
 * products/gear:
 *   get:
 *     summary: gets all product in gear
 *     tags: [Products]
 *     parameters:
 *       - in : query
 *         name: product
 *         description: name of product
 *         schema:
 *           type: string
 *         required: false
 *     responses:
 *       200:
 *         description: products in array
 *         content:
 *           application/json:
 *       400:
 *         description: []
 */
/**
 * @swagger
 * products/tiki:
 *   get:
 *     summary: gets all product in tiki by name
 *     tags: [Products]
 *     parameters:
 *       - in : query
 *         name: product
 *         description: name of product
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: products in array
 *         content:
 *           application/json:
 *       400:
 *         description: []
 */
/**
 * @swagger
 * products/shopee:
 *   get:
 *     summary: gets all product in shopees
 *     tags: [Products]
 *     parameters:
 *       - in : query
 *         name: product
 *         description: name of product
 *         schema:
 *           type: string
 *         required: true
 *       - in : query
 *         name: limit
 *         description: limit products
 *         schema:
 *           type: number
 *         required: false
 *       - in : query
 *         name: newest
 *         description: name of product
 *         schema:
 *           type: number
 *       - in : query
 *         name: order
 *         description: name of product
 *         schema:
 *           type: string
 *         required: false
 *     responses:
 *       200:
 *         description: products in array
 *         content:
 *           application/json:
 *       400:
 *         description: []
 */

// router.use('/products', () => {})
router.route('/gear').get(getProducts)
router.route('/shopee').get(shopeeProducts)
router.route('/tiki').get(tikiProducts)
module.exports = router
