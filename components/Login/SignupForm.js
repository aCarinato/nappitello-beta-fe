// react / next
import { useState } from 'react';
import { useRouter } from 'next/router';
// styles
import classes from './SignupForm.module.css';
// componentns
import TextInput from '../UI/Form/TextInput';
import BtnCTA from '../UI/BtnCTA';
// libs
import axios from 'axios';
// context
import { useMainContext } from '../../context/User';

function SignupForm(props) {
  const { login } = useMainContext();

  const { onSwitchMode } = props;

  //   language
  const router = useRouter();
  const { locale } = router;

  //   inputs
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  //   input validation
  const [nameTouched, setNameTouched] = useState(false);
  const nameIsValid = name.trim() !== '' && name.length > 1;
  const nameIsInvalid = !nameIsValid && nameTouched;

  const [surnameTouched, setSurameTouched] = useState(false);
  const surnameIsValid = surname.trim() !== '' && surname.length > 1;
  const surnameIsInvalid = !surnameIsValid && surnameTouched;

  const [emailTouched, setEmailTouched] = useState(false);
  const emailIsValid = email.trim() !== '' && email.length > 1;
  const emailIsInvalid = !emailIsValid && emailTouched;

  const [passwordTouched, setPasswordTouched] = useState(false);
  const passwordIsValid = password.trim() !== '' && password.length > 2;
  const passwordIsInvalid = !passwordIsValid && passwordTouched;

  const [passwordConfirmTouched, setPasswordConfirmTouched] = useState(false);
  const passwordConfirmIsValid = passwordConfirm === password;
  const passwordConfirmIsInvalid =
    !passwordConfirmIsValid && passwordConfirmTouched;

  let formIsValid;
  formIsValid =
    nameIsValid &&
    surnameIsValid &&
    emailIsValid &&
    passwordIsValid &&
    passwordConfirmIsValid;

  const handleSignup = async () => {
    if (formIsValid) {
      let language;
      if (locale === 'it') {
        language = 'it';
      }

      if (locale === 'en') {
        language = 'en';
      }

      const signupData = {
        name,
        surname,
        email,
        password,
        language,
      };
      //   console.log(signupData);

      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API}/auth/signup`,
          signupData
        );

        console.log(res);

        if (res.data.error) {
          // setShowError(true);
          //   setError(res.data.error);
          console.log(res.data.error);
        } else {
          try {
            const loginData = {
              email,
              password,
            };
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
              router.push(`/profilo`);
              // console.log(authState);
            }
          } catch (err) {
            console.log(err);
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      <TextInput
        type="text"
        label={locale === 'it' ? 'nome' : locale === 'en' ? 'name' : ''}
        required={true}
        name="name"
        placeholder=""
        onChange={(e) => {
          setName(e.target.value);
        }}
        onBlur={() => setNameTouched(true)}
        isInvalid={nameIsInvalid}
        errorMsg={
          locale === 'it'
            ? 'inserire un nome valido'
            : locale === 'en'
            ? 'enter a valid name'
            : ''
        }
      />
      <TextInput
        type="text"
        label={locale === 'it' ? 'cognome' : locale === 'en' ? 'surname' : ''}
        required={true}
        name="surname"
        placeholder=""
        onChange={(e) => {
          setSurname(e.target.value);
        }}
        onBlur={() => setSurameTouched(true)}
        isInvalid={surnameIsInvalid}
        errorMsg={
          locale === 'it'
            ? 'inserire un cognome valido'
            : locale === 'en'
            ? 'enter a valid surname'
            : ''
        }
      />
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
      <TextInput
        type="password"
        label={
          locale === 'it'
            ? 'conferma password'
            : locale === 'en'
            ? 'confirm password'
            : ''
        }
        required={true}
        name="password"
        placeholder=""
        onChange={(e) => {
          setPasswordConfirm(e.target.value);
        }}
        onBlur={() => setPasswordConfirmTouched(true)}
        isInvalid={passwordConfirmIsInvalid}
        errorMsg={
          locale === 'it'
            ? 'le password devono essere identiche'
            : locale === 'en'
            ? 'passwords must be identical'
            : ''
        }
      />

      <div className={classes['cta-box']}>
        <BtnCTA label="signup" onClickAction={handleSignup} />
      </div>

      <div className={classes['switch-box']}>
        {locale === 'en'
          ? 'Already have an account? '
          : locale === 'it'
          ? 'Hai già un account? '
          : 'Haben Sie kein Konto? '}
        {/* <br></br> */}
        <span onClick={onSwitchMode} className={classes.switch}>
          {locale === 'en' ? 'Login' : locale === 'it' ? 'Login' : 'Login'}
        </span>
      </div>
    </>
  );
}

export default SignupForm;
