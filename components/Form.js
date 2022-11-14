import { useEffect, useRef, useState } from 'react'
import Button from './Button'
import { FaDollarSign } from 'react-icons/fa'
import { IoClose } from 'react-icons/io5'
import Image from 'next/image'

const Form = ({ submitForm, btnText, data, className = '' }) => {
  const nameRef = useRef()
  const descRef = useRef()
  const priceRef = useRef()

  const [imageFiles, setImageFiles] = useState([])
  const [isImageDragged, setIsImageDragged] = useState(false)
  console.log(imageFiles)
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
    console.log(data)
    submitForm(data, imageFiles)
  }

  const showImgPreview = async e => {
    if (!e.target.files[0]) return

    const files = Array.from(e.target.files)

    const imgs = files.map(file => ({
      file,
      previewUrl: URL.createObjectURL(file),
    }))

    setImageFiles(imgs)
  }

  const removePreviewImage = img => {
    setImageFiles(currImageFiles =>
      currImageFiles.filter(imgFile => imgFile.file.name != img.file.name)
    )
  }

  const renderPreviewImgs = () => {
    if (imageFiles.length <= 0) return

    return imageFiles.map(img => (
      <div
        className='group relative w-full rounded-xl pb-5'
        key={img.file.name}
      >
        <Image
          src={img.previewUrl}
          width='100'
          height='100'
          className='w-full rounded-xl'
          alt={img.file.name}
        ></Image>
        <IoClose
          role='button'
          title='Remove Image'
          className='absolute top-5 right-5 cursor-pointer rounded-full bg-lightBlue p-[2px] text-2xl transition-transform lg:scale-0 lg:group-hover:scale-100'
          onClick={() => removePreviewImage(img)}
        />
      </div>
    ))
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
      <div className='rounded-xl bg-lightBlue'>
        <label
          htmlFor='image'
          className={`relative flex w-full cursor-pointer justify-between rounded-xl bg-lightBlue p-5 text-dark outline-2 focus-within:outline focus-within:outline-brand ${
            !!isImageDragged && 'italic outline-dashed outline-brand'
          }`}
          onDragEnter={() => setIsImageDragged(true)}
          onDragExit={() => setIsImageDragged(false)}
          onDrop={() => setIsImageDragged(false)}
        >
          {isImageDragged ? 'Drop here' : 'Choose or Drag images'}
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='icon icon-tabler icon-tabler-photo-plus text-dark'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            strokeWidth='2'
            stroke='currentColor'
            fill='none'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
            <path d='M15 8h.01'></path>
            <path d='M12 20h-5a3 3 0 0 1 -3 -3v-10a3 3 0 0 1 3 -3h10a3 3 0 0 1 3 3v5'></path>
            <path d='M4 15l4 -4c.928 -.893 2.072 -.893 3 0l4 4'></path>
            <path d='M14 14l1 -1c.617 -.593 1.328 -.793 2.009 -.598'></path>
            <path d='M16 19h6'></path>
            <path d='M19 16v6'></path>
          </svg>
          <input
            id='image'
            type='file'
            name='name'
            placeholder='Upload an image'
            className='absolute top-0 left-0 h-full w-full cursor-pointer rounded-xl opacity-0'
            accept='image/*'
            multiple
            onChange={showImgPreview}
          />
        </label>
        <div
          className={`${
            !!(imageFiles.length > 0) && 'px-5 pt-5'
          } gap-5 md:columns-2`}
        >
          {renderPreviewImgs()}
        </div>
      </div>

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
