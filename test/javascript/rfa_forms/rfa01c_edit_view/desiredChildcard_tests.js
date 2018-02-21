import React from 'react'
import DesiredChildCard from 'rfa_forms/rfa01c_edit_view/desiredChildCard'
import {genderTypes, schoolGrades, countyTypes, suffixTypes, stateTypes} from './../../helpers/constants'
import {shallow, mount} from 'enzyme'
import Validator from 'helpers/validator'

describe('Verify RFA 01C child desired', function () {
  const applicants = [{
    id: 20,
    first_name: 'gdfghfhgv',
    last_name: 'hgbhg',
    middle_name: ''
  }]
  const childDesired = {
    id: 0,
    application_county: {
      value: '',
      id: 0
    },
    child_identified: true,
    child_in_home: true,
    identified_children: [
      {
        first_name: '',
        middle_name: '',
        last_name: '',
        name_suffix: {
          value: '',
          id: 0
        },
        date_of_birth: '',
        gender: {
          value: '',
          id: 0
        },
        county_of_jurisdiction: {
          value: '',
          id: 0
        },
        date_of_placement: '',
        relationship_to_applicants: [
          {
            applicant_id: '',
            relationship_to_applicant_freeform: '',
            relationship_to_applicant: {
              value: '',
              id: 0
            }
          }
        ],
        school_grade: {
          value: '',
          id: 0
        },
        school_name: '',
        school_address: {
          street_address: '',
          zip: '',
          city: '',
          state: {
            value: '',
            id: 0
          },
          type: {
            value: '',
            id: 0
          }
        }
      }
    ]
  }

  let setParentStateSpy, childCardComponent, onChangeSpy, childCardComp
  let validator = new Validator({})

  beforeEach(() => {
    setParentStateSpy = jasmine.createSpy('setParentState')
    onChangeSpy = jasmine.createSpy('')
    childCardComp = mount(<DesiredChildCard
      applicants={applicants}
      desiredChild={childDesired.identified_children[0]}
      setParentState={setParentStateSpy}
      genderTypes={genderTypes.items}
      schoolGrades={schoolGrades.items}
      countyTypes={countyTypes.items}
      suffixTypes={suffixTypes.items}
      stateTypes={stateTypes.items}
      validator={validator}
    />)
  })

  it('verify Gender', () => {
    let relationField = childCardComp.find('#gender').hostNodes()
    relationField.simulate('change', {target: {options: {'2': {value: '2', text: 'Female'}, selectedIndex: 2}}})
    expect(setParentStateSpy).toHaveBeenCalledWith(0, 'gender', Object({ id: '2', value: 'Female' }))
  })

  it('verify county_of_juridiction', () => {
    let relationField = childCardComp.find('#county_of_juridiction').hostNodes()
    relationField.simulate('change', {target: {options: {'1': {value: '1', text: 'Alameda'}, selectedIndex: 1}}})
    expect(setParentStateSpy).toHaveBeenCalledWith(0, 'county_of_jurisdiction', Object({ id: '1', value: 'Alameda' }))
  })

  it('verify school_grade', () => {
    let relationField = childCardComp.find('#grade').hostNodes()
    relationField.simulate('change', {target: {options: {'1': {value: '1', text: 'TK'}, selectedIndex: 1}}})
    expect(setParentStateSpy).toHaveBeenCalledWith(0, 'school_grade', Object({ id: '1', value: 'TK' }))
  })

  it('verify name_of_school', () => {
    let relationField = childCardComp.find('#name_of_school').hostNodes()
    relationField.simulate('change', {target: {value: 'Text'}})
    expect(setParentStateSpy).toHaveBeenCalledWith(0, 'school_name', 'Text')
  })

  it('verify date of birth', () => {
    let relationField = childCardComp.find('#desiredChildCarddate_of_birth').hostNodes()
    relationField.simulate('change', {target: {value: '01/01/2000'}})
    expect(setParentStateSpy).toHaveBeenCalledWith(0, 'date_of_birth', '2000-01-01')
  })

  it('verify date of placement on change', () => {
    let relationField = childCardComp.find('#desiredChildCarddate_of_placement').hostNodes()
    relationField.simulate('change', {target: {value: '01/01/2000'}})
    expect(setParentStateSpy).toHaveBeenCalledWith(0, 'date_of_placement', '2000-01-01')
  })

  it('verify relationship to applicant on change', () => {
    let relationField = childCardComp.find('#relationship_to_applicant0child0').hostNodes()
    relationField.simulate('change', {target: {value: 'test'}})
    expect(setParentStateSpy).toHaveBeenCalledWith(0, 'relationship_to_applicants',
      [{applicant_id: 20, relationship_to_applicant_freeform: 'test', relationship_to_applicant: {value: '', id: 0}}])
  })

  describe('Address component mount', () => {
    beforeEach(() => {
      childCardComponent = mount(<DesiredChildCard
        index={1}
        desiredChild={childDesired.identified_children[0]}
        setParentState={setParentStateSpy}
        genderTypes={genderTypes.items}
        schoolGrades={schoolGrades.items}
        countyTypes={countyTypes.items}
        suffixTypes={suffixTypes.items}
        stateTypes={stateTypes.items}
        validator={validator}
      />)
    })
    it('verify street address change', () => {
      let streetAddressField = childCardComponent.find('#Residentialstreet_address').hostNodes()
      streetAddressField.simulate('change', {target: {value: '2870 Gateway Oaks Dr'}})
      let addressObj = childDesired.identified_children[0].school_address
      addressObj['street_address'] = '2870 Gateway Oaks Dr'
      expect(setParentStateSpy).toHaveBeenCalledWith(1, 'school_address', addressObj)
    })
  })
})
