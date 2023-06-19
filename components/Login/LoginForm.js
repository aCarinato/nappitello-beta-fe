// react  / next
import { useRouter } from 'next/router';
import { useState } from 'react';
// styles
import classes from './LoginForm.module.css';
// components
import TextInput from '../UI/Form/TextInput';
import BtnCTA from '../UI/BtnCTA';
// libs
import axios from 'axios';
// context
import { useMainContext } from '../../context/User';

function LoginForm(props) {
  // context
  const { login, authState } = useMainContext();

  // props
  const { onSwitchMode } = props;

  //   language
  const router = useRouter();
  const { locale } = router;

  // inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // input validation
  const [emailTouched, setEmailTouched] = useState(false);
  const emailIsValid = email.trim() !== '' && email.length > 1;
  const emailIsInvalid = !emailIsValid && emailTouched;

  const [passwordTouched, setPasswordTouched] = useState(false);
  const passwordIsValid = password.trim() !== '' && password.length > 2;
  const passwordIsInvalid = !passwordIsValid && passwordTouched;

  let formIsValid;
  formIsValid = emailIsValid && passwordIsValid;

  const handleLogin = async () => {
    if (formIsValid) {
      const loginData = {
        email,
        password,
      };
      // console.log(loginData);

      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API}/auth/login`,
          loginData
        );

        // console.log(res);

        if (res.data.error) {
          // setShowError(true);
          //   setError(res.data.error);
          console.log(res.data.error);
        } else {
          login(
            res.data.name,
            res.data.email,
            res.data.token,
            res.data.isAdmin,
            res.data.stripeId
          );
          // router.push(`/profilo/${res.data.username}`);
          if (locale === 'it') router.push(`/profilo`);
          if (locale === 'en') router.push(`/profile`);
          // console.log(authState);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      <TextInput
        type="email"
        label="email"
        required={true}
        name="email"
        placeholder=""
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        onBlur={() => setEmailTouched(true)}
        isInvalid={emailIsInvalid}
        errorMsg={
          locale === 'it'
            ? "inserire un'email valida"
            : locale === 'en'
            ? 'enter a valid email'
            : ''
        }
      />
      <TextInput
        type="password"
        label="password"
        required={true}
        name="password"
        placeholder=""
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        onBlur={() => setPasswordTouched(true)}
        isInvalid={passwordIsInvalid}
        errorMsg={
          locale === 'it'
            ? 'password deve essere più di 5 caratteri'
            : locale === 'en'
            ? 'password must be more than 5 characters'
            : ''
        }
      />
      <div className={classes['cta-box']}>
        <BtnCTA label="login" onClickAction={handleLogin} />
      </div>

      <div className={classes['switch-box']}>
        {locale === 'en'
          ? 'Do not have an account? '
          : locale === 'it'
          ? 'Non hai un account? '
          : 'Haben Sie kein Konto? '}
        {/* <br></br> */}
        <span onClick={onSwitchMode} className={classes.switch}>
          {locale === 'en'
            ? 'Create account'
            : locale === 'it'
            ? 'Crea profilo'
            : 'Konto anlegen'}
        </span>
      </div>
    </>
  );
}

export default LoginForm;
