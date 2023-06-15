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
import { Icon } from '@iconify/react';

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
      <div className={classes['logo']} onClick={() => router.push('/')}>
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
        <div
          style={{ cursor: 'pointer' }}
          onClick={() => {
            if (locale === 'it') router.push('/profilo');
            if (locale === 'en') router.push('/profile');
          }}
        >
          <Icon icon="iconamoon:profile-circle" />
        </div>
        <div
          className={classes['container-cart']}
          onClick={() => {
            if (locale === 'it') router.push('/carrello');
            if (locale === 'en') router.push('/cart');
            if (locale === 'de') router.push('/wagen');
          }}
        >
          <Icon icon="bi:cart-fill" />
          {cart.cartItems.length > 0 && (
            <sup className={classes['cart-items']}>
              {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
            </sup>
          )}
        </div>

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
