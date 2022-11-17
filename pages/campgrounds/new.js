import Head from 'next/head'
import axios from 'axios'
import { useRouter } from 'next/router'
import NewForm from '../../components/NewForm'
import Image from 'next/image'
import illustration from '../../public/camping.svg'
import { FaCampground } from 'react-icons/fa'
import { storage } from '../../util/firebase'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { v4 } from 'uuid'
import { useState } from 'react'

const NewCampground = () => {
  const router = useRouter()
  const [isSubmiting, setIsSubmiting] = useState(false)

  const uploadAndGetImgUrls = async images => {
    return await Promise.all(
      images.map(async img => {
        const imageId = v4()
        const imgRef = ref(storage, `images/${imageId}`)
        await uploadBytes(imgRef, img.file)

        return await getDownloadURL(imgRef)
      })
    )
  }

  const addCampground = async data => {
    setIsSubmiting(true)
    const imgUrls = await uploadAndGetImgUrls(data.images)

    await axios.post('/api/campgrounds', { ...data, images: imgUrls })
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
          <NewForm submitForm={addCampground} disabled={isSubmiting} />
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
