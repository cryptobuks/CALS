import React from 'react'
import {OtherAdultsCardField} from 'components/common/OtherAdultsCardField'
import {shallow} from 'enzyme'
import {relationshipTypes} from './../../helpers/constants'
import Validator from 'helpers/validator'

describe('Verify other adultsFields', function () {
  const applicants = [{
    first_name: 'gdfghfhgv',
    last_name: 'hgbhg',
    middle_name: ''
  }]
  const OtherAdultsCard = {
    relationship_types: {
      items: []
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
    index: 0,
    to_delete: false,
    'firstName': '',
    'middleName': '',
    'lastName': '',
    date_of_birth: '2017-01-01'
  }

  let otherAdultsCardComp, handleRelationshipTypeToApplicantSpy, onFieldChangeSpy
  beforeEach(() => {
    handleRelationshipTypeToApplicantSpy = jasmine.createSpy('handleRelationshipTypeToApplicant')
    onFieldChangeSpy = jasmine.createSpy('onFieldChange')
    let validator = new Validator({})
    otherAdultsCardComp = shallow(<OtherAdultsCardField
      index={0}
      relationship_types={relationshipTypes}
      applicants={applicants}
      handleRelationshipTypeToApplicant={handleRelationshipTypeToApplicantSpy}
      onFieldChange={onFieldChangeSpy}
      otherAdults={OtherAdultsCard}
      validator={validator} />)
  })

  it('verifies relationship type field', () => {
    let relationShipField = otherAdultsCardComp.find('#relationshipType')
    relationShipField.simulate('change', {target: {options: {'2': {value: '2', text: 'Sibling'}, selectedIndex: 2}}})
    expect(handleRelationshipTypeToApplicantSpy).toHaveBeenCalledWith(0, { id: '2', value: 'Sibling' }, 'relationship_to_applicant')
  })

  it('verifies applicantid field', () => {
    let relationShipField = otherAdultsCardComp.find('#availableApplicants')
    relationShipField.simulate('change', {target: {value: '2'}})
    expect(handleRelationshipTypeToApplicantSpy).toHaveBeenCalledWith(0, '2', 'applicant_id')
  })
  it('verifies date of birth', () => {
    let dateOfBirthField = otherAdultsCardComp.find('#date_of_birth')
    dateOfBirthField.simulate('change', {target: {value: '01/01/2000'}})
    expect(onFieldChangeSpy).toHaveBeenCalledWith(0, '2000-01-01', 'date_of_birth')
  })
  it('verifies first name field', () => {
    let firstNameField = otherAdultsCardComp.find('#firstName')
    firstNameField.simulate('change', {target: {value: 'test'}})
    expect(onFieldChangeSpy).toHaveBeenCalledWith(0, 'test', 'first_name')
  })
  it('verifies middle name field', () => {
    let middleNameField = otherAdultsCardComp.find('#middleName')
    middleNameField.simulate('change', {target: {value: 'test'}})
    expect(onFieldChangeSpy).toHaveBeenCalledWith(0, 'test', 'middle_name')
  })
  it('verifies last name field', () => {
    let lastNameField = otherAdultsCardComp.find('#lastName')
    lastNameField.simulate('change', {target: {value: 'test'}})
    expect(onFieldChangeSpy).toHaveBeenCalledWith(0, 'test', 'last_name')
  })
})
