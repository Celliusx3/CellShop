import  { useState, useContext } from "react";
import { Context as AuthContext } from "../context/AuthContext";


export default () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { signUp } = useContext(AuthContext);

  const signUpApi = async ({email, password}) => {
    try {
      setError("");
      setLoading(true);
      await signUp({email, password});
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  }

  return [loading, error, signUpApi]
}