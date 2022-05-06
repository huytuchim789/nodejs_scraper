const express = require('express')
const router = express.Router()

const { getProduct } = require('./../../controllers/product')
router.route('/:product_name').get(getProduct)
module.exports = router
