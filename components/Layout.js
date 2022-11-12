import Head from 'next/head'
import Header from './Header'

const Layout = ({ children }) => {
  return (
    <div className='mx-auto flex min-h-screen max-w-7xl flex-col px-8 font-poppins text-dark sm:px-10 md:px-12 lg:px-14'>
      <Head>
        <title>YelpCamp</title>
      </Head>
      <Header />
      {children}
    </div>
  )
}

export default Layout
