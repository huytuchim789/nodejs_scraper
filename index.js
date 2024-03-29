const express = require('express')
const app = express()
const swaggerUI = require('swagger-ui-express')
const cors = require('cors')
const swaggerJsDoc = require('swagger-jsdoc')
// ;(async () => {
const PORT = process.env.PORT || 3000
// })()
app.use(cors())
app.use('/api/v1/products', require('./routes/products'))
app.use('/api/v1/product', require('./routes/product'))

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Library API',
      version: '1.0.0',
      description: 'A Electronic Commerce Crawl API',
      contact: {
        name: 'API Support',
        url: 'https://github.com/huytuchim789',
        email: 'tranhuytu242000@gmail.com',
      },
    },
    servers: [
      {
        url: 'https://crawl-e-commerce-api.herokuapp.com',
      },
    ],
  },
  apis: ['./routes/products/*.js', './routes/product/*.js'],
}

const specs = swaggerJsDoc(options)
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs))
app.listen(PORT, () => {
  console.log('server running')
})
