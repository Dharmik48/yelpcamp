import Head from 'next/head'
import { getCampgrounds } from '../../util/campgrounds'
import CampgroundCard from '../../components/CampgroundCard'

const Campgrounds = ({ campgrounds }) => {
  // Map over the campgrounds to create JSX
  const renderCampgrounds = campgrounds.map(campground => (
    <li>
      <CampgroundCard campground={campground} />
    </li>
  ))

  return (
    <>
      <Head>
        <title>YelpCamp | All Campgrounds</title>
      </Head>
      <section className='py-12'>
        <h2 className='mb-10 font-volkhov text-3xl'>All Campgrounds</h2>
        <ul className='grid w-full gap-6 md:grid-cols-2 lg:grid-cols-3'>
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
