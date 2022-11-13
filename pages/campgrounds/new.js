import Head from 'next/head'
import axios from 'axios'
import { useRouter } from 'next/router'
import Form from '../../components/Form'
import Image from 'next/image'
import illustration from '../../public/camping.svg'

const NewCampground = () => {
  const router = useRouter()

  const addCampground = async data => {
    await axios.post('/api/campgrounds', data)
    router.push('/campgrounds')
  }

  return (
    <>
      <Head>
        <title>YelpCamp | New Campground</title>
      </Head>
      <section className='flex items-center gap-16 py-12'>
        <div className='mx-auto max-w-full lg:mx-0 lg:flex-1'>
          <h3 className='mb-8 text-left font-volkhov text-2xl font-bold md:text-3xl lg:text-4xl'>
            Add a Campground
          </h3>
          <Form
            btnText={'Submit'}
            submitForm={addCampground}
            className='mx-auto w-full lg:mx-0'
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

export default NewCampground
