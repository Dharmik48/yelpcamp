import Head from 'next/head'
import Header from './Header'

const Layout = ({ children }) => {
  return (
    <div className='mx-auto max-w-7xl px-6 font-poppins text-dark sm:px-8 lg:px-12'>
      <Head>
        <title>YelpCamp</title>
      </Head>
      <Header />
      {children}
    </div>
  )
}

export default Layout
