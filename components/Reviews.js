import axios from 'axios'
import Image from 'next/image'

const Reviews = () => {
  const handleSubmit = async e => {
    e.preventDefault()
    const data = { text: e.target.text.value, user: '63888a592161a9ddc9e49667' }

    const res = await axios.post(
      '/api/campgrounds/63dbeeb8ffafac77f6cda9ab/review',
      data
    )

    console.log(res)
  }

  return (
    <section className='flex flex-col gap-4 py-10 lg:gap-6 lg:py-16'>
      <form onSubmit={handleSubmit}>
        <textarea name='text' id='text' cols='30' rows='10' />
        <button type='submit'>sub</button>
      </form>
      <h3 className='font-volkhov text-2xl lg:text-3xl'>Reviews</h3>
      <ul className='grid gap-10 lg:grid-cols-2 lg:gap-20'>
        <Review />
        <Review />
      </ul>
    </section>
  )
}

const Review = () => {
  return (
    <div>
      <div className='mb-3 flex gap-3'>
        <Image
          src='https://api.dicebear.com/5.x/lorelei/svg?seed=Sasha'
          width={'50'}
          height={'50'}
          className='rounded-full'
        />
        <div className='flex flex-col'>
          <h5 className='font-medium'>Dharmik Hingu</h5>
          <p className='text-sm'>January 2023</p>
        </div>
      </div>
      <p>
        Camp Happy Trails is a great option for campers looking for a fun and
        scenic outdoor experience. With well-maintained facilities and a variety
        of activities, it offers something for everyone. Whether you are seeking
        relaxation or adventure, you are sure to have a memorable time at Camp
        Happy Trails.
      </p>
    </div>
  )
}

export default Reviews
