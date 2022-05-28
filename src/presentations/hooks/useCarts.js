import  { useState, useContext } from "react";
import { Context as CartContext } from "../context/CartContext";
import { Context as OrdersContext } from "../context/OrdersContext";
import { useNavigation } from "@react-navigation/native";
import { addOrder as addOrderFromApi } from "../../data/apis/firebase/firebaseDataProvider";
import useApi from "./useApi";

export default () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { state:{items, totalAmount}, removeFromCart, clearCart } = useContext(CartContext);
  const { updateOrderRefresh } = useContext(OrdersContext);
  const [ callApi ] = useApi({api: addOrderFromApi});
  const navigation = useNavigation();
  const carts = Object.values(items);

  const addOrderApi = async () => {
    try {
      setLoading(true);
      await callApi({cartItems: carts});
      setLoading(false);
      clearCart()
      updateOrderRefresh(true)
      navigation.navigate("Orders");
    } catch (err) {
      console.log(err)
      setLoading(false);
      setError(err.message);
    }
  }

  const removeItemsApi = async (productId) => {
    removeFromCart(productId);
  }

  return [carts, totalAmount, error, loading, addOrderApi, removeItemsApi]
}