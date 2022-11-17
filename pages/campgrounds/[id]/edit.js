import Head from 'next/head'
import { useRouter } from 'next/router'
import axios from 'axios'
import NewForm from '../../../components/NewForm'
import { getCampground, getCampgrounds } from '../../../util/campgrounds'

const EditCampground = ({ campground }) => {
  const router = useRouter()

  if (router.isFallback) return <h1>Loading...</h1>

  const handleSubmit = async data => {
    await axios.patch(`/api/campgrounds/${campground._id}`, data)
    router.push('/campgrounds')
  }

  return (
    <>
      <Head>
        <title>YelpCamp | Edit {campground.name}</title>
      </Head>
      <section className='mt-5 flex flex-col items-center gap-8 px-10 text-dark md:mt-10 lg:px-20'>
        <h3 className='max-w-max font-volkhov text-xl md:text-2xl'>
          Edit {campground.name}
        </h3>
        <NewForm btnText='Done' data={campground} submitForm={handleSubmit} />
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

export default EditCampground
