import React from 'react'
import OutsideCACriminalBackground from 'rfa_forms/rfa01b_edit_view/outsideCACriminalBackground'
import {shallow, mount} from 'enzyme'

describe('Verify OutsideCACriminalBackground card', function () {
  let setParentStateSpy, setDisplayStateSpy, componentMount, setFocusStateSpy

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
    let getFocusClassNameSpy = jasmine.createSpy('getFocusClassName')
    setFocusStateSpy = jasmine.createSpy('setFocusState')

    componentMount = mount(<OutsideCACriminalBackground
      convictedInAnotherState={false}
      disclosures={disclosures}
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
      let cardComponent = componentMount.find('input[type="radio"]')
      let trueComponent = cardComponent.find('#outsideCACriminalBackgroundtrue')
      trueComponent.simulate('change', {target: {checked: true}})
      expect(setParentStateSpy).toHaveBeenCalledWith('convicted_in_another_state', true)
    })
  })
})
