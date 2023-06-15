// react / next
// import { useRouter } from 'next/router';
import React, { useContext, useState, useEffect, useRef } from 'react';
// libs
import axios from 'axios';

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

  // console.log(authState);

  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('nappitello-user') !== null) {
        setAuthState(JSON.parse(localStorage.getItem('nappitello-user')));
        // setAdminState(JSON.parse(localStorage.getItem('nappi-admin-auth')));
      }
    }
  }, []);

  const getCurrentUser = async (token) => {
    try {
      // console.log('Executing getCurrentUser()');
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/auth/current-user`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.success) {
        // setOk(true);
        setCurrentUser(data.user);
      }
    } catch (err) {
      //   router.push('/login');
      console.log(err);
    }
  };

  useEffect(() => {
    if (authState && authState.token.length > 0) {
      getCurrentUser(authState.token);
    }
  }, [authState]);

  // console.log(currentUser);

  const loginHandler = (name, email, token, isAdmin, stripeId) => {
    //  saves the credentials in local storage and in the state
    // localStorage.setItem('token', token);
    getCurrentUser(token);
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
    setCurrentUser(null);
  };

  const value = {
    authState: authState,
    currentUser,
    login: loginHandler,
    logout: logoutHandler,
  };

  return <mainContext.Provider value={value}>{children}</mainContext.Provider>;
}
