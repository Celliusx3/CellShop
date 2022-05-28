export default class OrderItemResponse {
  constructor(productId, name, imageUrl, price, quantity) {
    this.productId = productId;
    this.name = name;
    this.imageUrl = imageUrl;
    this.price = price;
    this.quantity = quantity;
    this.totalPrice = this.quantity * this.price;
  }
}