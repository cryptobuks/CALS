import React from 'react'
import {InputComponent} from 'components/common/inputFields'
import {DropDownField} from 'components/common/dropDownField'
import AddressComponent from 'components/rfa_forms/addressComponent'
import {dictionaryNilSelect, getDictionaryId} from 'helpers/commonHelper.jsx'
import PropTypes from 'prop-types'

const DesiredChildEducation = ({
  index,
  child,
  schoolGrades,
  stateTypes,
  setParentState,
  handleAddressChange
}) => (
  <div className='row'>
    <div className='card-header'>Child's Education</div>
    <div className='col-md-12'>
      <DropDownField
        id='grade'
        gridClassName='col-md-4'
        selectClassName='reusable-select'
        value={getDictionaryId(child.school_grade)}
        optionList={schoolGrades}
        label='Grade'
        onChange={(event) => setParentState(index, 'school_grade', dictionaryNilSelect(event.target.options))} />
      <InputComponent
        gridClassName='col-md-8'
        id='name_of_school'
        value={child.school_name}
        label='Name of School'
        type='text'
        onChange={(event) => setParentState(index, 'school_name', event.target.value)} />
      <AddressComponent
        index={index}
        stateTypes={stateTypes}
        addressTitle='Address'
        id='street_address'
        addressFields={child.school_address}
        parentStateKey='school_address'
        setParentState={(fieldId, autofillData) => setParentState(index, fieldId, autofillData)}
        onChange={(fieldId, event) => handleAddressChange(fieldId, event, index)} />
    </div>
  </div>
)

DesiredChildEducation.propTypes = {
  index: PropTypes.number,
  schoolGrades: PropTypes.array,
  stateTypes: PropTypes.array,
  child: PropTypes.object,
  setParentState: PropTypes.func,
  handleAddressChange: PropTypes.func
}

DesiredChildEducation.defaultProps = {
  index: 0
}
export default DesiredChildEducation
