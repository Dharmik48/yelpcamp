import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { getCampgrounds } from '../../util/campgrounds'
import LinkButton from '../../components/LinkButton'

const Campgrounds = ({ campgrounds }) => {
  // Map over the campgrounds to create JSX
  const renderCampgrounds = campgrounds.map(campground => (
    <li
      key={campground._id}
      className='group flex flex-col gap-3 rounded-xl border border-lightBlue'
    >
      <div className='relative'>
        <Image
          src={campground.images[0]}
          width='450'
          height='450'
          className='h-80 w-full rounded-xl object-cover'
          alt={campground.name}
        />
        <LinkButton
          text='View More'
          linkTo={`/campgrounds/${campground._id}`}
          className='absolute right-1/2 bottom-4 w-fit translate-x-1/2 px-4 opacity-0 hover:border-primaryBg hover:bg-primaryBg lg:group-hover:opacity-100'
        />
      </div>
      <div className='py-5 px-3'>
        <div className='flex items-center justify-between'>
          <h2 className='mb-2 text-2xl'>{campground.name}</h2>
          <p className='w-fit rounded-md bg-[#FFE7DB] py-1 px-2 font-medium text-brand'>
            ${campground.price}
          </p>
        </div>
        <Link
          href={`/campgrounds/${campground._id}`}
          className='text-brand lg:hidden'
        >
          View More
        </Link>
      </div>
    </li>
  ))

  return (
    <>
      <Head>
        <title>YelpCamp | All Campgrounds</title>
      </Head>
      <section className='py-12'>
        <h2 className='mb-10 font-volkhov text-3xl'>All Campgrounds</h2>
        <ul className='grid w-full gap-6 sm:grid-cols-2 md:grid-cols-3'>
          {renderCampgrounds}
        </ul>
      </section>
    </>
  )
}

export async function getStaticProps() {
  // Fetch campground data
  const campgrounds = await getCampgrounds()
  // Send the data as prop
  return {
    props: { campgrounds },
    // Revalidate the page after 10 secs
    revalidate: 10,
  }
}

export default Campgrounds
