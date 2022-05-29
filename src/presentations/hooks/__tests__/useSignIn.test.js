import { renderHook, act } from '@testing-library/react-hooks';
import useSignIn from "../useSignIn";
import ErrorResponse from '../../../data/models/responses/ErrorResponse';
import { Context as AuthContext } from '../../context/AuthContext';
import AuthResponse from '../../../data/models/responses/AuthResponse';

const mockResponseSuccess = () => {
  return Promise.resolve(new AuthResponse("idToken", "refreshToken", "expiresIn", "userId"))
}

const mockResponseReject = () => {
  return Promise.reject(new ErrorResponse(100, "Error Rejected"))
}

const mockSignInSuccess = jest.fn(mockResponseSuccess);
const mockSignInReject = jest.fn(mockResponseReject);

describe('useSignIn', () => {
  test('if sign in success', async () => {
    const AuthProvider = ({ children }) => (
      <AuthContext.Provider value={{signIn: mockSignInSuccess}}>{children}</AuthContext.Provider>
    );
    
    const wrapper = ({ children }) => (
      <AuthProvider>{children}</AuthProvider>
    ); 

    const { result, waitForNextUpdate } = renderHook(() => useSignIn(), { wrapper });

    act(() => {
      result.current[2]({email: "email", password: "password"})
    });

    expect(result.current[1]).toEqual("");
    expect(result.current[0]).toBe(true);  
    
    expect(mockSignInSuccess.mock.calls.length).toBe(1);
  });

  test('if sign in failed', async () => {
    const AuthProvider = ({ children }) => (
      <AuthContext.Provider value={{signIn: mockSignInReject}}>{children}</AuthContext.Provider>
    );
    
    const wrapper = ({ children }) => (
      <AuthProvider>{children}</AuthProvider>
    ); 

    const { result, waitForNextUpdate } = renderHook(() => useSignIn(), { wrapper });

    act(() => {
      result.current[2]({email: "email", password: "password"});
    });

    expect(result.current[0]).toBe(true);
    expect(result.current[1]).toEqual("");

    await waitForNextUpdate();

    expect(mockSignInReject.mock.calls.length).toBe(1);
    expect(result.current[0]).toBe(false);
    expect(result.current[1]).toEqual("Error Rejected");

  });
});