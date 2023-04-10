import Link from 'next/link'
import { IoCreateOutline, IoTrashOutline } from 'react-icons/io5'
import { TbDiscount2 } from 'react-icons/tb'
import { HiStar } from 'react-icons/hi2'
import Modal from './Modal'
import { useState } from 'react'
import { useRouter } from 'next/router'
import ModalInput from './ModalInput'
import { toast } from 'react-toastify'
import axios from 'axios'

const CampgroundListItem = ({
  campground,
  deleteCampground,
  showEditDeleteBtns,
}) => {
  const [deleteConfirm, setDeleteConfirm] = useState(false)
  const [showDiscountModal, setShowDiscountModal] = useState(false)
  const router = useRouter()

  const handleDiscountSubmit = async val => {
    const success = await axios.patch(
      `/api/campgrounds/${campground._id}/discount`,
      { id: campground._id, discount: val.discount }
    )
    if (!success)
      return toast.error('Something went wrong, please try again later.')
    toast.success('Success')
  }

  return (
    <div className='group flex justify-between rounded-lg bg-lightBlue p-4 hover:shadow-md hover:shadow-lightRed'>
      {showDiscountModal && (
        <ModalInput
          handleSubmit={handleDiscountSubmit}
          open={showDiscountModal}
          setOpen={setShowDiscountModal}
          title={`Create a discount on ${campground.name}?`}
          text={`If you create a discount on ${campground.name}, it will stay on discounted price untill discount not manually removed. If you want to continue then simply enter the percentage discount you'd like to offer below, and we'll take care of the rest. If you want to remove discount then simply enter 0 below.`}
          defaultValue={campground.price.discount}
        />
      )}
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
            title='Create a discount'
            onClick={() => setShowDiscountModal(true)}
          >
            <TbDiscount2 size='1.5em' className='group-hover:text-blue' />
          </button>
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
