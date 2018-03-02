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
    searchId: {
      userDetails: {
        county_name: ''
      }
    },
    countyList: [
      {
        id: '',
        value: ''
      }
    ],
    countyValue: 'Los Angeles'

  }

  const spySearchApiCall = jasmine.createSpy('searchApiCall')
  const spyHandleInputChange = jasmine.createSpy('handleInputChange')

  const searchInputComp = mount(<SearchInput {...props} 
    searchApiCall={spySearchApiCall}
    handleInputChange={spyHandleInputChange} />)

  it('verify component load', () => {
    expect(searchInputComp.length).toBe(1)
  })

  it('verify county select after component render', () => {
    let countyField = searchInputComp.find('#county_select')
    countyField.simulate('change', {target: {options: {'19': {id: '19', value: 'Los Angeles'}, selectedIndex: 19}}})
    expect(searchInputComp.update().find('#county_select').hostNodes().props().value).toBe('Los Angeles')
  })

  it('verify facilityTypes select after component render', () => {
    let facilityType = searchInputComp.find('#facility_select').hostNodes()
    facilityType.simulate('change', {target: {options: {'2': {id: '400', value: 'Adoption Agency'}, selectedIndex: 2}}})
    expect(searchInputComp.update().find('#facility_select').hostNodes().props().value).toBe('Adoption Agency')
  })

  it('verify facility Id value after component render', () => {
    let facilityId = searchInputComp.find('#facilityIdValue').hostNodes()
    facilityId.simulate('change', {target: {value: 300665437}})
    expect(searchInputComp.update().find('#facilityIdValue').hostNodes().props().value).toBe(300665437)
  })

  it('verify facility name value after component render', () => {
    let facilityName = searchInputComp.find('#facilityNameValue').hostNodes()
    facilityName.simulate('change', {target: {value: 'Lederhouse Transitions'}})
    expect(searchInputComp.update().find('#facilityNameValue').hostNodes().props().value).toBe('Lederhouse Transitions')
  })

  it('verify facility address value after component render', () => {
    let facilityAddressValue = searchInputComp.find('#facilityAddressValue').hostNodes()
    facilityAddressValue.simulate('change', {target: {value: '36 Sequoia Dr, Aliso Viejo, CA 92656'}})
    expect(searchInputComp.update().find('#facilityAddressValue').hostNodes().props().value).toBe('36 Sequoia Dr, Aliso Viejo, CA 92656')
  })

  it('verify clicking search button calls searchApiCall method', () => {
    let searchFacility = searchInputComp.find('.btn-primary')
    searchFacility.simulate('submit')
    expect(spySearchApiCall).toHaveBeenCalledWith('Los Angeles,Adoption Agency,300665437,Lederhouse Transitions,36 Sequoia Dr, Aliso Viejo, CA 92656', 0, 5)
  })
})
