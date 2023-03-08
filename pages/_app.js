import Layout from '../components/Layout'
import '../styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import Loader from '../components/Loader'
import Router from 'next/router'
import { useState } from 'react'

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(false)

  Router.events.on('routeChangeStart', () => setLoading(true))
  Router.events.on('routeChangeComplete', () => setLoading(false))

  return (
    <SessionProvider session={pageProps.session}>
      <Layout>{loading ? <Loader /> : <Component {...pageProps} />}</Layout>
    </SessionProvider>
  )
}

export default MyApp
