import { renderHook, act } from '@testing-library/react-hooks';
import useSignUp from "../useSignUp";
import ErrorResponse from '../../../data/models/responses/ErrorResponse';
import { Context as AuthContext } from '../../context/AuthContext';
import AuthResponse from '../../../data/models/responses/AuthResponse';

const mockResponseSuccess = () => {
  return Promise.resolve(new AuthResponse("idToken", "refreshToken", "expiresIn", "userId"))
}

const mockResponseReject = () => {
  return Promise.reject(new ErrorResponse(100, "Error Rejected"))
}

const mockSignUpSuccess = jest.fn(mockResponseSuccess);
const mockSignUpReject = jest.fn(mockResponseReject);

describe('useSignUp', () => {
  test('if sign up success', async () => {
    const AuthProvider = ({ children }) => (
      <AuthContext.Provider value={{signUp: mockSignUpSuccess}}>{children}</AuthContext.Provider>
    );
    
    const wrapper = ({ children }) => (
      <AuthProvider>{children}</AuthProvider>
    ); 

    const { result, waitForNextUpdate } = renderHook(() => useSignUp(), { wrapper });

    act(() => {
      result.current[2]({email: "email", password: "password"})
    });

    expect(result.current[1]).toEqual("");
    expect(result.current[0]).toBe(true);  
    
    expect(mockSignUpSuccess.mock.calls.length).toBe(1);
  });

  test('if sign up failed', async () => {
    const AuthProvider = ({ children }) => (
      <AuthContext.Provider value={{signUp: mockSignUpReject}}>{children}</AuthContext.Provider>
    );
    
    const wrapper = ({ children }) => (
      <AuthProvider>{children}</AuthProvider>
    ); 

    const { result, waitForNextUpdate } = renderHook(() => useSignUp(), { wrapper });

    act(() => {
      result.current[2]({email: "email", password: "password"});
    });

    expect(result.current[0]).toBe(true);
    expect(result.current[1]).toEqual("");

    await waitForNextUpdate();

    expect(mockSignUpReject.mock.calls.length).toBe(1);
    expect(result.current[0]).toBe(false);
    expect(result.current[1]).toEqual("Error Rejected");

  });
});