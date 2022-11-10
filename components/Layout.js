import Head from 'next/head'
import Header from './Header'

const Layout = ({ children }) => {
  return (
    <div className='font-poppins bg-primaryBg text-dark'>
      <Head>
        <title>YelpCamp</title>
        {/* Import Volkov and Poppins fonts from google fonts */}
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossorigin />
        <link
          href='https://fonts.googleapis.com/css2?family=Poppins:wght@400;500&family=Volkhov:wght@700&display=swap'
          rel='stylesheet'
        />
      </Head>
      <Header />
      {children}
    </div>
  )
}

export default Layout
