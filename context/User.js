// react / next
// import { useRouter } from 'next/router';
import React, { useContext, useState, useEffect, useRef } from 'react';

const mainContext = React.createContext({
  authState: {},
  login: () => {},
  logout: () => {},
});

export function useMainContext() {
  return useContext(mainContext);
}

export function UserContextProvider({ children }) {
  // USER AUTHENTICATION
  const [authState, setAuthState] = useState({
    name: '',
    email: '',
    token: '',
    isAdmin: '',
    stripeId: '',
  });

  console.log(authState);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('nappitello-user') !== null) {
        setAuthState(JSON.parse(localStorage.getItem('nappitello-user')));
        // setAdminState(JSON.parse(localStorage.getItem('nappi-admin-auth')));
      }
    }
  }, []);

  const loginHandler = (name, email, token, isAdmin, stripeId) => {
    //  saves the credentials in local storage and in the state
    // localStorage.setItem('token', token);

    // console.log(username, email, token, isAdmin);

    localStorage.setItem(
      'nappitello-user',
      JSON.stringify({
        name,
        email,
        token,
        isAdmin,
        stripeId,
      })
    );

    setAuthState({
      name,
      email,
      token,
      isAdmin,
      stripeId,
    });
  };

  const logoutHandler = () => {
    // localStorage.removeItem('token');
    localStorage.removeItem('nappitello-user');
    setAuthState({
      name: '',
      email: '',
      token: '',
      isAdmin: '',
      stripeId: '',
    });
  };

  const value = {
    authState: authState,
    login: loginHandler,
    logout: logoutHandler,
  };

  return <mainContext.Provider value={value}>{children}</mainContext.Provider>;
}
