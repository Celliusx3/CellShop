import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { Context as AuthContext } from '../../context/AuthContext';
import { Context as CartContext } from '../../context/CartContext';
import useCarts from "../useCarts";
import * as dataProvider from "../../../data/apis/firebase/firebaseDataProvider";
import ErrorResponse from '../../../data/models/responses/ErrorResponse';

const mockRemoveFromCart = jest.fn();
const mockClearCart = jest.fn();
const mockNavigate = jest.fn();

const mockResponseSuccess = () => {
  return Promise.resolve("Success")
}

const mockResponseReject = () => {
  return Promise.reject(new ErrorResponse(100, "Error Rejected"))
}

jest.mock("@react-navigation/native", () => {
  const actualNav = jest.requireActual("@react-navigation/native");
  return {
    ...actualNav,
    useNavigation: () => ({
      dispatch: mockNavigate,
    }),
  };
});

const AuthProvider = ({ children }) => (
  <AuthContext.Provider value={{ state: { user: { authToken: "AuthToken", userId: "UserId" } }}}>{children}</AuthContext.Provider>
);

const CartProvider = ({ children }) => (
  <CartContext.Provider value={{ state: {items: {}, totalAmount: 0.0}, clearCart: mockClearCart, removeFromCart: mockRemoveFromCart }}>{children}</CartContext.Provider>
);

const wrapper = ({ children }) => (
  <AuthProvider>
    <CartProvider>
      {children}
    </CartProvider>
  </AuthProvider>
);

const addOrderApi = async () => {
  try {
    setLoading(true);
    await callApi({cartItems: carts});
    setLoading(false);
    clearCart()
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          { 
            name: 'Main',
            state: {
              routes: [
                {
                  name: "Orders",
                }
              ]
            }
          },
        ],
      })
    );
  } catch (err) {
    setLoading(false);
    setError(err.message);
  }
}

afterAll(() => {
  dataProvider.addOrder.mockClear();
});

describe('useCarts', () => {
  it('remove items from carts', () => {
    const { result } = renderHook(() => useCarts(), { wrapper })
    result.current[5](50)
    expect(mockRemoveFromCart.mock.calls.length).toBe(1);
  });

  test('if add order success', async () => {
    const mock = jest.spyOn(dataProvider, "addOrder");
    mock.mockImplementation(() => mockResponseSuccess()); 
    const { result, waitForNextUpdate } = renderHook(() => useCarts(), { wrapper });

    act(() => {
      result.current[4]();
    });

    expect(result.current[1]).toBe(0);
    expect(result.current[2]).toBe("");
    expect(result.current[3]).toBe(true);

    await waitForNextUpdate();

    expect(result.current[1]).toBe(0);
    expect(result.current[2]).toBe("");
    expect(result.current[3]).toBe(false);
    expect(mockNavigate.mock.calls.length).toBe(1);
  });

  test('if add order failed', async () => {
    const mock = jest.spyOn(dataProvider, "addOrder");
    mock.mockImplementation(() => mockResponseReject()); 
    const { result, waitForNextUpdate } = renderHook(() => useCarts(), { wrapper });

    act(() => {
      result.current[4]();
    });

    expect(result.current[1]).toBe(0);
    expect(result.current[2]).toBe("");
    expect(result.current[3]).toBe(true);

    await waitForNextUpdate();

    expect(result.current[1]).toBe(0);
    expect(result.current[2]).toBe("Error Rejected");
    expect(result.current[3]).toBe(false);
  });
});