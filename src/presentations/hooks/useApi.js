import  { useContext, useRef } from "react";
import { Context as AuthContext } from "../context/AuthContext";

const notAuthorised = 401

export default ({ api }) => {
  const { state: { user }, signOut, refreshUser } = useContext(AuthContext);
  const ref = useRef({}).current;
  ref.value = user;
  
  const callApi = async (data, handleNotAuthorised = true) => {
    try {
      const  {authToken, userId} = ref.value
      const latestApi = api.bind(null, { accessToken: authToken, userId, ...data});
      return await latestApi();
    } catch (err) {
      if (err.code == notAuthorised) {
        if (handleNotAuthorised) {
          await refreshUserApi();
          return await(callApi(data, false))
        } else {
          signOut()
        }
      } else {
        throw err
      }
    }
  }

  const refreshUserApi = async () => {
    try {
      await refreshUser()
    } catch (err) {
      throw err
    }
  }

  return [callApi];
}