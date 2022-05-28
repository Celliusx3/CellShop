export default class CartItem {
  constructor(productId, productName, productImage, productPrice, quantity, totalPrice) {
    this.productId = productId
    this.productName = productName
    this.productImage = productImage
    this.productPrice = productPrice
    this.quantity = quantity
    this.totalPrice = totalPrice
  }
}