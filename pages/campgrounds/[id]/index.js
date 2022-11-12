import Head from 'next/head'
import axios from 'axios'
import { useRouter } from 'next/router'
import Button from '../../../components/Button'
import LinkButton from '../../../components/LinkButton'
import { getCampgrounds, getCampground } from '../../../util/campgrounds'

const CampgroundDetail = ({ campground }) => {
  const router = useRouter()

  if (router.isFallback) return <h1>Loading...</h1>

  const deleteCampground = async () => {
    await axios.delete(`/api/campgrounds/${campground._id}`)
    router.push('/campgrounds')
  }

  return (
    <>
      <Head>
        <title>YelpCamp | {campground.name}</title>
      </Head>
      <section>
        <h2 className='font-volkhov text-3xl'>{campground.name}</h2>
        <p>{campground.desc}</p>
        <p className=''>${campground.price}</p>
        <div className='flex gap-4'>
          <LinkButton
            text='Edit'
            linkTo={`/campgrounds/${campground._id}/edit`}
          />
          <Button text='Delete' danger='true' handleClick={deleteCampground} />
        </div>
      </section>
    </>
  )
}

export async function getStaticPaths() {
  // Fetch campground ids
  const campgrounds = await getCampgrounds('_id')
  // Map over the ids and create path obj
  const paths = campgrounds.map(campground => ({
    params: { id: campground._id.toString() },
  }))

  return { paths, fallback: true }
}

export async function getStaticProps({ params }) {
  // Fetch campground data
  const campground = await getCampground(params.id)
  // Send the data as prop
  return {
    props: { campground },
    // Revalidate the page after 10 secs
    revalidate: 10,
  }
}

export default CampgroundDetail
