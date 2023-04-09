import Head from 'next/head'
import axios from 'axios'
import { useRouter } from 'next/router'
import Button from '../../../components/Button'
import LinkButton from '../../../components/LinkButton'
import { getCampgrounds, getCampground } from '../../../util/campgrounds'
import Image from 'next/image'
import { toast } from 'react-toastify'
import {
  FaRestroom,
  FaFaucet,
  FaRecycle,
  FaStore,
  FaUmbrellaBeach,
  FaSwimmingPool,
  FaHiking,
  FaBasketballBall,
  FaDog,
  FaWifi,
  FaCampground,
} from 'react-icons/fa'
// import { TbCampfire } from 'react-icons/tb'
import {
  GiWashingMachine,
  GiMountainClimbing,
  GiFlamingo,
  GiMeditation,
  GiCampfire,
} from 'react-icons/gi'
import { IoAdd, IoRemove, IoChevronDown, IoChevronUp } from 'react-icons/io5'
import { HiStar } from 'react-icons/hi2'
import { useSession } from 'next-auth/react'
import Reviews from '../../../components/Reviews'
import ReactMapGl, { GeolocateControl, Marker } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import Datepicker from 'react-tailwindcss-datepicker'
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import Link from 'next/link'

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
  const amenityIcons = {
    FaRestroom: <FaRestroom />,
    FaFaucet: <FaFaucet />,
    FaRecycle: <FaRecycle />,
    FaStore: <FaStore />,
    GiCampfire: <GiCampfire />,
    GiWashingMachine: <GiWashingMachine />,
    FaUmbrellaBeach: <FaUmbrellaBeach />,
    FaSwimmingPool: <FaSwimmingPool />,
    FaHiking: <FaHiking />,
    FaBasketballBall: <FaBasketballBall />,
    FaDog: <FaDog />,
    FaWifi: <FaWifi />,
    FaCampground: <FaCampground />,
    GiMountainClimbing: <GiMountainClimbing />,
    GiFlamingo: <GiFlamingo />,
    HiStar: <HiStar />,
    GiMeditation: <GiMeditation />,
  }

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

    days &&
      setPrice(
        (guests.adults * campground?.price.adults +
          guests.children * campground?.price.children) *
          ((100 - campground.price.discount) / 100) *
          days
      )
  }, [guests, dateValue])

  if (router.isFallback) return <h1>Loading...</h1>

  const redirectToCheckout = () => {
    if (dateValue.startDate === 'Select' || dateValue.endDate === 'Select') {
      toast.error('Please select both check in and check out dates')
      return
    }

    if (dayjs().isAfter(dayjs(dateValue.startDate))) {
      toast.error('Please select a date in future')
      return
    }

    const start = dayjs(dateValue.startDate)
    const end = dayjs(dateValue.endDate)

    const hours = end.diff(start, 'hours')
    const days = hours / 24 + 1

    router.push(
      `/campgrounds/${campground?._id}/confirm?adults=${guests.adults}&children=${guests.children}&infants=${guests.infants}&days=${days}&checkIn=${dateValue.startDate}&checkOut=${dateValue.endDate}`
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
    if (ageGroup === 'adult' && guests.adults > 1)
      setGuests(curr => ({ ...curr, adults: curr.adults - 1 }))
    if (ageGroup === 'children' && guests.children > 0)
      setGuests(curr => ({ ...curr, children: curr.children - 1 }))
    if (ageGroup === 'infant' && guests.infants > 0)
      setGuests(curr => ({ ...curr, infants: curr.infants - 1 }))
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
        {session?.user.id !== campground.owner._id && (
          <div className='flex w-full flex-col gap-4 rounded-md bg-lightRed py-6 px-12 shadow-lg lg:flex-row-reverse lg:items-center lg:justify-between'>
            <div className='flex flex-col gap-4'>
              <div>
                <p className='p-3 md:text-lg'>
                  <span
                    className={`${
                      campground.price.discount > 0
                        ? 'text-base line-through md:text-lg lg:text-xl'
                        : 'text-lg font-bold md:text-xl lg:text-2xl'
                    }`}
                  >
                    ₹{campground?.price.adults}
                  </span>
                  {!!campground.price.discount && (
                    <span className='text-lg font-bold md:text-xl lg:text-2xl'>
                      {campground.price.adults *
                        ((100 - campground.price.discount) / 100)}
                    </span>
                  )}
                  /night
                </p>
                <p className='max-w-fit rounded-md bg-primaryBg p-3'>
                  <span className='text-xl font-bold md:text-2xl lg:text-3xl'>
                    ₹
                    {campground.price.discount > 0
                      ? campground.price.adults *
                        ((100 - campground.price.discount) / 100) *
                        0.8
                      : campground?.price.adults * 0.8}
                  </span>
                  <span className='md:text-xl'>/night</span> for{' '}
                  <Link
                    href={'/subscription'}
                    target='_blank'
                    className='text-brand'
                  >
                    YelpCamp Plus
                  </Link>{' '}
                  users
                </p>
              </div>
              <Button
                text='Reserve'
                className='hidden h-fit max-w-fit self-end lg:block'
                handleClick={redirectToCheckout}
              />
            </div>
            <div className='relative flex flex-col gap-6 lg:mr-auto'>
              <div className='w-full max-w-sm rounded-md bg-primaryBg shadow-md sm:h-auto md:w-sm'>
                <div className='relative flex border-b border-text'>
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
                  <div className='my-auto flex-1 border-r border-text p-3 px-4'>
                    <p className='text-xs'>Check in</p>
                    <p>{dateValue.startDate.toString()}</p>
                  </div>
                  <div className='my-auto flex-1 p-3 px-4'>
                    <p className='text-xs'>Check out</p>
                    <p>{dateValue.endDate.toString()}</p>
                  </div>
                </div>
                <div className='relative cursor-pointer'>
                  <div
                    className='flex h-full items-center justify-between p-3 px-4'
                    onClick={() => setShowGuestSelector(curr => !curr)}
                  >
                    <div>
                      <p className='text-xs'>Guests</p>
                      <p>{`${guests.adults} adults${
                        !!guests.children
                          ? ', ' + guests.children + ' children'
                          : ''
                      } ${
                        !!guests.infants
                          ? ', ' + guests.infants + ' infants'
                          : ''
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
                        <p>
                          Adult - ₹
                          {campground.price.discount
                            ? campground.price.adults *
                              ((100 - campground.price.discount) / 100)
                            : campground.price.adults}
                          /night
                        </p>
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
                        <p>
                          Children - ₹
                          {campground.price.discount
                            ? campground.price.children *
                              ((100 - campground.price.discount) / 100)
                            : campground.price.children}
                          /night
                        </p>
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
              {dateValue.startDate !== 'Select' &&
                dateValue.endDate !== 'Select' && (
                  <div className='flex flex-col justify-between gap-4'>
                    <div className='flex flex-col gap-4 lg:flex-row lg:items-center'>
                      {!!price && (
                        <p className='font-volkhov text-xl'>
                          Total:{' '}
                          <span className='text-3xl font-medium'>₹{price}</span>
                        </p>
                      )}
                      <p className='max-w-fit rounded-md bg-primaryBg p-3'>
                        Save{' '}
                        <span className='text-lg font-bold md:text-xl lg:text-2xl'>
                          ₹{price * 0.2}
                        </span>{' '}
                        by getting{' '}
                        <Link
                          href={'/subscription'}
                          target='_blank'
                          className='text-brand'
                        >
                          YelpCamp Plus
                        </Link>
                      </p>
                    </div>
                    <Button
                      text='Reserve'
                      className='h-fit max-w-fit lg:hidden'
                      handleClick={redirectToCheckout}
                    />
                  </div>
                )}
            </div>
          </div>
        )}
        <div>
          <h3 className='mb-3 font-volkhov text-2xl lg:text-3xl'>About</h3>
          <p className='max-w-full break-words lg:text-lg'>
            {campground?.desc}
          </p>
        </div>
      </section>
      <hr className='mb-10 text-paragraph' />
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
      <div className='mt-10 lg:mt-16'>
        <h4 className='mb-3 font-volkhov text-2xl lg:text-3xl'>
          What this place offers
        </h4>
        <ul className='flex flex-wrap gap-5 rounded-xl bg-lightRed p-5 text-lg capitalize'>
          {campground.amenities.map(amenity => (
            <li
              key={amenity.text}
              className='inline-flex items-center gap-2 rounded-xl bg-primaryBg p-5'
            >
              {amenityIcons[amenity.icon]} {amenity.text}
            </li>
          ))}
        </ul>
      </div>
      <div className='mt-10 lg:mt-16'>
        <h4 className='mb-3 font-volkhov text-2xl lg:text-3xl'>Host</h4>
        <div className='flex items-center gap-4'>
          <Image
            alt={campground.owner.name}
            src={campground.owner.image}
            width='70'
            height='70'
            className='aspect-square rounded-full border-2 border-brand'
          />
          <div>
            <h2 className='font-volkhov text-2xl'>{campground.owner.name}</h2>
            <p className='text-sm text-paragraph'>
              Joined in {campground.owner.createdAt.slice(0, 4)}
            </p>
          </div>
        </div>
        <div className='mt-4 flex flex-wrap items-center gap-2'>
          <p>
            Hosted{' '}
            <Link
              href={`/users/${campground.owner._id}`}
              className='text-blue underline underline-offset-1'
            >
              {campground.owner.campgrounds.length} campground(s)
            </Link>
          </p>
          &middot;
          <p>
            Contact at{' '}
            <Link
              href={`mailto:${campground.owner.email}`}
              className='text-blue underline underline-offset-1'
            >
              {campground.owner.email}
            </Link>
          </p>
        </div>
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
