import React from 'react'
import Rfa01EditView from 'rfa_forms/rfa01a_edit_view'
import {shallow, mount} from 'enzyme'

describe('Rfa01EditView test', () => {
  const countyType51 = {id: 51, value: 'County'}
  const countyType52 = {id: 52, value: 'OtherCounty'}
  const countyTypesArray = [countyType51, countyType52]
  let setFocusStateSpy = jasmine.createSpy('setFocusState')

  describe('Set default value for application_county test', () => {
    const props = {
      user: {county_code: 51},
      application: {},
      countyTypes: countyTypesArray
    }
    let _Rfa01EditView = shallow(<Rfa01EditView {...props} />)
    it('tests something', () => {
    })
  })

  describe('Value for application_county already there test', () => {
    const props = {
      user: {county_code: '51'},
      application: {application_county: countyType52},
      countyTypes: countyTypesArray
    }

    let _Rfa01EditView = shallow(<Rfa01EditView {...props} />)
    it('application_county', () => {
      expect(_Rfa01EditView.state().application.toJS().application_county).toBe(countyType52)
    })
  })
})
