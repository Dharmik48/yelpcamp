import Head from 'next/head'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './Header'
import { IoClose } from 'react-icons/io5'

const Layout = ({ children }) => {
  const ToastCloseBtn = ({ closeToast }) => (
    <IoClose
      className='self-center text-2xl opacity-80 hover:opacity-100'
      onClick={closeToast}
    />
  )

  return (
    <div className='mx-auto flex min-h-screen max-w-7xl flex-col px-8 font-poppins text-dark sm:px-10 md:px-12 lg:px-14'>
      <Head>
        <title>YelpCamp</title>
      </Head>
      <Header />
      <ToastContainer
        position='top-center'
        hideProgressBar
        theme='colored'
        closeButton={ToastCloseBtn}
      />
      {children}
    </div>
  )
}

export default Layout
