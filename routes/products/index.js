const express = require('express')
const router = express.Router()

const {
  getProducts,
  shopeeProducts,
  tikiProducts,
} = require('./../../controllers/products')
router.route('/gear').get(getProducts)
router.route('/shopee').get(shopeeProducts)
router.route('/tiki').get(tikiProducts)
module.exports = router
