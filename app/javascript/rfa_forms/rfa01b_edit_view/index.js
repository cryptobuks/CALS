import React from 'react'
import Immutable from 'immutable'
import _ from 'lodash'
import {fetchRequest} from 'helpers/http'
import OutOfStateDisclosureCard from './outOfStateDisclosureCard'
import ApplicantDetailsCard from './applicantDetailsCard'
import DisclosureInstructions from './disclosureInstructions'
import CaliforniaCriminalBackground from './californiaCriminalBackground'
import OutsideCACriminalBackground from './outsideCACriminalBackground'
import CrimeBackgroundAgainstCohabitant from './crimeBackgroundAgainstCohabitant'
import PrivacyStatement from './privacyStatement'
import RfaSideBar from 'rfa_forms/rfa_sidebar/index.js'
import {CountyUseOnlyCard} from 'components/rfa_forms/countyUseOnlyCard.js'
import {getDictionaryId, dictionaryNilSelect, checkArrayObjectPresence} from 'helpers/commonHelper.jsx'
import CardsGroupLayout from 'components/common/cardsGroupLayout.js'
import {addCardAsJS, getFocusClassName, removeCard} from 'helpers/cardsHelper.jsx'
import Validator from 'helpers/validator'
import PageTemplate from 'components/common/pageTemplate'
import {disclosureDefaults} from 'constants/defaultFields'

export default class Rfa01bList extends React.Component {
  constructor (props) {
    super(props)
    this.submitForm = this.submitForm.bind(this)
    this.getFocusClassName = this.getFocusClassName.bind(this)
    this.setFocusState = this.setFocusState.bind(this)
    this.setApplicationState = this.setApplicationState.bind(this)
    this.setDisplayState = this.setDisplayState.bind(this)
    this.handleClearOnConditionalChange = this.handleClearOnConditionalChange.bind(this)
    this.validator = new Validator({})
    this.validator.validateFieldSetErrorState = this.validateFieldSetErrorState.bind(this)
    this.handleNavLinkClick = this.handleNavLinkClick.bind(this)
    this.isNavLinkActive = this.isNavLinkActive.bind(this)

    this.state = {
      application: this.props.rfa_b01_application,
      activeNavLinkId: this.props.rfa_b01_application.id,
      rfa_a01_application: this.props.rfa_a01_application,
      disclosureInstructionsDisplay: null,
      privacyStatementDisplay: null,
      focusComponentName: '',
      errors: {}
    }
  }

  validateFieldSetErrorState (fieldName, value) {
    const error = this.validator.validateFieldAndGetError(fieldName, value)

    let currentErrors = this.state.errors
    if (error === undefined) {
      _.unset(currentErrors, fieldName)
    } else {
      _.set(currentErrors, fieldName, error)
    }
    this.setState({errors: currentErrors})
  }

  submitForm () {
    let url = '/rfa/b01/' + this.props.application_id
    fetchRequest(url, 'PUT', this.state.application)
      .then((response) => {
        return response.json()
      }).then((data) => {
        if (!data.issue_details) {
          this.setState({
            application: data,
            errors: {}
          })
        } else {
          this.setState({
            errors: data
          })
        }
      }).catch((errors) => {
        this.setState({
          errors: errors
        })
      })
  }

  setFocusState (focusComponentName) {
    this.setState({focusComponentName: focusComponentName})
  }

  getFocusClassName (componentName) {
    return this.state.focusComponentName === componentName ? 'edit' : 'show'
  }

  setApplicationState (key, value) {
    let newState = Immutable.fromJS(this.state)
    newState = newState.setIn(['application', key], value)
    this.setState(newState.toJS())
  }

  setDisplayState (key, value) {
    let newState = Immutable.fromJS(this.state)
    newState = newState.set(key, value)
    this.setState(newState.toJS())
  }

  handleClearOnConditionalChange (key, value, hiddenKey, hiddenDefaultValue) {
    if (value === 'false') {
      let newState = Immutable.fromJS(this.state)
      newState = newState.setIn(['application', key], value)
      newState = newState.setIn(['application', hiddenKey], hiddenDefaultValue)
      this.setState(newState.toJS())
    } else {
      this.setApplicationState(key, value)
    }
  }

  handleNavLinkClick (id) {
    if (id) {
      this.setState({ activeNavLinkId: id })
    }
  }

  isNavLinkActive (id) {
    return this.state.activeNavLinkId === id
  }

  render () {
    const countyValue = getDictionaryId(this.state.application.application_county) || (this.props.user && this.props.user.county_code)
    return (
      <PageTemplate
        headerLabel='Resource Family Application - Confidential (RFA 01B)'
        buttonId='saveProgress'
        buttonLabel='Save Progress'
        buttonTextAlignment='right'
        onButtonClick={this.submitForm}
        rfa01aApplicationId={this.state.rfa_a01_application.id}
        rfa01cForms={this.state.rfa_a01_application.rfa1c_forms}
        applicants={this.state.rfa_a01_application.applicants}
        otherAdults={this.state.rfa_a01_application.other_adults}
        childIdentified={this.state.rfa_a01_application.child_desired &&
              this.state.rfa_a01_application.child_desired.child_identified}
        isNavLinkActive={this.isNavLinkActive}
        handleNavLinkClick={this.handleNavLinkClick}
        errors={this.state.errors.issue_details} >

        <CardsGroupLayout>
          <CountyUseOnlyCard
            countyUseOnlyCardId='county_use_only'
            setFocusState={this.setFocusState}
            getFocusClassName={this.getFocusClassName}
            county={countyValue}
            CountyList={this.props.countyTypes}
            onFieldChange={(event) => this.setApplicationState('application_county',
              dictionaryNilSelect(event.target.options))} />
        </CardsGroupLayout>

        <CardsGroupLayout>
          <h2>I.<span>Out of State Disclosure</span></h2>
          <OutOfStateDisclosureCard
            livedInOtherState={this.state.application.lived_in_other_state}
            otherStatesOfLiving={this.state.application.other_states_of_living}
            stateTypes={this.props.stateTypes}
            focusComponentName={this.state.focusComponentName}
            getFocusClassName={this.getFocusClassName}
            setFocusState={this.setFocusState}
            handleClearOnConditionalChange={this.handleClearOnConditionalChange}
            setParentState={this.setApplicationState} />
        </CardsGroupLayout>
        <CardsGroupLayout>
          <h2>II.<span>Criminal Record Statement</span></h2>
          <DisclosureInstructions
            focusComponentName={this.state.focusComponentName}
            getFocusClassName={this.getFocusClassName}
            disclosureInstructionsDisplay={this.state.disclosureInstructionsDisplay}
            setDisplayState={this.setDisplayState}
            setFocusState={this.setFocusState}
            setParentState={this.setApplicationState} />
        </CardsGroupLayout>

        <CardsGroupLayout>
          <CaliforniaCriminalBackground
            convictedInCalifornia={this.state.application.convicted_in_california}
            disclosures={checkArrayObjectPresence(this.state.application.convicted_in_california_disclosures) || [disclosureDefaults]}
            focusComponentName={this.state.focusComponentName}
            getFocusClassName={this.getFocusClassName}
            setFocusState={this.setFocusState}
            handleClearOnConditionalChange={this.handleClearOnConditionalChange}
            setParentState={this.setApplicationState} />
        </CardsGroupLayout>

        <CardsGroupLayout>
          <OutsideCACriminalBackground
            convictedInAnotherState={this.state.application.convicted_in_another_state}
            disclosures={checkArrayObjectPresence(this.state.application.convicted_in_another_state_disclosures) || [disclosureDefaults]}
            focusComponentName={this.state.focusComponentName}
            getFocusClassName={this.getFocusClassName}
            setFocusState={this.setFocusState}
            handleClearOnConditionalChange={this.handleClearOnConditionalChange}
            setParentState={this.setApplicationState} />
        </CardsGroupLayout>

        <CardsGroupLayout>
          <CrimeBackgroundAgainstCohabitant
            arrestedForCrime={this.state.application.arrested_for_crime}
            disclosures={checkArrayObjectPresence(this.state.application.arrested_for_crime_disclosures) || [disclosureDefaults]}
            focusComponentName={this.state.focusComponentName}
            getFocusClassName={this.getFocusClassName}
            setFocusState={this.setFocusState}
            handleClearOnConditionalChange={this.handleClearOnConditionalChange}
            setParentState={this.setApplicationState} />
        </CardsGroupLayout>

        <CardsGroupLayout>
          <PrivacyStatement
            privacyStatementDisplay={this.state.privacyStatementDisplay}
            setDisplayState={this.setDisplayState}
            focusComponentName={this.state.focusComponentName}
            getFocusClassName={this.getFocusClassName}
            setFocusState={this.setFocusState} />
        </CardsGroupLayout>

        <CardsGroupLayout>
          <h2><span>Applicant or Other Adult </span></h2>
          <ApplicantDetailsCard
            application={this.state.application}
            validator={this.validator}
            focusComponentName={this.state.focusComponentName}
            getFocusClassName={this.getFocusClassName}
            setFocusState={this.setFocusState}
            setParentState={this.setApplicationState}
            stateTypes={this.props.stateTypes}
            namePrefixTypes={this.props.namePrefixTypes}
            nameSuffixTypes={this.props.nameSuffixTypes} />
        </CardsGroupLayout>
      </PageTemplate>
    )
  }
}
