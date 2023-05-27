// react / next
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
// styles
import classes from './MainHeader.module.css';
// context
import { Store } from '../../context/Store';
// components
// import DropdownMenu from './DropdownMenu';
// libs
// import axios from 'axios';

function MainHeader() {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  const router = useRouter();
  const { locales, locale } = router;

  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const node = useRef();
  const nodeUser = useRef();

  // Track events outside scope
  const clickOutside = (e) => {
    // console.log(node.current);
    if (
      (node.current &&
        node.current !== null &&
        node.current.contains(e.target)) ||
      (nodeUser.current &&
        nodeUser.current !== null &&
        nodeUser.current.contains(e.target))
    ) {
      // inside click
      // console.log('clicked inside');
      return;
    }

    // outside click
    // console.log('clicked outside scope');
    setLangMenuOpen(false);
    // setProfileMenuOpen(false);
  };

  // Do something after component renders
  useEffect(() => {
    document.addEventListener('mousedown', clickOutside);

    // clean up function before running new effect
    return () => {
      document.removeEventListener('mousedown', clickOutside);
    };
  }, []);

  return (
    <header className={classes['box-0']}>
      <div
        className={classes['logo']}
        // onClick={() =>
        //   router.push('https://demo.cooldesign.it/gruppo-chronos/')
        // }
      >
        <Image
          src="/images/logo/logo-social.png"
          alt="Nappitello logo"
          width={92}
          height={50}
          // fill={true}
          style={{ objectFit: 'cover' }}
          //   sizes="(max-width: 768px) 12rem,
          // (max-width: 1200px) 12rem,
          // 12rem"
        />
      </div>
      <div className={classes['box-1']}>
        {locale === 'it' && (
          <div
            className={classes['container-cart']}
            onClick={() => router.push('/carrello')}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M2.5 4.25a.75.75 0 0 1 .75-.75h.558c.95 0 1.52.639 1.845 1.233c.217.396.374.855.497 1.271A1.29 1.29 0 0 1 6.25 6h12.498c.83 0 1.43.794 1.202 1.593l-1.828 6.409a2.75 2.75 0 0 1-2.644 1.996H9.53a2.75 2.75 0 0 1-2.652-2.022l-.76-2.772l-1.26-4.248l-.001-.008c-.156-.567-.302-1.098-.52-1.494C4.128 5.069 3.96 5 3.809 5H3.25a.75.75 0 0 1-.75-.75ZM9 21a2 2 0 1 0 0-4a2 2 0 0 0 0 4Zm7 0a2 2 0 1 0 0-4a2 2 0 0 0 0 4Z"
              />
            </svg>
            {cart.cartItems.length > 0 && (
              <span className={classes['cart-items']}>
                {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
              </span>
            )}
          </div>
        )}
        {locale === 'en' && (
          <div
            className={classes['container-cart']}
            onClick={() => router.push('/cart')}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M2.5 4.25a.75.75 0 0 1 .75-.75h.558c.95 0 1.52.639 1.845 1.233c.217.396.374.855.497 1.271A1.29 1.29 0 0 1 6.25 6h12.498c.83 0 1.43.794 1.202 1.593l-1.828 6.409a2.75 2.75 0 0 1-2.644 1.996H9.53a2.75 2.75 0 0 1-2.652-2.022l-.76-2.772l-1.26-4.248l-.001-.008c-.156-.567-.302-1.098-.52-1.494C4.128 5.069 3.96 5 3.809 5H3.25a.75.75 0 0 1-.75-.75ZM9 21a2 2 0 1 0 0-4a2 2 0 0 0 0 4Zm7 0a2 2 0 1 0 0-4a2 2 0 0 0 0 4Z"
              />
            </svg>
            {cart.cartItems.length > 0 && (
              <sup className={classes['cart-items']}>
                {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
              </sup>
            )}
          </div>
        )}
        {locale === 'de' && (
          <div
            className={classes['container-cart']}
            onClick={() => router.push('/wagen')}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M2.5 4.25a.75.75 0 0 1 .75-.75h.558c.95 0 1.52.639 1.845 1.233c.217.396.374.855.497 1.271A1.29 1.29 0 0 1 6.25 6h12.498c.83 0 1.43.794 1.202 1.593l-1.828 6.409a2.75 2.75 0 0 1-2.644 1.996H9.53a2.75 2.75 0 0 1-2.652-2.022l-.76-2.772l-1.26-4.248l-.001-.008c-.156-.567-.302-1.098-.52-1.494C4.128 5.069 3.96 5 3.809 5H3.25a.75.75 0 0 1-.75-.75ZM9 21a2 2 0 1 0 0-4a2 2 0 0 0 0 4Zm7 0a2 2 0 1 0 0-4a2 2 0 0 0 0 4Z"
              />
            </svg>
            {cart.cartItems.length > 0 && (
              <sup className={classes['cart-items']}>
                {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
              </sup>
            )}
          </div>
        )}
        <div className={classes['container-locales']}>
          <div
            className={classes['container-current-locale']}
            onClick={() => {
              setLangMenuOpen((current) => !current);
              // setProfileMenuOpen(false);
            }}
          >
            {locale}
          </div>
          {/* <div className={classes['arrow-down']}></div> */}

          {langMenuOpen && (
            <div ref={node} className={classes['container-flex-vertical']}>
              {locales.map((l, i) => {
                const { pathname, query, asPath } = router;
                if (l !== locale) {
                  return (
                    <span
                      onClick={() => setLangMenuOpen((current) => !current)}
                      key={i}
                      className={classes.lang}
                    >
                      <Link href={{ pathname, query }} as={asPath} locale={l}>
                        {l}
                      </Link>
                    </span>
                  );
                }
              })}
            </div>
          )}
        </div>
        <div
          className={classes['arrow-down']}
          onClick={() => {
            setLangMenuOpen((current) => !current);
          }}
        ></div>
      </div>
    </header>
  );
}

export default MainHeader;
