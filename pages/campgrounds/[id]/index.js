import Head from 'next/head'
import axios from 'axios'
import { useRouter } from 'next/router'
import Button from '../../../components/Button'
import LinkButton from '../../../components/LinkButton'
import { getCampgrounds, getCampground } from '../../../util/campgrounds'
import Image from 'next/image'
import { toast } from 'react-toastify'
import { FaCheck } from 'react-icons/fa'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import Reviews from '../../../components/Reviews'
import ReactMapGl, {GeolocateControl,Marker} from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'


const CampgroundDetail = ({ campground }) => {
  const { data: session } = useSession()
  const router = useRouter()

  if (router.isFallback) return <h1>Loading...</h1>

  const deleteCampground = async () => {
    const { data: deletedCampground } = await axios.delete(
      `/api/campgrounds/${campground._id}`
    )
    toast.success(
      () => (
        <>
          Successfully deleted{' '}
          <span className='font-semibold'>{deletedCampground.name}</span>
        </>
      ),
      {
        icon: FaCheck,
      }
    )
    router.push('/campgrounds')
  }

  const renderImages = () =>
    campground.images.map(img => (
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
        <title>{`YelpCamp | ${campground.name}`}</title>
      </Head>
      <section className='flex flex-col gap-4 py-10 lg:gap-6 lg:py-16'>
        <div>
          <h1 className='mb-2 font-volkhov text-3xl text-brand lg:mb-4 lg:text-4xl 2xl:text-5xl'>
            {campground.name}
          </h1>
          <p className='text-sm'>
            Posted by{' '}
            <Link
              href={`/users/${campground.owner._id}`}
              className='font-volkhov'
            >
              {campground.owner.name}
            </Link>
          </p>
        </div>
        <ul className='flex gap-2 overflow-scroll'>{renderImages()}</ul>
        <div className='flex items-center justify-between w-full'>
          <p className='md:text-xl'>
            <span className='text-xl font-bold md:text-2xl lg:text-3xl'>
              ${campground.price}
            </span>
            /night
          </p>
          <LinkButton
                text='Book'
                linkTo={`/api/campgrounds/${campground._id}/checkout`}
              />
        </div>
        <div>
          <h3 className='mb-3 font-volkhov text-2xl lg:text-3xl'>About</h3>
          <p className='lg:text-lg'>{campground.desc}</p>
        </div>
        {session?.user?.email === campground.owner.email && (
          <div className='flex gap-4'>
            <LinkButton
              text='Edit'
              linkTo={`/campgrounds/${campground._id}/edit`}
            />
            <Button
              text='Delete'
              danger='true'
              handleClick={deleteCampground}
            />
          </div>
        )}
      </section>
      <hr className='text-paragraph my-10' />
      <h3 className='mb-3 font-volkhov text-2xl lg:text-3xl'>Location</h3>
      <div className='h-72 overflow-hidden rounded-xl lg:h-96'>
      <ReactMapGl
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_KEY}
            initialViewState={{
              latitude: campground.location.lat,
              longitude: campground.location.long,
              zoom: 5,
            }}
            mapStyle='mapbox://styles/dharmik403/cleh3wthw003g01qgpq5gxlk7'
            attributionControl={false}
            >
            <Marker
              latitude={campground.location.lat}
              longitude={campground.location.long}
            />
            <GeolocateControl position='top-left' trackUserLocation />
      </ReactMapGl>
      </div>
      <div className='my-10 lg:my-16'>
        <h4 className='mb-3 font-volkhov text-2xl lg:text-3xl'>Reviews</h4>
        <Reviews data={campground.reviews} />
      </div>
    </>
  )
}

export async function getStaticPaths() {
  // Fetch campground ids
  const campgrounds = await getCampgrounds('_id')
  // Map over the ids and create path obj
  const paths = campgrounds.map(campground => ({
    params: { id: campground._id.toString() },
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
