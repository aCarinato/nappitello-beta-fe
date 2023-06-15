import { useEffect } from 'react';
import { useRouter } from 'next/router';
// context
import { useMainContext } from '../../context/User';

function UserRoute({ children }) {
  const { currentUser } = useMainContext();

  const router = useRouter();

  useEffect(() => {
    if (!currentUser) router.push('/login');
  }, []);

  return <>{children}</>;
}

export default UserRoute;
