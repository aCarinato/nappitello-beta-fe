// react / next
import { useRouter } from 'next/router';
import React, { useContext, useState, useEffect, useRef } from 'react';
// libs
import axios from 'axios';

const userContext = React.createContext({
  authState: {},
  login: () => {},
  logout: () => {},
});

export function useMainContext() {
  return useContext(userContext);
}

export function UserContextProvider({ children }) {
  const router = useRouter();

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
    setCurrentUser(null);
    localStorage.removeItem('nappitello-user');
    setAuthState({
      name: '',
      email: '',
      token: '',
      isAdmin: '',
      stripeId: '',
    });
  };

  // DECODE TOKEN
  // a and b are javascript Date objects
  // function dateDiffInDays(a, b) {
  //   const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  //   // Discard the time and time-zone information.
  //   const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  //   const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  //   console.log(`utc1: ${utc1}`);
  //   console.log(`utc2: ${utc2}`);
  //   // can be used Math.round
  //   return Math.floor((utc1 - utc2) / _MS_PER_DAY);
  // }

  // function dateDiffInSeconds(a, b) {
  //   const _MS_PER_SECOND = 1000;
  //   // Discard the time and time-zone information.
  //   const utc1 = Date.UTC(
  //     a.getFullYear(),
  //     a.getMonth(),
  //     a.getDate(),
  //     a.getHours(),
  //     a.getMinutes(),
  //     a.getSeconds()
  //   );
  //   const utc2 = Date.UTC(
  //     b.getFullYear(),
  //     b.getMonth(),
  //     b.getDate(),
  //     b.getHours(),
  //     b.getMinutes(),
  //     b.getSeconds()
  //   );
  //   console.log(`utc1: ${utc1}`);
  //   console.log(`utc2: ${utc2}`);
  //   // Calculate the difference in seconds
  //   return Math.floor((utc2 - utc1) / _MS_PER_SECOND);
  // }

  // useEffect(() => {
  //   if (
  //     authState.token &&
  //     authState.token !== '' &&
  //     authState.token.length > 0
  //   ) {
  //     const decodedToken = jwt_decode(authState.token);
  //     console.log('I AM EXECUTING - THE CONTEXT TOKEN EXPIRY');

  //     const a = new Date(decodedToken.exp * 1000);
  //     const b = new Date();
  //     const difference = dateDiffInSeconds(a, b);
  //     console.log(difference + ' seconds');
  //     if (difference > -20) {
  //       console.log('Token expired');
  //       // logoutHandler();
  //       // location.reload();
  //       // router.push('/login');
  //     }
  //   }
  // }, [authState, authState.token]);

  const value = {
    authState: authState,
    currentUser,
    login: loginHandler,
    logout: logoutHandler,
  };

  return <userContext.Provider value={value}>{children}</userContext.Provider>;
}
