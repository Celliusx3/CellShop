import  { useEffect, useState } from "react";
import { fetchProducts as fetchProductsFromApi } from "../../data/apis/firebase/firebaseDataProvider";
import useApi from "./useApi";


export default () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [ callApi ] = useApi({api: fetchProductsFromApi});

  const fetchProductsApi = async () => {
    try {
      setLoading(true);
      const response = await callApi();
      setProducts(response);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProductsApi();
  }, [])

  return [products, loading, error, fetchProductsApi];
}