import React from 'react'
import DesiredChildCard from 'rfa_forms/rfa01c_edit_view/desiredChildcard.jsx'
import {genderTypes, schoolGrades, countyTypes, suffixTypes, stateTypes} from './../../helpers/constants'
import {shallow, mount} from 'enzyme'
import Validator from 'helpers/validator'

describe('Verify RFA 01C child desired', function () {
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

  let setParentStateSpy, childCardComp, onChangeSpy
  let validator = new Validator({})

  beforeEach(() => {
    setParentStateSpy = jasmine.createSpy('setParentState')
    onChangeSpy = jasmine.createSpy('')
    childCardComp = shallow(<DesiredChildCard
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
    let relationField = childCardComp.find('#gender')
    relationField.simulate('change', {target: {options: {'2': {value: '2', text: 'Female'}, selectedIndex: 2}}})
    expect(setParentStateSpy).toHaveBeenCalledWith('gender', Object({ id: '2', value: 'Female' }), 0)
  })

  it('verify county_of_juridiction', () => {
    let relationField = childCardComp.find('#county_of_juridiction')
    relationField.simulate('change', {target: {options: {'1': {value: '1', text: 'Alameda'}, selectedIndex: 1}}})
    expect(setParentStateSpy).toHaveBeenCalledWith('county_of_jurisdiction', Object({ id: '1', value: 'Alameda' }), 0)
  })

  // it('verify relationship_to_applicant', () => {
  //   let relationField = childCardComp.find('#relationship_to_applicant')
  //   relationField.simulate('change', {target: {value: 'Text'}})
  //   expect(setParentStateSpy).toHaveBeenCalledWith[ 'relationship_to_applicant', 'Text', 0 ]
  // })

  it('verify school_grade', () => {
    let relationField = childCardComp.find('#grade')
    relationField.simulate('change', {target: {options: {'1': {value: '1', text: 'TK'}, selectedIndex: 1}}})
    expect(setParentStateSpy).toHaveBeenCalledWith('school_grade', Object({ id: '1', value: 'TK' }), 0)
  })

  it('verify name_of_school', () => {
    let relationField = childCardComp.find('#name_of_school')
    relationField.simulate('change', {target: {value: 'Text'}})
    expect(setParentStateSpy).toHaveBeenCalledWith('school_name', 'Text', 0)
  })
  it('verify date of birth', () => {
    let relationField = childCardComp.find('#date_of_birth')
    relationField.simulate('change', {target: {value: '01/01/2000'}})
    expect(setParentStateSpy).toHaveBeenCalledWith('date_of_birth', '2000-01-01', 0)
  })
  it('verify date of placement on change', () => {
    let relationField = childCardComp.find('#date_of_placement')
    relationField.simulate('change', {target: {value: '01/01/2000'}})
    expect(setParentStateSpy).toHaveBeenCalledWith('date_of_placement', '2000-01-01', 0)
  })
})
