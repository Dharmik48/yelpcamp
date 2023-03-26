import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { getUser, getUsers } from '../../../util/user'
import { getCampgrounds } from '../../../util/campgrounds'
import CampgroundCard from '../../../components/CampgroundCard'
import { useState } from 'react'
import Reviews from '../../../components/Reviews'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { toast } from 'react-toastify'
import { FaCheck } from 'react-icons/fa'
import ReviewForm from '../../../components/ReviewForm'
import Campground from '../../../models/Campground'
import dayjs from 'dayjs'
import Link from 'next/link'
import LinkButton from '../../../components/LinkButton'
import CampgroundListItem from '../../../components/CampgroundListItem'

const Profile = ({ user, camps }) => {
  const { data: session } = useSession()
  const router = useRouter()

  const tabOptions = ['your campgrounds', 'reviews', 'past trips']

  const [showNewReviewForm, setShowNewReviewForm] = useState(false)
  const [tab, setTab] = useState(router.query.tab || tabOptions[0])

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  const handleSubmit = async (e, id, rating) => {
    e.preventDefault()
    const data = {
      text: e.target.text.value,
      user: session.user.id,
      campground: id,
      rating,
    }

    const res = await axios.post(
      `/api/campgrounds/${id.toString()}/review`,
      data
    )
    setShowNewReviewForm(false)
    toast.success('Review Added!', { icon: FaCheck })
  }

  const renderCamps = () =>
    user.campgrounds.map(campground => (
      <li key={campground._id}>
        <CampgroundListItem campground={campground} />
      </li>
    ))

  return (
    <section className='relative'>
      <Head>
        <title>{user.name}&apos;s Profile</title>
      </Head>
      <section className='flex flex-col gap-6 py-10 lg:gap-16 lg:py-16'>
        <div className='flex flex-col justify-between gap-6 md:flex-row md:items-center'>
          <div className='flex items-center gap-4'>
            <Image
              alt={user.name}
              src={user.image}
              width='100'
              height='100'
              className='aspect-square w-16 rounded-full border-2 border-brand lg:w-24'
            />
            <div>
              <h2 className='font-volkhov text-2xl'>{user.name}</h2>
              <p className='text-sm text-paragraph'>
                Joined in {user.createdAt.slice(0, 4)}
              </p>
            </div>
          </div>
          <LinkButton
            linkTo='/campgrounds/new'
            className='w-fit'
            text='Host a Campground'
          />
        </div>

        <section>
          <div className='mb-6 flex w-full gap-3 border-b-2 border-dark lg:mb-10'>
            {tabOptions.map((tabOption, i) => (
              <button
                key={tabOption}
                className={`rounded-t-md p-3 capitalize transition-transform hover:bg-paragraph hover:text-white hover:opacity-100 active:scale-90 active:rounded-md ${
                  !(tab === tabOptions[i]) && 'opacity-70'
                } ${
                  tab === tabOptions[i] && 'bg-dark text-white hover:bg-dark'
                }`}
                onClick={() => setTab(tabOptions[i])}
              >
                {tabOption}
              </button>
            ))}
          </div>
          {tab === tabOptions[0] ? (
            <ul className='flex w-full flex-col gap-6'>{renderCamps()}</ul>
          ) : (
            <div className='flex flex-col gap-5'>
              <div>
                <h5 className='mb-3 font-volkhov text-xl lg:text-2xl'>
                  New Review
                </h5>
                {showNewReviewForm && (
                  <ReviewForm
                    setShowForm={setShowNewReviewForm}
                    camps={camps}
                    handleSubmit={handleSubmit}
                  />
                )}
                {!!camps.length ? (
                  <button
                    onClick={() => setShowNewReviewForm(true)}
                    className='text-blue'
                  >
                    Click to write a new Review
                  </button>
                ) : (
                  <p>
                    No Campground to Review yet.{' '}
                    <Link href={'/campgrounds'} className='text-blue'>
                      Book a trip now
                    </Link>
                  </p>
                )}
              </div>
              <div>
                <h5 className='font-volkhov text-xl lg:text-2xl'>
                  Past Reviews
                </h5>
                <Reviews onProfilePage={true} data={user.reviews} />
              </div>
            </div>
          )}
        </section>
      </section>
    </section>
  )
}

export async function getStaticPaths() {
  const users = await getUsers('_id')

  const paths = users.map(user => ({
    params: {
      id: user._id.toString(),
    },
  }))

  return { paths, fallback: true }
}

export async function getStaticProps({ params }) {
  const userId = params.id

  const user = await getUser(userId, true, true)

  await getCampgrounds({ fields: 'name' })

  const eligibleTrips = user.trips?.filter(trip =>
    dayjs().isAfter(dayjs(trip.checkOut))
  )

  const campIds = eligibleTrips.map(trip => trip.campground)
  const camps = await Campground.find({ _id: { $in: campIds } })

  return {
    props: { user, camps: JSON.parse(JSON.stringify(camps)) || [] },
  }
}

export default Profile
