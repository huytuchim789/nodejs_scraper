const puppeteer = require('puppeteer')
const express = require('express')
const app = express()
// ;(async () => {

// })()
app.get('/products/:product_name', async (req, res) => {
  const productName = req.params.product_name
  const browser = await puppeteer.launch({
    headless: true,
  })
  const page = await browser.newPage()
  await page.goto(`https://gearvn.com/collections/${productName}`)
  //   await page.screenshot({ path: 'example.png' })
  //   const acers = await page.evaluate(() => {
  //     return Array.from(document.querySelectorAll('.product-row'))
  //   })
  const acers = await page.$$('.product-row')
  const laptops = []
  for (let i = 0; i < acers.length; i++) {
    const img = await acers[i].$eval(
      'img',
      (i) => 'https:' + i.getAttribute('src')
    )
    const name = await acers[i].$eval('.product-row-name', (a) => a.textContent)
    let original_price = null
    try {
      original_price = await acers[i].$eval(
        '.product-row-price > del',
        (a) => a.textContent
      )
    } catch (error) {}
    const price = await acers[i].$eval(
      '.product-row-sale',
      (a) => a.textContent
    )
    let discount = '0%'
    try {
      discount = await acers[i].$eval(
        'div.new-product-percent',
        (c) => c.textContent
      )
    } catch (error) {}
    laptops.push({ img, name, original_price, price, discount })
  }
  res.json(laptops)
})
app.get('/product/:product_name', async (req, res) => {
  const productName = req.params.product_name
  const browser = await puppeteer.launch({
    headless: true,
  })
  const page = await browser.newPage()
  await page.goto(`https://gearvn.com/products/${productName}`)
  const name = await page.evaluate(
    (el) => el.innerText,
    await page.$('h1.product_name')
  )
  let oldPrice = null
  try {
    oldPrice = await page.evaluate(
      (el) => el.textContent,
      await page.$('.product_price')
    )
  } catch (error) {}
  let newPrice = null
  try {
    newPrice = await page.evaluate(
      (el) => el.textContent,
      await page.$('.product_sale_price')
    )
  } catch (error) {}
  const productInfo = await page.$$('table tbody tr')
  let info = {}
  for (let i = 0; i < productInfo.length; i++) {
    let data = await productInfo[i].$$eval('td', (c) => {
      return [c[0].textContent, c[1].textContent]
    })
    info[data[0]] = data[1]
  }
  res.json({ name, oldPrice, newPrice, info })
})
app.listen(3000, () => {
  console.log('server running')
})
