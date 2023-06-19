// react / next
import { useRouter } from 'next/router';
import { useEffect } from 'react';
// context
import { useMainContext } from '../../context/User';

function AdminRoute({ children }) {
  const { currentUser } = useMainContext();

  const router = useRouter();

  useEffect(() => {
    if (!currentUser || !currentUser.isAdmin) router.push('/login');
  }, []);

  return <>{children}</>;
}

export default AdminRoute;
