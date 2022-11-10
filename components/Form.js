import { useEffect, useRef } from 'react'
import Button from './Button'

const Form = ({ submitForm, btnText, data }) => {
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
    <form className='grid gap-4' onSubmit={handleSubmit}>
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
      <Button text={btnText} />
    </form>
  )
}

export default Form
