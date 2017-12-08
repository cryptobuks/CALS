import React from 'react'
import PropTypes from 'prop-types'
import {DropDownField} from 'components/common/dropDownField'
import {DateField} from '../../components/common/dateFields'
import {getDictionaryId, dictionaryNilSelect, dictionaryNilSelectValue, FormatDateForDisplay, FormatDateForPersistance} from 'helpers/commonHelper.jsx'
import {yesNo} from 'constants/constants'
import {setToWhomOptionList, handleToWhomValue} from 'helpers/cardsHelper.jsx'
import Validator from 'helpers/validator'
import {fieldErrorsAsImmutableSet} from 'helpers/validationHelper.jsx'

const dateValidator = {rule: 'isValidDate', message: 'date is invalid'}

export class MinorCardField extends React.Component {
  constructor (props) {
    super(props)

    this.props.validator.addFieldValidation(this.props.idPrefix + 'date_of_birth', dateValidator)
  }

  render () {
    const minor = this.props.minorChild
    const minorRuleId = this.props.idPrefix + 'date_of_birth'
    return (
      <form>
        <DropDownField gridClassName='col-md-4' id='relationship_to_applicant'
          selectClassName='reusable-select'
          optionList={this.props.relationshipToApplicantTypes}
          value={getDictionaryId(minor.relationship_to_applicants[0].relationship_to_applicant)}
          label='Relationship Type' onChange={(event) => this.props.handleRelationshipTypeToApplicant(this.props.index, dictionaryNilSelect(event.target.options), 'relationship_to_applicant')} />
        <DropDownField gridClassName='col-md-4' id='applicant_id'
          selectClassName='reusable-select'
          optionList={setToWhomOptionList(this.props.applicants)}
          label='To whom'
          value={getDictionaryId(handleToWhomValue(minor.relationship_to_applicants[0].applicant_id, this.props.applicants))}
          onChange={(event) => this.props.handleRelationshipTypeToApplicant(this.props.index, event.target.value, 'applicant_id')} />
        <DateField gridClassName='col-md-4' label='Date of Birth' id={this.props.idPrefix + 'date_of_birth'}
          value={FormatDateForDisplay(minor.date_of_birth)}
          errors={fieldErrorsAsImmutableSet(this.props.errors.date_of_birth)}
          onChange={(event) => this.props.onFieldChange(this.props.index,
            FormatDateForPersistance(event.target.value), 'date_of_birth')}
          onBlur={(event) => this.props.validator.validateFieldSetErrorState(minorRuleId, event.target.value)} />
        <DropDownField gridClassName='col-md-4' id='minor_gender'
          selectClassName='reusable-select'
          optionList={this.props.genderTypes}
          value={getDictionaryId(minor.gender)}
          label='Gender'
          onChange={(event) => this.props.onFieldChange(this.props.index, dictionaryNilSelect(event.target.options), 'gender')} />
        <DropDownField id='child_financially_supported' gridClassName='col-md-4' value={minor.child_financially_supported}
          selectClassName={'reusable-select'}
          optionList={yesNo.items}
          label={'Do you financially support this child?'}
          onChange={(event) => this.props.onFieldChange(this.props.index, dictionaryNilSelectValue(event.target.options), 'child_financially_supported')} />
        <DropDownField id='child_adopted' gridClassName='col-md-4' value={minor.child_adopted}
          selectClassName={'reusable-select'}
          optionList={yesNo.items}
          label={'Is this child adopted?'}
          onChange={(event) => this.props.onFieldChange(this.props.index, dictionaryNilSelectValue(event.target.options), 'child_adopted')} />
      </form>
    )
  }
}

MinorCardField.propTypes = {
  index: PropTypes.number,
  minorChild: PropTypes.object.isRequired,
  applicants: PropTypes.array.isRequired,
  relationshipToApplicantTypes: PropTypes.array,
  genderTypes: PropTypes.array,
  handleRelationshipTypeToApplicant: PropTypes.func,
  onFieldChange: PropTypes.func
}

MinorCardField.defaultProps = {
  idPrefix: '',
  errors: {}
}
