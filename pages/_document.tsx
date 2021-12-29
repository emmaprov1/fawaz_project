import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en-US">
        <Head>
          <meta charSet="utf-8" />
          <link rel="icon" href="/images/icons/rd192.png" />
          <meta name="theme-color" content="#ffffff" />
          <meta name="description" content="see a doctor" />
          <link rel="manifest" href="/manifest.json" />

          {/* fonts */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap"
            rel="stylesheet"
          />

          {/* safari */}
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="#ffffff"
          />
          <meta name="apple-mobile-web-app-title" content="RiDokita" />
          <link
            rel="apple-touch-icon"
            href="/images/icons/rd32.png"
            sizes="32x32"
          />
          <link
            rel="apple-touch-icon"
            href="/images/icons/rd64.png"
            sizes="64x64"
          />
          <link
            rel="apple-touch-icon"
            href="/images/icons/rd144.png"
            sizes="144x144"
          />
          <link
            rel="apple-touch-icon"
            href="/images/icons/rd192.png"
            sizes="192x192"
          />
          <link
            rel="apple-touch-icon"
            href="/images/icons/rd512.png"
            sizes="512x512"
          />

          {/* internet explorer */}
          <meta
            name="msapplication-TileImage"
            content="/images/icons/rd192.png"
          />
          <meta name="msapplication-TileColor" content="#ffffff" />
        </Head>
        <body>
          <div id="modal"></div>
          <div id="callmodal"></div>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
