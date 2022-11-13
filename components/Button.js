const Button = ({
  title = '',
  text = 'Submit',
  danger = false,
  handleClick,
}) => {
  return (
    <button
      onClick={handleClick}
      title={title}
      className='rounded-md border-2 border-transparent bg-brand px-8 py-3 text-base font-semibold text-secondaryBg transition-all duration-200 hover:border-brand hover:bg-transparent hover:text-brand focus:border-brand focus:bg-transparent focus:text-brand'
    >
      {text}
    </button>
  )
}

export default Button
