import Campground from '../models/Campground'
import connectDb from './mongo'

// Function to fetch campgrounds
export async function getCampgrounds(fields) {
  // Connect to DB
  await connectDb()
  // Fetch camgprounds
  const campgrounds = await Campground.find({}, fields)
  // Parse the data and return the data
  return JSON.parse(JSON.stringify(campgrounds))
}

// Function to fetch a single campground
export async function getCampground(id) {
  // Connect to DB
  await connectDb()
  // Fetch the camgpround
  const campground = await Campground.findById(id)
  // Parse the data and return the data
  return JSON.parse(JSON.stringify(campground))
}