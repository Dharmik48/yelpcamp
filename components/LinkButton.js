import Link from 'next/link'

const LinkButton = ({ text, linkTo }) => {
  return (
    <Link
      href={linkTo}
      className='w-max bg-brand text-secondaryBg py-3 px-7 rounded-lg hover:bg-transparent hover:text-secondaryBg border-2 border-transparent hover:border-secondaryBg transition-colors md:hover:text-brand md:hover:border-brand'
    >
      {text}
    </Link>
  )
}

export default LinkButton
