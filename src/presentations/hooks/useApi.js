import  { useContext } from "react";
import { Context as AuthContext } from "../context/AuthContext";

export default ({ api }) => {
  const { state: { user: {authToken, userId} } } = useContext(AuthContext);

  const callApi = async (data) => {
    try {
      const latestApi = api.bind(null, { accessToken: authToken, userId, ...data});
      return await latestApi();
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  return [callApi];
}