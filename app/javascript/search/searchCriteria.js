import React from 'react'
import PropTypes from 'prop-types'

const SearchCriteria = ({
  criteria,
  child,
  schoolGrades,
  stateTypes,
  setParentState,
  handleAddressChange
}) => (
  <p>Facility Name:
  <span>{this.props.searchCriteria.facilityNameValue}</span>
  <span onClick={() => { this.props.removeCriteria('facilityNameValue') }} alt='cross-icon' className='cross-icon' />
  </p>
)

SearchCriteria.propTypes = {
  // index: PropTypes.number,
  // schoolGrades: PropTypes.array,
  // stateTypes: PropTypes.array,
  // child: PropTypes.object,
  // setParentState: PropTypes.func,
  // handleAddressChange: PropTypes.func
}

SearchCriteria.defaultProps = {
  // index: 0
}
export default SearchCriteria
