import  { useEffect, useState, useContext } from "react";
import { fetchOrders as fetchOrdersFromApi } from "../../data/apis/firebase/firebaseDataProvider";
import useApi from "./useApi";
import { Context as OrdersContext } from "../context/OrdersContext";

export default () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [ callApi ] = useApi({api: fetchOrdersFromApi});
  const { state:{shouldRefresh}, updateOrderRefresh } = useContext(OrdersContext);


  const fetchOrdersApi = async () => {
    try {
      setLoading(true);
      const response = await callApi();
      updateOrderRefresh(false)
      setOrders(response);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }
  
  useEffect(() => {
    if (shouldRefresh) {
      fetchOrdersApi();
    }
  }, [shouldRefresh])

  return [orders, loading, error, fetchOrdersApi];
}