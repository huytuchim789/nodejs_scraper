const puppeteer = require('puppeteer')
const getProduct = async (req, res) => {
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
}
module.exports = { getProduct }
