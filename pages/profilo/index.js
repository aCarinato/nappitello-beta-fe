// react / next
import { useRouter } from 'next/router';
import Link from 'next/link';
// context
import { useMainContext } from '../../context/User';
// components
import BtnCTA from '../../components/UI/BtnCTA';
import UserRoute from '../../components/Routes/UserRoute';

function ProfilePage() {
  const { authState, logout } = useMainContext();

  const router = useRouter();

  const logoutHandler = () => {
    logout();
    router.push('/login');
  };

  return (
    <UserRoute>
      <div>
        <h1>{authState.name}</h1>
        <br></br>
        <Link href="/profilo/ordini">I miei ordini</Link>
        {authState && authState.token.length > 0 && (
          <BtnCTA label="logout" onClickAction={logoutHandler} />
        )}
        <br></br>
        {authState && authState.token.length > 0 && authState.isAdmin && (
          <div>
            <Link href="/admin">Admin dashboard</Link>
          </div>
        )}

        {authState && authState.token.length === 0 && (
          <BtnCTA label="login" onClickAction={() => router.push('login')} />
        )}
      </div>
    </UserRoute>
  );
}

export default ProfilePage;
