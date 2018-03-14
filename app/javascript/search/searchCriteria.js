import React from 'react'
import PropTypes from 'prop-types'

const SearchCriteria = ({
  criteriaName,
  value,
  id,
  onClick,
  alt,
  className
}) => (
  <p>{criteriaName}
    <span>{value}</span>
    <span id={id} onClick={onClick} alt={alt} className={className} />
  </p>
)

SearchCriteria.propTypes = {
  value: PropTypes.string
}

SearchCriteria.defaultProps = {
  value: ''
}
export default SearchCriteria
