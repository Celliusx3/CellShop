import  { useState, useContext } from "react";
import { Context as AuthContext } from "../context/AuthContext";


export default () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { signIn } = useContext(AuthContext);

  const signInApi = async ({email, password}) => {
    try {
      setError("");
      setLoading(true);
      await signIn({email, password});
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  }

  return [loading, error, signInApi]
}