import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Header from '@/app/components/Header';
import { Crete_Round } from '@next/font/google';
import { Provider } from 'react-redux';
import { store } from '@/app/store/store';

const creteRound = Crete_Round({ weight: '400', subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <main className={creteRound.className}>
        <Head>
          <title>Punk API</title>
          <meta name="description" content="Showing beer list from Punk API " />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header />
        <Component {...pageProps} />
      </main>
    </Provider>
  );
}
