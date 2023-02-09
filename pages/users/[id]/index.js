import Head from 'next/head'
import Image from 'next/image'
import { getUser, getUsers } from '../../../util/user'
import CampgroundCard from '../../../components/CampgroundCard'

const Profile = ({ user }) => {
  console.log(user, '😪')
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
            className='aspect-square w-16 rounded-full border-2 border-brand'
          />
          <div>
            <h2 className='font-volkhov text-2xl'>{user.name}</h2>
            <p className='text-sm text-paragraph'>{user.email}</p>
          </div>
        </div>
        {/* <p>Joined in {user.createdAt}</p> */}
        <section>
          <h3>{user.name}&apos;s Camps</h3>
          <ul className='mt-2 grid w-full gap-6 md:grid-cols-2 lg:grid-cols-3'>
            {renderCamps()}
          </ul>
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

  const user = await getUser(userId, true)

  return {
    props: { user },
  }
}

export default Profile
