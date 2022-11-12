import Image from 'next/image'
import Link from 'next/link'
import logo from '../public/logo.png'
import { IoMenu, IoClose } from 'react-icons/io5'
import { useState } from 'react'
import LinkButton from './LinkButton'

// const Header = () => {
//   const [isNavOpen, setIsNavOpen] = useState(false)

//   const toggleNavMenu = () => {
//     setIsNavOpen(currIsNavOpen => !currIsNavOpen)
//   }

//   const navStyles = `${
//     isNavOpen ? 'circle(75%)' : 'circle(0% at 87.06% 4.68%)'
//   }`

//   return (
//     <header className='flex h-20 items-center justify-between bg-blue lg:h-24'>
//       <div className='flex items-center gap-2'>
//         <h1 className='font-volkhov font-bold sm:text-lg lg:text-2xl'>
//           <Link href={'/'}>YelpCamp</Link>
//         </h1>
//         <Image src={logo} alt='YelpCamp' />
//       </div>
//       <IoMenu
//         className='cursor-pointer text-3xl lg:hidden'
//         onClick={toggleNavMenu}
//       />
//       <nav
//         className='fixed top-0 left-0 flex h-full w-full flex-col items-center justify-center gap-20 bg-dark text-left text-2xl text-secondaryBg transition-all duration-300 lg:static lg:w-auto lg:flex-row lg:gap-8 lg:bg-transparent lg:text-sm lg:text-dark xl:gap-16 xl:text-base 2xl:gap-24 2xl:text-lg'
//         style={{ clipPath: navStyles }}
//       >
//         <IoClose
//           className='absolute top-6 right-10 cursor-pointer text-3xl lg:hidden'
//           onClick={toggleNavMenu}
//         />
//         <ul className='flex w-full flex-col gap-8 px-10 lg:w-auto lg:flex-row lg:gap-12 lg:px-0'>
//           <li className='border-b-2 border-transparent transition-colors hover:border-b-2 hover:border-b-secondaryBg'>
//             <Link href={'/'} onClick={() => setIsNavOpen(false)}>
//               Home
//             </Link>
//           </li>
//           <li className='border-b-2 border-transparent transition-colors hover:border-b-2 hover:border-b-secondaryBg'>
//             <Link href={'/campgrounds'} onClick={() => setIsNavOpen(false)}>
//               Campgrounds
//             </Link>
//           </li>
//           <li className='border-b-2 border-transparent transition-colors hover:border-b-2 hover:border-b-secondaryBg'>
//             <Link href={'/campgrounds/new'} onClick={() => setIsNavOpen(false)}>
//               Add Campground
//             </Link>
//           </li>
//         </ul>
//         <div className='text flex w-full flex-col gap-8 px-10 font-normal text-secondaryBg lg:w-auto lg:flex-row lg:items-center lg:text-brand'>
//           <Link href={'#'} className='w-max'>
//             Login
//           </Link>
//           <LinkButton text='Sign Up' linkTo={'#'} />
//         </div>
//       </nav>
//     </header>
//   )
// }

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(currIsMenuOpen => !currIsMenuOpen)
  }

  return (
    <header className='bg-white sticky top-0 z-10 pb-6 lg:pb-0'>
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
          <Link
            href='/login'
            title='Login'
            className='border-b-2 border-transparent text-base font-semibold text-brand transition-colors duration-200 hover:border-brand focus:border-brand'
            onClick={() => setIsMenuOpen(false)}
          >
            Login
          </Link>
          <Link
            href='/signup'
            title='Sign Up'
            className='rounded-md border-2 border-transparent bg-brand px-8 py-3 text-base font-semibold text-secondaryBg transition-all duration-200 hover:border-brand hover:bg-transparent hover:text-brand focus:border-brand focus:bg-transparent focus:text-brand'
            role='button'
            onClick={() => setIsMenuOpen(false)}
          >
            Sign Up
          </Link>
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

        <div className='mt-8'>
          <Link
            href='/login'
            title='Add Campground'
            className='mr-6 border-b-2 border-transparent text-base font-semibold text-brand transition-all duration-200 hover:border-brand focus:border-brand'
            onClick={() => setIsMenuOpen(false)}
          >
            Login
          </Link>
          <Link
            href='/signup'
            title=''
            className='inline-flex items-center justify-center rounded-md border-2 border-transparent bg-brand px-8 py-3 text-base font-semibold text-secondaryBg transition-all duration-200 hover:border-brand hover:bg-transparent hover:text-brand focus:border-brand focus:bg-transparent focus:text-brand'
            role='button'
            onClick={() => setIsMenuOpen(false)}
          >
            Sign Up
          </Link>
        </div>
      </nav>
    </header>
  )
}

export default Header
