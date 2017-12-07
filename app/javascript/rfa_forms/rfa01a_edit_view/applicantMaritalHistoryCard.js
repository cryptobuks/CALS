import React from 'react'
import {yesNo} from 'constants/constants'
import CompleteNameFields from './completeNameField.jsx'
import {PlaceDateField} from 'components/rfa_forms/placeDateFields'
import {DropDownField} from 'components/common/dropDownField'
import {getDictionaryId, dictionaryNilSelect, FormatDateForDisplay, FormatDateForPersistance} from 'helpers/commonHelper.jsx'
import {setToWhomOptionList, handleToWhomValue} from 'helpers/cardsHelper.jsx'
import {fieldErrorsAsImmutableSet} from 'helpers/validationHelper.jsx'

const dateValidator = {rule: 'isValidDate', message: 'date is invalid'}

export default class ApplicantMaritalHistoryCard extends React.Component {
  constructor (props) {
    super(props)
    this.props.validator.addFieldValidation(this.props.idPrefix + 'date_of_marriage', dateValidator)
    this.props.validator.addFieldValidation(this.props.idPrefix + 'date_of_marriage_end', dateValidator)
  }

  render () {
    let maritalHistory = this.props.maritalHistory
    let previousRelationshipPrefixId = this.props.idPrefix + 'PreviousRelationship.'
    let previousDissolutionPrefixId = this.props.idPrefix + 'PreviousDissolution.'

    return (
      <form>
        <div className='col-md-12'>
          <DropDownField
            gridClassName='col-md-4'
            id={this.props.idPrefix + 'applicant_id'}
            selectClassName='reusable-select'
            label='Select Applicant'
            optionList={setToWhomOptionList(this.props.applicants)}
            value={maritalHistory.applicant_id}
            onChange={(event) => this.props.changeMaritalHistory('applicant_id',
              dictionaryNilSelect(event.target.selectedOptions[0]).id, this.props.index)} />

          <DropDownField
            gridClassName='col-md-4'
            selectClassName={'reusable-select'}
            label={'Relationship Type'}
            id={this.props.idPrefix + 'relationship_type'}
            optionList={this.props.relationshipTypes}
            value={getDictionaryId(maritalHistory.relationship_type)}
            onChange={(event) => this.props.changeMaritalHistory('relationship_type',
              dictionaryNilSelect(event.target.selectedOptions[0]), this.props.index)} />
        </div>
        <div className='col-md-12'>
          <CompleteNameFields
            index={this.props.index}
            namePrefixId='name_prefix'
            nameSuffixId='name_suffix'
            firstNameId='first_name'
            middleNameId='middle_name'
            lastNameId='last_name'
            firstName={maritalHistory.first_name}
            middleName={maritalHistory.middle_name}
            lastName={maritalHistory.last_name}
            nameSuffix={maritalHistory.name_suffix}
            namePrefix={maritalHistory.name_prefix}
            suffixTypes={this.props.suffixTypes}
            prefixTypes={this.props.prefixTypes}
            onChange={this.props.changeMaritalHistory} />
        </div>
        <div className='col-md-12'>
          <div className='cards-inner-label'> Date and Place of Previous Relationship </div>

          <PlaceDateField
            dateId={this.props.idPrefix + 'date_of_marriage'}
            cityId={this.props.idPrefix + 'place_of_marriage_city'}
            stateId={this.props.idPrefix + 'place_of_marriage_state'}
            dateValue={FormatDateForDisplay(maritalHistory.date_of_marriage)}
            stateValue={getDictionaryId(maritalHistory.place_of_marriage_state)}
            cityValue={maritalHistory.place_of_marriage_city}
            onDateChange={(event) => this.props.changeMaritalHistory('date_of_marriage', FormatDateForPersistance(event.target.value), this.props.index)}
            onCityChange={(event) => this.props.changeMaritalHistory('place_of_marriage_city', event.target.value, this.props.index)}
            onStateChange={(event) => this.props.changeMaritalHistory('place_of_marriage_state', dictionaryNilSelect(event.target.selectedOptions[0]), this.props.index)}
            stateTypes={this.props.stateTypes}
            onBlurChange={(event) => this.props.validator.validateFieldSetErrorState(this.props.idPrefix + 'date_of_marriage', event.target.value)}
            errors={fieldErrorsAsImmutableSet(this.props.errors.date_of_marriage)} />
        </div>
        <div className='col-md-12'>
          <div className='cards-inner-label'>  Date and Place of Previous Relationship Dissolution</div>

          <PlaceDateField
            dateId={this.props.idPrefix + 'date_of_marriage_end'}
            cityId={this.props.idPrefix + 'place_of_marriage_end_city'}
            stateId={this.props.idPrefix + 'place_of_marriage_end_state'}
            dateValue={FormatDateForDisplay(maritalHistory.date_of_marriage_end)}
            stateValue={getDictionaryId(maritalHistory.place_of_marriage_end_state)}
            cityValue={maritalHistory.place_of_marriage_end_city}
            onDateChange={(event) => this.props.changeMaritalHistory('date_of_marriage_end', FormatDateForPersistance(event.target.value), this.props.index)}
            onCityChange={(event) => this.props.changeMaritalHistory('place_of_marriage_end_city', event.target.value, this.props.index)}
            onStateChange={(event) => this.props.changeMaritalHistory('place_of_marriage_end_state', dictionaryNilSelect(event.target.selectedOptions[0]), this.props.index)}
            stateTypes={this.props.stateTypes}
            onBlurChange={(event) => this.props.validator.validateFieldSetErrorState(this.props.idPrefix + 'date_of_marriage_end', event.target.value)}
            errors={fieldErrorsAsImmutableSet(this.props.errors.date_of_marriage_end)} />
        </div>
        <div className='col-md-12'>
          <DropDownField
            gridClassName='col-md-4'
            id={this.props.idPrefix + 'relationship_termination'}
            value={getDictionaryId(maritalHistory.marriage_termination_reason)}
            selectClassName={'reusable-select'}
            optionList={this.props.marriageTerminationReasons}
            label={'Relationship Terminated by'}
            onChange={(event) => this.props.changeMaritalHistory('marriage_termination_reason', dictionaryNilSelect(event.target.selectedOptions[0]), this.props.index)} />
        </div>
      </form>
    )
  }
}
ApplicantMaritalHistoryCard.defaultProps = {
  idPrefix: '',
  errors: {
  }
}
