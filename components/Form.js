import Image from 'next/image'
import { useEffect, useState } from 'react'
import { FaDollarSign, FaExclamationCircle } from 'react-icons/fa'
import { IoClose } from 'react-icons/io5'
import Button from './Button'
import Input from './Input'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { v4 } from 'uuid'
import ReactMapGl, { GeolocateControl, Marker } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import Geocoder from './Geocoder'

const Form = ({ submitForm, data, disabled }) => {
  const formik = useFormik({
    initialValues: {
      name: data?.name || '',
      desc: data?.desc || '',
      price: data?.price || '',
      images: data?.images || [],
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Please enter a name!'),
      desc: Yup.string()
        .max(750, 'Description cannot be more than 750')
        .required('Please enter a description!'),
      images: Yup.array().min(1, 'Please select atleast 1 image!').required(),
      price: Yup.number()
        .min(0, 'Price cannot be less than 0!')
        .required('Please enter a price!'),
    }),
    onSubmit: values => {
      submitForm({ ...values, location })
    },
  })

  const [isImageDragged, setIsImageDragged] = useState(false)
  const [location, setLocation] = useState({})

  useEffect(() => {
    getLocation()
  }, [])

  const getLocation = () => {
    // if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      // Success function
      showPosition,
      // Error function
      null,
      // Options.
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    )
    // }
  }

  const showPosition = pos => {
    setLocation({
      lat: pos.coords.latitude,
      long: pos.coords.longitude,
    })
  }

  const handleImageUpload = async e => {
    if (!e.target.files[0]) return

    const files = Array.from(e.target.files)

    const imgs = files.map(file => ({
      id: v4(),
      file,
      previewUrl: URL.createObjectURL(file),
    }))

    formik.setFieldValue('images', [...formik.values.images, ...imgs])
  }

  const removePreviewImage = img => {
    formik.setFieldValue(
      'images',
      formik.values.images.filter(imgFile => imgFile.id != img.id)
    )
  }

  const renderPreviewImgs = () => {
    if (formik.values.images.length <= 0) return

    return formik.values.images.map(img => (
      <div className='group relative w-full rounded-xl pb-5' key={img.id}>
        <Image
          src={img.url || img.previewUrl}
          width='350'
          height='350'
          className='w-full rounded-xl'
          alt={img.file?.name || ''}
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
      className='x-auto flex w-full flex-col gap-8 lg:mx-0'
      onSubmit={formik.handleSubmit}
    >
      <div className='flex flex-col gap-4'>

      <h3 className='font-volkhov text-2xl lg:text-3xl'>Write Name and Description</h3>
      <Input
        type='text'
        name='name'
        placeholder='Enter the name'
        handleChange={formik.handleChange}
        value={formik.values.name}
        className={`${
          !!formik.touched.name &&
          !!formik.errors.name &&
          'outline outline-2 outline-red'
        }`}
        onBlur={formik.handleBlur}
        />
      {!!formik.touched.name && !!formik.errors.name && (
        <span className='inline-flex items-center gap-2 text-sm text-red'>
          <FaExclamationCircle />
          {formik.errors.name}
        </span>
      )}
      <Input
        type='textarea'
        name='desc'
        rows='10'
        placeholder='Enter the description'
        handleChange={formik.handleChange}
        value={formik.values.desc}
        className={`${
          !!formik.touched.desc &&
          !!formik.errors.desc &&
          'outline outline-2 outline-red'
        }`}
        onBlur={formik.handleBlur}
        />
      {!!formik.touched.desc && !!formik.errors.desc && (
        <span className='inline-flex items-center gap-2 text-sm text-red'>
          <FaExclamationCircle />
          {formik.errors.desc}
        </span>
      )}
      </div>
      <div className='flex flex-col gap-4'>

      <h3 className='font-volkhov text-2xl lg:text-3xl'>Select the location</h3>
      <div className='h-72 overflow-hidden rounded-xl lg:h-96'>
        {!(Object.keys(location).length === 0) && (
          <ReactMapGl
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_KEY}
          initialViewState={{
            latitude: location.lat,
              longitude: location.long,
              zoom: 8,
            }}
            mapStyle='mapbox://styles/dharmik403/cleh3wthw003g01qgpq5gxlk7'
            attributionControl={false}
            onClick={e =>
              setLocation({ lat: e.lngLat.lat, long: e.lngLat.lng })
            }
            >
            <Marker
              latitude={location.lat}
              longitude={location.long}
              draggable
              onDragEnd={e =>
                setLocation({ lat: e.lngLat.lat, long: e.lngLat.lng })
              }
              />
            <GeolocateControl position='top-left' trackUserLocation />
            <Geocoder setLocation={setLocation} />
          </ReactMapGl>
        )}
      </div>
        </div>
        <div className='flex flex-col gap-4'>

      <h3 className='font-volkhov text-2xl lg:text-3xl'>Add some photos</h3>
      <div className='rounded-xl bg-lightBlue'>
        <label
          htmlFor='image'
          className={`relative flex w-full cursor-pointer justify-between rounded-xl bg-lightBlue p-5 text-dark outline-2 focus-within:outline focus-within:outline-brand ${
            !!isImageDragged && 'italic outline-dashed outline-brand'
          } ${
            !!formik.touched.images &&
            !!formik.errors.images &&
            'outline outline-2 outline-red'
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
            multiple
            onChange={handleImageUpload}
            />
        </label>
        <div
          className={`${
            !!(formik.values.images.length > 0) && 'px-5 pt-5'
          } gap-5 md:columns-2`}
          >
          {renderPreviewImgs()}
        </div>
      </div>
      {formik.touched.images && !!formik.errors.images && (
        <span className='inline-flex items-center gap-2 text-sm text-red'>
          <FaExclamationCircle />
          {formik.errors.images}
        </span>
      )}
      </div>
      <div className='flex flex-col gap-4'>

      <h3 className='font-volkhov text-2xl lg:text-3xl'>Enter the price</h3>
      <div
        className={`flex max-w-full items-center rounded-xl bg-lightBlue pl-5 focus-within:outline focus-within:outline-2 focus-within:outline-brand ${
          !!formik.touched.price &&
          !!formik.errors.price &&
          'outline outline-2 outline-red'
        }`}
        >
        <FaDollarSign className='text-dark' />
        <Input
          type='number'
          name='price'
          placeholder='Enter the price'
          className='w-full focus:!outline-0'
          handleChange={formik.handleChange}
          value={formik.values.price}
          onBlur={formik.handleBlur}
          />
      </div>
      {!!formik.touched.price && !!formik.errors.price && (
        <span className='inline-flex items-center gap-2 text-sm text-red'>
          <FaExclamationCircle />
          {formik.errors.price}
        </span>
      )}
      </div>
      {<Button text='Submit' title='Add Campground' disabled={disabled} />}
    </form>
  )
}

export default Form
