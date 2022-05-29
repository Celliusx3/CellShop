import React from 'react';
import { renderHook } from '@testing-library/react-hooks'
import useOrder from "../useOrder";
import { Context as AuthContext } from '../../context/AuthContext';
import * as dataProvider from "../../../data/apis/firebase/firebaseDataProvider";
import OrderItemResponse from "../../../data/models/responses/OrderItemResponse";
import OrderResponse from "../../../data/models/responses/OrderResponse";
import ErrorResponse from '../../../data/models/responses/ErrorResponse';

const mockResponseSuccess = () => {
  const item1 = new OrderItemResponse (
    "1",
    "Shirt",
    "https://img.png",
    5,
    10
  )
  
  const item2 = new OrderItemResponse (
    "2",
    "Shoes",
    "https://img.png",
    10,
    10
  )

  const item3 = new OrderItemResponse (
    "3",
    "Pants",
    "https://img.png",
    7,
    10
  )

  return Promise.resolve(new OrderResponse("1", [item1, item2, item3]))
}

const mockResponseReject = () => {
  return Promise.reject(new ErrorResponse(100, "Error Rejected"))
}

const AuthProvider = ({ children }) => (
  <AuthContext.Provider value={{ state: { user: { authToken: "AuthToken", userId: "UserId" } }}}>{children}</AuthContext.Provider>
);

const wrapper = ({ children }) => (
  <AuthProvider>{children}</AuthProvider>
);

afterAll(() => {
  dataProvider.fetchOrder.mockClear();
});

describe('useOrder', () => {
  test('if fetch order success', async () => {
    const mock = jest.spyOn(dataProvider, "fetchOrder");
    mock.mockImplementation(() => mockResponseSuccess()); 

    const { result, waitForNextUpdate } = renderHook(() => useOrder(1), { wrapper })

    expect(result.current[1]).toBe(true)

    await waitForNextUpdate()

    expect(result.current[0]).toHaveLength(3)
    expect(result.current[1]).toBe(false)
    expect(result.current[2]).toEqual("")
  });

  test('if fetch order failed', async () => {
    const mock = jest.spyOn(dataProvider, "fetchOrder");
    mock.mockImplementation(() => mockResponseReject()); 
    const { result, waitForNextUpdate } = renderHook(() => useOrder(1), { wrapper })

    expect(result.current[1]).toBe(true)

    await waitForNextUpdate()

    expect(result.current[0]).toHaveLength(0)
    expect(result.current[1]).toBe(false)
    expect(result.current[2]).toEqual("Error Rejected")

  });
});