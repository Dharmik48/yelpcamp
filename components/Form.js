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
      <textarea
        name='desc'
        rows='10'
        placeholder='Enter the description'
        className='rounded-xl bg-lightBlue p-5 focus:outline focus:outline-2 focus:outline-brand'
        ref={descRef}
      />
      <div className='flex max-w-full items-center rounded-xl bg-lightBlue pl-5 focus-within:outline focus-within:outline-2 focus-within:outline-brand'>
        <FaDollarSign className=' text-dark' />
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
