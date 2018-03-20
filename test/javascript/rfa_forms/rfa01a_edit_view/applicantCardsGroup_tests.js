import React from 'react'
import Immutable from 'immutable'
import sinon from 'sinon'
import {nameTypes, suffixTypes, prefixTypes, stateTypes, genderTypes, educationLevels, ethnicityTypes, languageTypes, salaryTypes} from './../../helpers/constants.js'
import ApplicantCardsGroup from 'rfa_forms/rfa01a_edit_view/applicantCardsGroup.jsx'
import ReactDOM from 'react-dom'
import {shallow, mount} from 'enzyme'
import Validator from 'helpers/validator.js'
var TestUtils = require('react-dom/test-utils')

describe('Verify Applicant Card Group', () => {
  const isApplicantAdded = sinon.spy()
  const getFocusClassNameSpy = sinon.spy()
  const applicants = [{
    to_delete: true,
    first_name: '',
    middle_name: '',
    last_name: '',
    other_names: [],
    date_of_birth: '',
    driver_license_number: '',
    email: '',
    phones: null
  }]
  let props = {
    nameTypes: nameTypes.items,
    suffixTypes: suffixTypes.items,
    prefixTypes: prefixTypes.items,
    phoneTypes: nameTypes.items,
    salaryTypes: salaryTypes.items,
    stateTypes: stateTypes.items,
    educationLevels: educationLevels.items,
    genderTypes: genderTypes.items,
    ethnicityTypes: ethnicityTypes.items,
    languageTypes: languageTypes.items,
    setParentState: isApplicantAdded,
    validator: new Validator({}),
    getFocusClassName: getFocusClassNameSpy
  }
  let applicantRender = TestUtils.renderIntoDocument(<ApplicantCardsGroup {...props} />)
  let renderedDOM = (componentToRender) => ReactDOM.findDOMNode(componentToRender)
  let componentToDelete = mount(<ApplicantCardsGroup
    applicants={applicants}
    nameTypes={nameTypes.items}
    suffixTypes={suffixTypes.items}
    prefixTypes={prefixTypes.items}
    phoneTypes={nameTypes.items}
    salaryTypes={salaryTypes.items}
    stateTypes={stateTypes.items}
    educationLevels={educationLevels.items}
    genderTypes={genderTypes.items}
    ethnicityTypes={ethnicityTypes.items}
    languageTypes={languageTypes.items}
    setParentState={isApplicantAdded}
    validator={new Validator({})}
    getFocusClassName={getFocusClassNameSpy} />)

  it('Spy on Button Click doesnot call', () => {
    const addCardButton = renderedDOM(applicantRender)
    const addCardBtn = addCardButton.children[1].children[0].children[0]
    // const addCardButton = this.children.type('button')
    TestUtils.Simulate.click(addCardBtn)
    expect(isApplicantAdded.calledOnce).toBe(true)
  })
  it('verify default props', () => {
    applicantRender = TestUtils.renderIntoDocument(<ApplicantCardsGroup {...props} />)
    let applicantCard = renderedDOM(applicantRender)
    expect(applicantCard.children.length).toBe(2)
    expect(applicantCard.children[0].children[0].children[1].children.length).toEqual(4)
  })

  it('tests toDelete', () => {
    expect(componentToDelete.find('.card-body').length).toEqual(0)
  })

  describe('close second applicant', () => {
    props.applicants = Immutable.fromJS([applicants, applicants])
    applicantRender = TestUtils.renderIntoDocument(<ApplicantCardsGroup {...props} />)
    let applicantCard = renderedDOM(applicantRender)
    let applicantsList = applicantCard.children[0].children[1].children
    it('Verify added applicant', () => {
      expect(applicantsList.length).toEqual(3)
    })
    it('Verify added applicant click close', () => {
      let clickCloseButton = applicantsList[1]
      TestUtils.Simulate.click(clickCloseButton)
      expect(isApplicantAdded.called).toBe(true)
    })
  })
})
