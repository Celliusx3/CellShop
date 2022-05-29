import React from 'react';
import { renderHook } from '@testing-library/react-hooks'
import useApi from "../useApi";
import { Context as AuthContext } from '../../context/AuthContext';
import ErrorResponse from '../../../data/models/responses/ErrorResponse';

const mockResponseSuccess = () => {
  return Promise.resolve("Success");
}

const mockResponseRejectNotAuth = () => {
  return Promise.reject(new ErrorResponse(401, "Error Rejected"));
}

const mockResponseReject = () => {
  return Promise.reject(new ErrorResponse(100, "Error Rejected"));
}

const AuthProvider = ({ children, refreshUser = null, signOut = null }) => {
  return (
    <AuthContext.Provider value={{ 
      state: { user: { authToken: "AuthToken", userId: "UserId" }},  
      refreshUser: refreshUser, 
      signOut: signOut
    }}>{children}</AuthContext.Provider>
  );
};

describe('useApi', () => {
  test('if success', async () => {
    const wrapper = ({ children}) => (
      <AuthProvider>
        {children}
      </AuthProvider>
    );

    const { result } = renderHook(() => useApi({api: mockResponseSuccess}), { wrapper });
    await expect(result.current[0]()).resolves.toBe('Success');
  });

  test('if failed random error', async () => {
    const wrapper = ({ children}) => (
      <AuthProvider>
        {children}
      </AuthProvider>
    );

    const { result } = renderHook(() => useApi({api: mockResponseReject}), { wrapper });

    expect(async () => {
      await result.current[0]()
    }).rejects.toThrow();
  });

  test('if failed not authorised and refresh and success', async () => {
    let hasRefreshed = false;
    const mockApiCall = () => {
      if (!hasRefreshed)
        return mockResponseRejectNotAuth()
      else 
        return mockResponseSuccess()
    }
    const wrapper = ({ children}) => (
      <AuthProvider 
        refreshUser={() => {hasRefreshed = true}}>
        {children}
      </AuthProvider>
    );

    const { result } = renderHook(() => useApi({api: mockApiCall}), { wrapper });
    await expect(result.current[0]()).resolves.toBe('Success');
  });

  test('if failed not authorised and signout', async () => {
    const mockSignOut = jest.fn();

    const wrapper = ({ children}) => (
      <AuthProvider 
        signOut={mockSignOut}>
        {children}
      </AuthProvider>
    );

    const { result } = renderHook(() => useApi({api: mockResponseRejectNotAuth}), { wrapper });
    await result.current[0](null, false);
    expect(mockSignOut.mock.calls.length).toBe(1);
  });
});