import Head from 'next/head'
import axios from 'axios'
import { useRouter } from 'next/router'
import Button from '../../../components/Button'
import LinkButton from '../../../components/LinkButton'
import { getCampgrounds, getCampground } from '../../../util/campgrounds'
import Image from 'next/image'
import { toast } from 'react-toastify'
import { FaCheck } from 'react-icons/fa'
import { IoAdd, IoRemove, IoChevronDown, IoChevronUp } from 'react-icons/io5'
import { HiStar } from 'react-icons/hi2'
import { useSession } from 'next-auth/react'
import Reviews from '../../../components/Reviews'
import ReactMapGl, { GeolocateControl, Marker } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import Datepicker from 'react-tailwindcss-datepicker'
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'

const camp = {
  _id: '',
  name: '',
  desc: '',
  price: {},
  images: [],
  owner: '',
  reviews: [],
  location: {},
}

const CampgroundDetail = ({ campground = camp }) => {
  const { data: session } = useSession()
  const router = useRouter()

  const [dateValue, setDateValue] = useState({
    startDate: 'Select',
    endDate: 'Select',
  })

  const [showGuestSelector, setShowGuestSelector] = useState(false)
  const [guests, setGuests] = useState({
    adults: 1,
    children: 0,
    infants: 0,
  })

  const [price, setPrice] = useState(campground?.price.adults)

  useEffect(() => {
    const start = dayjs(dateValue.startDate)
    const end = dayjs(dateValue.endDate)

    const hours = end.diff(start, 'hours')
    const days = hours / 24 + 1

    setPrice(
      (guests.adults * campground?.price.adults +
        guests.children * campground?.price.children) *
        days
    )
  }, [guests, dateValue])

  if (router.isFallback) return <h1>Loading...</h1>

  const redirectToCheckout = () => {
    const start = dayjs(dateValue.startDate)
    const end = dayjs(dateValue.endDate)

    const hours = end.diff(start, 'hours')
    const days = hours / 24 + 1

    router.push(
      `/api/campgrounds/${campground?._id}/checkout?adults=${guests.adults}&children=${guests.children}&days=${days}&checkIn=${dateValue.startDate}&checkOut=${dateValue.endDate}&user=${session.user.id}`
    )
  }

  const handleDateValueChange = newValue => {
    setDateValue(newValue)
  }

  const addGuest = ageGroup => {
    if (ageGroup === 'adult')
      setGuests(curr => ({ ...curr, adults: curr.adults + 1 }))
    if (ageGroup === 'children')
      setGuests(curr => ({ ...curr, children: curr.children + 1 }))
    if (ageGroup === 'infant')
      setGuests(curr => ({ ...curr, infants: curr.infants + 1 }))
  }

  const removeGuest = ageGroup => {
    if (ageGroup === 'adult')
      setGuests(curr => ({ ...curr, adults: curr.adults - 1 }))
    if (ageGroup === 'children')
      setGuests(curr => ({ ...curr, children: curr.children - 1 }))
    if (ageGroup === 'infant')
      setGuests(curr => ({ ...curr, infants: curr.infants - 1 }))
  }

  const deleteCampground = async () => {
    const { data: deletedCampground } = await axios.delete(
      `/api/campgrounds/${campground?._id}`
    )
    toast.success(
      () => (
        <>
          Successfully deleted{' '}
          <span className='font-semibold'>{deletedCampground?.name}</span>
        </>
      ),
      {
        icon: FaCheck,
      }
    )
    router.push('/campgrounds')
  }

  const renderImages = () =>
    campground?.images.map(img => (
      <Image
        width={'300'}
        height={'300'}
        src={img.url}
        key={img.id}
        className='mb-5 flex-1 rounded-xl'
      />
    ))

  return (
    <>
      <Head>
        <title>{`YelpCamp | ${campground?.name}`}</title>
      </Head>
      <section className='flex flex-col gap-4 py-10 lg:gap-6 lg:py-16'>
        <div>
          <h1 className='mb-2 font-volkhov text-3xl text-brand lg:mb-4 lg:text-4xl 2xl:text-5xl'>
            {campground?.name}
          </h1>
          <p className='text-sm'>
            {`${campground?.location.city}, ${campground?.location.state}, ${campground?.location.country}`}{' '}
            &middot;{' '}
            <span className='inline-flex items-center'>
              {campground?.rating || '?'} <HiStar />
            </span>
          </p>
        </div>
        <ul className='flex gap-2 overflow-scroll'>{renderImages()}</ul>
        <div className='flex w-full flex-col gap-4 rounded-md bg-secondaryBg p-6 shadow-lg md:flex-row md:items-center md:justify-between'>
          <p className='md:text-xl'>
            <span className='text-xl font-bold md:text-2xl lg:text-3xl'>
              ${campground?.price.adults}
            </span>
            /night
          </p>
          <div className='relative flex flex-col gap-6   sm:flex-row md:ml-auto'>
            <div className='w-full max-w-sm rounded-md border border-text bg-primaryBg sm:h-auto md:w-sm'>
              <div className='relative flex h-14 border-b border-text'>
                <div className='absolute inset-0'>
                  <Datepicker
                    primaryColor='green'
                    onChange={handleDateValueChange}
                    value={dateValue}
                    inputClassName='opacity-0 cursor-pointer h-full'
                    toggleClassName='opacity-0 pointer-events-none'
                    containerClassName='h-full'
                  />
                </div>
                <div className='my-auto ml-4 flex-1 border-r border-text'>
                  <p className='text-xs'>Check in</p>
                  <p>{dateValue.startDate.toString()}</p>
                </div>
                <div className='my-auto ml-4 flex-1'>
                  <p className='text-xs'>Check out</p>
                  <p>{dateValue.endDate.toString()}</p>
                </div>
              </div>
              <div className='relative cursor-pointer'>
                <div
                  className='flex h-full items-center justify-between px-4 py-4'
                  onClick={() => setShowGuestSelector(curr => !curr)}
                >
                  <div>
                    <p className='text-xs'>Guests</p>
                    <p>{`${guests.adults} adults${
                      !!guests.children
                        ? ', ' + guests.children + ' children'
                        : ''
                    } ${
                      !!guests.infants ? ', ' + guests.infants + ' infants' : ''
                    }`}</p>
                  </div>
                  {showGuestSelector ? (
                    <IoChevronUp className='text-2xl text-brand' />
                  ) : (
                    <IoChevronDown className='text-2xl text-brand' />
                  )}
                </div>
                <div
                  className={`absolute top-full right-0 left-0 ${
                    showGuestSelector ? 'flex' : 'hidden'
                  } flex-col gap-4 rounded-md border border-text bg-primaryBg p-4 shadow-md`}
                >
                  <div className='flex items-center justify-between'>
                    <div>
                      <p>Adult</p>
                      <p className='text-sm text-paragraph'>Age 13+</p>
                    </div>
                    <div className='flex items-center gap-2 text-xl'>
                      <IoRemove
                        className='cursor-pointer rounded-full border border-text text-dark'
                        onClick={() => removeGuest('adult')}
                      />
                      {guests.adults}
                      <IoAdd
                        className='cursor-pointer rounded-full border border-text text-dark'
                        onClick={() => addGuest('adult')}
                      />
                    </div>
                  </div>
                  <div className='flex items-center justify-between'>
                    <div>
                      <p>Children</p>
                      <p className='text-sm text-paragraph'>Age 2-12</p>
                    </div>
                    <div className='flex items-center gap-2 text-xl'>
                      <IoRemove
                        className='cursor-pointer rounded-full border border-text text-dark'
                        onClick={() => removeGuest('children')}
                      />
                      {guests.children}
                      <IoAdd
                        className='cursor-pointer rounded-full border border-text text-dark'
                        onClick={() => addGuest('children')}
                      />
                    </div>
                  </div>
                  <div className='flex items-center justify-between'>
                    <div>
                      <p>Infants</p>
                      <p className='text-sm text-paragraph'>Under 2</p>
                    </div>
                    <div className='flex items-center gap-2 text-xl'>
                      <IoRemove
                        className='cursor-pointer rounded-full border border-text text-dark'
                        onClick={() => removeGuest('infant')}
                      />
                      {guests.infants}
                      <IoAdd
                        className='cursor-pointer rounded-full border border-text text-dark'
                        onClick={() => addGuest('infant')}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex items-center justify-between gap-4 md:flex-col md:justify-start'>
              {!!price && (
                <p className='font-volkhov text-lg'>
                  Total price:{' '}
                  <span className='text-2xl font-medium text-brand'>
                    ${price}
                  </span>
                </p>
              )}
              <Button
                text='Reserve'
                className='h-fit max-w-fit'
                handleClick={redirectToCheckout}
              />
            </div>
          </div>
        </div>
        <div>
          <h3 className='mb-3 font-volkhov text-2xl lg:text-3xl'>About</h3>
          <p className='lg:text-lg'>{campground?.desc}</p>
        </div>
        {session?.user?.email === campground?.owner.email && (
          <div className='flex gap-4'>
            <LinkButton
              text='Edit'
              linkTo={`/campgrounds/${campground?._id}/edit`}
            />
            <Button
              text='Delete'
              danger='true'
              handleClick={deleteCampground}
            />
          </div>
        )}
      </section>
      <hr className='my-10 text-paragraph' />
      <h3 className='mb-3 font-volkhov text-2xl lg:text-3xl'>Location</h3>
      <div className='h-72 overflow-hidden rounded-xl lg:h-96'>
        <ReactMapGl
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_KEY}
          initialViewState={{
            latitude: campground?.location.coords.lat,
            longitude: campground?.location.coords.long,
            zoom: 5,
          }}
          mapStyle='mapbox://styles/dharmik403/cleh3wthw003g01qgpq5gxlk7'
          attributionControl={false}
        >
          <Marker
            latitude={campground?.location.coords.lat}
            longitude={campground?.location.coords.long}
          />
          <GeolocateControl position='top-left' trackUserLocation />
        </ReactMapGl>
      </div>
      <div className='my-10 lg:my-16'>
        <h4 className='mb-3 font-volkhov text-2xl lg:text-3xl'>
          Reviews &middot;{' '}
          <span className='inline-flex items-center text-brand'>
            {campground?.rating || '?'}
            <HiStar />
          </span>
        </h4>
        <Reviews data={campground?.reviews} />
      </div>
    </>
  )
}

export async function getStaticPaths() {
  // Fetch campground ids
  const campgrounds = await getCampgrounds({ fields: '_id' })
  // Map over the ids and create path obj
  const paths = campgrounds.map(campground => ({
    params: { id: campground?._id.toString() },
  }))
  return { paths, fallback: true }
}

export async function getStaticProps({ params }) {
  // Fetch campground data
  const campground = await getCampground(params.id, true, true)
  // Send the data as prop
  return {
    props: { campground },
    // Revalidate the page after 10 secs
    revalidate: 10,
  }
}

export default CampgroundDetail
