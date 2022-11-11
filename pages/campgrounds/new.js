import Head from 'next/head'
import axios from 'axios'
import { useRouter } from 'next/router'
import Form from '../../components/Form'

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
    <section className='text-dark px-10 mt-5 md:mt-10 lg:px-20 flex flex-col gap-8 items-center'>
      <h3 className='font-volkhov max-w-max text-xl md:text-2xl'>
        Add a Campground
      </h3>
      <Form btnText={'Submit'} submitForm={addCampground} />
    </section>
    </>
  )
}

export default NewCampground
