import React from 'react'
import AddressCard from 'rfa_forms/rfa01a_edit_view/addressCard.js'
import {stateTypes, genderTypes} from './../../helpers/constants'
import {shallow, mount} from 'enzyme'
import ShallowRenderer from 'react-test-renderer/shallow'

describe('Verify Physical Address', function () {
  const props = {
    stateTypes: stateTypes.items
  }
  const addressCard = new ShallowRenderer()
  const cardRendered = addressCard.render(<AddressCard {...props} />)

  it('verify Resident Address fields', function () {
    let addressClassName = cardRendered
    expect(addressClassName.props.className).toBe('card-body')
  })
})

describe('Verify Address card fields', function () {
  const physicalAddressFields = {
    street_address: 'gate way oaks',
    zip: '',
    city: '',
    state: null,
    type: {
      id: '1',
      value: 'Residential'
    }
  }
  const mailingAddressFields = {
    street_address: 'gate way oaks',
    zip: '',
    city: '',
    state: null,
    type: {
      id: '2',
      value: 'Mailing'
    }
  }

  let setParentStateSpy, addressCardMount, setonAddressChangeSpy, handleClearOnConditionalChangeSpy, addresses, props
  beforeEach(() => {
    spyOn(window, 'fetch').and.callThrough()
    setParentStateSpy = jasmine.createSpy('setParentState')
    handleClearOnConditionalChangeSpy = jasmine.createSpy('handleClearOnConditionalChange')
    setonAddressChangeSpy = jasmine.createSpy('')
    props = {
      setParentState: setParentStateSpy,
      handleClearOnConditionalChange: handleClearOnConditionalChangeSpy,
      genderTypes: genderTypes.items,
      stateTypes: stateTypes.items,
      addresses: undefined,
      physicalMailingSimilar: 'false',
      physicalAddressFields: physicalAddressFields
    }
    addressCardMount = mount(<AddressCard {...props} />)
  })
  it('verify Physical address card props', () => {
    props.addresses = [physicalAddressFields]
    addressCardMount.setProps({
      props: props
    })
    expect(addressCardMount.find('.show').length).toBe(1)
  })
  it('verify Physical address card props', () => {
    props.addresses = [physicalAddressFields, mailingAddressFields]
    addressCardMount.setProps({
      props: props
    })
    expect(addressCardMount.length).toBe(1)
  })
  it('verify street address', () => {
    let relationShipField = addressCardMount.find('#Residentialstreet_address').hostNodes()
    let autoFillField = relationShipField.find('input[type="text"]')
    relationShipField.simulate('change', {target: {value: 'gate way oaks'}})
    expect(setParentStateSpy).toHaveBeenCalledWith('addresses', [physicalAddressFields])
  })

  it('verify on change street address ', () => {
    let relationShipField = addressCardMount.find('#Residentialstreet_address').hostNodes()
    let autoFillField = relationShipField.find('input[type="text"]')
    relationShipField.simulate('change', {target: {value: 'gate way oaks'}})
    expect(setParentStateSpy).toHaveBeenCalledWith('addresses', [physicalAddressFields])
  })
  it('verify zip', () => {
    let relationShipField = addressCardMount.find('#Residentialzip').hostNodes()
    spyOn(addressCardMount.instance(), 'onAddressChange').and.callThrough()
    addressCardMount.update()
    relationShipField.simulate('change', {target: {value: '12345'}})
    expect(addressCardMount.instance().onAddressChange).toHaveBeenCalledWith('Residential', 'zip', '12345')
  })

  it('verify city', () => {
    let relationShipField = addressCardMount.find('#Residentialcity').hostNodes()
    spyOn(addressCardMount.instance(), 'onAddressChange').and.callThrough()
    addressCardMount.update()
    relationShipField.simulate('change', {target: {value: 'sacremento'}})
    expect(addressCardMount.instance().onAddressChange).toHaveBeenCalledWith('Residential', 'city', 'sacremento')
  })

  it('verify state', () => {
    let relationShipField = addressCardMount.find('.Select-control').at(0)
    spyOn(addressCardMount.instance(), 'onAddressChange').and.callThrough()
    addressCardMount.update()
    relationShipField.simulate('keyDown', { keyCode: 40 })
    relationShipField.simulate('keyDown', { keyCode: 13 })

    expect(addressCardMount.instance().onAddressChange).toHaveBeenCalledWith('Residential', 'state', { id: 'AK', value: 'Alaska' })
  })

  it('verify on mailing street address ', () => {
    let relationShipField = addressCardMount.find('#Mailingstreet_address').hostNodes()
    spyOn(addressCardMount.instance(), 'onAddressChange').and.callThrough()
    addressCardMount.update()
    relationShipField.simulate('change', {target: {value: 'gate way oaks'}})
    expect(addressCardMount.instance().onAddressChange).toHaveBeenCalledWith('Mailing', 'street_address', 'gate way oaks')
  })
  it('verify mailing zip', () => {
    let relationShipField = addressCardMount.find('#Mailingzip').hostNodes()
    spyOn(addressCardMount.instance(), 'onAddressChange').and.callThrough()
    addressCardMount.update()
    relationShipField.simulate('change', {target: {value: '12345'}})
    expect(addressCardMount.instance().onAddressChange).toHaveBeenCalledWith('Mailing', 'zip', '12345')
  })

  it('verify mailing city', () => {
    let relationShipField = addressCardMount.find('#Mailingcity').hostNodes()
    spyOn(addressCardMount.instance(), 'onAddressChange').and.callThrough()
    addressCardMount.update()
    relationShipField.simulate('change', {target: {value: 'sacremento'}})
    expect(addressCardMount.instance().onAddressChange).toHaveBeenCalledWith('Mailing', 'city', 'sacremento')
  })

  it('verify mailing state', () => {
    let relationShipField = addressCardMount.find('.Select-control').at(1)
    spyOn(addressCardMount.instance(), 'onAddressChange').and.callThrough()
    addressCardMount.update()
    relationShipField.simulate('keyDown', { keyCode: 40 })
    relationShipField.simulate('keyDown', { keyCode: 13 })

    expect(addressCardMount.instance().onAddressChange).toHaveBeenCalledWith('Mailing', 'state', { id: 'AK', value: 'Alaska' })
  })
  it('verify mailing address', () => {
    let relationShipField = addressCardMount.find('#mailing_similartrue').hostNodes()
    relationShipField.simulate('change', {target: {value: 'false'}})
    expect(handleClearOnConditionalChangeSpy).toHaveBeenCalledWith('physical_mailing_similar', 'addresses', 'false', [ Object({ street_address: '', zip: '', city: '', state: null, type: Object({ id: '3', value: 'Mailing' }) }) ])
  })
})
