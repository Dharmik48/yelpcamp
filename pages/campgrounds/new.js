import axios from 'axios'
import { useRouter } from 'next/router'
import { useRef } from 'react'
import Button from '../../components/Button'

const NewCampground = () => {
  const router = useRouter()

  const nameRef = useRef()
  const descRef = useRef()
  const priceRef = useRef()

  const addCampground = async e => {
    e.preventDefault()

    const data = {
      name: nameRef.current.value,
      desc: descRef.current.value,
      price: priceRef.current.value,
    }

    await axios.post('/api/campgrounds', data)
    router.push('/')
  }

  return (
    <section className='text-dark px-10 mt-5 md:mt-10 lg:px-20 flex flex-col gap-8 items-center'>
      <h3 className='font-volkhov max-w-max text-xl md:text-2xl'>
        Add a Campground
      </h3>
      <form className='grid gap-4' onSubmit={addCampground}>
        <input
          type='text'
          name='name'
          placeholder='Enter the name'
          className='bg-[#eff0f6] rounded-xl p-5 max-w-md'
          ref={nameRef}
        />
        <textarea
          name='desc'
          rows='10'
          placeholder='Enter the description'
          className='bg-[#eff0f6] rounded-xl p-5 max-w-md'
          ref={descRef}
        />
        <input
          type='number'
          name='price'
          placeholder='Enter the price'
          className='bg-[#eff0f6] rounded-xl p-5 max-w-md'
          ref={priceRef}
        />
        <Button text={'Submit'} />
      </form>
    </section>
  )
}

export default NewCampground
