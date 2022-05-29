import React from 'react';
import { renderHook } from '@testing-library/react-hooks'
import useProducts from "../useProducts";
import { Context as AuthContext } from '../../context/AuthContext';
import * as dataProvider from "../../../data/apis/firebase/firebaseDataProvider";
import ErrorResponse from '../../../data/models/responses/ErrorResponse';
import ProductResponse from '../../../data/models/responses/ProductResponse';

const mockResponseSuccess = () => {
  const item1 = new ProductResponse (
    "1",
    "Shirt",
    "https://img.png",
    "Red Shirt",
    5,
  )
  
  const item2 = new ProductResponse (
    "2",
    "Shoes",
    "https://img.png",
    "Blue Shoes",
    10,
  )

  const item3 = new ProductResponse (
    "3",
    "Pants",
    "https://img.png",
    7,
    10
  )

  return Promise.resolve([item1, item2, item3])
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
  dataProvider.fetchProducts.mockClear();
});

describe('useProducts', () => {
  test('if fetch products success', async () => {
    const mock = jest.spyOn(dataProvider, "fetchProducts");
    mock.mockImplementation(() => mockResponseSuccess()); 

    const { result, waitForNextUpdate } = renderHook(() => useProducts(), { wrapper })

    expect(result.current[1]).toBe(true)

    await waitForNextUpdate()

    expect(result.current[0]).toHaveLength(3)
    expect(result.current[1]).toBe(false)
    expect(result.current[2]).toEqual("")
  });

  test('if fetch orders failed', async () => {
    const mock = jest.spyOn(dataProvider, "fetchProducts");
    mock.mockImplementation(() => mockResponseReject()); 
    const { result, waitForNextUpdate } = renderHook(() => useProducts(), { wrapper })

    expect(result.current[1]).toBe(true)

    await waitForNextUpdate()

    expect(result.current[0]).toHaveLength(0)
    expect(result.current[1]).toBe(false)
    expect(result.current[2]).toEqual("Error Rejected")

  });
});

// return [orders, loading, error, fetchOrdersApi];
