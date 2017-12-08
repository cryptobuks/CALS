import React from 'react'
import {MinorCardField} from 'rfa_forms/rfa01a_edit_view/minorCardField.js'
import {shallow, mount} from 'enzyme'
import {relationshipTypes, genderTypes, selectedYes} from './../../helpers/constants'
import Validator from 'helpers/validator'
describe('Verify MinorCardFields', function () {
  const applicants = [{
    first_name: 'gdfghfhgv',
    last_name: 'hgbhg',
    middle_name: ''
  }]
  const minorChildren = {
    index: 0,
    gender: {
      'id': 0,
      'value': ''
    },
    relationship_to_applicants: [
      {
        applicant_id: null,
        relationship_to_applicant: {
          'id': 0,
          'value': ''
        }
      }
    ],
    date_of_birth: '2017-01-01',
    child_financially_supported: 'yes',
    child_adopted: 'yes'
  }

  let minorChildCardComp, handleNameFieldInputSpy, handleRelationshipTypeToApplicantSpy, onFieldChangeSpy
  let relationType = relationshipTypes
  beforeEach(() => {
    handleRelationshipTypeToApplicantSpy = jasmine.createSpy('')
    onFieldChangeSpy = jasmine.createSpy('')
    let validator = new Validator({})
    minorChildCardComp = shallow(<MinorCardField
      index={0}
      genderTypes={genderTypes.items}
      relationshipTypes={relationType}
      applicants={applicants}
      handleRelationshipTypeToApplicant={handleRelationshipTypeToApplicantSpy}
      onFieldChange={onFieldChangeSpy}
      minorChild={minorChildren}
      validator={validator} />)
  })
  it('verify Relationship field', () => {
    let relationShipField = minorChildCardComp.find('#relationship_to_applicant')
    relationShipField.simulate('change', {target: {options: {'2': {value: '2', text: 'Sibling'}, selectedIndex: 2}}})
    expect(handleRelationshipTypeToApplicantSpy).toHaveBeenCalledWith(0, Object({ id: '2', value: 'Sibling' }), 'relationship_to_applicant')
  })

  it('verify applicantid field', () => {
    let relationShipField = minorChildCardComp.find('#applicant_id')
    relationShipField.simulate('change', {target: {value: '2'}})
    expect(handleRelationshipTypeToApplicantSpy).toHaveBeenCalledWith(0, '2', 'applicant_id')
  })

  it('verify Gender', () => {
    let relationShipField = minorChildCardComp.find('#minor_gender')
    relationShipField.simulate('change', {target: {options: {'2': {value: '2', text: 'Female'}, selectedIndex: 2}}})
    expect(onFieldChangeSpy).toHaveBeenCalledWith(0, Object({ id: '2', value: 'Female' }), 'gender')
  })
  it('verify date of birth', () => {
    let dateOfBirthField = minorChildCardComp.find('#date_of_birth')
    dateOfBirthField.simulate('change', {target: {value: '01/01/2000'}})
    expect(onFieldChangeSpy).toHaveBeenCalledWith(0, '2000-01-01', 'date_of_birth')
  })
  it('verify child_financially_supported field', () => {
    let relationShipField = minorChildCardComp.find('#child_financially_supported')
    relationShipField.simulate('change', selectedYes)
    expect(onFieldChangeSpy).toHaveBeenCalledWith(0, '2', 'child_financially_supported')
  })
  it('verify child adopted field', () => {
    let relationShipField = minorChildCardComp.find('#child_adopted')
    relationShipField.simulate('change', selectedYes)
    expect(onFieldChangeSpy).toHaveBeenCalledWith(0, '2', 'child_adopted')
  })
})
