import React from 'react'
import PropTypes from 'prop-types'
import {BinarySelectorField} from 'components/common/binarySelectorField'
const YesNoRadioComponent = ({
  idPrefix,
  value,
  onFieldChange
}) => (
  <div className='col-md-12'>
    <BinarySelectorField
      gridClassName='col-md-4'
      id={idPrefix + 'true'}
      type='radio'
      value={value}
      checked={value === true}
      label='Yes'
      onChange={onFieldChange} />
    <BinarySelectorField
      gridClassName='col-md-4'
      id={idPrefix + 'false'}
      type='radio'
      value={value}
      checked={value === false}
      label='No'
      onChange={onFieldChange} />
  </div>
)

YesNoRadioComponent.propTypes = {
  idPrefix: PropTypes.string,
  checked: PropTypes.bool,
  onClick: PropTypes.func
}

export default YesNoRadioComponent
