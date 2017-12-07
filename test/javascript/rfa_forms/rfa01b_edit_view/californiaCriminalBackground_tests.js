import React from 'react'
import CaliforniaCriminalBackground from 'rfa_forms/rfa01b_edit_view/californiaCriminalBackground'
import {shallow, mount} from 'enzyme'

describe('Verify californiaCriminalBackground card', function () {
  let setStateSpy, setParentStateSpy, setDisplayStateSpy,
    componentMount, setFocusStateSpy, onHideClickSpy, componentMountWitoutDisclosures,
    getFocusClassNameSpy, addCardSpy, clickCloseSpy, onFieldChangeSpy

  let disclosures = [{
    'offense': 'test',
    'offense_city': 'test',
    'offense_state': {},
    'when_offense_happen': 'test',
    'offense_details': 'test'
  }]

  let disclosureDefaults = [{
    'offense': '',
    'offense_city': '',
    'offense_state': {},
    'when_offense_happen': '',
    'offense_details': ''
  }]
  beforeEach(() => {
    setStateSpy = jasmine.createSpy('setState')
    setDisplayStateSpy = jasmine.createSpy('setDisplayState')
    getFocusClassNameSpy = jasmine.createSpy('getFocusClassName')
    setFocusStateSpy = jasmine.createSpy('setFocusState')
    addCardSpy = jasmine.createSpy('addCard')
    clickCloseSpy = jasmine.createSpy('clickClose')
    onFieldChangeSpy = jasmine.createSpy('onFieldChange')
    setParentStateSpy = jasmine.createSpy('setParentState')

    componentMount = mount(<CaliforniaCriminalBackground
      convictedInCalifornia={false}
      disclosures={disclosures}
      focusComponentName={'CACriminalBackgroundCard'}
      getFocusClassName={getFocusClassNameSpy}
      setFocusState={setFocusStateSpy}
      setParentState={setParentStateSpy} />)

    componentMountWitoutDisclosures = mount(<CaliforniaCriminalBackground
      convictedInCalifornia
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
      let trueComponent = cardComponent.find('#californiaCriminalBackgroundRadiotrue')
      trueComponent.simulate('change', {target: {checked: true}})
      expect(setParentStateSpy).toHaveBeenCalledWith('convicted_in_california', true)
    })

    it('onClick event shows lived in other state multi select', () => {
      let cardComponent = componentMountWitoutDisclosures.find('input[type="radio"]')
      let trueComponent = cardComponent.find('#californiaCriminalBackgroundRadiotrue')
      trueComponent.simulate('change', {target: {checked: false}})
      expect(setParentStateSpy).toHaveBeenCalledWith('convicted_in_california', false)
    })
  })
})
