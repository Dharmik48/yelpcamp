import Head from 'next/head'
import Link from 'next/link'
import { getCampgrounds } from '../../util/campgrounds'

const Campgrounds = ({ campgrounds }) => {
  // Map over the campgrounds to create JSX
  const renderCampgrounds = campgrounds.map(campground => (
    <li key={campground._id}>
      <h2 className='text-2xl'>{campground.name}</h2>
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
    <section className='px-10 md:px-20 mt-10'>
      <h2 className='font-volkhov text-3xl mb-10'>All Campgrounds</h2>
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
