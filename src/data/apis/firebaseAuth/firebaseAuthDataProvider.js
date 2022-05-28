import axios from "axios";
import {FIREBASE_AUTH_URL, FIREBASE_AUTH_API_KEY} from "@env";
import SignInRequest from "../../models/requests/SignInRequest";
import SignUpRequest from "../../models/requests/SignUpRequest";
import SignInResponse from "../../models/responses/SignInResponse";
import ErrorResponse from "../../models/responses/ErrorResponse";
import SignUpResponse from "../../models/responses/SignUpResponse";

const firebaseAuthApi = axios.create({
  baseURL:FIREBASE_AUTH_URL
});

firebaseAuthApi.interceptors.request.use(config => {
  config.params = {
   key: FIREBASE_AUTH_API_KEY,
    ...config.params,
  };
  return config;
});

export const signIn = async ({email, password}) => {
  try{
    const requestParams = new SignInRequest(email, password);
    const response = await firebaseAuthApi.post(`/v1/accounts:signInWithPassword`, requestParams);
    const {data: {idToken, refreshToken, expiresIn, localId}} = response;
    return new SignInResponse(idToken, refreshToken, expiresIn, localId);
  }catch(error){
    const {code, message} = error.response.data.error
    throw new ErrorResponse(code, message);
  }
}

export const signUp = async ({email, password}) => {
  try{
    const requestParams = new SignUpRequest(email, password);
    const response = await firebaseAuthApi.post(`/v1/accounts:signUp`, requestParams);
    const {data: {idToken, refreshToken, expiresIn, localId}} = response;
    return new SignUpResponse(idToken, refreshToken, expiresIn, localId);
  } catch(error){
    const {code, message} = error.response.data.error
    throw new ErrorResponse(code, message);
  }
}