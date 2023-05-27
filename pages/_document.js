import { Html, Head, Main, NextScript } from 'next/document';
// import { FB_PIXEL_ID } from '../lib/fb/fbpixel';

export default function Document() {
  return (
    <Html>
      <Head>
        {/* FAVICON */}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <body>
        <Main />
        {/* <div id="overlays"></div> */}
        <NextScript />
      </body>
    </Html>
  );
}
