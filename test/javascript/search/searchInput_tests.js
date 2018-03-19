import React from 'react'
import SearchInput from '../../../app/javascript/search/search_input'
import {shallow, mount} from 'enzyme'

describe('Verify search input component', function () {
  const props = {
    facilityTypes: [
      {
        id: '',
        value: ''
      }
    ],
    countyList: [
      {
        id: '',
        value: ''
      }
    ],
    countyValue: 'Los Angeles',
    facilityTypeValue: 'Adoption Agency',
    facilityIdValue: '300665437',
    facilityNameValue: 'Lederhouse Transitions',
    facilityAddressValue: '36 Sequoia Dr, Aliso Viejo, CA 92656',
    fromValue: 0
  }

  const spyHandleOnSubmit = jasmine.createSpy('handleOnSubmit')
  const spyHandleInputChange = jasmine.createSpy('handleInputChange')

  const searchInputComp = mount(<SearchInput {...props}
    handleOnSubmit={spyHandleOnSubmit}
    handleInputChange={spyHandleInputChange} />)

  it('verify component load', () => {
    expect(searchInputComp.length).toBe(1)
  })

  it('verify county select after component render', () => {
    let countyField = searchInputComp.find('#county_select')
    countyField.simulate('change', {target: {options: {'19': {id: '19', value: 'Los Angeles'}, selectedIndex: 19}}})
    expect(spyHandleInputChange).toHaveBeenCalledWith('countyValue', 'Los Angeles')
  })

  it('verify facilityTypes select after component render', () => {
    let facilityType = searchInputComp.find('#facility_select').hostNodes()
    facilityType.simulate('change', {target: {options: {'2': {id: '400', value: 'Adoption Agency'}, selectedIndex: 2}}})
    expect(spyHandleInputChange).toHaveBeenCalledWith('facilityTypeValue', 'Adoption Agency')
  })

  it('verify facility Id value after component render', () => {
    let facilityId = searchInputComp.find('#facilityIdValue').hostNodes()
    facilityId.simulate('change', {target: {value: '300665437'}})
    expect(spyHandleInputChange).toHaveBeenCalledWith('facilityIdValue', '300665437')
  })

  it('verify facility name value after component render', () => {
    let facilityName = searchInputComp.find('#facilityNameValue').hostNodes()
    facilityName.simulate('change', {target: {value: 'Lederhouse Transitions'}})
    expect(spyHandleInputChange).toHaveBeenCalledWith('facilityNameValue', 'Lederhouse Transitions')
  })

  it('verify facility address value after component render', () => {
    let facilityAddressValue = searchInputComp.find('#facilityAddressValue').hostNodes()
    facilityAddressValue.simulate('change', {target: {value: '36 Sequoia Dr, Aliso Viejo, CA 92656'}})
    expect(spyHandleInputChange).toHaveBeenCalledWith('facilityAddressValue', '36 Sequoia Dr, Aliso Viejo, CA 92656')
  })

  it('verify clicking search button calls handleOnSubmit method', () => {
    let searchFacility = searchInputComp.find('#search')
    searchFacility.simulate('submit')
    expect(spyHandleOnSubmit).toHaveBeenCalled()
  })
})
