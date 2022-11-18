import Head from 'next/head'
import { useRouter } from 'next/router'
import axios from 'axios'
import NewForm from '../../../components/NewForm'
import { getCampground, getCampgrounds } from '../../../util/campgrounds'
import { uploadAndGetImgUrls } from '../../../util/uploadImage'
import { useState } from 'react'
import illustration from '../../../public/camping.svg'
import { FaCampground } from 'react-icons/fa'
import Image from 'next/image'

const EditCampground = ({ campground }) => {
  const [isSubmiting, setIsSubmiting] = useState(false)
  const router = useRouter()

  if (router.isFallback) return <h1>Loading...</h1>

  const handleSubmit = async data => {
    setIsSubmiting(true)
    const images = await uploadAndGetImgUrls(data.images)
    await axios.patch(`/api/campgrounds/${campground._id}`, { ...data, images })
    setIsSubmiting(false)
    router.push('/campgrounds')
  }

  return (
    <>
      <Head>
        <title>YelpCamp | Edit {campground.name}</title>
      </Head>
      <section className='flex items-center gap-16 py-12'>
        <div className='mx-auto max-w-full lg:mx-0 lg:flex-1'>
          <h3 className='mb-8 flex items-center gap-2 text-left font-volkhov text-2xl font-bold md:gap-4 md:text-3xl lg:text-4xl'>
            <FaCampground />
            Edit {campground.name}
          </h3>
          <NewForm
            submitForm={handleSubmit}
            data={campground}
            disabled={isSubmiting}
          />
        </div>
        <Image
          src={illustration}
          className='hidden max-w-[50%] flex-1 self-center lg:block'
          alt='man campging'
        />
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
