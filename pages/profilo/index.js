// context
import { useMainContext } from '../../context/User';
// components
import BtnCTA from '../../components/UI/BtnCTA';
import { useRouter } from 'next/router';

function ProfilePage() {
  const { authState, logout } = useMainContext();

  const router = useRouter();

  const logoutHandler = () => {
    logout();
    router.push('/login');
  };

  return (
    <div>
      <h1>{authState.name}</h1>
      {authState && authState.token.length > 0 && (
        <BtnCTA label="logout" onClickAction={logoutHandler} />
      )}

      {authState && authState.token.length === 0 && (
        <BtnCTA label="login" onClickAction={() => router.push('login')} />
      )}
    </div>
  );
}

export default ProfilePage;
