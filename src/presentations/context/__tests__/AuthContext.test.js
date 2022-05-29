import { Provider as AuthProvider, Context as AuthContext } from '../../context/AuthContext';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { View, Text, TouchableOpacity } from "react-native";
import React, { useContext } from 'react';
import * as SecureStore from 'expo-secure-store';
import AuthResponse from '../../../data/models/responses/AuthResponse';
import * as dataProvider from "../../../data/apis/firebaseAuth/firebaseAuthDataProvider";
import ErrorResponse from '../../../data/models/responses/ErrorResponse';


const authResponse = new AuthResponse("idToken", "refreshToken", "expiresIn", "userId");

const mockSuccess = () => {
  return Promise.resolve("Success");
}

const mockGetAuthStringSuccess = () => {
  return Promise.resolve(JSON.stringify(authResponse));
}

const mockGetAuthSuccess = () => {
  return Promise.resolve(authResponse);
}

const mockGetAuthEmpty = () => {
  return Promise.resolve(null);
}

const mockGetAuthFailed = () => {
  return Promise.reject(new ErrorResponse(401, "Error"));
}

const mockDeleteItemSuccess = jest.fn(mockSuccess);
const mockGetItemSuccess = jest.fn(mockGetAuthStringSuccess);
const mockGetItemEmpty = jest.fn(mockGetAuthEmpty);
const mockRefreshUserSuccess = jest.fn(mockGetAuthSuccess);
const mockSetItemSuccess = jest.fn(mockSuccess);

beforeEach(() => {
  mockDeleteItemSuccess.mockClear();
  mockGetItemSuccess.mockClear();
  mockGetItemEmpty.mockClear();
  mockRefreshUserSuccess.mockClear();
  mockSetItemSuccess.mockClear();
})

const TestComponent = () => {
  const { state: { user }, signIn, signOut, signUp, autoLogin, refreshUser } = useContext(AuthContext);
  return (
    <View>
      <Text testID="user">{JSON.stringify(user)}</Text>
      <TouchableOpacity testID="signIn" onPress={() => signIn({email: "email", password: "password"})}>Sign in</TouchableOpacity>
      <TouchableOpacity testID="signOut" onPress={() => signOut()}>Sign out</TouchableOpacity>
      <TouchableOpacity testID="signUp" onPress={() => signUp({email: "email", password: "password"})}>Sign up</TouchableOpacity>
      <TouchableOpacity testID="autoLogin" onPress={() => autoLogin()}>Auto login</TouchableOpacity>
      <TouchableOpacity testID="refreshUser" onPress={() => refreshUser()}>Refresh user</TouchableOpacity>
    </View>
  );
};

describe('AuthContext', () => {
  test('sign out', async () => {
    jest.spyOn(SecureStore, "deleteItemAsync").mockImplementation(mockDeleteItemSuccess);

    const wrapper = ({children}) => (
      <AuthProvider>
        {children}
      </AuthProvider>
    );

    const {getByTestId, getByText, queryByTestId, toJSON} = render(<TestComponent/>, {wrapper});
    const signOut = getByTestId('signOut');
    fireEvent.press(signOut);
    
    const user = getByTestId('user');

    expect(mockDeleteItemSuccess.mock.calls.length).toBe(1);
    await waitFor(() => expect(user.props.children).toBe("null"));
  })

  test('auto login and success', async () => {
    jest.spyOn(SecureStore, "getItemAsync").mockImplementation(mockGetItemSuccess);

    const wrapper = ({children}) => (
      <AuthProvider>
        {children}
      </AuthProvider>
    );

    const {getByTestId, getByText, queryByTestId, toJSON} = render(<TestComponent/>, {wrapper});
    const autoLogin = getByTestId('autoLogin');
    fireEvent.press(autoLogin);
    
    const user = getByTestId('user');

    expect(mockGetItemSuccess.mock.calls.length).toBe(1);
    await waitFor(() => expect(user.props.children).toBe(JSON.stringify(authResponse)));
  })

  test('auto login and failed', async () => {
    jest.spyOn(SecureStore, "getItemAsync").mockImplementation(mockGetItemEmpty);

    const wrapper = ({children}) => (
      <AuthProvider>
        {children}
      </AuthProvider>
    );

    const {getByTestId, getByText, queryByTestId, toJSON} = render(<TestComponent/>, {wrapper});
    const autoLogin = getByTestId('autoLogin');
    fireEvent.press(autoLogin);
    
    const user = getByTestId('user');

    expect(mockGetItemEmpty.mock.calls.length).toBe(1);
    await waitFor(() => expect(user.props.children).toBe("null"));
  })

  test('refresh user and success', async () => {
    jest.spyOn(SecureStore, "getItemAsync").mockImplementation(mockGetItemSuccess);
    jest.spyOn(dataProvider, "refreshUser").mockImplementation(mockRefreshUserSuccess);
    jest.spyOn(SecureStore, "setItemAsync").mockImplementation(mockSetItemSuccess);

    const wrapper = ({children}) => (
      <AuthProvider>
        {children}
      </AuthProvider>
    );

    const {getByTestId, getByText, queryByTestId, toJSON} = render(<TestComponent/>, {wrapper});
    const refreshUser = getByTestId('refreshUser');
    fireEvent.press(refreshUser);
    
    const user = getByTestId('user');

    await waitFor(() => expect(user.props.children).toBe(JSON.stringify(authResponse)));
  })

  test('sign in and success', async () => {
    jest.spyOn(dataProvider, "signIn").mockImplementation(mockRefreshUserSuccess);
    jest.spyOn(SecureStore, "setItemAsync").mockImplementation(mockSetItemSuccess);

    const wrapper = ({children}) => (
      <AuthProvider>
        {children}
      </AuthProvider>
    );

    const {getByTestId, getByText, queryByTestId, toJSON} = render(<TestComponent/>, {wrapper});
    const signIn = getByTestId('signIn');
    fireEvent.press(signIn);
    
    const user = getByTestId('user');

    await waitFor(() => expect(user.props.children).toBe(JSON.stringify(authResponse)));
  })

  test('sign up and success', async () => {
    jest.spyOn(dataProvider, "signUp").mockImplementation(mockRefreshUserSuccess);
    jest.spyOn(SecureStore, "setItemAsync").mockImplementation(mockSetItemSuccess);

    const wrapper = ({children}) => (
      <AuthProvider>
        {children}
      </AuthProvider>
    );

    const {getByTestId, getByText, queryByTestId, toJSON} = render(<TestComponent/>, {wrapper});
    const signUp = getByTestId('signUp');
    fireEvent.press(signUp);
    
    const user = getByTestId('user');

    await waitFor(() => expect(user.props.children).toBe(JSON.stringify(authResponse)));
  })
});