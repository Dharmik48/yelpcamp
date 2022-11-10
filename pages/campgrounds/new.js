import axios from 'axios'
import { useRouter } from 'next/router'
import { useRef } from 'react'
import Button from '../../components/Button'
import Form from '../../components/Form'

const NewCampground = () => {
  const router = useRouter()

  const nameRef = useRef()
  const descRef = useRef()
  const priceRef = useRef()

  const addCampground = async data => {
    await axios.post('/api/campgrounds', data)
    router.push('/campgrounds')
  }

  return (
    <section className='text-dark px-10 mt-5 md:mt-10 lg:px-20 flex flex-col gap-8 items-center'>
      <h3 className='font-volkhov max-w-max text-xl md:text-2xl'>
        Add a Campground
      </h3>
      <Form btnText={'Submit'} submitForm={addCampground} />
    </section>
  )
}

export default NewCampground
