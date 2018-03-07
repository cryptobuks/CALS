import React from 'react'
import {InputComponent} from './inputFields'
import {DropDownField} from './dropDownField'
import {DateField} from './dateFields'
import {dictionaryNilSelect, dictionaryNilSelectValue, getDictionaryId, FormatDateForDisplay, FormatDateForPersistance} from 'helpers/commonHelper.jsx'
import {setToWhomOptionList, handleToWhomValue} from 'helpers/cardsHelper.jsx'
import Validator from 'helpers/validator'
import {fieldErrorsAsImmutableSet} from 'helpers/validationHelper.jsx'

const dateValidator = {rule: 'isValidDate', message: 'date is invalid'}

export class OtherAdultsCardField extends React.Component {
  constructor (props) {
    super(props)

    this.props.validator.addFieldValidation(this.props.idPrefix + 'date_of_birth', dateValidator)
  }

  render () {
    const adult = this.props.otherAdults

    const otherAdultsRuleId = this.props.idPrefix + 'date_of_birth'

    return (
      <form>
        <DropDownField gridClassName='col-md-4' id={this.props.idPrefix + 'relationshipType'}
          selectClassName='reusable-select'
          optionList={this.props.relationship_types}
          label='Relationship Type (required)'
          value={getDictionaryId(adult.relationship_to_applicants[0].relationship_to_applicant)}
          onChange={(event) => this.props.handleRelationshipTypeToApplicant(this.props.index, dictionaryNilSelect(event.target.options), 'relationship_to_applicant')} />
        <DropDownField gridClassName='col-md-4' id={this.props.idPrefix + 'availableApplicants'}
          selectClassName='reusable-select'
          optionList={setToWhomOptionList(this.props.applicants)}
          value={handleToWhomValue(adult.relationship_to_applicants[0].applicant_id, this.props.applicants).id}
          label='To Whom'
          onChange={(event) => this.props.handleRelationshipTypeToApplicant(this.props.index, dictionaryNilSelectValue(event.target.options), 'applicant_id')} />
        <DateField gridClassName='col-md-4' label='Date of Birth (required)' id={this.props.idPrefix + 'date_of_birth'}
          value={FormatDateForDisplay(adult.date_of_birth)}
          errors={fieldErrorsAsImmutableSet(this.props.errors.date_of_birth)}
          onChange={(event) => this.props.onFieldChange(this.props.index,
            FormatDateForPersistance(event.target.value), 'date_of_birth')}
          onBlur={(event) => this.props.validator.validateFieldSetErrorState(otherAdultsRuleId, event.target.value)} />
        <InputComponent gridClassName='col-md-4' id={this.props.idPrefix + 'firstName'} value={adult.first_name}
          label='First Name (required)' placeholder='Enter First Name'
          type='text' onChange={(event) => this.props.onFieldChange(this.props.index, event.target.value, ('first_name'))} />
        <InputComponent gridClassName='col-md-4' id={this.props.idPrefix + 'middleName'} value={adult.middle_name}
          label='Middle Name' placeholder='Enter Middle Name'
          type='text' onChange={(event, id) => this.props.onFieldChange(this.props.index, event.target.value, ('middle_name'))} />
        <InputComponent gridClassName='col-md-4' id={this.props.idPrefix + 'lastName'} value={adult.last_name}
          label='Last Name (required)' placeholder='Enter Last Name'
          type='text' onChange={(event, id) => this.props.onFieldChange(this.props.index, event.target.value, ('last_name'))} />
      </form>
    )
  }
}

OtherAdultsCardField.defaultProps = {
  idPrefix: '',
  errors: {}
}
