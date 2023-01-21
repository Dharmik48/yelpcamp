import Head from 'next/head'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './Header'
import { IoClose } from 'react-icons/io5'

const Layout = ({ children }) => {
  const ToastCloseBtn = ({ closeToast }) => (
    <IoClose
      className='ml-4 flex-shrink-0 self-center text-2xl opacity-80 hover:opacity-100'
      onClick={closeToast}
    />
  )

  return (
    <>
      <Header />
      <div className='mx-auto flex min-h-screen max-w-7xl flex-col px-8 font-poppins text-dark sm:px-10 md:px-12 lg:px-14'>
        <Head>
          <title>YelpCamp</title>
        </Head>
        <ToastContainer
          position='top-center'
          hideProgressBar
          theme='colored'
          closeButton={ToastCloseBtn}
          className='w-full max-w-7xl px-8 sm:px-10 md:px-12 lg:px-14'
        />
        {children}
      </div>
    </>
  )
}

export default Layout
