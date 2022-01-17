/* eslint-disable @next/next/no-sync-scripts */
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en-US">
        <Head>
          <meta charSet="utf-8" />
          <link rel="icon" href="/images/icons/rd192.png" />
          <meta name="theme-color" content="#ffffff" />
          <meta name="description" content="the perfect visitation app" />
          <link rel="manifest" href="/manifest.json" />

          {/* fonts */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200;0,300;0,400;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,600;1,700;1,800;1,900&display=swap"
            rel="stylesheet"
          />

          {/* safari */}
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="#ffffff"
          />
          <meta name="apple-mobile-web-app-title" content="visitee" />
 
          <link
            rel="stylesheet"
            href="/vendor/datatables/dataTables.bootstrap4.min.css" 
          />
          {/* <link
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
          /> */}

          {/* internet explorer */}
          {/* <meta
            name="msapplication-TileImage"
            content="/images/icons/rd192.png"
          /> */}
          <meta name="msapplication-TileColor" content="#ffffff" />
        </Head>

        <body id="page-top">
          <Main />
          <NextScript />
          <script src="/vendor/jquery/jquery.min.js"></script>
          <script src="/vendor/bootstrap/js/bootstrap.min.js"></script>
          <script src="/vendor/jquery-easing/jquery.easing.min.js"></script>
          <script src="/vendor/chart.js/Chart.min.js"></script>
          <script src="/js/sb-admin-2.min.js"></script>

          <script src="/vendor/datatables/dataTables.bootstrap4.min.js"></script>
          <script src="/vendor/datatables/jquery.dataTables.min.js"></script>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
