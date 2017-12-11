import React from 'react'
import Immutable from 'immutable'
import {InputComponent} from 'components/common/inputFields'
import {TextAreaComponent} from 'components/common/textArea'
import {DropDownField} from 'components/common/dropDownField'
import {DateField} from 'components/common/dateFields'
import CompleteNameFields from './../rfa01a_edit_view/completeNameField'
import CommonAddressFields from 'components/rfa_forms/commonAddressField'
import {dictionaryNilSelect, getDictionaryId, FormatDateForPersistance, FormatDateForDisplay} from 'helpers/commonHelper.jsx'
import {arrayLastToFirst, checkForNameValidation} from 'helpers/cardsHelper.jsx'
import {yesNo} from 'constants/constants'
import {BinarySelectorField} from 'components/common/binarySelectorField'
import {fieldErrorsAsImmutableSet} from 'helpers/validationHelper.jsx'
import PropTypes from 'prop-types'

const dateValidator = {rule: 'isValidDate', message: 'date is invalid'}

export default class DesiredChildCard extends React.Component {
  constructor (props) {
    super(props)
    this.props.validator.addFieldValidation(this.props.idPrefix + 'date_of_birth', dateValidator)
  }

  handleAddressChange (key, value, index) {
    let schoolAddressObj = Immutable.fromJS(this.props.desiredChild.school_address)
    schoolAddressObj = schoolAddressObj.set(key, value)
    this.props.setParentState('school_address', schoolAddressObj.toJS(), index)
  }

  render () {
    const child = this.props.desiredChild
    return (
      <form>
        <div className='col-md-12'>
          {/* <DropDownField id='child_identified' gridClassName='col-md-12'
          selectClassName='reusable-select col-md-4'
          value={(this.props.desiredChildSection.child_identified)}
          optionList={yesNo.items}
          type='radio'
          label={'Is the child currently in your home?'}
          onChange={(event) => this.props.setParentState('child_identified', event.target.selectedOptions[0].value)} /> */}
        </div>

        <div className='card-header'>Name of Child</div>
        <CompleteNameFields
          index={0}
          fieldValues={child}
          namePrefixId='name_prefix'
          nameSuffixId='name_suffix'
          firstNameId='first_name'
          middleNameId='middle_name'
          lastNameId='last_name'
          firstName={child.first_name}
          middleName={child.middle_name}
          lastName={child.last_name}
          nameSuffix={child.name_suffix}
          namePrefix={child.name_prefix}
          suffixTypes={this.props.suffixTypes || []}
          onChange={(key, event) => this.props.setParentState(key, event, this.props.index)} />
        <div className='col-md-12'>
          <DateField gridClassName='col-md-4' label='Date of Birth' id={this.props.idPrefix + 'date_of_birth'}
            value={FormatDateForDisplay(child.date_of_birth)}
            onChange={(event) => this.props.setParentState('date_of_birth', FormatDateForPersistance(event.target.value), this.props.index)}
            onBlur={(event) => this.props.setParentState('date_of_birth', FormatDateForPersistance(event.target.value), this.props.index)} />
          <DropDownField gridClassName='col-md-4' id='gender' selectClassName='reusable-select'
            optionList={this.props.genderTypes}
            label='Gender'
            value={getDictionaryId(child.gender)}
            onChange={(event) => this.props.setParentState('gender', dictionaryNilSelect(event.target.options), this.props.index)} />
          <DropDownField id='county_of_juridiction' gridClassName='col-md-4'
            selectClassName={'reusable-select'}
            value={getDictionaryId(child.county_of_jurisdiction)}
            optionList={this.props.countyTypes}
            label={'County of Juridiction'}
            onChange={(event) => this.props.setParentState('county_of_jurisdiction', dictionaryNilSelect(event.target.options), this.props.index)} />
        </div>

        <div className='col-md-12'>
          <DateField gridClassName='col-md-4' label='Date of Placement' id={this.props.idPrefix + 'date_of_placement'}
            value={getDictionaryId(child.date_of_placement)}
            onChange={(event) => this.props.setParentState('date_of_placement', FormatDateForPersistance(event.target.value), this.props.index)}
            onBlur={(event) => this.props.setParentState('date_of_placement', FormatDateForPersistance(event.target.value), this.props.index)} />
        </div>

        <div className='col-md-12'>
          <div className='card-header'>Child Relationship to Applicant</div>
          {/*
          <InputComponent gridClassName='col-md-4' id='relationship_to_applicant'
            label='Realtionship to Applicant' placeholder=''
            type='text' onChange={(event) => this.props.setParentState('relationship_to_applicant',
              event.target.value, this.props.index)} />
          */}
        </div>

        <div className='col-md-12'>
          <div className='card-header'><span>Child's Education</span></div>
          <DropDownField id='grade' gridClassName='col-md-4'
            selectClassName={'reusable-select'}
            value={getDictionaryId(child.school_grade)}
            optionList={this.props.schoolGrades}
            label={'Grade'}
            onChange={(event) => this.props.setParentState('school_grade', dictionaryNilSelect(event.target.options), this.props.index)} />

          <InputComponent gridClassName='col-md-8' id='name_of_school'
            value={child.school_name}
            label='Name of School' placeholder=''
            type='text'
            onChange={(event) => this.props.setParentState('school_name',
              event.target.value, this.props.index)} />
          <CommonAddressFields
            id='street_address'
            index={0}
            addressTitle='Address'
            stateTypes={this.props.stateTypes}
            addressFields={child.school_address}
            onChange={(fieldId, event) => this.handleAddressChange(fieldId, event, this.props.index)} />
        </div>
      </form>
    )
  }
}

DesiredChildCard.propTypes = {
  index: PropTypes.number,
  schoolGrades: PropTypes.array.isRequired,
  countyTypes: PropTypes.array.isRequired,
  suffixTypes: PropTypes.array.isRequired,
  desiredChild: PropTypes.object.isRequired,
  setParentState: PropTypes.func.isRequired
}

DesiredChildCard.defaultProps = {
  index: 0,
  idPrefix: ''
}
