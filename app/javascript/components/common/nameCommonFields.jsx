import React from 'react'
import PropTypes from 'prop-types'
import {InputComponent} from '../common/inputFields'

const NameCommonFields = ({
  index,
  idPrefix,
  onChangePrefix,
  firstName,
  middleName,
  lastName,
  onChange
}) => {
  return (
    <div className='spacing'>
      <InputComponent
        gridClassName='col-md-4'
        id={idPrefix + 'first_name'}
        value={firstName}
        maxLength='20'
        label={index === undefined ? 'Legal First Name (required)' : 'First Name (required)'}
        placeholder='Enter First Name'
        type='text'
        onChange={(event) => onChange(onChangePrefix + 'first_name', event.target.value, index)} />
      <InputComponent
        gridClassName='col-md-4'
        id={idPrefix + 'middle_name'}
        value={middleName}
        maxLength='20'
        label={index === undefined ? 'Legal Middle Name' : 'Middle Name'}
        placeholder='Enter Middle Name'
        type='text'
        onChange={(event) => onChange(onChangePrefix + 'middle_name', event.target.value, index)} />
      <InputComponent
        gridClassName='col-md-4'
        id={idPrefix + 'last_name'}
        value={lastName}
        maxLength='25'
        label={index === undefined ? 'Legal Last Name (required)' : 'Last Name (required)'}
        placeholder='Enter Last Name'
        type='text'
        onChange={(event) => onChange(onChangePrefix + 'last_name', event.target.value, index)} />
    </div>
  )
}

NameCommonFields.propTypes = {
  firstName: PropTypes.string,
  middleName: PropTypes.string,
  lastName: PropTypes.string,
  onChange: PropTypes.func.isRequired
}

NameCommonFields.defaultProps = {
  firstName: '',
  middleName: '',
  lastName: '',
  idPrefix: ''
}

export default NameCommonFields
