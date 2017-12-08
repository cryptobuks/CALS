import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import moment from 'moment'
import momentLocalizer from 'react-widgets-moment'
import {InputComponent} from 'components/common/inputFields'
import {TextAreaComponent} from 'components/common/textArea'
import {DropDownField} from 'components/common/dropDownField'
import {getDictionaryId, dictionaryNilSelect, FormatDateForDisplay, FormatDateForPersistance} from 'helpers/commonHelper.jsx'
import {DateField} from '../../components/common/dateFields'
import Validator from 'helpers/validator'
import {fieldErrorsAsImmutableSet} from 'helpers/validationHelper.jsx'

moment.locale('en')
momentLocalizer()

const dateValidator = {rule: 'isValidDate', message: 'date is invalid'}

export default class RelationshipBetweenApplicantsFields extends React.Component {
  constructor (props) {
    super(props)
    this.onChange = this.onChange.bind(this)

    this.validator = this.props.validator.addFieldValidation(this.props.idPrefix + 'date_of_relationship', dateValidator)
  }

  onChange (key, value) {
    let newData = Immutable.fromJS(this.props.relationshipBetweenApplicants)
    newData = newData.update(0, x => x.set(key, value))

    this.props.setParentState('relationshipBetweenApplicants', newData.toJS())
  }
  render () {
    const relationship = this.props.relationshipBetweenApplicants
    const applicants = this.props.applicants
    const relationshipType = relationship.relationship_type !== null ? relationship.relationship_type.value : false
    const hideRelationshipDetails = relationshipType === 'Married' || relationshipType === 'Domestic Partnership' ? 'row' : 'row hidden'
    const hideOtherRelationship = relationshipType === 'Other' ? 'row' : 'row hidden'
    const applicantsFullNames = applicants.length > 1 ? applicants[0].first_name + ' ' + applicants[0].middle_name + ' ' + applicants[0].last_name + ' ' + ' and' + ' ' + applicants[1].first_name + ' ' + applicants[1].middle_name + ' ' + applicants[1].last_name : ''

    const relationshipId = this.props.idPrefix + 'date_of_relationship'

    return (
      <form>
        <div className='row'>
          <DropDownField gridClassName='col-md-12' id='relationship_type'
            selectClassName='reusable-select'
            value={getDictionaryId(relationship.relationship_type)}
            optionList={this.props.relationshipTypes}
            label={'Relationship between ' + applicantsFullNames}
            onChange={(event) => this.props.setParentState('relationship_type', dictionaryNilSelect(event.target.options))} />
        </div>
        <div className={'relationship-status ' + hideRelationshipDetails}>Status of relationship</div>
        <div className={'relationship-status-details ' + hideRelationshipDetails} >

          <DateField
            gridClassName='col-md-4'
            label='Date'
            id={'date_of_relationship'}
            value={FormatDateForDisplay(relationship.date_of_relationship || '')}
            errors={fieldErrorsAsImmutableSet(this.props.errors.date_of_relationship)}
            onChange={(event) => this.props.setParentState('date_of_relationship',
              FormatDateForPersistance(event.target.value || ''))}
            onBlur={(event) => this.props.validator.validateField(relationshipId, event.target.value)} />
          <InputComponent gridClassName='col-md-4' id='place_of_relationship_city'
            value={relationship.place_of_relationship_city}
            label='City' placeholder='Enter City'
            type='text' onChange={(event) => this.props.setParentState('place_of_relationship_city', event.target.value)} />
          <DropDownField gridClassName='col-md-4' id='place_of_relationship_state'
            value={getDictionaryId(relationship.place_of_relationship_state)}
            selectClassName='reusable-select'
            optionList={this.props.stateTypes}
            label='State'
            onChange={(event) => this.props.setParentState('place_of_relationship_state', dictionaryNilSelect(event.target.options))} />
        </div>
        <div className={hideOtherRelationship}>
          <TextAreaComponent gridClassName='col-md-12' id='other_relationship'
            value={relationship.other_relationship}
            label='Please provide details of other_relationship' placeholder=''
            onChange={(event) => this.props.setParentState('other_relationship', event.target.value)} />

        </div>
      </form>
    )
  }
}

RelationshipBetweenApplicantsFields.propTypes = {
  idPrefix: PropTypes.string.isRequired,
  relationshipBetweenApplicants: PropTypes.object.isRequired,
  relationshipTypes: PropTypes.array.isRequired,
  applicants: PropTypes.array.isRequired,
  setParentState: PropTypes.func.isRequired,
  validator: PropTypes.object.isRequired,
  stateTypes: PropTypes.array.isRequired,
  errors: PropTypes.object.isRequired
}

RelationshipBetweenApplicantsFields.defaultProps = {
  idPrefix: '',
  errors: {}
}
