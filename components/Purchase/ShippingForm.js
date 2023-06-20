// react / next
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
// styles
import classes from './ShippingForm.module.css';
// components
import Select from '../UI/Form/Select';
import TextInput from '../UI/Form/TextInput';
// import BtnCTA from '../UI/BtnCTA';
// context
// import { useMainContext } from '../../context/User';
import { Store } from '../../context/Store';
// data
import { allCountries } from '../../data/allCountries';
// libs
import { Icon } from '@iconify/react';

function ShippingForm() {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { shippingAddress } = cart;

  //   const { currentUser } = useMainContext();
  const [fullName, setFullName] = useState('');
  const [countrySelect, setCountrySelect] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [address, setAddress] = useState('');
  const [stateOrProvince, setStateOrProvince] = useState('');

  const [defaultCountryIdx, setDefaultCountryIdx] = useState('');
  //   const [defaultCountryValue, setDefaultCountryValue] = useState('null-value');

  //   const [selectElement, setSelectElement] = useState('');

  const router = useRouter();
  const { locale } = router;

  useEffect(() => {
    if (countrySelect !== '' && countrySelect !== 'null-value') {
      const idx = allCountries
        .map((country) => country._id)
        .indexOf(countrySelect);
      //   console.log(idx);
      //   console.log(allCountries[idx].label);
      setCountry((prev) => allCountries[idx].code);
    }
  }, [countrySelect]);

  //   console.log(country);

  useEffect(() => {
    setDefaultCountryIdx((prev) =>
      allCountries
        .map((country) => country.code)
        .indexOf(shippingAddress.country)
        .toString()
    );
    setFullName(shippingAddress.fullName);
    setAddress(shippingAddress.address);
    setCity(shippingAddress.city);
    setPostalCode(shippingAddress.postalCode);
    setStateOrProvince(shippingAddress.stateOrProvince);
  }, [shippingAddress]);
  //   console.log(defaultCountryIdx);

  const setShippingDetails = () => {
    dispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: {
        fullName,
        address,
        city,
        postalCode,
        country,
        stateOrProvince,
      },
    });
    // not sure this is necessary
    localStorage.setItem(
      'nappitello-cart',
      JSON.stringify({
        ...cart,
        shippingAddress: {
          fullName,
          address,
          city,
          postalCode,
          country,
          stateOrProvince,
        },
      })
    );
    if (locale === 'it') router.push('/ordine/pagamento');
    if (locale === 'en') router.push('/order/payment');
  };

  //   console.log(fullName);

  //   console.log(shippingAddress.country);

  return (
    <>
      <Select
        name="country"
        label={locale === 'it' ? 'stato' : locale === 'en' ? 'Country' : ''}
        // label={defaultCountryIdx}
        options={allCountries}
        defaultValue={
          defaultCountryIdx !== '' ? defaultCountryIdx : 'null-value'
        }
        // onChange={() => setCountry(e.target.value)}
        onChange={(e) => {
          //   console.log(e.target.value);
          setCountrySelect(e.target.value);
        }}
        required={true}
      />

      <TextInput
        type="text"
        label={
          locale === 'it'
            ? 'nome e cognome'
            : locale === 'en'
            ? 'Full Name'
            : ''
        }
        value={fullName}
        required={true}
        name="full-name"
        onChange={(e) => {
          setFullName(e.target.value);
        }}
        // onBlur={() => setEmailTouched(true)}
        // isInvalid={emailIsInvalid}
        // errorMsg={
        //   locale === 'it'
        //     ? "inserire un'email valida"
        //     : locale === 'en'
        //     ? 'enter a valid email'
        //     : ''
        // }
      />
      <TextInput
        type="text"
        label={locale === 'it' ? 'città' : locale === 'en' ? 'City' : ''}
        required={true}
        name="city"
        value={city}
        onChange={(e) => {
          setCity(e.target.value);
        }}
        // onBlur={() => setEmailTouched(true)}
        // isInvalid={emailIsInvalid}
        // errorMsg={
        //   locale === 'it'
        //     ? "inserire un'email valida"
        //     : locale === 'en'
        //     ? 'enter a valid email'
        //     : ''
        // }
      />
      <TextInput
        type="text"
        label={
          locale === 'it'
            ? 'codice postale'
            : locale === 'en'
            ? 'Postal Code'
            : ''
        }
        required={true}
        name="zip-code"
        value={postalCode}
        onChange={(e) => {
          setPostalCode(e.target.value);
        }}
        // onBlur={() => setEmailTouched(true)}
        // isInvalid={emailIsInvalid}
        // errorMsg={
        //   locale === 'it'
        //     ? "inserire un'email valida"
        //     : locale === 'en'
        //     ? 'enter a valid email'
        //     : ''
        // }
      />
      <TextInput
        type="text"
        label={locale === 'it' ? 'indirizzo' : locale === 'en' ? 'Address' : ''}
        required={true}
        name="address"
        value={address}
        onChange={(e) => {
          setAddress(e.target.value);
        }}
        // onBlur={() => setEmailTouched(true)}
        // isInvalid={emailIsInvalid}
        // errorMsg={
        //   locale === 'it'
        //     ? "inserire un'email valida"
        //     : locale === 'en'
        //     ? 'enter a valid email'
        //     : ''
        // }
      />
      <TextInput
        type="text"
        label={locale === 'it' ? 'provincia' : locale === 'en' ? 'State' : ''}
        required={true}
        name="state"
        value={stateOrProvince}
        onChange={(e) => {
          setStateOrProvince(e.target.value);
        }}
        // onBlur={() => setEmailTouched(true)}
        // isInvalid={emailIsInvalid}
        // errorMsg={
        //   locale === 'it'
        //     ? "inserire un'email valida"
        //     : locale === 'en'
        //     ? 'enter a valid email'
        //     : ''
        // }
      />
      <div onClick={setShippingDetails} className={classes['next-link']}>
        {locale === 'it' ? 'PAGAMENTO' : 'PAYMENT'}{' '}
        <Icon icon="formkit:arrowright" />
      </div>
    </>
  );
}

export default ShippingForm;
