import { useState } from 'react'

const NewReviewForm = ({ setShowNewReviewForm, camps, handleSubmit }) => {
  const [showMenu, setShowMenu] = useState(false)
  const [selectedOption, setSelectedOption] = useState(0)

  const selectOption = i => {
    setSelectedOption(i)
    setShowMenu(false)
  }

  const renderCampOptions = () =>
    camps.map((camp, i) => (
      <li
        className={`text-gray-900 relative cursor-default select-none py-2 pl-3 pr-9 hover:bg-brand hover:text-white ${
          selectedOption === i && 'bg-brand text-white'
        }`}
        id='listbox-option-0'
        role='option'
        key={camp._id}
        onClick={() => selectOption(i)}
      >
        <div className='flex items-center'>
          <span
            className={`ml-3 block truncate font-normal ${
              selectedOption === i && 'font-semibold'
            }`}
          >
            {camp.name}
          </span>
        </div>
      </li>
    ))

  return (
    <form
      className='flex max-w-xl flex-col gap-5 rounded-lg py-5'
      onSubmit={e => handleSubmit(e, camps[selectedOption]._id)}
    >
      <div>
        <label
          id='listbox-label'
          className='text-gray-700 block text-sm font-medium'
        >
          Campground
        </label>
        <div className='relative mt-1'>
          <button
            type='button'
            className='border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 relative w-full cursor-pointer rounded-md border bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:outline-none focus:ring-1 sm:text-sm'
            aria-haspopup='listbox'
            aria-expanded='true'
            aria-labelledby='listbox-label'
            onClick={() => setShowMenu(curr => !curr)}
          >
            <span className='flex items-center'>
              <span className='ml-3 block truncate'>
                {camps[selectedOption].name}
              </span>
            </span>
            <span className='pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2'>
              <svg
                className='text-gray-400 h-5 w-5'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
                fill='currentColor'
                aria-hidden='true'
              >
                <path
                  fillRule='evenodd'
                  d='M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z'
                  clipRule='evenodd'
                />
              </svg>
            </span>
          </button>

          {showMenu && (
            <ul
              className='ring-black absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-opacity-5 focus:outline-none sm:text-sm'
              tabIndex='-1'
              role='listbox'
              aria-labelledby='listbox-label'
              aria-activedescendant='listbox-option-3'
            >
              {renderCampOptions()}
            </ul>
          )}
        </div>
      </div>
      <div className='flex flex-col gap-2'>
        <label htmlFor='text'>Review</label>
        <textarea
          name='text'
          id='text'
          rows='5'
          className='border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 max-w-full rounded-md border border-dark bg-transparent py-2 pl-3 shadow-sm focus:outline-none focus:ring-1 sm:text-sm'
        />
      </div>
      <div>
        <button
          className='mr-3 rounded-lg bg-brand p-3 text-white'
          type='submit'
        >
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
