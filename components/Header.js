import Image from 'next/image'
import Link from 'next/link'
import logo from '../public/logo.png'
import { IoMenu, IoClose } from 'react-icons/io5'
import { useState } from 'react'
import LinkButton from './LinkButton'

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false)

  const toggleNavMenu = () => {
    setIsNavOpen(currIsNavOpen => !currIsNavOpen)
  }

  const navStyles = `${
    isNavOpen ? 'circle(75%)' : 'circle(0% at 87.06% 4.68%)'
  }`

  return (
    <header className='h-20 px-10 flex justify-between items-center bg-primaryBg lg:px-20 lg:h-24'>
      <div className='flex items-center gap-2'>
        <h1 className='font-volkhov font-bold lg:text-2xl'>
          <Link href={'/'}>YelpCamp</Link>
        </h1>
        <Image src={logo} alt='YelpCamp' />
      </div>
      <IoMenu
        className='text-3xl cursor-pointer md:hidden'
        onClick={toggleNavMenu}
      />
      <nav
        className='text-left text-2xl md:text-sm w-full h-full flex flex-col justify-center items-center gap-20 bg-dark fixed top-0 left-0 transition-all duration-300 text-secondaryBg md:static md:bg-transparent md:flex-row md:text-dark md:gap-4 lg:gap-8 xl:gap-16 xl:text-base 2xl:text-lg 2xl:gap-24 md:w-auto'
        style={{ clipPath: navStyles }}
      >
        <IoClose
          className='absolute top-6 right-10 text-3xl cursor-pointer md:hidden'
          onClick={toggleNavMenu}
        />
        <ul className='flex flex-col gap-8 px-10 w-full md:flex-row md:px-0 md:w-auto lg:gap-12'>
          <li className='transition-colors border-b-2 border-transparent hover:border-b-secondaryBg hover:border-b-2'>
            <Link href={'/'} onClick={() => setIsNavOpen(false)}>
              Home
            </Link>
          </li>
          <li className='transition-colors border-b-2 border-transparent hover:border-b-secondaryBg hover:border-b-2'>
            <Link href={'/campgrounds'} onClick={() => setIsNavOpen(false)}>
              Campgrounds
            </Link>
          </li>
          <li className='transition-colors border-b-2 border-transparent hover:border-b-secondaryBg hover:border-b-2'>
            <Link href={'/campgrounds/new'} onClick={() => setIsNavOpen(false)}>
              Add Campground
            </Link>
          </li>
        </ul>
        <div className='flex flex-col gap-8 px-10 w-full md:w-auto text-secondaryBg md:text-brand text font-medium md:flex-row md:items-center'>
          <Link href={'#'} className='w-max'>
            Login
          </Link>
          <LinkButton text='Sign Up' linkTo={'#'} />
        </div>
      </nav>
    </header>
  )
}

export default Header
