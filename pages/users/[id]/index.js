import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { getUser, getUsers } from '../../../util/user'
import CampgroundCard from '../../../components/CampgroundCard'
import { useState } from 'react'
import Reviews from '../../../components/Reviews'

const Profile = ({ user }) => {
  const tabOptions = ['camps', 'reviews']

  const [tab, setTab] = useState(tabOptions[0])
  const router = useRouter()

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  const renderCamps = () =>
    user.campgrounds.map(campground => (
      <li key={campground._id}>
        <CampgroundCard campground={campground} />
      </li>
    ))

  return (
    <>
      <Head>
        <title>{user.name}&apos;s Profile</title>
      </Head>
      <section className='flex flex-col gap-6 py-10 lg:gap-16 lg:py-16'>
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

        <section>
          <div className='mb-3 flex w-full gap-3 border-b-2 border-dark lg:mb-6'>
            <button
              className={`rounded-t-md p-2 transition-transform hover:bg-paragraph hover:text-white hover:opacity-100 active:scale-90 active:rounded-md ${
                !(tab === tabOptions[0]) && 'opacity-70'
              } ${tab === tabOptions[0] && 'bg-dark text-white hover:bg-dark'}`}
              onClick={() => setTab(tabOptions[0])}
            >
              Campgrounds
            </button>
            <button
              className={`rounded-t-md p-2 transition-transform hover:bg-paragraph hover:text-white hover:opacity-100 active:scale-90 active:rounded-md ${
                !(tab === tabOptions[1]) && 'opacity-70'
              } ${tab === tabOptions[1] && 'bg-dark text-white hover:bg-dark'}`}
              onClick={() => setTab(tabOptions[1])}
            >
              Reviews
            </button>
          </div>
          {/* <hr className='h-1 w-full' /> */}
          {tab === tabOptions[0] ? (
            <ul className='grid w-full gap-6 md:grid-cols-2 lg:grid-cols-3'>
              {renderCamps()}
            </ul>
          ) : (
            <Reviews onProfilePage={true} data={user.reviews} />
          )}
        </section>
      </section>
    </>
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

  return {
    props: { user },
  }
}

export default Profile
