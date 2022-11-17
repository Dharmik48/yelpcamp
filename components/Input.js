const Input = ({
  type = 'text',
  name = 'input',
  placeholder = 'Enter',
  className: styles,
  handleChange,
  value,

  onBlur = { onBlur },
}) => {
  const css = `rounded-xl bg-lightBlue p-5 focus:outline focus:outline-2 focus:outline-brand ${styles}`

  return type === 'textarea' ? (
    <textarea
      name={name}
      rows='10'
      placeholder={placeholder}
      className={css}
      onChange={handleChange}
      value={value}
      onBlur={onBlur}
    />
  ) : (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      className={css}
      onChange={handleChange}
      value={value}
      onBlur={onBlur}
    />
  )
}

export default Input
