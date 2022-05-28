import  { useEffect, useState } from "react";
import { fetchOrder as fetchOrderFromApi } from "../../data/apis/firebase/firebaseDataProvider";
import CartItem from "../models/CartItem";
import useApi from "./useApi";

export default (orderId) => {
  const [orderItems, setOrderItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [ callApi ] = useApi({api: fetchOrderFromApi});
  
  const fetchOrderApi = async () => {
    try {
      setLoading(true);
      const response = await callApi({orderId});
      setOrderItems(response.orderItems.map(item => new CartItem(item.productId, item.name, item.imageUrl, item.price, item.quantity, item.totalPrice)));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }
  
  useEffect(() => {
    fetchOrderApi();
  }, [])

  return [orderItems, loading, error];
}