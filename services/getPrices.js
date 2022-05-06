const getPrice = (price) => {
  if (price.includes('-')) {
    price = price.split('-')
    console.log('has -: ', price)

    return {
      fromPrice: parseInt(price[0].replace('đ').trim()),
      toPrice: parseInt(price[1].replace('đ').trim()),
    }
  } else {
    price = price.replace('.', '').replace(/\D/g, ' ').trim().split(' ')
    console.log('has đ: ', price)
    return {
      fromPrice: parseInt(price[0].trim()),
      toPrice: parseInt(price[1].trim()),
    }
  }
}
module.exports = { getPrice }
