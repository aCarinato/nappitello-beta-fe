import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
// context
import { useMainContext } from '../../context/User';
// libs
import axios from 'axios';
// components
import SpinningLoader from '../UI/SpinningLoader';

function UserRoute({ children }) {
  const { authState, logout } = useMainContext();

  const [ok, setOk] = useState(false);

  const router = useRouter();
  const getCurrentUser = async () => {
    const localUser = JSON.parse(localStorage.getItem('nappitello-user'));
    // console.log('FROM UserRoute');
    // console.log(localUser);

    if (localUser && localUser.token.length > 0) {
      try {
        // console.log('Executing getCurrentUser()');
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API}/auth/current-user`,
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
        logout();
        router.push('/login');
      }
    } else {
      // localStorage.removeItem('nappitello-user');
      logout();

      // location.reload();
      router.push('/login');
    }
  };

  useEffect(() => {
    // console.log('executing getCurrentUser()');
    getCurrentUser();
  }, []);

  return !ok ? <SpinningLoader /> : <>{children}</>;

  // const { currentUser } = useMainContext();

  // const router = useRouter();
  // // console.log(currentUser);
  // useEffect(() => {
  //   if (!currentUser) router.push('/login');
  // }, []);

  // return <>{children}</>;
}

export default UserRoute;
