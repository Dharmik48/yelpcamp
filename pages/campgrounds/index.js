import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { getCampgrounds } from '../../util/campgrounds'

const Campgrounds = ({ campgrounds }) => {
  // Map over the campgrounds to create JSX
  const renderCampgrounds = campgrounds.map(campground => (
    <li key={campground._id}>
      <h2 className='text-2xl'>{campground.name}</h2>
      <Image
        src={campground.images[0]}
        width='150'
        height='150'
        className='h-auto'
      />
      <p>$ {campground.price}</p>
      <Link href={`/campgrounds/${campground._id}`} className='text-blue'>
        View More
      </Link>
    </li>
  ))

  return (
    <>
      <Head>
        <title>YelpCamp | All Campgrounds</title>
      </Head>
      <section className=''>
        <h2 className='mb-10 font-volkhov text-3xl'>All Campgrounds</h2>
        <ul className='grid gap-4'>{renderCampgrounds}</ul>
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
