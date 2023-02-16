const NewReviewForm = ({ setShowNewReviewForm }) => {
  return (
    <form className='flex max-w-xl flex-col gap-5 rounded-lg py-5'>
      <div className='flex flex-col gap-2'>
        <label htmlFor='campground'>Campground</label>
        <select
          name='campground'
          id='campground'
          className='cursor-pointer rounded-lg py-2 px-3'
        >
          <option value='Lol'>Nani</option>
        </select>
      </div>
      <div className='flex flex-col gap-2'>
        <label htmlFor='text'>Review</label>
        <textarea
          name='text'
          id='text'
          rows='5'
          className='max-w-full rounded-lg border-2 border-dark bg-transparent py-2 px-3'
        />
      </div>
      <div>
        <button className='mr-3 rounded-lg bg-brand p-3 text-white'>
          Submit
        </button>
        <button
          className='rounded-lg bg-red p-3 text-white'
          onClick={() => setShowNewReviewForm(false)}
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

export default NewReviewForm
