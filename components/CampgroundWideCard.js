import Image from 'next/image'
import Link from 'next/link'
import { HiStar, HiMapPin, HiChevronRight } from 'react-icons/hi2'
import { FaRupeeSign } from 'react-icons/fa'

const CampgroundWideCard = ({ campground }) => {
  return (
    <div
      key={campground._id}
      className='flex flex-col gap-3 rounded-xl border border-lightBlue shadow-lg shadow-lightBlue hover:shadow-lg hover:shadow-lightRed lg:flex-row'
    >
      <div className='relative'>
        <Image
          src={campground.images[0].url}
          width='450'
          height='450'
          className='h-80 w-full rounded-xl object-cover'
          alt={campground.name}
        />
      </div>
      <div className='flex flex-1 flex-col justify-between gap-4 p-5'>
        <div>
          <div className='mb-4 flex items-center justify-between'>
            <h2 className='text-2xl'>{campground.name}</h2>
            <p className='flex items-center gap-1 text-paragraph'>
              <HiStar className='text-yellow' /> {campground.rating || '?'}
            </p>
          </div>
          <p>{campground.desc.split(' ').slice(0, 55).join(' ')}...</p>
        </div>
        <div className='flex w-full items-center justify-between'>
          <p className='inline-flex items-center gap-1 text-paragraph'>
            <HiMapPin />
            {campground.location.country}
          </p>
          <p className='w-fit rounded-md bg-[#FFE7DB] py-1 px-2 font-medium text-brand'>
            <FaRupeeSign className='inline' />
            {campground.price.adults}
          </p>
        </div>
        <Link
          href={`/campgrounds/${campground._id}`}
          className='text-lg text-brand'
        >
          View More
          <HiChevronRight className='inline' />
        </Link>
      </div>
    </div>
  )
}

export default CampgroundWideCard
