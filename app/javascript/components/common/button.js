import React from 'react'
import PropTypes from 'prop-types'

const Button = ({
  buttonId,
  onClick,
  label
}) => (
  <div className='text-center'>
    <button className='btn'
      id={buttonId}
      onClick={onClick}>
      {label}
    </button>
  </div>
)

Button.propTypes = {
  buttonId: PropTypes.string,
  onClick: PropTypes.func,
  label: PropTypes.string
}

export default Button
