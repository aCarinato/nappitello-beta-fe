// react / next
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
// components
import LoginForm from '../components/Login/LoginForm';
import SignupForm from '../components/Login/SignupForm';
// context
import { useMainContext } from '../context/User';

// contexy

function LoginPage() {
  const { authState, currentUser } = useMainContext();
  const [loginMode, setLoginMode] = useState(true);

  const router = useRouter();
  const { locale } = router;

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem('nappitello-user'));
    // console.log(localUser);
    if (localUser && currentUser) {
      if (locale === 'it') {
        router.push('/profilo');
      }
      if (locale === 'en') {
        router.push('/profile');
      }
    }
    // else {
    //   location.reload();
    // }
  }, []);

  return (
    <>
      {loginMode ? (
        <LoginForm
          onSwitchMode={() => setLoginMode((prevState) => !prevState)}
        />
      ) : (
        <SignupForm
          onSwitchMode={() => setLoginMode((prevState) => !prevState)}
        />
      )}
    </>
  );
}

export default LoginPage;
