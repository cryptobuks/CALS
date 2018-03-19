import React from 'react'
import Immutable from 'immutable'
import DesiredChildDetails from './desiredChildDetails'
import DesiredChildEducation from './desiredChildEducation'
import DesiredChildRelationships from './desiredChildRelationships'
import {dictionaryNilSelect, checkArrayObjectPresence, getDictionaryId, FormatDateForPersistance, FormatDateForDisplay} from 'helpers/commonHelper.jsx'
import YesNoRadioComponent from 'components/common/yesNoFields'
import Button from 'components/common/button'
import PropTypes from 'prop-types'
import {relationshipToApplicantDefaults} from 'constants/defaultFields'
import {RfaCommon} from 'constants/rfaText'

const dateValidator = {rule: 'isValidDate', message: 'date is invalid'}

export default class DesiredChildCard extends React.Component {
  constructor (props) {
    super(props)
    this.handleAddressChange = this.handleAddressChange.bind(this)
    this.handleRelationshipChange = this.handleRelationshipChange.bind(this)
    this.props.validator.addFieldValidation(this.props.idPrefix + 'date_of_birth', dateValidator)
  }

  handleAddressChange (key, value, index) {
    let schoolAddressObj = Immutable.fromJS(this.props.desiredChild.school_address)
    schoolAddressObj = schoolAddressObj.set(key, value)
    this.props.setParentState(index, 'school_address', schoolAddressObj.toJS())
  }

  handleRelationshipChange (applicant, value, index, subIndex) {
    let relationshipToApplicant = Immutable.fromJS(checkArrayObjectPresence(this.props.desiredChild.relationship_to_applicants) || [relationshipToApplicantDefaults])
    relationshipToApplicant = relationshipToApplicant.setIn([subIndex, 'applicant_id'], applicant.id)
    relationshipToApplicant = relationshipToApplicant.setIn([subIndex, 'relationship_to_applicant_freeform'], value)
    this.props.setParentState(index, 'relationship_to_applicants', relationshipToApplicant.toJS())
  }

  render () {
    const child = this.props.desiredChild
    const index = this.props.index
    return (
      <div className='row'>
        <div key={'desiredChildRemoveLink' + index} className='row'>
          {index > 0
            ? <div>
              <hr style={{padding: '1rem', marginBottom: '0px', marginTop: '10px'}} />
            </div>
            : null }
          <a onClick={(event) => this.props.clickClose(index)} className='pull-right remove-btn'>Remove</a>
        </div>
        <YesNoRadioComponent
          idPrefix={'child_identified' + index}
          label={'Is the child currently in your home?' + RfaCommon.requiredIndicator}
          value={child.child_in_home}
          onFieldChange={(event) => this.props.setParentState(index, 'child_in_home', event.target.value)} />
        <DesiredChildDetails
          index={index}
          idPrefix='desiredChildCard'
          child={child}
          setParentState={this.props.setParentState}
          suffixTypes={this.props.suffixTypes}
          genderTypes={this.props.genderTypes}
          countyTypes={this.props.countyTypes} />
        <DesiredChildRelationships
          index={index}
          child={child}
          applicants={this.props.applicants}
          handleRelationshipChange={this.handleRelationshipChange} />
        <DesiredChildEducation
          index={index}
          child={child}
          schoolGrades={this.props.schoolGrades}
          stateTypes={this.props.stateTypes}
          setParentState={this.props.setParentState}
          handleAddressChange={this.handleAddressChange} />
      </div>
    )
  }
}

DesiredChildCard.propTypes = {
  index: PropTypes.number,
  idPrefix: PropTypes.string,
  schoolGrades: PropTypes.array.isRequired,
  countyTypes: PropTypes.array.isRequired,
  suffixTypes: PropTypes.array.isRequired,
  desiredChild: PropTypes.object.isRequired,
  setParentState: PropTypes.func.isRequired
}

DesiredChildCard.defaultProps = {
  index: 0,
  idPrefix: '',
  suffixTypes: []
}
