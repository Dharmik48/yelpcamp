import Image from 'next/image'
import Link from 'next/link'
import logo from '../public/logo.png'
import { IoMenu, IoClose } from 'react-icons/io5'
import { useState } from 'react'
import { signOut, useSession } from 'next-auth/react'

const Header = () => {
  const { data: session } = useSession()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(currIsMenuOpen => !currIsMenuOpen)
  }

  return (
    <header className='sticky top-0 z-10 bg-primaryBg lg:pb-0'>
      {/* <!-- lg+ --> */}
      <nav className='flex h-16 items-center justify-between lg:h-24'>
        <div className='flex-shrink-0'>
          <Link
            href='/'
            title='YelpCamp Home'
            className='flex items-center gap-2'
            onClick={() => setIsMenuOpen(false)}
          >
            <h1 className='inline font-volkhov text-lg font-bold lg:text-2xl'>
              YelpCamp
            </h1>
            <Image src={logo} alt='YelpCamp' />
          </Link>
        </div>

        <button
          type='button'
          className='focus:bg-gray-100 hover:bg-gray-100 relative inline-flex rounded-md p-2 text-dark transition-all duration-200 lg:hidden'
          onClick={toggleMenu}
        >
          {/* <!-- Menu open: "hidden", Menu closed: "block" --> */}
          <IoMenu
            className={`${
              isMenuOpen ? 'scale-0' : 'scale-100'
            } absolute top-1/2 left-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 transition-transform`}
          />

          {/* <!-- Menu open: "block", Menu closed: "hidden" --> */}
          <IoClose
            className={`${
              isMenuOpen ? 'scale-100' : 'scale-0'
            } absolute top-1/2 left-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 transition-transform`}
          />
        </button>

        <div className='hidden lg:mx-auto lg:flex lg:items-center lg:space-x-10'>
          <Link
            href='/'
            title='Home'
            className='text-base font-normal text-dark transition-all duration-200 hover:text-brand focus:text-brand'
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>

          <Link
            href='/campgrounds'
            title='Campgrounds'
            className='text-base font-normal text-dark transition-all duration-200 hover:text-brand focus:text-brand'
            onClick={() => setIsMenuOpen(false)}
          >
            Campgrounds
          </Link>

          <Link
            href='/campgrounds/new'
            title='Add Campground'
            className='text-base font-normal text-dark transition-all duration-200 hover:text-brand focus:text-brand'
            onClick={() => setIsMenuOpen(false)}
          >
            Add Campground
          </Link>
        </div>
        <div className='hidden items-center justify-center lg:inline-flex lg:space-x-10'>
          {session ? (
            <>
              <button
                title='Log out'
                className='border-b-2 border-transparent text-base font-semibold text-brand transition-colors duration-200 hover:border-brand focus:border-brand'
                onClick={() => signOut({ callbackUrl: '/' })}
              >
                Sign out
              </button>
              <Image
                src={session.user.image}
                alt={session.user.name}
                width='45'
                height='45'
                className='rounded-full border-2 border-brand'
              />
            </>
          ) : (
            <>
              <Link
                href='/auth/login'
                title='Login'
                className='border-b-2 border-transparent text-base font-semibold text-brand transition-colors duration-200 hover:border-brand focus:border-brand'
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                href='/auth/signup'
                title='Sign Up'
                className='rounded-md border-2 border-transparent bg-brand px-8 py-3 text-base font-semibold text-secondaryBg transition-all duration-200 hover:border-brand hover:bg-transparent hover:text-brand focus:border-brand focus:bg-transparent focus:text-brand'
                role='button'
                onClick={() => setIsMenuOpen(false)}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* <!-- xs to lg --> */}
      <nav
        className={`${
          isMenuOpen ? 'sacle-100' : 'scale-0'
        } border-gray-200 absolute w-full origin-top-right rounded-md border bg-secondaryBg p-6 shadow-md transition-transform lg:hidden`}
      >
        <div className='-my-2 flex flex-col space-y-1'>
          <Link
            href='/'
            title='Home'
            className='inline-flex py-3 text-base font-normal text-dark transition-all duration-200 hover:text-brand focus:text-brand'
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>

          <Link
            href='/campgrounds'
            title='Campgrounds'
            className='inline-flex py-3 text-base font-normal text-dark transition-all duration-200 hover:text-brand focus:text-brand'
            onClick={() => setIsMenuOpen(false)}
          >
            Campgrounds
          </Link>

          <Link
            href='/campgrounds/new'
            title='Add Campground'
            className='inline-flex py-3 text-base font-normal text-dark transition-all duration-200 hover:text-brand focus:text-brand'
            onClick={() => setIsMenuOpen(false)}
          >
            Add Campground
          </Link>
        </div>

        <div className='mt-8 flex items-center gap-6'>
          {session ? (
            <>
              <button
                title='Log out'
                className='border-b-2 border-transparent text-base font-semibold text-brand transition-all duration-200 hover:border-brand focus:border-brand'
                onClick={() => signOut({ callbackUrl: '/' })}
              >
                Sign out
              </button>
              <Image
                src={session.user.image}
                alt={session.user.name}
                width='45'
                height='45'
                className='rounded-full border-2 border-brand'
              />
            </>
          ) : (
            <>
              <Link
                href='/auth/login'
                title='Add Campground'
                className='border-b-2 border-transparent text-base font-semibold text-brand transition-all duration-200 hover:border-brand focus:border-brand'
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                href='/auth/signup'
                title=''
                className='rounded-md border-2 border-transparent bg-brand px-8 py-3 text-base font-semibold text-secondaryBg transition-all duration-200 hover:border-brand hover:bg-transparent hover:text-brand focus:border-brand focus:bg-transparent focus:text-brand'
                role='button'
                onClick={() => setIsMenuOpen(false)}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Header
