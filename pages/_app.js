import '@/styles/globals.css'
import 'react-toastify/dist/ReactToastify.css';
import '@splidejs/react-splide/css';
import { Analytics } from '@vercel/analytics/react';
import Navbar from '@/components/Navbar';
import Head from 'next/head';
export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
      </Head>
      <Navbar />
      <Component {...pageProps} />
      <Analytics />
    </>
  )
}
