const express = require('express')
const router = express.Router()

const {
  getProducts,
  shopeeProducts,
  tikiProducts,
  lazadaProducts,
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
 *       - in : query
 *         name: pageNum
 *         description: page in pagination
 *         schema:
 *           type: num
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
 * products/lazada:
 *   get:
 *     summary: gets all product in lazada
 *     tags: [Products]
 *     parameters:
 *       - in : query
 *         name: product
 *         description: name of product
 *         schema:
 *           type: string
 *         required: true
 *       - in : query
 *         name: pageNum
 *         description: page in pagination
 *         schema:
 *           type: num
 *         required: true
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
router.route('/lazada').get(lazadaProducts)
module.exports = router
