import { AppProps } from 'next/app';

import '../public/styles/globals.css';
import 'mapbox-gl/dist/mapbox-gl.css';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
