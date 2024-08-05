import '../styles.css'
import type { AppProps } from 'next/app'
import Layout from '@/components/Layouts/layout'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
      <ToastContainer autoClose={5000}/>
    </Layout>
  )
}
