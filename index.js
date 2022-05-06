const express = require('express')
const app = express()

// ;(async () => {

// })()
app.use('/products', require('./routes/products'))
app.use('/product', require('./routes/product'))
app.listen(3000, () => {
  console.log('server running')
})
