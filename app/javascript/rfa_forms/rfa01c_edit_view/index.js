import React from 'react'
import Immutable from 'immutable'
import _ from 'lodash'
import DesiredChildCardGroup from 'rfa_forms/rfa01c_edit_view/desiredChildCardGroup'
import {CountyUseOnlyCard} from 'components/rfa_forms/countyUseOnlyCard'
import {fetchRequest} from 'helpers/http'
import {checkForNameValidation} from 'helpers/cardsHelper.jsx'
import Validator from 'helpers/validator'
import CardsGroupLayout from 'components/common/cardsGroupLayout'
import PageTemplate from 'components/common/pageTemplate'
import {getCountyValue, checkArrayObjectPresence, dictionaryNilSelect} from 'helpers/commonHelper.jsx'
import Button from 'components/common/button'

export default class Rfa01cList extends React.Component {
  constructor (props) {
    super(props)
    this.submitForm = this.submitForm.bind(this)
    this.getFocusClassName = this.getFocusClassName.bind(this)
    this.setApplicationState = this.setApplicationState.bind(this)
    this.setFocusState = this.setFocusState.bind(this)
    this.handleNavLinkClick = this.handleNavLinkClick.bind(this)
    this.isNavLinkActive = this.isNavLinkActive.bind(this)
    this.validator = new Validator({})
    this.validator.validateFieldSetErrorState = this.validateFieldSetErrorState.bind(this)

    this.state = {
      focusComponentName: '',
      application: this.props.rfa_c1_application,
      rfa_a01_application: this.props.rfa_a01_application,
      activeNavLinkId: this.props.rfa_c1_application.id,
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
    let url = '/rfa/a01/' + this.state.rfa_a01_application.id + '/c01/' + this.state.application.id
    let params = this.state.application
    fetchRequest(url, 'PUT', params)
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
      }).catch((error) => {
        this.setState({
          errors: error
        })
      })
  }

  setApplicationState (key, value) {
    let newState = Immutable.fromJS(this.state)
    newState = newState.setIn(['application', key], value)
    this.setState(newState.toJS())
  }

  setFocusState (focusComponentName) {
    this.setState({focusComponentName: focusComponentName})
  }

  getFocusClassName (componentName) {
    return this.state.focusComponentName === componentName ? 'edit' : 'show'
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
    return (
      <PageTemplate
        headerLabel='Resource Family Application - Confidential (RFA O1C)'
        buttonId='desiredChildCardsaveProgress'
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
            county={getCountyValue(this.state.application, this.props.user)}
            CountyList={this.props.countyTypes}
            onFieldChange={(event) => this.setApplicationState('application_county',
              dictionaryNilSelect(event.target.options))} />
        </CardsGroupLayout>
        <CardsGroupLayout>
          <h2>VII.<span>Desired Child</span></h2>
          <p> (to be completed if a child has been identified prior to approval)</p>
          <DesiredChildCardGroup
            focusComponentName={this.state.focusComponentName}
            getFocusClassName={this.getFocusClassName}
            setParentState={this.setApplicationState}
            identifiedChildren={checkArrayObjectPresence(this.state.application.identified_children) || undefined}
            applicants={this.state.applicants}
            setFocusState={this.setFocusState}
            stateTypes={this.props.stateTypes}
            suffixTypes={this.props.suffixTypes}
            schoolGrades={this.props.schoolGrades}
            genderTypes={this.props.genderTypes}
            countyTypes={this.props.countyTypes}
            validator={this.validator}
            errors={this.state.errors.child}
            nameSuffixTypes={this.props.nameSuffixTypes} />
        </CardsGroupLayout>
      </PageTemplate>
    )
  }
}
