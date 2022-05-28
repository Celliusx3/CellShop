import axios from "axios";
import {FIREBASE_AUTH_URL, FIREBASE_AUTH_API_KEY} from "@env";
import SignInRequest from "../../models/requests/SignInRequest";
import SignUpRequest from "../../models/requests/SignUpRequest";
import RefreshUserRequest from "../../models/requests/RefreshUserRequest";
import ErrorResponse from "../../models/responses/ErrorResponse";
import AuthResponse from "../../models/responses/AuthResponse";

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
    return new AuthResponse(idToken, refreshToken, expiresIn, localId);
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
    return new AuthResponse(idToken, refreshToken, expiresIn, localId);
  } catch(error){
    const {code, message} = error.response.data.error
    throw new ErrorResponse(code, message);
  }
}

export const refreshUser = async ({refreshToken}) => {
  try{
    const requestParams = new RefreshUserRequest(refreshToken);
    const response = await firebaseAuthApi.post(`/v1/token`, requestParams);
    const {data: {id_token, refresh_token, expires_in, user_id}} = response;
    return new AuthResponse(id_token, refresh_token, expires_in, user_id);
  } catch(error){
    const {code, message} = error.response.data.error
    throw new ErrorResponse(code, message);
  }
}