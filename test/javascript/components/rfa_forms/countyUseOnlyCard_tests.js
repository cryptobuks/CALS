import React from 'react'
import {shallow, mount} from 'enzyme'
import {CountyUseOnlyCard} from 'components/rfa_forms/countyUseOnlyCard'
import {countyTypes} from '../../helpers/constants'

describe('Verify CountyUseOnlyCard Component', () => {
  let CountyUseOnlyCardComp, CountyUseOnlyCardFields

  let onFieldChangeSpy = jasmine.createSpy('onFieldChange')
  let setFocusStateSpy = jasmine.createSpy('setFocusState')
  let getFocusClassNameSpy = jasmine.createSpy('getFocusClassName')
  beforeEach(() => {
    CountyUseOnlyCardFields = {
      county: {
        id: '',
        value: ''
      }
    }

    CountyUseOnlyCardComp = mount(<CountyUseOnlyCard
      countyUseOnlyCardId='county_use_only'
      focusComponentName='Rfa01BOverview'
      setFocusState={setFocusStateSpy}
      getFocusClassName={getFocusClassNameSpy}
      county={CountyUseOnlyCardFields.county}
      CountyList={countyTypes.items}
      onFieldChange={onFieldChangeSpy} />)
  })

  it('Load CountyUseOnlyCard ', () => {
    expect(CountyUseOnlyCardComp.length).toEqual(1)
  })
  it('verifies county field', () => {
    let countyField = CountyUseOnlyCardComp.find('#county').hostNodes()
    countyField.simulate('change', {target: {selectedOptions: [{value: '2', text: 'Alpine'}]}})
    expect(onFieldChangeSpy).toHaveBeenCalled()
  })

  it('verify CountyUseOnly card to check focus', () => {
    let countyField = CountyUseOnlyCardComp.find('#county').hostNodes()
    countyField.simulate('change', {target: {selectedOptions: [{value: '2', text: 'Alpine'}]}})
    expect(getFocusClassNameSpy).toHaveBeenCalledWith('CountyUseOnlySection')
    let cardSection = CountyUseOnlyCardComp.find('#CountyUseOnlySection')
    cardSection.simulate('click')
    expect(setFocusStateSpy).toHaveBeenCalled()
  })
})
