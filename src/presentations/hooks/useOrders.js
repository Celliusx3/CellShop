import  { useEffect, useState, useContext } from "react";
import { fetchOrders as fetchOrdersFromApi } from "../../data/apis/firebase/firebaseDataProvider";
import useApi from "./useApi";

export default () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [ callApi ] = useApi({api: fetchOrdersFromApi});


  const fetchOrdersApi = async () => {
    try {
      setLoading(true);
      const response = await callApi();
      setOrders(response);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }
  
  useEffect(() => {
    fetchOrdersApi();
  }, [])

  return [orders, loading, error, fetchOrdersApi];
}