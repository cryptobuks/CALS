import React from 'react'
import Employment from 'rfa_forms/rfa01a_edit_view/employmentCard.jsx'
import ReactDOM from 'react-dom'
import {shallow, mount} from 'enzyme'
import {salaryTypes, educationLevels, ethnicityTypes, genderTypes, stateTypes} from './../../helpers/constants'
import ShallowRenderer from 'react-test-renderer/shallow'

describe('Employment Card', function () {
  const props = {
    stateTypes: {
      stateTypes
    },
    salaryTypes: {
      salaryTypes
    }
  }
  const applicantFields = {
    employer_name: 'System Integration',
    occupation: 'Developer',
    income: 'xxxxxx',
    income_type: {
      id: '1',
      value: 'Yearly'
    },
    physical_address: {
      street_address: '2870 Gateway Oaks',
      zip: '95833',
      city: 'Sacramento',
      state: {
        id: '6',
        value: 'California'
      }
    }
  }
  let employmentCardComp, onEmploymentChange, setCardState
  const employmentCard = new ShallowRenderer()
  const cardRendered = employmentCard.render(<Employment {...props} />)
  // debugger

  it('verify Resident Address fields', function () {
    let employmentClassName = cardRendered
    expect(employmentClassName.props.className).toBe('card-body')
  })
  beforeEach(() => {
    onEmploymentChange = jasmine.createSpy('onEmploymentChange')
    setCardState = jasmine.createSpy('setParentState')
    employmentCardComp = shallow(<Employment
      stateTypes={stateTypes.items}
      salaryTypes={salaryTypes.items}
      employment={applicantFields}
      setParentState={setCardState} />)
  })
  it('verify Employment Name Change', () => {
    let employmentNameField = employmentCardComp.find('#employer_name')
    spyOn(employmentCardComp.instance(), 'onEmploymentChange').and.callThrough()
    employmentNameField.simulate('change', {target: {value: 'Child Welfare'}})
    expect(employmentCardComp.instance().onEmploymentChange).toHaveBeenCalledWith('employer_name', 'Child Welfare')
    applicantFields.employer_name = 'Child Welfare'
    expect(setCardState).toHaveBeenCalledWith('employment', applicantFields)
  })
  it('verify Occupation Change', () => {
    let occupationField = employmentCardComp.find('#occupation')
    spyOn(employmentCardComp.instance(), 'onEmploymentChange').and.callThrough()
    occupationField.simulate('change', {target: {value: 'Lead Developer'}})
    expect(employmentCardComp.instance().onEmploymentChange).toHaveBeenCalledWith('occupation', 'Lead Developer')
  })
  it('verify Income Change', () => {
    let incomeField = employmentCardComp.find('#income')
    employmentCardComp.update()
    const spy = spyOn(employmentCardComp.instance(), 'onEmploymentChange').and.callThrough()
    incomeField.simulate('change', {target: {rawValue: '50'}})
    employmentCardComp.update()
    expect(employmentCardComp.instance().onEmploymentChange).toHaveBeenCalledWith('income', '50')
  })
  it('verify Income Type Change', () => {
    let incomeTypeField = employmentCardComp.find('#income_type')
    employmentCardComp.update()
    spyOn(employmentCardComp.instance(), 'onEmploymentChange').and.callThrough()
    incomeTypeField.simulate('change', {target: {options: {'2': {value: '2', text: 'Monthly'}, selectedIndex: 2}}})
    expect(employmentCardComp.instance().onEmploymentChange).toHaveBeenCalledWith('income_type', {id: '2', value: 'Monthly'})
  })
  it('verify Physical Street Address Change', () => {
    let streetAddressField = employmentCardComp.find('#street_address')
    spyOn(employmentCardComp.instance(), 'onPhysicalAddressChange').and.callThrough()
    streetAddressField.simulate('change', {target: {value: '2035 W El Camino Ave'}})
    expect(employmentCardComp.instance().onPhysicalAddressChange).toHaveBeenCalledWith('street_address', '2035 W El Camino Ave')
  })
  it('verify zip Code Change', () => {
    let physicalZipField = employmentCardComp.find('#zip')
    spyOn(employmentCardComp.instance(), 'onPhysicalAddressChange').and.callThrough()
    physicalZipField.simulate('change', {target: {value: '95832'}})
    expect(employmentCardComp.instance().onPhysicalAddressChange).toHaveBeenCalledWith('zip', '95832')
    applicantFields.physical_address.zip = '95832'
    expect(setCardState).toHaveBeenCalledWith('employment', applicantFields)
  })
  it('verify City Change', () => {
    let physicalCityField = employmentCardComp.find('#city')
    spyOn(employmentCardComp.instance(), 'onPhysicalAddressChange').and.callThrough()
    physicalCityField.simulate('change', {target: {value: 'San Mateo'}})
    expect(employmentCardComp.instance().onPhysicalAddressChange).toHaveBeenCalledWith('city', 'San Mateo')
  })
  it('verify State Type Change', () => {
    let physicalStateField = employmentCardComp.find('#state_type')
    employmentCardComp.update()
    spyOn(employmentCardComp.instance(), 'onPhysicalAddressChange').and.callThrough()
    physicalStateField.simulate('change', {target: {options: {'17': {value: '17', text: 'Illinois'}, selectedIndex: 17}}})
    expect(employmentCardComp.instance().onPhysicalAddressChange).toHaveBeenCalledWith('state', {id: '17', value: 'Illinois'})
  })
})
