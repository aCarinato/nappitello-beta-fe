// react / next
import { useRouter } from 'next/router';
import React, { useContext, useState, useEffect, useRef } from 'react';

const mainContext = React.createContext();

export function useMainContext() {
  return useContext(mainContext);
}

export function UserContextProvider({ children }) {
  const router = useRouter();
  const { locale } = router;

  const [language, setLanguage] = useState('');

  useEffect(() => {
    if (locale === 'it') setLanguage('it');
    if (locale === 'en') setLanguage('en');
  }, []);

  console.log(`from the context - language: ${language}`);

  const value = {
    language,
  };

  return <mainContext.Provider value={value}>{children}</mainContext.Provider>;
}
