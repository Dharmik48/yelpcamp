import { getSession } from 'next-auth/react'
import Campground from '../../../models/Campground'
import Review from '../../../models/Review'
import User from '../../../models/User'
import connectDB from '../../../util/mongo'
import { useRouter } from 'next/router'
import Link from 'next/link'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import relativeTime from 'dayjs/plugin/relativeTime'

const Notifications = ({ notifications, autorized = false }) => {
  const router = useRouter()

  if (!autorized) return router.push('/')

  dayjs.extend(localizedFormat)
  dayjs.extend(relativeTime)

  return (
    <section>
      <h3>Notifications</h3>
      <ul className='flex flex-col gap-4'>
        {notifications.map(noti => (
          <>
            <li
              key={noti._id}
              className={`${
                noti.read ? 'bg-lightBlue' : 'bg-lightBlue'
              } flex flex-col gap-2 rounded-lg p-4`}
            >
              <p className='md:text-lg lg:text-xl'>
                User{' '}
                <Link
                  href={`/users/${noti.user._id}`}
                  className='font-volkhov text-brand'
                >
                  {noti.user.name}
                </Link>{' '}
                made a booking for{' '}
                <Link
                  href={`/campgrounds/${noti.campground._id}`}
                  className='font-volkhov text-brand'
                >
                  {noti.campground.name}
                </Link>
                {dayjs().to(dayjs(noti.createdAt))}
              </p>
              <p>
                Guests:{' '}
                {`${noti.guests.adults} adults${
                  !!noti.guests.children
                    ? ', ' + noti.guests.children + ' children'
                    : ''
                } ${
                  !!noti.guests.infants
                    ? ', ' + noti.guests.infants + ' infants'
                    : ''
                }`}
              </p>
              <div>
                <p>Check In: {dayjs(noti.dates.checkIn).format('LL')}</p>{' '}
                <p>Check Out: {dayjs(noti.dates.checkOut).format('LL')}</p>
              </div>
            </li>
            <li
              key={noti._id}
              className={`${
                noti.read ? 'bg-lightBlue' : 'bg-lightBlue'
              } flex flex-col gap-2 rounded-lg p-4`}
            >
              <p>
                User{' '}
                <Link href={noti.user._id} className='font-volkhov text-brand'>
                  {noti.user.name}
                </Link>{' '}
                made a booking for{' '}
                <Link
                  href={`/campgrounds/${noti.campground._id}`}
                  className='font-volkhov text-brand'
                >
                  {noti.campground.name}
                </Link>
              </p>
              <p>
                Guests:{' '}
                {`${noti.guests.adults} adults${
                  !!noti.guests.children
                    ? ', ' + noti.guests.children + ' children'
                    : ''
                } ${
                  !!noti.guests.infants
                    ? ', ' + noti.guests.infants + ' infants'
                    : ''
                }`}
              </p>
              <div>
                <p>Check In: {dayjs(noti.dates.checkIn).format('LL')}</p>{' '}
                <p>Check Out: {dayjs(noti.dates.checkOut).format('LL')}</p>
              </div>
            </li>
          </>
        ))}
      </ul>
    </section>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)

  if (!session?.user.id || session?.user.id !== context.params.id)
    return { props: { autorized: false } }

  await connectDB()
  await Campground.find({})
  await Review.find({})

  const { notifications } = await User.findById(
    context.params.id,
    'notifications'
  )
    .populate('notifications.campground', 'name')
    .populate('notifications.user', 'name')

  return {
    props: {
      notifications: JSON.parse(JSON.stringify(notifications)),
      autorized: true,
    },
  }
}

export default Notifications
