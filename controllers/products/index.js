const puppeteer = require('puppeteer')
const devices = puppeteer.devices
const iPhonex = devices['iPhone X']
const { scrollPageToBottom } = require('puppeteer-autoscroll-down')
const { getPrice } = require('./../../services/getPrices')
const queryString = require('querystring')
const axios = require('axios').default

const getProducts = async (req, res) => {
  const productName = req.query.product
  const browser = await puppeteer.launch({
    headless: true,
  })
  const page = await browser.newPage()
  await page.goto(
    `https://gearvn.com/collections/${queryString.escape(productName)}`
  )
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
}

const tikiProducts = async (req, res) => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ['--disable-setuid-sandbox'],
    ignoreHTTPSErrors: true,
  })
  const page = await browser.newPage()
  //We use here page.emulate so no more need to set the viewport separately
  //await page.setViewport({ width: 1280, height: 800 })
  await page.emulate(iPhonex)
  // await page.setUserAgent(
  //   '--user-agent=Mozilla/5.0 (iPhone; CPU iPhone OS 10_0_1 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) Version/10.0 Mobile/14A403 Safari/602.1'
  // )
  // await page.setUserAgent(
  //   'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4950.0 Safari/537.36'
  // )
  // await page.setViewport({
  //   width: 375,
  //   height: 667,
  //   isMobile: true,
  // })
  const productName = req.query.product

  await page.goto(`https://tiki.vn/search?q=${queryString.escape(productName)}`)
  await page.screenshot({ path: 'cherchertech-iphoneX.png' })
  for (let i = 0; i < 1; i++) {
    await scrollPageToBottom(page, {
      size: 500,
      delay: 2000,
    })
  }
  // await scroll(page)
  await page.waitForTimeout(3000)
  // const datas = await getData(page)
  // // await browser.close()
  const datas = await getDataTiki(page)
  // browser.close()

  res.json(datas)
}
const shopeeProducts = async (req, res) => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--disable-setuid-sandbox'],
    ignoreHTTPSErrors: true,
  })
  const page = await browser.newPage()
  //We use here page.emulate so no more need to set the viewport separately
  //await page.setViewport({ width: 1280, height: 800 })
  await page.emulate(iPhonex)
  // await page.setUserAgent(
  //   '--user-agent=Mozilla/5.0 (iPhone; CPU iPhone OS 10_0_1 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) Version/10.0 Mobile/14A403 Safari/602.1'
  // )
  // await page.setUserAgent(
  //   'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4950.0 Safari/537.36'
  // )
  // await page.setViewport({
  //   width: 375,
  //   height: 667,
  //   isMobile: true,
  // })
  const productName = req.query.product

  // await page.goto(
  //   `https://shopee.vn/search?keyword=${queryString.escape(productName)}`
  // )
  // await page.screenshot({ path: 'cherchertech-iphoneX.png' })

  // await scroll(page)

  // // await autoScroll(page)
  // await page.waitForTimeout(9000)
  // const datas = await getData(page)
  // // await browser.close()
  const result = await getData(productName)
  res.json(result)
}
// async function getData(page) {
//   const items = await page.$$('.item-card-list__item-card-wrapper')
//   // res.json(item)
//   console.log(items)
//   console.log(items.length)
//   const datas = []
//   for (let i = 0; i < items.length; i++) {
//     let link = null
//     try {
//       link = await items[i].$eval('a', (c) => {
//         const SHOPEE_URL = 'https://shopee.vn/'

//         return SHOPEE_URL + c.getAttribute('href')
//       })
//     } catch (error) {}
//     let img = null
//     try {
//       img = await items[i].$eval('img', (c) => c.getAttribute('src'))
//     } catch (error) {}
//     let discount = null
//     try {
//       discount = await items[i].$eval('.percent', (c) => c.textContent)
//     } catch (error) {}
//     let name = null
//     try {
//       name = await items[i].$eval('.WIp6oT', (c) => c.textContent)
//     } catch (error) {}
//     let priceAll = {}
//     try {
//       const price = await items[i].$$eval('._4WS72q', (c) =>
//         c.map((e) => e.textContent)
//       )
//       console.log(price)
//       if (price.length === 1) {
//         priceAll.fromPrice = price[0]
//       }
//       if (price.length === 2) {
//         priceAll.fromPrice = price[0]
//         priceAll.toPrice = price[1]
//       }
//     } catch (error) {}
//     let stars = 0
//     try {
//       stars = (await items[i].$$('.shopee-rating-stars__star-wrapper')).length
//     } catch (error) {
//       console.log(error)
//     }
//     let soldNum = 0
//     try {
//       String.prototype.allReplace = function (obj) {
//         var retStr = this
//         for (var x in obj) {
//           retStr = retStr.replace(new RegExp(x, 'g'), obj[x])
//         }
//         return retStr
//       }
//       soldNum = (await items[i].$eval('.Gk3GBN', (c) => c.textContent))
//         .replace('Đã bán', '')
//         .trim()
//       if (soldNum.includes('k')) {
//         soldNum = parseFloat(soldNum.allReplace({ k: '', ',': '.' })) * 1000
//       } else soldNum = parseFloat(soldNum)
//     } catch (error) {}
//     let place = 0
//     try {
//       place = (await items[i].$eval('.v2FBvC', (c) => c.textContent))
//         .replace('__', '')
//         .trim()
//     } catch (error) {}
//     // let price={}
//     // for (let k = 0; k < price.length; k++) {
//     //     let data = await productInfo[i].$$eval('td', (c) => {
//     //       return [c[0].textContent, c[1].textContent]
//     //     })
//     //     info[data[0]] = data[1]
//     // }
//     console.log({ link, img, discount, name, priceAll, stars, soldNum, place })
//     datas.push({ link, img, discount, name, priceAll, stars, soldNum, place })
//   }
//   return datas
// }
async function getData(productName, limit, newest, order) {
  let datas = await axios.get(
    `https://shopee.vn/api/v4/search/search_items?by=relevancy&keyword=${productName}&limit=${limit}&newest=${newest}&order=${order}&page_type=search&scenario=PAGE_CATEGORY_SEARCH&version=2`
  )
  datas = datas.data.items
  // console.log(datas)
  const result = []
  for (let i = 0; i < datas.length; i++) {
    try {
      const data = await axios.get(
        `https://shopee.vn/api/v4/item/get?itemid=${datas[i].item_basic.itemid}&shopid=${datas[i].item_basic.shopid}`
      )
      result.push(data.data)
      console.log(data.data)
    } catch (error) {
      console.log(error)
    }
  }
  return result
}
async function getDataTiki(page) {
  const items = await page.$$('.column')
  // res.json(item)
  console.log(items)
  console.log(items.length)
  let datas = []

  for (let i = 0; i < items.length; i++) {
    const elements = await items[i].$$('div')
    const promises = []
    for (let k = 0; k < elements.length; k++) {
      let link = null
      try {
        link = await elements[k].$eval('a', (c) =>
          c.getAttribute('data-view-content')
        )
        const obj = JSON.parse(link)
        // promises.push(
        //   axios.get('https://tiki.vn/api/v2/products/' + obj.click_data.id)
        //   // obj.click_data.id
        // )
        const data = await axios.get(
          'https://tiki.vn/api/v2/products/' + obj.click_data.id
        )
        datas.push(data.data)
      } catch (err) {}
      // let img = null
      // try {
      //   img = await elements[k].$eval('.image-wrapper img', (c) =>
      //     c.getAttribute('src')
      //   )
      // } catch (err) {}
      // let link = null
      // // await elements[k].waitForSelector('a', { visible: true })
      // try {
      //   link = await elements[k].$eval('a', (c) => {
      //     const TIKI_URL = 'https://tiki.vn/'
      //     return TIKI_URL + c.getAttribute('href')
      //   })
      // } catch (err) {}
      // let name = null
      // try {
      //   name = await elements[k].$eval('.info .name', (c) => c.textContent)
      // } catch (err) {}
      // let stars = null
      // try {
      //   stars = (await elements[k].$$('.total svg')).length
      // } catch (err) {}
      // let soldNum = null
      // try {
      //   soldNum = await elements[k].$eval(
      //     '.styles__StyledQtySold-sc-1d2j18q-2 hsElCw',
      //     (c) => c.textContent
      //   )
      // } catch (err) {}
      // let price = null
      // try {
      //   price = await elements[k].$eval(
      //     '.price-discount__price',
      //     (c) => c.innerText
      //   )
      // } catch (err) {
      //   console.log(err)
      // }
      // let discount = null
      // try {
      //   discount = await elements[k].$eval(
      //     '.price-discount__discount',
      //     (c) => c.textContent
      //   )
      // } catch (err) {}
      // datas.push({ img, link, name, stars, soldNum, price, discount })
    }
    // axios
    //   .all(promises)
    //   .then(
    //     axios.spread((...responses) => {
    //       datas = responses.map((a) => a.data)
    //       return datas
    //     })
    //   )
    //   .catch((errors) => {
    //     console.log(errors)
    //   })
  }
  return datas
}
async function scroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      // Adjust as necessary
      const y = 500,
        speed = 500
      let heightScrolled = 0

      let intervalID = setInterval(() => {
        window.scrollBy(0, y)
        heightScrolled += y
        if (heightScrolled >= document.body.scrollHeight) {
          resolve()
        }
      }, speed)
      setTimeout(function () {
        clearInterval(intervalID)
      }, 10000) // stop it after 10second
    })
  })
}
module.exports = { getProducts, shopeeProducts, tikiProducts }
