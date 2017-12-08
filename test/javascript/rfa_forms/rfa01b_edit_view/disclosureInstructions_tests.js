import React from 'react'
import DisclosureInstructions from 'rfa_forms/rfa01b_edit_view/disclosureInstructions'
import {shallow, mount} from 'enzyme'

describe('Verify disclosure Instructions card', function () {
  let setParentStateSpy, setDisplayStateSpy, componentMount, componentMountShowDisplay,
    setFocusStateSpy, handleOnClickSpy

  beforeEach(() => {
    let setStateSpy = jasmine.createSpy('setState')
    setDisplayStateSpy = jasmine.createSpy('setDisplayState')
    let getFocusClassNameSpy = jasmine.createSpy('getFocusClassName')
    setFocusStateSpy = jasmine.createSpy('setFocusState')
    handleOnClickSpy = jasmine.createSpy('handleOnClick')
    componentMount = shallow(<DisclosureInstructions
      disclosureInstructionsDisplay={false}
      setDisplayState={setDisplayStateSpy}
      focusComponentName={'DisclosureInstructionsCard'}
      getFocusClassName={getFocusClassNameSpy}
      setFocusState={setFocusStateSpy}
      handleOnClick={handleOnClickSpy}
    />)
    componentMountShowDisplay = shallow(<DisclosureInstructions
      disclosureInstructionsDisplay
      setDisplayState={setDisplayStateSpy}
      focusComponentName={'DisclosureInstructionsCard'}
      getFocusClassName={getFocusClassNameSpy}
      setFocusState={setFocusStateSpy}
      handleOnClick={handleOnClickSpy}
    />)
  })
  describe('Verify component will mount', () => {
    it('verify component did mount', () => {
      expect(componentMount.length).toEqual(1)
    })

    it('onClick event shows details', () => {
      let cardComponent = componentMount.find('#disclosureInstructionsToggle')
      cardComponent.simulate('click')
      expect(setDisplayStateSpy).toHaveBeenCalledWith('disclosureInstructionsDisplay', true)
    })

    it('onClick event hides details', () => {
      let cardComponent = componentMountShowDisplay.find('#disclosureInstructionsToggle')
      cardComponent.simulate('click')
      expect(setDisplayStateSpy).toHaveBeenCalledWith('disclosureInstructionsDisplay', false)
    })
  })
})
