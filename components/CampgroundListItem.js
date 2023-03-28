import Link from 'next/link'
import { IoCreateOutline, IoTrashOutline } from 'react-icons/io5'
import { HiStar } from 'react-icons/hi2'
import Modal from './Modal'
import { useState } from 'react'
import { useRouter } from 'next/router'

const CampgroundListItem = ({
  campground,
  deleteCampground,
  showEditDeleteBtns,
}) => {
  const [deleteConfirm, setDeleteConfirm] = useState(false)
  const router = useRouter()

  return (
    <div className='group flex justify-between rounded-lg bg-lightBlue p-4 hover:shadow-md hover:shadow-lightRed'>
      {deleteConfirm && (
        <Modal
          open={deleteConfirm}
          setOpen={setDeleteConfirm}
          title={`Delete ${campground.name}`}
          text={
            'This cannot be undone! All of the data associated with the campground will also be deleted! Are you sure want to delete?'
          }
          onAgree={() => deleteCampground(campground._id)}
        />
      )}
      <h4 className='border-b border-transparent group-hover:border-text'>
        <Link href={`/campgrounds/${campground._id}`}>{campground.name}</Link>{' '}
        &middot;{' '}
        <span className='inline-flex items-center group-hover:text-brand'>
          {campground.rating || '?'}
          <HiStar />
        </span>
      </h4>
      {showEditDeleteBtns && (
        <div className='flex gap-6'>
          <button
            onClick={() => router.push(`/campgrounds/${campground._id}/edit`)}
          >
            <IoCreateOutline size='1.5em' className='group-hover:text-brand' />
          </button>
          <button onClick={() => setDeleteConfirm(true)}>
            <IoTrashOutline size='1.5em' className='group-hover:text-red' />
          </button>
        </div>
      )}
    </div>
  )
}

export default CampgroundListItem
