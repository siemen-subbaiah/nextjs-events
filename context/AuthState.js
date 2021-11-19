import { useRouter } from 'next/router';
import React, { createContext, useEffect, useReducer } from 'react';
import { NEXT_URL } from '../config';
import { initialState, reducer } from './AuthReducer';

export const AuthContext = createContext();

const AuthState = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const router = useRouter();

  useEffect(() => checkUserLoggedIn(), []);

  // REGISTER!
  const register = async (user) => {
    const res = await fetch(`${NEXT_URL}/api/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    const data = await res.json();
    if (res.ok) {
      dispatch({ type: 'REGISTER', payload: data });
      router.push('/account/dashboard');
    } else {
      dispatch({ type: 'ERROR', payload: data.message });
    }
  };

  //   LOGIN!
  const login = async (user) => {
    const res = await fetch(`${NEXT_URL}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    const data = await res.json();
    if (res.ok) {
      dispatch({ type: 'LOGIN', payload: data });
      router.push('/account/dashboard');
    } else {
      dispatch({ type: 'ERROR', payload: data.message });
    }
  };

  const checkUserLoggedIn = async () => {
    const res = await fetch(`${NEXT_URL}/api/user`);
    const data = await res.json();
    if (res.ok) {
      dispatch({ type: 'USER_PERSISTENCE', payload: data });
    } else {
      dispatch({ type: 'USER_NULL' });
    }
  };

  const logout = async () => {
    const res = await fetch(`${NEXT_URL}/api/logout`, {
      method: 'POST',
    });
    if (res.ok) {
      dispatch({ type: 'USER_NULL' });
      router.push('/');
    }
  };

  return (
    <AuthContext.Provider
      value={{ ...state, login, register, logout, checkUserLoggedIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
