import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'

const Reviews = ({ data, onProfilePage = false }) => {
  const handleSubmit = async e => {
    e.preventDefault()
    const data = {
      text: e.target.text.value,
      user: '63888a592161a9ddc9e49667',
      campground: '63e52d8f811977d64e7b4c1b',
    }

    const res = await axios.post(
      '/api/campgrounds/63dbeeb8ffafac77f6cda9ab/review',
      data
    )
  }
  const renderReviews = () =>
    data.map(review => <Review data={review} onProfilePage={onProfilePage} />)

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
              'Dharmik Hingu'
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
