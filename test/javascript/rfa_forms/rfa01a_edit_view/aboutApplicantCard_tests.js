import React from 'react'
import ReactDOM from 'react-dom'
import {shallow, mount} from 'enzyme'
import {salaryTypes, educationLevels, ethnicityTypes, genderTypes, stateTypes, languageTypes} from './../../helpers/constants'
import AboutApplicant from 'rfa_forms/rfa01a_edit_view/aboutApplicantCard.jsx'
import Validator from 'helpers/validator.js'

var TestUtils = require('react-dom/test-utils')

describe('Verify More About Applican', () => {
  let aboutApplicantComp, setCardState,
    renderedCardComp, renderedDom
  const applicantFields = {
    highest_education_level: {
      id: '1',
      value: 'High School'
    },
    date_of_birth: '01-01-2017',
    gender: {
      id: '1',
      value: 'Male'
    },
    ethnicity: {
      id: '1',
      value: 'Asian'
    },
    driver_license_number: '3234323454323',
    driver_license_state: {
      id: '1',
      value: 'Alabama'
    },
    email: 'test@test.com'
  }
  beforeEach(() => {
    setCardState = jasmine.createSpy('setParentState')
    let validator = new Validator({})
    aboutApplicantComp = shallow(<AboutApplicant
      idPrefix={'applicant0'}
      applicantFields={applicantFields}
      salaryTypes={salaryTypes.items}
      genderTypes={genderTypes.items}
      ethnicityTypes={ethnicityTypes.items}
      educationLevels={educationLevels.items}
      stateTypes={stateTypes.items}
      languageTypes={languageTypes.items}
      setParentState={setCardState}
      validator={validator} />)
  })
  it('High Level Education DropDown Change', () => {
    // spyOn(aboutApplicantComp.instance().props.setParentState, setCardState).and.callThrough()
    let higherEducationField = aboutApplicantComp.find('#highest_education_level')
    higherEducationField.simulate('change', {target: {options: {'2': {value: '2', text: 'GED'}, selectedIndex: 2}}})
    expect(setCardState).toHaveBeenCalledWith('highest_education_level', {id: '2', value: 'GED'})
  })
  it('Date Of Birth Change', () => {
    let dateOfBirthField = aboutApplicantComp.find('#applicant0date_of_birth')
    dateOfBirthField.simulate('change', {target: {value: '01/01/2000'}})
    expect(setCardState).toHaveBeenCalledWith('date_of_birth', '2000-01-01')
  })
  it('Gender DropDown Change', () => {
    let genderField = aboutApplicantComp.find('#gender')
    genderField.simulate('change', {target: {options: {'2': {value: '2', text: 'Female'}, selectedIndex: 2}}})
    expect(setCardState).toHaveBeenCalledWith('gender', {id: '2', value: 'Female'})
  })
  it('Race/Ethnicity DropDown Change', () => {
    let ethnicityField = aboutApplicantComp.find('#ethnicity')
    ethnicityField.simulate('change', {target: {options: {'2': {value: '2', text: 'Hispanic'}, selectedIndex: 2}}})
    expect(setCardState).toHaveBeenCalledWith('ethnicity', {id: '2', value: 'Hispanic'})
  })
  it('Driver License Number Change', () => {
    let dlNumberField = aboutApplicantComp.find('#applicant0driver_license_number')
    dlNumberField.simulate('change', {target: {value: '234567876534'}})
    expect(setCardState).toHaveBeenCalledWith('driver_license_number', '234567876534')
  })
  it('Driver License Sate DropDown Change', () => {
    let DLStateField = aboutApplicantComp.find('#applicant0driver_license_state')
    DLStateField.simulate('change', {target: {options: {'17': {value: '17', text: 'Illinois'}, selectedIndex: 17}}})
    expect(setCardState).toHaveBeenCalledWith('driver_license_state', {id: '17', value: 'Illinois'})
  })
  it('Email Address Change', () => {
    let emailField = aboutApplicantComp.find('#email')
    emailField.simulate('change', {target: {value: 'test2@gmail.com'}})
    expect(setCardState).toHaveBeenCalledWith('email', 'test2@gmail.com')
  })
})
