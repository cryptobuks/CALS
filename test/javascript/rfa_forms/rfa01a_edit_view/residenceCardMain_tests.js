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

  const addresses = [
    {
      'street_address': '',
      'zip': '',
      'city': '',
      'state': {
        'value': 'Alabama',
        'id': 'AL'
      },
      'type': {
        'value': 'Residential',
        'id': 1
      }
    },
    {
      'street_address': 'testing',
      'zip': '',
      'city': '',
      'state': {
        'value': 'Arkansas',
        'id': 'AR'
      },
      'type': {
        'value': 'Mailing',
        'id': 3
      }
    }
  ]

  let residenceFieldswithAddress = Object.freeze({
    residence_ownership: {
      'id': 0,
      'value': 'Own'
    },
    physical_mailing_similar: false,
    weapon_in_home: '',
    body_of_water_exist: '',
    body_of_water_description: '',
    others_using_residence_as_mailing: '',
    directions_to_home: '',
    addresses: addresses,
    home_languages: [{
      id: '',
      value: ''
    }]
  })

  let setParentStateSpy, componentMount, setFocusStateSpy, props, componentMountWithAddress
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
    residenceTypes: residenceTypes.items,
    setParentState: setParentStateSpy
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
  describe('Verify residence card Component View', () => {
  //  props.residence = blankResidenceFields
    beforeEach(() => {
      componentMountWithAddress = mount(<ResidenceCards
        residence={residenceFieldswithAddress}
        stateTypes={stateTypes.items}
        languageTypes={languageTypes.items}
        setFocusState={setFocusStateSpy}
        getFocusClassName={getFocusClassNameSpy}
        residenceTypes={residenceTypes.items}
        setParentState={setParentStateSpy} />)
    })
    it('verify residence card Component change when address exists', () => {
      let relationShipField = componentMountWithAddress.find('#Mailingstreet_address').hostNodes()
      let autoFillField = relationShipField.find('input[type="text"]')
      relationShipField.simulate('change', {target: {value: 'gate way oaks'}})
      expect(setParentStateSpy).toHaveBeenCalledWith('residence', Object({ addresses: [ Object({ street_address: '', zip: '', city: '', state: Object({ value: 'Alabama', id: 'AL' }), type: Object({ value: 'Residential', id: 1 }) }), Object({ street_address: 'gate way oaks', zip: '', city: '', state: Object({ value: 'Arkansas', id: 'AR' }), type: Object({ value: 'Mailing', id: 3 }) }) ], body_of_water_exist: '', body_of_water_description: '', others_using_residence_as_mailing: '', physical_mailing_similar: false, weapon_in_home: '', residence_ownership: Object({ id: 0, value: 'Own' }), directions_to_home: '', home_languages: [ Object({ id: '', value: '' }) ] }))
    })
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
  describe('Verify residence card Component changes', () => {
    it('tests handle clear on conditional change for addresses', () => {
      let relationShipField = componentMount.find('#Residentialstreet_address').hostNodes()
      let autoFillField = relationShipField.find('input[type="text"]')
      relationShipField.simulate('change', {target: {value: 'gate way oaks'}})
      expect(setParentStateSpy).toHaveBeenCalledWith('residence', Object({ addresses: [ Object({ street_address: 'gate way oaks', zip: '', city: '', state: null, type: Object({ id: '1', value: 'Residential' }) }), Object({ street_address: '', zip: '', city: '', state: null, type: Object({ id: '3', value: 'Mailing' }) }) ], body_of_water_exist: '', body_of_water_description: '', others_using_residence_as_mailing: '', physical_mailing_similar: true, weapon_in_home: '', residence_ownership: Object({ id: 0, value: 'Own' }), directions_to_home: '', home_languages: [ Object({ id: '', value: '' }) ] }))
    })

    it('tests handleClearOnConditionalChange', () => {
      let relationShipField = componentMount.find('#others_using_residence_as_mailingtrue').hostNodes()
      relationShipField.simulate('change', {target: {value: 'true'}})
      expect(setParentStateSpy).toHaveBeenCalledWith('residence', Object({ addresses: [ ], body_of_water_exist: '', body_of_water_description: '', others_using_residence_as_mailing: 'true', physical_mailing_similar: true, other_people_using_residence_as_mailing: [ Object({ first_name: '', middle_name: '', last_name: '' }) ], weapon_in_home: '', residence_ownership: Object({ id: 0, value: 'Own' }), directions_to_home: '', home_languages: [ Object({ id: '', value: '' }) ] }))
    })

    it('tests setResidenceState', () => {
      let weaponsField = componentMount.find('#weaponstrue').hostNodes()
      weaponsField.simulate('change', {target: {value: 'false'}})
      expect(setParentStateSpy).toHaveBeenCalledWith('residence', Object({ addresses: [ ], body_of_water_exist: '', body_of_water_description: '', others_using_residence_as_mailing: '', physical_mailing_similar: true, weapon_in_home: 'false', residence_ownership: Object({ id: 0, value: 'Own' }), directions_to_home: '', home_languages: [ Object({ id: '', value: '' }) ] }))
    })
  })
})
