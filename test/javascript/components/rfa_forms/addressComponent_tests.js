import React from 'react'
import AddressComponent from 'components/rfa_forms/addressComponent.js'
import {stateTypes, genderTypes} from './../../helpers/constants'
import {shallow, mount} from 'enzyme'
import fetchMock from 'fetch-mock'

describe('verify Reusable Address Component', () => {
  let addressComponent, props,
    addressFields, onChangeSpy, url, data

  beforeEach(() => {
    jasmine.clock().install()
    onChangeSpy = jasmine.createSpy('onChange')
    spyOn(window, 'fetch').and.callThrough()

    addressFields = {
      street_address: 'gate way oaks',
      zip: '',
      city: '',
      state: null,
      type: {
        id: '1',
        value: 'Residential'
      }
    }
    props = {
      addressType: 'Residential',
      id: 'street_address',
      addressTitle: 'Street Address',
      addressFields: addressFields,
      stateTypes: stateTypes.items,
      onChange: onChangeSpy,
      suggestions: [],
      onSelection: onChangeSpy
    }
    addressComponent = shallow(<AddressComponent {...props}/>)
    url = '/geoservice/'
    fetchMock.mock(url, {
      body: [],
      status: 200,
      method: 'POST',
      headers: { 'content-type': 'application/json' }
    })
  })
  afterEach(() => {
    jasmine.clock().uninstall()
    fetchMock.restore()
  })
  it('Api success call', () => {
    addressComponent.instance().onSuggestionsFetchRequested('home', '')
    jasmine.clock().tick(1000)
    expect(fetchMock.called(url)).toBe(true)
    expect(fetchMock._calls[url][0][1].method).toEqual('POST')
  })
  it('fetchRequested Api success call', () => {
    url = '/geoservice/validate'
    fetchMock.mock(url, {
      body: JSON.stringify({ data: 'home' }),
      status: 200,
      method: 'POST',
      headers: { 'content-type': 'application/json' }
    })
    addressComponent.instance().onSuggestionSelected('click', {})
    expect(fetchMock.called(url)).toBe(true)
    expect(fetchMock._calls[url][0][1].method).toEqual('POST')
  })
})
