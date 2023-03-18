import { useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { getCampgrounds } from '../../util/campgrounds'
import CampgroundCard from '../../components/CampgroundCard'
// map stuff
import ReactMapGl, { GeolocateControl, Marker } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { FaMapMarked, FaListUl, FaThumbtack } from 'react-icons/fa'

const Campgrounds = ({ campgrounds, search, location }) => {
  // Map over the campgrounds to create JSX
  const renderCampgrounds = campgrounds.map(campground => (
    <li key={campground._id}>
      <CampgroundCard campground={campground} />
    </li>
  ))

  const renderMarkers = campgrounds.map(campground => (
    <Marker
      key={campground._id}
      anchor='left'
      latitude={campground.location.coords.lat}
      longitude={campground.location.coords.long}
    >
      <CampMarker camp={campground} />
    </Marker>
  ))

  const [showMap, setShowMap] = useState(false)

  return (
    <>
      <Head>
        <title>YelpCamp | All Campgrounds</title>
      </Head>
      <section className='relative py-12'>
        <div className='mb-10 flex items-center justify-between'>
          <h2 className='font-volkhov text-3xl'>
            {search ? (
              <>
                Campgrounds in <span className='text-brand'>{location}</span>
              </>
            ) : (
              'Top Campgrounds'
            )}
          </h2>
          <div className='hidden md:block'>
            {showMap ? (
              <button
                className='flex items-center gap-2 rounded-md bg-blue p-2 text-white'
                onClick={() => setShowMap(false)}
              >
                <FaListUl />
                Show List
              </button>
            ) : (
              <button
                className='flex items-center gap-2 rounded-md bg-blue p-2 text-white'
                onClick={() => setShowMap(true)}
              >
                <FaMapMarked />
                Show Map
              </button>
            )}
          </div>
          <div className='fixed bottom-8 right-8 z-40 sm:bottom-10 sm:right-10 md:bottom-12 md:right-12 md:hidden'>
            {showMap ? (
              <button
                className='flex items-center gap-2 rounded-full bg-blue p-4 text-white'
                onClick={() => setShowMap(false)}
              >
                <FaListUl />
              </button>
            ) : (
              <button
                className='flex items-center gap-2 rounded-full bg-blue p-4 text-white'
                onClick={() => setShowMap(true)}
              >
                <FaMapMarked />
              </button>
            )}
          </div>
        </div>

        {showMap ? (
          <div className='sticky top-0 right-0 h-screen flex-[4] overflow-hidden rounded-xl lg:block'>
            <ReactMapGl
              mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_KEY}
              initialViewState={{
                latitude: campgrounds[0].location.coords.lat,
                longitude: campgrounds[0].location.coords.long,
                zoom: 4,
              }}
              mapStyle='mapbox://styles/dharmik403/cleh3wthw003g01qgpq5gxlk7'
              attributionControl={false}
            >
              {renderMarkers}
              <GeolocateControl position='top-left' trackUserLocation />
            </ReactMapGl>
          </div>
        ) : (
          <ul className='grid w-full gap-6 md:grid-cols-2 lg:grid-cols-3'>
            {renderCampgrounds}
          </ul>
        )}
      </section>
    </>
  )
}

export async function getServerSideProps(context) {
  let { location } = context.query
  location = !!location ? location : null
  const search = !!location
  // Fetch campground data
  const campgrounds = await getCampgrounds({
    filter: location,
    sort: 'createdAt',
  })
  // Send the data as prop
  return {
    props: { campgrounds, search, location },
  }
}

const CampMarker = ({ camp }) => {
  return (
    <Link
      href={`/campgrounds/${camp._id}`}
      className='flex items-center text-brand'
    >
      <FaThumbtack size={20} className='-rotate-45' />
      <p className='rounded-md bg-secondaryBg p-1'>{camp.name}</p>
    </Link>
  )
}

export default Campgrounds
