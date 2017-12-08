import React from 'react'
import PropTypes from 'prop-types'
import {InputComponent} from '../common/inputFields'

const NameCommonFields = ({
  index,
  firstNameId,
  middleNameId,
  lastNameId,
  firstName,
  middleName,
  lastName,
  onChange
}) => {
  return (
    <div>
      <InputComponent
        gridClassName='col-md-4'
        id={firstNameId}
        value={firstName}
        maxLength='20'
        label={index === undefined ? 'Legal First Name' : 'First Name'}
        placeholder='Enter First Name'
        type='text'
        onChange={(event) => onChange(firstNameId, event.target.value, index)} />
      <InputComponent
        gridClassName='col-md-4'
        id={middleNameId}
        value={middleName}
        maxLength='20'
        label={index === undefined ? 'Legal Middle Name' : 'Middle Name'}
        placeholder='Enter Middle Name'
        type='text'
        onChange={(event) => onChange(middleNameId, event.target.value, index)} />
      <InputComponent
        gridClassName='col-md-4'
        id={lastNameId}
        value={lastName}
        maxLength='25'
        label={index === undefined ? 'Legal Last Name' : 'Last Name'}
        placeholder='Enter Last Name'
        type='text'
        onChange={(event) => onChange(lastNameId, event.target.value, index)} />
    </div>
  )
}

NameCommonFields.propTypes = {
  firstNameId: PropTypes.string,
  middleNameId: PropTypes.string,
  lastNameId: PropTypes.string,
  firstName: PropTypes.string,
  middleName: PropTypes.string,
  lastName: PropTypes.string,
  onChange: PropTypes.func.isRequired
}

NameCommonFields.defaultProps = {
  firstName: '',
  middleName: '',
  lastName: ''
}

export default NameCommonFields
