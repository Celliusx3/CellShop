import axios from "axios";
import ProductResponse from "../../models/responses/ProductResponse";
import {FIREBASE_URL} from "@env";
import ErrorResponse from "../../models/responses/ErrorResponse";
import OrderItemResponse from "../../models/responses/OrderItemResponse";
import OrderResponse from "../../models/responses/OrderResponse";

const firebaseApi = axios.create({
  baseURL:FIREBASE_URL
});

export const fetchProducts = async ({ accessToken }) => {
  try{
    const response = await firebaseApi.get(`/products.json`, {params: { auth: accessToken }});
    const {data} = response;
    const loadedProducts = [];
    for (const key in data) {
      const res = data[key];
      loadedProducts.push(
        new ProductResponse(
          key,
          res["name"],
          res["imageUrl"],
          res["description"],
          res["price"]
        )
      );
    }

    return loadedProducts;
  }catch(error){
    const { status, data } = error.response;
    throw new ErrorResponse(status, data.error);
  }
}

export const addOrder = async ({ accessToken, userId, cartItems }) => {
  try{
    const requestParams = { cartItems };
    const response = await firebaseApi.post(`/orders/${userId}.json`, 
      requestParams, 
      {
        params: { auth: accessToken }
      }
    );
    const {data} = response;
    return data;
  }catch(error){
    const { status, data } = error.response;
    throw new ErrorResponse(status, data.error);
  }
}

export const fetchOrders = async ({accessToken, userId}) => {
  try{
    const response = await firebaseApi.get(`/orders/${userId}.json`, 
      {
        params: { auth: accessToken }
      }
    );
    
    const {data} = response;
    const loadedOrders = []
    for (const key in data) {
      const res = data[key]
      loadedOrders.push(
        new OrderResponse(
          key,
          res["cartItems"].map ( item => {
            return new OrderItemResponse(
              item["productId"], 
              item["productName"], 
              item["productImage"], 
              item["productPrice"], 
              item["quantity"],
            )
          })
        )
      )
    }

    return loadedOrders;
  }catch(error){
    const { status, data } = error.response;
    throw new ErrorResponse(status, data.error);
  }
}

export const fetchOrder = async ({accessToken, userId, orderId}) => {
  try{
    const response = await firebaseApi.get(`/orders/${userId}/${orderId}.json`,  
      {
        params: { auth: accessToken }
      }
    );
    const {data} = response;
    return new OrderResponse(
      orderId,
      data["cartItems"].map ( item => {
        return new OrderItemResponse(
          item["productId"], 
          item["productName"], 
          item["productImage"], 
          item["productPrice"], 
          item["quantity"]
        )
      })
    );
  }catch(error){
    const { status, data } = error.response;
    throw new ErrorResponse(status, data.error);
  }
}