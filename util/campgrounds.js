import Campground from '../models/Campground'
import User from '../models/User'
import Review from '../models/Review'
import connectDb from './mongo'

// Function to fetch campgrounds
export async function getCampgrounds(fields, filter = null) {
  // Connect to DB
  await connectDb()
  // Fetch camgprounds
  let campgrounds
  if (filter) {
    campgrounds = await Campground.find({}, fields)
      .where('location.country')
      .equals(filter)
  } else {
    campgrounds = await Campground.find({}, fields)
  }
  // Parse the data and return the data
  return JSON.parse(JSON.stringify(campgrounds))
}

// Function to fetch a single campground
export async function getCampground(id, populateOwner, populateReviews) {
  // Connect to DB
  await connectDb()
  await Review.findOne({})
  await User.findOne({})
  // Fetch the camgpround
  const campground = await Campground.findById(id)
  populateOwner && (await campground.populate('owner'))
  populateReviews &&
    (await campground.populate('reviews')) &&
    (await campground.populate('reviews.user'))
  // Parse the data and return the data
  return JSON.parse(JSON.stringify(campground))
}
