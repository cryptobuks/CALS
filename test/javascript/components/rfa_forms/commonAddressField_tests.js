import React from 'react'
import {shallow, mount} from 'enzyme'
import CommonAddressFields from 'components/rfa_forms/commonAddressField.jsx'
import {stateTypes} from '../../helpers/constants'

describe('Verify Common Address Fields Component', () => {
  let commonAddressComp, addressFields, onChangeSpy, onSuggestionsFetchRequestedSpy
  beforeEach(() => {
    onChangeSpy = jasmine.createSpy('onChange')
    onSuggestionsFetchRequestedSpy = jasmine.createSpy('onSuggestionsFetchRequested')
    let addressFields = {
      street_address: '',
      zip: '',
      city: '',
      state: null
    }
    commonAddressComp = mount(<CommonAddressFields
      index={0}
      suggestions={[]}
      stateTypes={stateTypes.items}
      addressTitle={''}
      addressFields={addressFields}
      onChange={onChangeSpy}
      onSuggestionsFetchRequested={onSuggestionsFetchRequestedSpy}/>)
  })
  it('Load Address Fields', () => {
    expect(commonAddressComp.length).toEqual(1)
  })
  it('verify mailing address zip change', () => {
    let zipCodeField = commonAddressComp.find('#zip').hostNodes()
    zipCodeField.simulate('change', {target: {value: '95833'}})
    expect(onChangeSpy).toHaveBeenCalledWith('zip', '95833')
  })
  it('verify mailing Address city change', () => {
    let cityField = commonAddressComp.find('#city').hostNodes()
    cityField.simulate('change', {target: {value: 'Sacramento'}})
    expect(onChangeSpy).toHaveBeenCalledWith('city', 'Sacramento')
  })
  it('verify mailing Address State change', () => {
    let stateDropDownField = commonAddressComp.find('#state_type').hostNodes()
    stateDropDownField.simulate('change', {target: {options: {'1': {value: '1', text: 'Alabama'}, selectedIndex: 1}}})
    expect(onChangeSpy).toHaveBeenCalledWith('state', { id: '1', value: 'Alabama' })
  })
})
