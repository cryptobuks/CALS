import React from 'react'
import PropTypes from 'prop-types'

const CardLayout = ({
  children,
  idClassName,
  focusClassName,
  handleOnClick,
  textAlignment,
  id,
  label
}) => (
  <div className={idClassName}>
    <div
      className={focusClassName}
      onClick={handleOnClick}
      id={id}>
      <div className='card-header'>
        <span>{label}</span>
      </div>
      <div className='card-body'>
        <div className='row'>
          <div className={'text-' + textAlignment}>
            {children}
          </div>
        </div>
      </div>
    </div>
  </div>
)

CardLayout.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  textAlignment: PropTypes.string,
  idClassName: PropTypes.string,
  focusClassName: PropTypes.string,
  handleOnClick: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

CardLayout.defaultProps = {
  textAlignment: 'center'
}

export default CardLayout
