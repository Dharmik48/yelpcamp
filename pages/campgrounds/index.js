import { getCampgrounds } from '../../util/campgrounds'

const Campgrounds = ({ campgrounds }) => {
  // Map over the campgrounds to create JSX
  const renderCampgrounds = campgrounds.map(campground => (
    <li>
      <h2>{campground.name}</h2>
      <p>{campground.desc}</p>
      <p>{campground.price}</p>
    </li>
  ))

  return (
    <div>
      <h1>Campgrounds</h1>
      {renderCampgrounds}
    </div>
  )
}

export async function getStaticProps() {
  // Fetch campground data
  const campgrounds = await getCampgrounds()
  // Send the data as prop
  return {
    props: { campgrounds },
    // Revalidate the page after 10 secs
    revalidate: 10,
  }
}

export default Campgrounds
