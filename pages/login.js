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
  const { currentUser } = useMainContext();
  const [loginMode, setLoginMode] = useState(true);

  const router = useRouter();
  const { locale } = router;

  useEffect(() => {
    if (currentUser) {
      if (locale === 'it') {
        router.push('/profilo');
      }
      if (locale === 'en') {
        router.push('/profile');
      }
    }
  }, [currentUser]);

  //   const switchModeHandler = () => {
  //     setLoginMode((prevState) => !prevState);
  //   };

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
