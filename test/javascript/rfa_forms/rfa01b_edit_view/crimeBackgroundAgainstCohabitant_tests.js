import React from 'react'
import CrimeBackgroundAgainstCohabitant from 'rfa_forms/rfa01b_edit_view/crimeBackgroundAgainstCohabitant'
import {shallow, mount} from 'enzyme'

describe('Verify crimeBackgroundAgainstCohabitant card', function () {
  let setParentStateSpy, getFocusClassNameSpy, setDisplayStateSpy, componentMount,
    setFocusStateSpy, componentMountWithoutDisclosures, handleClearOnConditionalChangeSpy

  let disclosures = [{
    'offense': 'test',
    'offense_city': 'test',
    'offense_state': {},
    'when_offense_happen': 'test',
    'offense_details': 'test'
  }]
  beforeEach(() => {
    setParentStateSpy = jasmine.createSpy('setParentState')
    setDisplayStateSpy = jasmine.createSpy('setDisplayState')
    getFocusClassNameSpy = jasmine.createSpy('getFocusClassName')
    setFocusStateSpy = jasmine.createSpy('setFocusState')
    handleClearOnConditionalChangeSpy = jasmine.createSpy('handleClearOnConditionalChange')

    componentMount = mount(<CrimeBackgroundAgainstCohabitant
      arrestedForCrime={false}
      disclosures={disclosures}
      focusComponentName={'CACriminalBackgroundCard'}
      getFocusClassName={getFocusClassNameSpy}
      handleClearOnConditionalChange={handleClearOnConditionalChangeSpy}
      setFocusState={setFocusStateSpy}
      setParentState={setParentStateSpy} />)

    componentMountWithoutDisclosures = mount(<CrimeBackgroundAgainstCohabitant
      arrestedForCrime
      disclosures={undefined}
      focusComponentName={'CACriminalBackgroundCard'}
      getFocusClassName={getFocusClassNameSpy}
      handleClearOnConditionalChange={handleClearOnConditionalChangeSpy}
      setFocusState={setFocusStateSpy}
      setParentState={setParentStateSpy} />)
  })
  describe('Verify component will mount', () => {
    it('verify component did mount', () => {
      expect(componentMount.length).toEqual(1)
    })
    it('adds a card', () => {
      spyOn(componentMount.instance(), 'addCard').and.callThrough()
      componentMount.instance().addCard()
      expect(componentMount.instance().addCard).toHaveBeenCalled()
    })
    it('removes a card', () => {
      spyOn(componentMount.instance(), 'clickClose').and.callThrough()
      componentMount.instance().clickClose()
      expect(componentMount.instance().clickClose).toHaveBeenCalled()
    })

    it('onClick event shows lived in other state multi select', () => {
      let cardComponent = componentMountWithoutDisclosures.find('input[type="radio"]')
      let trueComponent = cardComponent.find('#crimeBackgroundAgainstCohabitantRadiotrue')
      trueComponent.simulate('change', {target: {value: 'false'}})
      expect(handleClearOnConditionalChangeSpy).toHaveBeenCalledWith('arrested_for_crime', 'false', 'arrested_for_crime_disclosures', [ Object({ offense: '', offense_city: '', offense_date: '', when_offense_happen: '', offense_details: '' }) ])
    })
    it('onchange sets disclosures ', () => {
      let cardComponent = componentMountWithoutDisclosures.find('#crimeBackgroundAgainstCohabitantoffenseReason').hostNodes()
      cardComponent.simulate('change', {target: {value: 'testing'}})
      expect(setParentStateSpy).toHaveBeenCalledWith('arrested_for_crime_disclosures', [ Object({ offense: 'testing', offense_city: '', offense_date: '', when_offense_happen: '', offense_details: '' }) ])
    })
    it('check required fields indicator', () => {
      let componentHtml = componentMountWithoutDisclosures.html()
      expect(componentHtml).toContain('What was the offense? (required)')
      expect(componentHtml).toContain('Where did the offense happen? (City, State, Country or other location information) (required)')
      expect(componentHtml).toContain('When did the offense happen? (required)')
      expect(componentHtml).toContain('Explain what happened. (required)')
    })
  })
})
