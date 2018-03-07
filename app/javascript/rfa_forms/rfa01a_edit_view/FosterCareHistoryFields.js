import React from 'react'
import Immutable from 'immutable'
import {DropDownField} from 'components/common/dropDownField'
import Button from 'components/common/button'
import {AgencyComponent} from 'components/rfa_forms/agencyComponentFields'
import {FacilityComponent} from 'components/rfa_forms/fosterFacilityComponent'
import {checkArrayObjectPresence, dictionaryNilSelectValue} from 'helpers/commonHelper.jsx'
import {addCardAsJS, removeCard} from 'helpers/cardsHelper.jsx'
import YesNoRadioComponent from 'components/common/yesNoFields'

export const blankFosterCareFields = Object.freeze(
  {
    foster_care_licenses_q1: {
      was_previously_licensed: '',
      agencies: [
        {
          name: '',
          type: {}
        }
      ]
    },
    applications_for_adoption_q2: {
      have_applied_for_adoption: '',
      facilities: ['']
    },
    facility_operation_licenses_q3: {
      was_previously_licensed: '',
      agencies: [
        {
          name: '',
          type: {}
        }
      ]
    },
    employment_in_facilities_q4: {
      was_employed_or_volunteered: '',
      facilities: ['']
    },
    denial_history_q5: {
      had_denials: '',
      agencies: [
        {
          name: '',
          type: {}
        }
      ]
    },
    suspension_revocation_history_q6: {
      had_suspensions_revocations: '',
      agencies: [
        {
          name: '',
          type: {}
        }
      ]
    },
    was_subject_for_exclusion_order_q7: ''
  }

)

export const blankAgencyFields = Object.freeze({
  name: '',
  type: {}
})

export class FosterCareHistoryFields extends React.Component {
  constructor (props) {
    super(props)
    this.setFosterCareNestedState = this.setFosterCareNestedState.bind(this)
    this.setFosterCareHistoryState = this.setFosterCareHistoryState.bind(this)
    this.handleClearOnConditionalChange = this.handleClearOnConditionalChange.bind(this)
    this.addAgencyCard = this.addAgencyCard.bind(this)
    this.removeAgencyCard = this.removeAgencyCard.bind(this)

    this.addFacilityCard = this.addFacilityCard.bind(this)
    this.removeFacilityCard = this.removeFacilityCard.bind(this)

    this.onAgencyChange = this.onAgencyChange.bind(this)
    this.onFacilityChange = this.onFacilityChange.bind(this)
  }

  setFosterCareNestedState (key, subKey, value) {
    let newData = Immutable.fromJS((Object.keys(this.props.fosterCareHistory).length !== 0) ? this.props.fosterCareHistory : blankFosterCareFields)
    let newerData = newData.update(key,
      data => data.set(subKey, value))
    this.props.setParentState('adoption_history', newerData.toJS())
  }

  handleClearOnConditionalChange (key, subKey, value, hiddenKey, hiddenDefaultValue) {
    if (value === 'false') {
      let newData = Immutable.fromJS((Object.keys(this.props.fosterCareHistory).length !== 0) ? this.props.fosterCareHistory : blankFosterCareFields)
      let newerData = newData.update(key, data => data.set(subKey, value))
      newerData = newerData.update(key, data => data.set(hiddenKey, hiddenDefaultValue))
      this.props.setParentState('adoption_history', newerData.toJS())
    } else {
      this.setFosterCareNestedState(key, subKey, value)
    }
  }

  setFosterCareHistoryState (key, value) {
    let newData = Immutable.fromJS((Object.keys(this.props.fosterCareHistory).length !== 0) ? this.props.fosterCareHistory : blankFosterCareFields)
    let newerData = newData.set(key, value)
    this.props.setParentState('adoption_history', newerData.toJS())
  }

  addAgencyCard (event, agency, key, subKey) {
    event.preventDefault()
    let agencyCardsList = checkArrayObjectPresence(agency) || []
    agencyCardsList.push(blankAgencyFields)
    let newData = Immutable.fromJS(this.props.fosterCareHistory)
    let newerData = newData.update(key,
      data => data.set(subKey, agencyCardsList))
    this.props.setParentState('adoption_history', newerData.toJS())
    // let newData = Immutable.fromJS(this.props.fosterCareHistory)
    // let newerData = newData.update(key,
    //   data => data.set(subKey, addCardAsJS(agency, blankAgencyFields)))
    // this.props.setParentState('fosterCareHistory', newerData.toJS())
  }

  removeAgencyCard (event, agency, indexValue, key, subKey) {
    event.preventDefault()
    this.setFosterCareNestedState(key, subKey, removeCard(agency, indexValue, blankAgencyFields))
  }

  addFacilityCard (event, facility, key, subKey) {
    event.preventDefault()
    let facilityCardsList = checkArrayObjectPresence(facility) || []
    facilityCardsList.push('')
    let newData = Immutable.fromJS(this.props.fosterCareHistory)
    let newerData = newData.update(key,
      data => data.set(subKey, facilityCardsList))
    this.props.setParentState('adoption_history', newerData.toJS())
    // let newData = Immutable.fromJS(this.props.fosterCareHistory)
    // let newerData = newData.update(key,
    //   data => data.set(subKey, addCardAsJS(facility, '')))
    // this.props.setParentState('fosterCareHistory', newerData.toJS())
  }

  removeFacilityCard (event, facility, indexValue, key, subKey) {
    event.preventDefault()
    this.setFosterCareNestedState(key, subKey, removeCard(facility, indexValue, ''))
  }

  onAgencyChange (event, agency, index, type, key, subKey, value) {
    let agencyCardsList = checkArrayObjectPresence(agency) || blankAgencyFields
    let immutableAgency = Immutable.fromJS(agencyCardsList)
    agencyCardsList = immutableAgency.update(index, x => x.set(type, value))
    let newData = Immutable.fromJS(this.props.fosterCareHistory)

    let newerData = newData.update(key,
      data => data.set(subKey, agencyCardsList))

    this.props.setParentState('adoption_history', newerData.toJS())
  }

  onFacilityChange (event, facility, index, key, subKey, value) {
    let facilityList = checkArrayObjectPresence(facility) || []
    //  facilityList.push(value)
    let immutableFacilty = Immutable.fromJS(facilityList)
    facilityList = immutableFacilty.set(index, value)
    let newData = Immutable.fromJS(this.props.fosterCareHistory)
    let newerData = newData.update(key,
      data => data.set(subKey, facilityList))

    this.props.setParentState('adoption_history', newerData.toJS())
  }

  render () {
    const fosterCareHistory = (Object.keys(this.props.fosterCareHistory).length !== 0) ? this.props.fosterCareHistory : blankFosterCareFields

    const q1History = fosterCareHistory.foster_care_licenses_q1
    const q2History = fosterCareHistory.applications_for_adoption_q2
    const q3History = fosterCareHistory.facility_operation_licenses_q3
    const q4History = fosterCareHistory.employment_in_facilities_q4
    const q5History = fosterCareHistory.denial_history_q5
    const q6History = fosterCareHistory.suspension_revocation_history_q6
    const q7History = fosterCareHistory.was_subject_for_exclusion_order_q7

    const hiddenQ1 = (q1History.was_previously_licensed === 'true' || q1History.was_previously_licensed === true) ? '' : 'hidden'
    const hiddenQ2 = (q2History.have_applied_for_adoption === 'true' || q2History.have_applied_for_adoption === true) ? '' : 'hidden'
    const hiddenQ3 = (q3History.was_previously_licensed === 'true' || q3History.was_previously_licensed === true) ? '' : 'hidden'
    const hiddenQ4 = (q4History.was_employed_or_volunteered === 'true' || q4History.was_employed_or_volunteered === true) ? '' : 'hidden'
    const hiddenQ5 = (q5History.had_denials === 'true' || q5History.had_denials === true) ? '' : 'hidden'
    const hiddenQ6 = (q6History.had_suspensions_revocations === 'true' || q6History.had_suspensions_revocations === true) ? '' : 'hidden'

    const licenseTypes = this.props.license_types

    const agencyQ1List = checkArrayObjectPresence(q1History.agencies)
    const agencyQ3List = checkArrayObjectPresence(q3History.agencies)
    const agencyQ5List = checkArrayObjectPresence(q5History.agencies)
    const agencyQ6List = checkArrayObjectPresence(q6History.agencies)

    const facilityQ2List = checkArrayObjectPresence(q2History.facilities)
    const facilityQ4List = checkArrayObjectPresence(q4History.facilities)

    return (
      <div className='card-body'>
        <div className='row'>
          <form>
            <div className='row agency-list-item'>
              {
              // Question 1
              }
              <YesNoRadioComponent
                label='Have you been previously licensed, certified, or approved to provide foster care?'
                idPrefix='q1-select-dropdown'
                value={q1History.was_previously_licensed}
                onFieldChange={(event) => this.handleClearOnConditionalChange('foster_care_licenses_q1', 'was_previously_licensed', event.target.value, 'agencies', [blankAgencyFields])} />
            </div>
            <div className={hiddenQ1}>
              {
                agencyQ1List && q1History.agencies.map((agencyQ1Fields, index) => {
                  return (
                    <div key={'agency-q1-' + index} >
                      <AgencyComponent
                        index={index}
                        id={'Q1-' + index}
                        defKey='foster_care_licenses_q1' subKey='agencies'
                        agencies={q1History.agencies}
                        label='Agency Name'
                        placeholder=''
                        dropdownLabel='License Type'
                        inputId={'agency-q1-name-' + index}
                        dropDownId={'agency-q1-type-' + index}
                        optionList={Object.keys(licenseTypes).map(function (v) { return licenseTypes[v] })}
                        dropDownValue={agencyQ1Fields.type}
                        inputValue={agencyQ1Fields.name}
                        removeAgencyCard={this.removeAgencyCard}
                        onAgencyChange={this.onAgencyChange}
                      />

                    </div>
                  )
                })
              }
              <div className={agencyQ1List ? '' : 'hidden'}>
                <div className='text-center'>
                  <Button
                    buttonId='addAgency_q1'
                    label='Add Another Agency +'
                    onClick={(event) => this.addAgencyCard(event, q1History.agencies, 'foster_care_licenses_q1', 'agencies')} />
                </div>
              </div>
            </div>

            <div className='row agency-list-item'>
              {
              // Question 2
              }
              <YesNoRadioComponent
                label='Have you previously applied for adoption? (required)'
                idPrefix='q2-select-dropdown'
                value={q2History.have_applied_for_adoption}
                onFieldChange={(event) => this.handleClearOnConditionalChange('applications_for_adoption_q2', 'have_applied_for_adoption', event.target.value, 'facilities', [''])} />
            </div>

            <div className={hiddenQ2}>
              {
                q2History.facilities.map((name, index) => {
                  return (
                    <div key={'facility-q2-' + index}>
                      <FacilityComponent
                        index={index}
                        value={name}
                        facility={q2History.facilities}
                        defKey='applications_for_adoption_q2' subKey='facilities'
                        removeFacilityCard={this.removeFacilityCard}
                        onChange={this.onFacilityChange}
                      />
                    </div>
                  )
                })
              }
              <div className={facilityQ2List ? '' : 'hidden'}>
                <div className='text-center'>
                  <Button
                    buttonId='addFacility_q2'
                    label='Add Another Facility +'
                    onClick={(event) => this.addFacilityCard(event, q2History.facilities, 'applications_for_adoption_q2', 'facilities')} />
                </div>
              </div>

            </div>

            <div className='row agency-list-item'>
              {
              // Question 3
              }
              <YesNoRadioComponent
                label='Have you previously been licensed to operate a non-foster care community care facility, child care center, family child
                care home, or residential care facility for the elderly or chronically ill?'
                idPrefix='q3-select-dropdown'
                value={q3History.was_previously_licensed}
                onFieldChange={(event) => this.handleClearOnConditionalChange('facility_operation_licenses_q3', 'was_previously_licensed', event.target.value, 'agencies', [blankAgencyFields])} />
            </div>

            <div className={hiddenQ3}>
              {
                agencyQ3List && q3History.agencies.map((agencyFields, index) => {
                  return (
                    <div key={'agency-q3-' + index}>
                      <AgencyComponent
                        index={index}
                        id={'Q3-' + index}
                        label='Agency Name (required)'
                        placeholder=''
                        agencies={q3History.agencies}
                        defKey='facility_operation_licenses_q3'subKey='agencies'
                        dropdownLabel='License Type (required)'
                        inputId={'agency-q3-name-' + index}
                        dropDownId={'agency-q3-type-' + index}
                        optionList={Object.keys(licenseTypes).map(function (v) { return licenseTypes[v] })}
                        dropDownValue={agencyFields.type}
                        inputValue={agencyFields.name}
                        onAgencyChange={this.onAgencyChange}
                        removeAgencyCard={this.removeAgencyCard} />
                    </div>
                  )
                })
              }
              <div className={agencyQ3List ? '' : 'hidden'}>
                <div className='text-center'>
                  <Button
                    buttonId='addFacility_q3'
                    label='Add Another Agency +'
                    onClick={(event) => this.addAgencyCard(event, q3History.agencies, 'facility_operation_licenses_q3', 'agencies')} />
                </div>
              </div>
            </div>

            <div className='row agency-list-item'>
              {
              // Question 4
              }

              <YesNoRadioComponent
                label='Have you previously been employed by or volunteered at a community care facility, child care center, family child care
                    home, or residential care facility for the elderly or chromincally ill?'
                idPrefix='q4-select-dropdown'
                value={q4History.was_employed_or_volunteered}
                onFieldChange={(event) => this.handleClearOnConditionalChange('employment_in_facilities_q4', 'was_employed_or_volunteered', event.target.value, 'facilities', [''])} />
            </div>

            <div className={hiddenQ4}>
              {
                q4History.facilities.map((name, index) => {
                  return (
                    <div key={'facility-q4-' + index}>
                      <FacilityComponent
                        index={index}
                        value={name}
                        facility={q4History.facilities}
                        defKey='employment_in_facilities_q4' subKey='facilities'
                        removeFacilityCard={this.removeFacilityCard}
                        onChange={this.onFacilityChange}
                      />
                    </div>
                  )
                })
              }
              <div className={facilityQ4List ? '' : 'hidden'}>
                <div className='text-center'>
                  <Button
                    buttonId='addAgency_q4'
                    label='Add Another Facility +'
                    onClick={(event) => this.addFacilityCard(event, q4History.facilities, 'employment_in_facilities_q4', 'facilities')} />
                </div>
              </div>

            </div>

            <div className='row agency-list-item'>
              {
              // Question 5
              }
              <YesNoRadioComponent
                label='Have you had a previous license, certification, relative or nonrelative extended family member approval, or resource
                      family approval application denial?'
                idPrefix='q5-select-dropdown'
                value={q5History.had_denials}
                onFieldChange={(event) => this.handleClearOnConditionalChange('denial_history_q5', 'had_denials', event.target.value, 'agencies', [blankAgencyFields])} />
            </div>

            <div className={hiddenQ5}>
              {
                agencyQ5List && q5History.agencies.map((agencyFields, index) => {
                  return (
                    <div key={'agency-q5-' + index}>
                      <AgencyComponent
                        index={index}
                        id={'Q5-' + index}
                        label='Agency Name (required)'
                        placeholder=''
                        agencies={q5History.agencies}
                        defKey='denial_history_q5' subKey='agencies'
                        dropdownLabel='License Type (required)'
                        inputId={'agency-q5-name-' + index}
                        dropDownId={'agency-q5-type-' + index}
                        optionList={Object.keys(licenseTypes).map(function (v) { return licenseTypes[v] })}
                        dropDownValue={agencyFields.type}
                        inputValue={agencyFields.name}
                        onAgencyChange={this.onAgencyChange}
                        removeAgencyCard={this.removeAgencyCard} />
                    </div>
                  )
                })
              }
              <div className={agencyQ5List ? '' : 'hidden'}>
                <div className='text-center'>
                  <Button
                    buttonId='denial_history_q5'
                    label='Add Another Agency +'
                    onClick={(event) => this.addAgencyCard(event, q5History.agencies, 'denial_history_q5', 'agencies')} />
                </div>
              </div>
            </div>

            <div className='row agency-list-item'>
              {
              // Question 6
              }
              <YesNoRadioComponent
                label='Have you had a license, certification, or approval suspended, revoked, or rescinded?'
                idPrefix='q6-select-dropdown'
                value={q6History.had_suspensions_revocations}
                onFieldChange={(event) => this.handleClearOnConditionalChange('suspension_revocation_history_q6', 'had_suspensions_revocations', event.target.value, 'agencies', [blankAgencyFields])} />
            </div>

            <div className={hiddenQ6}>
              {
                agencyQ6List && q6History.agencies.map((agencyFields, index) => {
                  return (
                    <div key={'agency-q6-' + index}>
                      <AgencyComponent
                        index={index}
                        id={'Q6-' + index}
                        label='Agency Name (required)'
                        placeholder=''
                        agencies={q6History.agencies}
                        defKey='suspension_revocation_history_q6'subKey='agencies'
                        dropdownLabel='License Type (required)'
                        inputId={'agency-q6-name-' + index}
                        dropDownId={'agency-q6-type-' + index}
                        optionList={Object.keys(licenseTypes).map(function (v) { return licenseTypes[v] })}
                        dropDownValue={agencyFields.type}
                        inputValue={agencyFields.name}
                        onAgencyChange={this.onAgencyChange}
                        removeAgencyCard={this.removeAgencyCard} />
                    </div>
                  )
                })
              }
              <div className={agencyQ6List ? '' : 'hidden'}>
                <div className='text-center'>
                  <Button
                    buttonId='addAgency_suspension_q6'
                    label='Add Another Agency +'
                    onClick={(event) => this.addAgencyCard(event, q6History.agencies, 'suspension_revocation_history_q6', 'agencies')} />
                </div>
              </div>
            </div>

            <div className='row agency-list-item'>
              {
              // Question 7
              }
              <YesNoRadioComponent
                label='Have you been subject to an exclusion order?'
                idPrefix='q7-select-dropdown'
                value={q7History}
                onFieldChange={(event) => this.setFosterCareHistoryState('was_subject_for_exclusion_order_q7', event.target.value)} />
            </div>
          </form>
        </div>
      </div>
    )
  }
}
