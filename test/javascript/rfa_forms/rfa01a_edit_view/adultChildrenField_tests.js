import React from 'react'
import AdultChildrenFields from 'rfa_forms/rfa01a_edit_view/adultChildrenFields.js'
import {stateTypes, prefixTypes, suffixTypes, nameTypes, relationshipToApplicantTypes} from './../../helpers/constants'
import {mount} from 'enzyme'
import Validator from 'helpers/validator.js'

describe('Adult Children Component', () => {
  let adultChildComponent, setParentStateSpy, onChangeSpy
  let relationshipToAdultsDefaults = Object.freeze({
    applicant_id: '34',
    relationship_to_applicant: null
  })
  const addressDefaults = Object.freeze({
    street_address: '',
    zip: '',
    city: '',
    state: null,
    type: null
  })
  const adultChild = {
    name_prefix: null,
    first_name: '',
    middle_name: '',
    last_name: '',
    name_suffix: null,
    relationship_to_applicants: [
      relationshipToAdultsDefaults
    ],
    lives_in_home: 'true',
    address: addressDefaults
  }
  const applicants = Object.freeze([
    {
      first_name: 'John',
      id: 34,
      last_name: 'Smith',
      middle_name: ''
    },
    {
      first_name: 'David',
      id: 35,
      last_name: 'Smith',
      middle_name: ''
    }
  ])
  beforeEach(() => {
    setParentStateSpy = jasmine.createSpy('setParentState')
    onChangeSpy = jasmine.createSpy('onChange')
    let validator = new Validator({})
    adultChildComponent = mount(<AdultChildrenFields
      index={0}
      idPrefix={''}
      changeAdultChild={onChangeSpy}
      changeAdultHistoryAddress={onChangeSpy}
      handleRelationshipTypeToApplicant={onChangeSpy}
      changeAdultHistoryAddress={onChangeSpy}
      applicants={applicants}
      adultChild={adultChild}
      suffixTypes={suffixTypes.items}
      prefixTypes={prefixTypes.items}
      stateTypes={stateTypes.items}
      nameTypes={nameTypes.items}
      relationshipToApplicantTypes={relationshipToApplicantTypes.items}
      setParentState={setParentStateSpy}
      validator={validator}
    />)
  })
  it('relation ship type DropDown Change', () => {
    let selectRelationType = adultChildComponent.find('select').at(0)
    selectRelationType.simulate('change', {target: {options: {'1': {value: '1', text: 'Child'}, selectedIndex: 1}}})
    expect(onChangeSpy).toHaveBeenCalledWith(0, {id: '1', value: 'Child'}, 'relationship_to_applicant')
  })
  it('Available applicants type DropDown Change', () => {
    let selectApplicant = adultChildComponent.find('select').at(1)
    selectApplicant.simulate('change', {target: {value: '35', text: 'David Smith'}})
    expect(onChangeSpy).toHaveBeenCalledWith(0, '35', 'applicant_id')
  })
  it('Child Name Prefix type DropDown Change', () => {
    let selectNamePrefix = adultChildComponent.find('select').at(2)
    selectNamePrefix.simulate('change', {target: {options: {'1': {value: '1', text: 'Mr.'}, selectedIndex: 1}}})
    expect(onChangeSpy).toHaveBeenCalledWith('name_prefix', {id: '1', value: 'Mr.'}, 0)
  })
  describe('verify lives in Home logic', () => {
    let selectLivesInHome
    beforeEach(() => {
      selectLivesInHome = adultChildComponent.find('select').at(4)
    })
    it('Lives in Home set to true', () => {
      expect(selectLivesInHome.props().value).toBe('true')
      expect(adultChildComponent.find('select').length).toEqual(5)
    })
    it('set lives in Home to No', () => {
      selectLivesInHome.simulate('change', {target: {value: false}})
      expect(onChangeSpy).toHaveBeenCalledWith('lives_in_home', false, 0)
    })
  })
})
