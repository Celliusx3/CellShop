import { signIn as authSignIn, signUp as authSignUp, refreshUser as authRefreshUser } from "../../data/apis/firebaseAuth/firebaseAuthDataProvider";
import * as SecureStore from 'expo-secure-store';
import createDataContext from "./createDataContext";

const storageUser = "storage_user";

const actionAuthenticate = "action_authenticate";
const actionSignOut = "action_sign_out";

const authReducer = (state, action) => {
  switch (action.type) {
    case actionAuthenticate:
      return {...state, user: action.payload};
    case actionSignOut:
      return {...state, user: null};
    default:
      return state;
  }
}

const signUp = (dispatch) => async ({email, password}) => {
  try {
    const response = await authSignUp({email, password});
    await SecureStore.setItemAsync(storageUser, JSON.stringify(response));
    dispatch({ type: actionAuthenticate, payload: response });
  } catch (err) {
    throw err;
  }
}

const refreshUser = (dispatch) => async () => {
  try {
    const user = await SecureStore.getItemAsync(storageUser);
    const authData = JSON.parse(user);
    const {refreshToken} = authData
    const response = await authRefreshUser({ refreshToken });
    await SecureStore.setItemAsync(storageUser, JSON.stringify(response));
    dispatch({ type: actionAuthenticate, payload: response });
  } catch (err) {
    dispatch({ type: actionAuthenticate, payload: null });
  }
}

const signIn = (dispatch) => async ({email, password}) => {
  try {
    const response = await authSignIn({email, password});
    await SecureStore.setItemAsync(storageUser, JSON.stringify(response));
    dispatch({ type: actionAuthenticate, payload: response });
  } catch (err) {
    throw err;
  }
}

const signOut = (dispatch) => async () => {
  await SecureStore.deleteItemAsync(storageUser);
  dispatch({ type: actionSignOut });
}

const autoLogin = (dispatch) => async () => {
  try {
    const response = await SecureStore.getItemAsync(storageUser);  
    const authData = JSON.parse(response);
    dispatch({ type: actionAuthenticate, payload: authData });
  } catch (err) {
    console.log(err)
    dispatch({ type: actionAuthenticate, payload: null });
  }
}

export const { Provider, Context } = createDataContext(
  authReducer, 
  { signIn, signOut, signUp, autoLogin, refreshUser },
  { user: null }
)