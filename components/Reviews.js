import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'

const Reviews = ({ data, onProfilePage = false }) => {
  if (!data.length) {
    return <p>This campground has no reviews yet.</p>
  }

  const renderReviews = () =>
    data.map(review => (
      <Review key={review._id} data={review} onProfilePage={onProfilePage} />
    ))

  return (
    <ul className='grid gap-10 py-3 lg:grid-cols-2 lg:gap-20'>
      {renderReviews()}
    </ul>
  )
}

const Review = ({ onProfilePage, data }) => {
  return (
    <div>
      <div className='mb-3 flex gap-3'>
        {!onProfilePage && (
          <Image
            src='https://api.dicebear.com/5.x/lorelei/svg?seed=Sasha'
            width={'50'}
            height={'50'}
            className='rounded-full'
          />
        )}
        <div className='flex flex-col'>
          <h5 className='font-medium'>
            {onProfilePage && <span className='font-normal'>Reviewed </span>}
            {onProfilePage ? (
              <Link href={`/campgrounds/${data.campground._id}`}>
                {data.campground.name}
              </Link>
            ) : (
              <Link href={`/users/${data.user}`}>Dharmik Hingu</Link>
            )}
          </h5>
          <p className='text-sm'>{data.createdAt.slice(0, 10)}</p>
        </div>
      </div>
      <p>{data.text}</p>
    </div>
  )
}

export default Reviews
