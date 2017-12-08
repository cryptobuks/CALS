import React from 'react'
import PrivacyStatement from 'rfa_forms/rfa01b_edit_view/privacyStatement'
import {shallow, mount} from 'enzyme'

describe('Verify privacyStatement card', function () {
  const blankValues = Object.freeze({
    privacyStatementDisplay: false,
    focusComponentName: null
  })

  let setParentStateSpy, setDisplayStateSpy, componentMount, componentMountShowPrivacy,
    setFocusStateSpy, onHideClickSpy

  beforeEach(() => {
    let setStateSpy = jasmine.createSpy('setState')
    setDisplayStateSpy = jasmine.createSpy('setDisplayState')
    let getFocusClassNameSpy = jasmine.createSpy('getFocusClassName')
    setFocusStateSpy = jasmine.createSpy('setFocusState')
    onHideClickSpy = jasmine.createSpy('onHideClick')
    componentMount = shallow(<PrivacyStatement
      privacyStatementDisplay={false}
      setDisplayState={setDisplayStateSpy}
      focusComponentName={'CACriminalBackgroundCard'}
      getFocusClassName={getFocusClassNameSpy}
      setFocusState={setFocusStateSpy}
    />)
    componentMountShowPrivacy = shallow(<PrivacyStatement
      privacyStatementDisplay
      setDisplayState={setDisplayStateSpy}
      focusComponentName={'CACriminalBackgroundCard'}
      getFocusClassName={getFocusClassNameSpy}
      setFocusState={setFocusStateSpy}
    />)
  })
  describe('Verify component will mount', () => {
    it('verify component did mount', () => {
      expect(componentMount.length).toEqual(1)
    })
    it('onClick event shows details toggles display to true', () => {
      let cardComponent = componentMount.find('#privacyStatementToggle')
      cardComponent.simulate('click')
      expect(setDisplayStateSpy).toHaveBeenCalledWith('privacyStatementDisplay', true)
    })
    it('onClick event shows details toggles display to false ', () => {
      let cardComponent = componentMountShowPrivacy.find('#privacyStatementToggle')
      cardComponent.simulate('click')
      expect(setDisplayStateSpy).toHaveBeenCalledWith('privacyStatementDisplay', false)
    })
  })
})
