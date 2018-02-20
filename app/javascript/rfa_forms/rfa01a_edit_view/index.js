import React from 'react'
import Immutable from 'immutable'
import _ from 'lodash'
import ApplicantCardsGroup from './applicantCardsGroup.jsx'
import ResidenceCards from './residenceCardsMain'
import FosterCareHistoryCardMain from './FosterCareHistoryCard.jsx'
import OtherAdultsCard from './OtherAdultsCardsGroup'
import MinorCardsGroup from './minorCardsGroup'
import ReferencesMain from './referencesMain'
import RelationshipBetweenApplicantsCardMain from './relationshipBetweenApplicantsCard'
import ApplicantMaritalHistoryCardGroup from './applicantMaritalHistoryCardGroup'
import ChildDesiredMain from './childDesiredMain'
import {CountyUseOnlyCard} from 'components/rfa_forms/countyUseOnlyCard.js'
import RfaSideBar from 'rfa_forms/rfa_sidebar/index.js'
import PageTemplate from 'components/common/pageTemplate'
import './stylesheets/cards-main.scss'
import {fetchRequest} from 'helpers/http'
import {getDictionaryId, dictionaryNilSelect, checkArrayObjectPresence} from 'helpers/commonHelper.jsx'
import {checkForNameValidation} from 'helpers/cardsHelper.jsx'
import {urlPrefixHelper} from 'helpers/url_prefix_helper.js.erb'
import Validator from 'helpers/validator'

export default class Rfa01EditView extends React.Component {
  constructor (props) {
    super(props)
    this.submitForm = this.submitForm.bind(this)
    this.getFocusClassName = this.getFocusClassName.bind(this)
    this.setApplicationState = this.setApplicationState.bind(this)
    this.setFocusState = this.setFocusState.bind(this)
    this.validator = new Validator({})
    this.validator.validateFieldSetErrorState = this.validateFieldSetErrorState.bind(this)
    this.handleNavLinkClick = this.handleNavLinkClick.bind(this)
    this.isNavLinkActive = this.isNavLinkActive.bind(this)

    this.state = {
      focusComponentName: '',
      activeNavLinkHref: '',
      application: this.props.application,
      disableSave: !(checkForNameValidation(this.props.application.applicants)),
      errors: {}
    }
    if (!this.state.application.application_county) {
      const countyValue = (this.props.user && this.props.user.county_code)
      this.state.application.application_county = this.props.countyTypes.find(countyType => countyType.id === parseInt(countyValue))
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

  componentDidMount () {
    // set Dictionaty Here
  }

  submitForm () {
    let url = '/rfa/a01/' + this.props.application_id
    let params = this.state.application
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

  setApplicationState (key, value) {
    let newState = Immutable.fromJS(this.state)
    newState = newState.setIn(['application', key], value)
    this.setState(newState.toJS())

    // TODO: need a method in validator to get errors filtered out where field = isRequired
    // No need to validate here again, the data change at component level should validate the fields
    // const requiredFieldsErrors = this.validator.allFieldErrorsByRule('isRequired')
    // this.setState({disableSave: requiredFieldsErrors.size > 0})
    if (key === 'applicants') {
      if (checkForNameValidation(value)) {
        this.setState({
          disableSave: false
        })
      } else {
        this.setState({
          disableSave: true
        })
      }
    }
  }

  setFocusState (focusComponentName) {
    this.setState({focusComponentName: focusComponentName})
  }

  getFocusClassName (componentName) {
    return this.state.focusComponentName === componentName ? 'edit' : 'show'
  }

  handleNavLinkClick (href) {
    this.setState({ activeNavLinkHref: href })
  }

  isNavLinkActive (href) {
    return this.state.activeNavLinkHref === href
  }

  render () {
    const hideRelationshipBetweenApplicants = this.state.application.applicants !== null && this.state.application.applicants.length === 2 ? 'cards-section' + 'col-xs-12 col-sm-12 col-md-12 col-lg-12' : 'hidden'
    return (
      <PageTemplate
        headerLabel='Resource Family Application - Confidential (RFA 01A)'
        buttonId='saveProgress'
        buttonLabel='Save Progress'
        buttonTextAlignment='right'
        onButtonClick={this.submitForm}
        rfa01aApplicationId={this.state.application.id}
        onRfa01AForm
        rfa01cForms={this.state.application.rfa1c_forms}
        otherAdults={this.state.application.other_adults}
        applicants={this.state.application.applicants}
        childIdentified={this.state.application.child_desired &&
          this.state.application.child_desired.child_identified}
        isNavLinkActive={this.isNavLinkActive}
        handleNavLinkClick={this.handleNavLinkClick}
        errors={this.state.errors.issue_details} >
        <CountyUseOnlyCard
          countyUseOnlyCardId='county_use_only'
          setFocusState={this.setFocusState}
          getFocusClassName={this.getFocusClassName}
          county={getDictionaryId(this.state.application.application_county)}
          CountyList={this.props.countyTypes}
          onFieldChange={(event) => this.setApplicationState('application_county',
            dictionaryNilSelect(event.target.options))} />

        <ApplicantCardsGroup
          suffixTypes={this.props.suffixTypes}
          prefixTypes={this.props.prefixTypes}
          nameTypes={this.props.nameTypes}
          phoneTypes={this.props.phoneTypes}
          salaryTypes={this.props.salaryTypes}
          stateTypes={this.props.stateTypes}
          educationLevels={this.props.educationLevels}
          genderTypes={this.props.genderTypes}
          // raceTypes={this.props.raceTypes}
          ethnicityTypes={this.props.ethnicityTypes}
          languageTypes={this.props.languageTypes}
          focusComponentName={this.state.focusComponentName}
          applicants={this.state.application.applicants || []}
          setParentState={this.setApplicationState}
          setFocusState={this.setFocusState}
          getFocusClassName={this.getFocusClassName}
          hasValidName={this.state.disableSave}
          validator={this.validator}
          errors={this.state.errors.applicants} />

        <div className='cards-section col-xs-12 col-sm-12 col-md-12 col-lg-12'
          id='applicant-residence-card'>
          <h3>II. Applicant (S) - <span>Residence</span></h3>
          <ResidenceCards
            focusComponentName={this.state.focusComponentName}
            residence={this.state.application.residence || undefined}
            languageTypes={this.props.languageTypes}
            residenceTypes={this.props.residenceTypes}
            stateTypes={this.props.stateTypes}
            setFocusState={this.setFocusState}
            setParentState={this.setApplicationState} />
        </div>

        <div className={hideRelationshipBetweenApplicants}
          id='relationship-between-applicants-card'>
          <h3>III.<span>Relationship Between Applicant</span></h3>
          <RelationshipBetweenApplicantsCardMain
            focusComponentName={this.state.focusComponentName}
            relationshipBetweenApplicants={this.state.application.applicants_relationship || undefined}
            getFocusClassName={this.getFocusClassName}
            setParentState={this.setApplicationState}
            setFocusState={this.setFocusState}
            stateTypes={this.props.stateTypes}
            relationshipTypes={this.props.relationshipTypes}
            validator={this.validator}
            errors={this.state.errors.relationshipBetweenApplicants}
            applicants={this.state.application.applicants || []} />
        </div>

        <div className='cards-section col-xs-12 col-sm-12 col-md-12 col-lg-12'
          id='minor-child-card'>
          <h3>IV. <span>Minor Children Residing in the Home</span></h3>
          <MinorCardsGroup
            genderTypes={this.props.genderTypes}
            relationshipToApplicantTypes={this.props.relationshipToApplicantTypes}
            getFocusClassName={this.getFocusClassName}
            setFocusState={this.setFocusState}
            setParentState={this.setApplicationState}
            validator={this.validator}
            errors={this.state.errors.minorChildren}
            applicants={this.state.application.applicants || []}
            minorChildren={this.state.application.minorChildren || undefined} />
        </div>

        <div className='cards-section col-xs-12 col-sm-12 col-md-12 col-lg-12'
          id='other-adults-card'>
          <h3>V.<span>Other Adults Residing or Regularly Present in the Home</span></h3>
          <p> Each adult residing or regularly present in the home must complete a Criminal Record Statement RFA 01B</p>
          <OtherAdultsCard
            getFocusClassName={this.getFocusClassName}
            setFocusState={this.setFocusState}
            setParentState={this.setApplicationState}
            validator={this.validator}
            errors={this.state.errors.otherAdults}
            applicants={this.state.application.applicants || []}
            otherAdults={this.state.application.other_adults || undefined}
            relationship_types={this.props.relationshipToApplicantTypes} />
        </div>

        <div className='cards-section col-xs-12 col-sm-12 col-md-12 col-lg-12'
          id='marital-history-card'>
          <h3>VI.<span>Applicant's Marital History</span></h3>
          <ApplicantMaritalHistoryCardGroup
            focusComponentName={this.state.focusComponentName}
            getFocusClassName={this.getFocusClassName}
            applicants={this.state.application.applicants || []}
            applicantsHistory={this.state.application.applicantsHistory || undefined}
            setFocusState={this.setFocusState}
            setParentState={this.setApplicationState}
            relationshipToApplicantTypes={this.props.relationshipToApplicantTypes}
            relationshipTypes={this.props.relationshipTypes}
            suffixTypes={this.props.suffixTypes}
            prefixTypes={this.props.prefixTypes}
            nameTypes={this.props.nameTypes}
            stateTypes={this.props.stateTypes}
            marriageTerminationReasons={this.props.marriageTerminationReasons}
            validator={this.validator}
            errors={this.state.errors.applicantsHistory} />
        </div>

        <div className='cards-section col-xs-12 col-sm-12 col-md-12 col-lg-12'
          id='child-desired-card'>
          <h3>VII.<span>Child Desired </span></h3>
          <ChildDesiredMain
            focusComponentName={this.state.focusComponentName}
            childDesired={this.state.application.child_desired || undefined}
            getFocusClassName={this.getFocusClassName}
            setFocusState={this.setFocusState}
            setParentState={this.setApplicationState}
            siblingGroups={this.props.siblingGroups}
            ageGroups={this.props.ageGroups} />
        </div>

        <div className='cards-section col-xs-12 col-sm-12 col-md-12 col-lg-12'
          id='foster-care-card'>
          <h3>VIII. Foster Care / Adoption / Licensure History</h3>
          <FosterCareHistoryCardMain
            focusComponentName={this.state.focusComponentName}
            fosterCareHistory={this.state.application.fosterCareHistory || {}}
            getFocusClassName={this.getFocusClassName}
            setParentState={this.setApplicationState}
            setFocusState={this.setFocusState}
            {...this.props} />
        </div>
        <div className='cards-section col-xs-12 col-sm-12 col-md-12 col-lg-12'
          id='reference-card'>
          <h3>IX. References</h3>
          <ReferencesMain
            focusComponentName={this.state.focusComponentName}
            setParentState={this.setApplicationState}
            getFocusClassName={this.getFocusClassName}
            setFocusState={this.setFocusState}
            stateTypes={this.props.stateTypes}
            references={this.state.application.references || undefined}
            suffixTypes={this.props.suffixTypes}
            prefixTypes={this.props.prefixTypes}
            nameTypes={this.props.nameTypes}
            validator={this.validator}
            errors={this.state.errors.reference} />
        </div>
      </PageTemplate>
    )
  }
}
