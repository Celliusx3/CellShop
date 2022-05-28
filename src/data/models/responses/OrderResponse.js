export default class OrderResponse {
  constructor(id, orderItems) {
    this.id = id;
    this.orderItems = orderItems;
    this.totalPrice = orderItems.map(item => item.totalPrice).reduce((prev, curr) => prev + curr, 0);
  }
}