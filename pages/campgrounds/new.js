import Head from 'next/head'
import axios from 'axios'
import { useRouter } from 'next/router'
import Form from '../../components/Form'
import Image from 'next/image'
import illustration from '../../public/camping.svg'
import { FaCampground, FaCheck } from 'react-icons/fa'
import { uploadAndGetImgUrls } from '../../util/uploadImage'
import { useState } from 'react'
import { toast } from 'react-toastify'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

const NewCampground = () => {
  const { data: session } = useSession()

  const router = useRouter()
  const [isSubmiting, setIsSubmiting] = useState(false)

  const addCampground = async data => {
    setIsSubmiting(true)
    const images = await uploadAndGetImgUrls(data.images)

    const { data: campground } = await axios.post('/api/campgrounds', {
      ...data,
      images,
      owner: session.user.email,
    })

    toast.success(
      () => (
        <>
          Campground added success fully!{' '}
          <Link href={`/campgrounds/${campground._id}`}>
            <span className='font-semibold'>Click here</span> to view
          </Link>
        </>
      ),
      { icon: FaCheck }
    )
    setIsSubmiting(false)
    router.push('/campgrounds')
  }

  return (
    <>
      <Head>
        <title>YelpCamp | New Campground</title>
      </Head>
      <section className='flex items-center gap-16 py-12'>
        <div className='mx-auto max-w-full lg:mx-0 lg:flex-1'>
          <h3 className='mb-8 flex items-center gap-2 text-left font-volkhov text-2xl font-bold md:gap-4 md:text-3xl lg:text-4xl'>
            <FaCampground />
            Add a Campground
          </h3>
          <Form submitForm={addCampground} disabled={isSubmiting} />
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

export default NewCampground
