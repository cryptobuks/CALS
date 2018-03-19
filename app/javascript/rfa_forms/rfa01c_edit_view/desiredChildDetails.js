import React from 'react'
import {DropDownField} from 'components/common/dropDownField'
import {DateField} from 'components/common/dateFields'
import CompleteNameFields from './../rfa01a_edit_view/completeNameField'
import {InputComponent} from 'components/common/inputFields'
import {dictionaryNilSelect, getDictionaryId, FormatDateForPersistance, FormatDateForDisplay} from 'helpers/commonHelper.jsx'
import {RfaCommon} from 'constants/rfaText'

import PropTypes from 'prop-types'

const DesiredChildDetails = ({
  index,
  idPrefix,
  child,
  setParentState,
  suffixTypes,
  genderTypes,
  countyTypes
}) => (
  <div className='row'>
    <div className='card-header'>Name of the Child</div>
    <CompleteNameFields
      index={index}
      idPrefix= {idPrefix}
      fieldValues={child}
      firstName={child.first_name}
      middleName={child.middle_name}
      lastName={child.last_name}
      nameSuffix={child.name_suffix}
      namePrefix={child.name_prefix}
      suffixTypes={suffixTypes}
      onChange={(key, event) => setParentState(index, key, event)} />

    <div className='col-md-12'>
      <DateField
        gridClassName='col-md-4'
        label={'Date of Birth' + RfaCommon.requiredIndicator}
        id={idPrefix + 'date_of_birth'}
        value={FormatDateForDisplay(child.date_of_birth)}
        onChange={(event) => setParentState(index, 'date_of_birth', FormatDateForPersistance(event.target.value))}
        onBlur={(event) => setParentState(index, 'date_of_birth', FormatDateForPersistance(event.target.value))} />
      <DropDownField
        gridClassName='col-md-4'
        id='gender'
        selectClassName='reusable-select'
        optionList={genderTypes}
        label='Gender'
        value={getDictionaryId(child.gender)}
        onChange={(event) => setParentState(index, 'gender', dictionaryNilSelect(event.target.options))} />
      <DropDownField
        id='county_of_juridiction'
        gridClassName='col-md-4'
        selectClassName='reusable-select'
        value={getDictionaryId(child.county_of_jurisdiction)}
        optionList={countyTypes}
        label='County of Juridiction'
        onChange={(event) => setParentState(index, 'county_of_jurisdiction', dictionaryNilSelect(event.target.options))} />
    </div>

    <div className='col-md-12'>
      <DateField
        gridClassName='col-md-4'
        label='Date of Placement'
        id={idPrefix + 'date_of_placement'}
        value={FormatDateForDisplay(child.date_of_placement)}
        onChange={(event) => setParentState(index, 'date_of_placement', FormatDateForPersistance(event.target.value))}
        onBlur={(event) => setParentState(index, 'date_of_placement', FormatDateForPersistance(event.target.value))} />
    </div>
  </div>
)

DesiredChildDetails.propTypes = {
  index: PropTypes.number,
  idPrefix: PropTypes.string,
  child: PropTypes.object,
  setParentState: PropTypes.func,
  suffixTypes: PropTypes.array,
  genderTypes: PropTypes.array,
  countyTypes: PropTypes.array
}

DesiredChildDetails.defaultProps = {
  index: 0,
  idPrefix: '',
  suffixTypes: [],
  genderTypes: [],
  countyTypes: []
}

export default DesiredChildDetails
