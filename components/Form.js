import { useEffect, useRef } from 'react'
import Button from './Button'
import { FaDollarSign } from 'react-icons/fa'

const Form = ({ submitForm, btnText, data, className = '' }) => {
  const nameRef = useRef()
  const descRef = useRef()
  const priceRef = useRef()

  useEffect(() => {
    if (!data) return
    nameRef.current.value = data.name
    descRef.current.value = data.desc
    priceRef.current.value = data.price
  }, [])

  const handleSubmit = e => {
    e.preventDefault()

    const data = {
      name: nameRef.current.value,
      desc: descRef.current.value,
      price: priceRef.current.value,
    }
    submitForm(data)
  }

  return (
    <form
      className={`${className} flex flex-col gap-4`}
      onSubmit={handleSubmit}
    >
      <input
        type='text'
        name='name'
        placeholder='Enter the name'
        className='rounded-xl bg-lightBlue p-5 focus:outline focus:outline-2 focus:outline-brand'
        ref={nameRef}
      />
      <label
        htmlFor='image'
        className='flex cursor-pointer justify-between rounded-xl bg-lightBlue p-5 text-dark focus:outline focus:outline-2 focus:outline-brand'
      >
        Upload an image
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='icon icon-tabler icon-tabler-photo-plus text-dark'
          width='24'
          height='24'
          viewBox='0 0 24 24'
          stroke-width='2'
          stroke='currentColor'
          fill='none'
          stroke-linecap='round'
          stroke-linejoin='round'
        >
          <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
          <path d='M15 8h.01'></path>
          <path d='M12 20h-5a3 3 0 0 1 -3 -3v-10a3 3 0 0 1 3 -3h10a3 3 0 0 1 3 3v5'></path>
          <path d='M4 15l4 -4c.928 -.893 2.072 -.893 3 0l4 4'></path>
          <path d='M14 14l1 -1c.617 -.593 1.328 -.793 2.009 -.598'></path>
          <path d='M16 19h6'></path>
          <path d='M19 16v6'></path>
        </svg>
      </label>
      <input
        id='image'
        type='file'
        name='name'
        placeholder='Enter the name'
        className='hidden'
        ref={nameRef}
      />
      <textarea
        name='desc'
        rows='10'
        placeholder='Enter the description'
        className='rounded-xl bg-lightBlue p-5 focus:outline focus:outline-2 focus:outline-brand'
        ref={descRef}
      />
      <div className='flex max-w-full items-center rounded-xl bg-lightBlue pl-5 focus-within:outline focus-within:outline-2 focus-within:outline-brand'>
        <FaDollarSign className='text-dark' />
        <input
          type='number'
          name='price'
          placeholder='Enter the price'
          className='w-full rounded-r-xl bg-lightBlue p-5 focus:outline-none'
          ref={priceRef}
        />
      </div>
      <Button text={btnText} title='Add Campground' />
    </form>
  )
}

export default Form
