// react / next
// react / next
import { useState, useEffect } from 'react';
// components
import LoginForm from '../components/Login/LoginForm';
import SignupForm from '../components/Login/SignupForm';

function LoginPage() {
  const [loginMode, setLoginMode] = useState(true);

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
