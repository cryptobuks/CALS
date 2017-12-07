import React from 'react'
import CrimeBackgroundAgainstCohabitant from 'rfa_forms/rfa01b_edit_view/crimeBackgroundAgainstCohabitant'
import {shallow, mount} from 'enzyme'

describe('Verify crimeBackgroundAgainstCohabitant card', function () {
  let setParentStateSpy, getFocusClassNameSpy, setDisplayStateSpy, componentMount, setFocusStateSpy, componentMountWitoutDisclosures

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

    componentMount = mount(<CrimeBackgroundAgainstCohabitant
      arrestedForCrime={false}
      disclosures={disclosures}
      focusComponentName={'CACriminalBackgroundCard'}
      getFocusClassName={getFocusClassNameSpy}
      setFocusState={setFocusStateSpy}
      setParentState={setParentStateSpy} />)

    componentMountWitoutDisclosures = mount(<CrimeBackgroundAgainstCohabitant
      arrestedForCrime
      focusComponentName={'CACriminalBackgroundCard'}
      getFocusClassName={getFocusClassNameSpy}
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
      let cardComponent = componentMountWitoutDisclosures.find('input[type="radio"]')
      let trueComponent = cardComponent.find('#crimeBackgroundAgainstCohabitantRadiotrue')
      trueComponent.simulate('change', {target: {checked: false}})
      expect(setParentStateSpy).toHaveBeenCalledWith('arrested_for_crime', false)
    })
  })
})
