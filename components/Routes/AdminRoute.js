// react / next
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
// libs
import axios from 'axios';
// components
import SpinningLoader from '../UI/SpinningLoader';

function AdminRoute({ children }) {
  const [ok, setOk] = useState(false);
  const router = useRouter();

  const getCurrentUser = async () => {
    const localUser = JSON.parse(localStorage.getItem('nappitello-user'));

    if (localUser && localUser.token.length > 0) {
      // if (
      //   currentUser &&
      //   currentUser.token &&
      //   currentUser.token === localUser.token
      // ) {
      //   setOk(true);
      // } else {
      //   router.push('/login');
      // }
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API}/auth/current-admin`,
          {
            headers: {
              Authorization: `Bearer ${localUser.token}`,
            },
          }
        );
        // console.log(data);
        if (data.ok) {
          setOk(true);
        }
      } catch (err) {
        // console.log(err);
        router.push('/login');
      }
    } else {
      router.push('/login');
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  // process.browser &&
  //   authState === null &&
  //   setTimeout(() => {
  //     getCurrentUser();
  //   }, 2000);

  return !ok ? <SpinningLoader /> : <>{children}</>;
}

export default AdminRoute;
