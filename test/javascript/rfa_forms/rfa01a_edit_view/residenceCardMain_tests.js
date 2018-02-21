import React from 'react'
import ResidenceCards from 'rfa_forms/rfa01a_edit_view/residenceCardsMain.jsx'
import {mount} from 'enzyme'
import {stateTypes, languageTypes, residenceTypes} from '../../helpers/constants'

describe('Verify Residence main', function () {
  const blankResidenceFields = Object.freeze({
    residence_ownership: {
      'id': 0,
      'value': 'Own'
    },
    physical_mailing_similar: true,
    weapon_in_home: '',
    body_of_water_exist: '',
    body_of_water_description: '',
    others_using_residence_as_mailing: '',
    directions_to_home: '',
    addresses: [],
    home_languages: [{
      id: '',
      value: ''
    }]
  })

  let setParentStateSpy, componentMount, setFocusStateSpy, props
  setParentStateSpy = jasmine.createSpy('setParentState')
  let setResidenceStateSpy = jasmine.createSpy('setResidenceState')
  let getFocusClassNameSpy = jasmine.createSpy('getFocusClassName')
  setFocusStateSpy = jasmine.createSpy('setFocusState')
  props = {
    residence: blankResidenceFields,
    stateTypes: stateTypes.items,
    languageTypes: languageTypes.items,
    setFocusState: setFocusStateSpy,
    getFocusClassName: getFocusClassNameSpy,
    residenceTypes: residenceTypes.items
  }

  beforeEach(() => {
    componentMount = mount(<ResidenceCards {...props} />)
  })
  describe('verify default props', () => {
    // props.residence = undefined
    componentMount = mount(<ResidenceCards {...props} />)
    it('load the component', () => {
      expect(componentMount.length).toBe(1)
    })
  })
  describe('Verify minor card Component View', () => {
  //  props.residence = blankResidenceFields
    it('verify on click address card', () => {
      let relationShipField = componentMount.find('#residentAddress').hostNodes()
      relationShipField.simulate('click')
      expect(setFocusStateSpy).toHaveBeenCalledWith('residentAddress')
    })

    it('verify on about the residence card', () => {
      let relationShipField = componentMount.find('#aboutResidence').hostNodes()
      relationShipField.simulate('click')
      expect(setFocusStateSpy).toHaveBeenCalledWith('aboutResidence')
    })
  })
})
