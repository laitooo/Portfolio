import { AppProps } from 'next/app';

import '../styles/globals.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import SiteAnalytics from '../components/analytics';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <SiteAnalytics />
    </>
  );
}

export default MyApp;
