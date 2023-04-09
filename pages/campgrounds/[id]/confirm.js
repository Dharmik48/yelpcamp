import { getSession, useSession } from 'next-auth/react'
import { getCampground } from '../../../util/campgrounds'
import { getUser } from '../../../util/user'
import { HiStar } from 'react-icons/hi2'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Button from '../../../components/Button'

const Confirm = ({ campground, premium }) => {
  const { data: session } = useSession()
  const router = useRouter()
  const { adults, children, days, checkIn, checkOut, infants } = router.query
  const price =
    (adults * campground?.price.adults +
      children * campground?.price.children) *
    days
  let total = price
  if (campground.price.discount > 0)
    total *= (100 - campground.price.discount) / 100
  if (premium.subscribed) total *= 0.8

  const checkout = () => {
    router.push(
      `/api/campgrounds/${campground?._id}/checkout?adults=${adults}&children=${children}&days=${days}&checkIn=${checkIn}&checkOut=${checkOut}&user=${session.user.id}`
    )
  }

  return (
    <div className='my-5 flex flex-col gap-12 rounded-md p-5 text-lg lg:flex-row'>
      <div className='flex-[6]'>
        <div className='mb-12'>
          <span className='text-lg'>Book</span>
          <h1 className='my-2 font-volkhov text-5xl text-brand'>
            {campground.name}
          </h1>
          <p className='text-sm'>
            {`${campground?.location.city}, ${campground?.location.state}, ${campground?.location.country}`}{' '}
            &middot;{' '}
            <span className='inline-flex items-center'>
              {campground?.rating || '?'} <HiStar />
            </span>
          </p>
        </div>
        <img
          src={campground.images[0].url}
          className='max-w-full rounded-md'
          alt='Campground'
        />
      </div>
      <div className='flex flex-[4] flex-col justify-between rounded-lg bg-secondaryBg p-8'>
        <div>
          <div className='mb-6 flex flex-col gap-3'>
            <p className='font-volkhov text-3xl'>Dates</p>
            <ul className='flex flex-col gap-2'>
              <li>
                Check In: <span className='text-xl'>{checkIn}</span>
              </li>
              <li>
                Check Out: <span className='text-xl'>{checkOut}</span>
              </li>
              <li>
                Total Days: <span className='text-xl'>{days}</span>
              </li>
            </ul>
          </div>
          <div className='flex flex-col gap-3'>
            <p className='font-volkhov text-3xl'>Guests</p>
            <ul className='flex flex-col gap-2'>
              <li>
                Adults: <span className='text-xl'>{adults}</span>
              </li>
              <li>
                Children: <span className='text-xl'>{children || 0}</span>
              </li>
              <li>
                Infants: <span className='text-xl'>{infants || 0}</span>
              </li>
            </ul>
          </div>
        </div>
        {/* {premium.subscribed && (
          <>
            <p className='mt-6 justify-self-end font-volkhov text-3xl'>
              Price: <span className='text-xl line-through'>₹{price}</span>{' '}
              <span className='rounded-lg bg-lightRed p-2 text-3xl text-brand'>
                ₹{price * 0.8}
              </span>
            </p>
            <p className='mt-6 max-w-fit rounded-md bg-lightRed p-3'>
              You saved{' '}
              <span className='text-lg font-bold md:text-xl lg:text-2xl'>
                ₹{price * 0.2}
              </span>{' '}
              for being a <span className='text-brand'>YelpCamp Plus</span> user
            </p>
          </>
        )} */}
        {/* {!premium.subscribed && (
          <>
            <p className='justify-self-end font-volkhov text-3xl'>
              Price: <span className='text-5xl text-brand'>₹{price}</span>
            </p>
            <p className='mt-3 max-w-fit rounded-md bg-lightRed p-3'>
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
          </>
        )} */}
        <p className='my-4 font-volkhov text-3xl'>Price</p>
        <ul className='flex flex-col gap-2 divide-y divide-text'>
          <li className='flex items-center justify-between'>
            <span>Cost</span>
            <span>₹{price}</span>
          </li>
          <li className='flex items-center justify-between'>
            <span>Campground Discount</span>
            <span>- {campground.price.discount}%</span>
          </li>
          <li className='flex items-center justify-between'>
            <span></span>
            <span>= ₹{(price * (100 - campground.price.discount)) / 100}</span>
          </li>
          {premium.subscribed && (
            <li className='flex items-center justify-between'>
              <span>YelpCamp Plus benefit</span>
              <span>
                - ₹{price * ((100 - campground.price.discount) / 100) * 0.2}
              </span>
            </li>
          )}
          <li className='flex items-center justify-between'>
            <span>Final</span>
            <span>₹{total}</span>
          </li>
        </ul>

        <Button
          text='Reserve'
          className='mt-6 h-fit max-w-fit self-end lg:block'
          handleClick={checkout}
        />
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  const { id } = context.params
  const session = await getSession(context)

  const camp = await getCampground(id, false, false)
  const user = await getUser(session.user.id, false, false)

  return {
    props: { campground: camp, premium: user.premium },
  }
}

export default Confirm
