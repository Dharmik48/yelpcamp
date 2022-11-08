import Campground from '../models/Campground'
import connectDb from './mongo'

// Function to fetch campgrounds
export async function getCampgrounds() {
  // Connect to DB
  await connectDb()
  // Fetch camgprounds
  const campgrounds = await Campground.find()
  // Parse the data and return the data
  return JSON.parse(JSON.stringify(campgrounds))
}
