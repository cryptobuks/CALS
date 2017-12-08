import React from 'react'
import ApplicantDetailsCard from 'rfa_forms/rfa01b_edit_view/applicantDetailsCard'
import {shallow, mount} from 'enzyme'
import {stateTypes, prefixTypes, suffixTypes} from '../../helpers/constants'
import Validator from 'helpers/validator'

describe('Verify ApplicantDetailsCard card', function () {
  const blankValues = Object.freeze({
    focusComponentName: null
  })

  const application =
    {
      resource_family_name: 'Peterson',
      applicant_name_prefix: {},
      applicant_first_name: 'Anna',
      applicant_middle_name: 'M.',
      applicant_last_name: 'Peterson',
      applicant_name_suffix: {},
      residence_address: {},
      ssn: '464942323',
      date_of_birth: '1981-12-26',
      driver_license: 'MD123-1234-585-121',
      driver_license_state: {}
    }

  const applicationNoResidence =
    {
      resource_family_name: 'Peterson',
      applicant_name_prefix: {},
      applicant_first_name: 'Anna',
      applicant_middle_name: 'M.',
      applicant_last_name: 'Peterson',
      applicant_name_suffix: {},
      residence_address: null,
      ssn: '464942323',
      date_of_birth: '1981-12-26',
      driver_license: 'MD123-1234-585-121',
      driver_license_state: {}
    }

  let setParentStateSpy, setDisplayStateSpy, componentMount, componentMountNoResidence,
    setFocusStateSpy, getFocusClassNameSpy, onChangeSpy, validator

  beforeEach(() => {
    setParentStateSpy = jasmine.createSpy('setApplicationState')
    onChangeSpy = jasmine.createSpy('onChange')
    setDisplayStateSpy = jasmine.createSpy('setDisplayState')
    getFocusClassNameSpy = jasmine.createSpy('getFocusClassName')
    setFocusStateSpy = jasmine.createSpy('setFocusState')
    validator = new Validator({})

    componentMount = shallow(<ApplicantDetailsCard
      validator={validator}
      application={application}
      setDisplayState={setDisplayStateSpy}
      focusComponentName={blankValues.focusComponentName}
      getFocusClassName={getFocusClassNameSpy}
      setFocusState={setFocusStateSpy}
      setParentState={setParentStateSpy}
      stateTypes={stateTypes.items}
      namePrefixTypes={prefixTypes.items}
      nameSuffixTypes={suffixTypes.items} />)

    componentMountNoResidence = mount(<ApplicantDetailsCard
      validator={validator}
      application={applicationNoResidence}
      setDisplayState={setDisplayStateSpy}
      focusComponentName={blankValues.focusComponentName}
      getFocusClassName={getFocusClassNameSpy}
      setFocusState={setFocusStateSpy}
      setParentState={setParentStateSpy}
      stateTypes={stateTypes.items}
      namePrefixTypes={prefixTypes.items}
      nameSuffixTypes={suffixTypes.items} />)
  })

  describe('Verify applicant details', () => {
    it('verify component did mount', () => {
      expect(componentMount.length).toEqual(1)
    })

    it('onChange event on Name Of Resource Family', () => {
      let applicantDetails = componentMount.find('#NameOfResourceFamily')
      applicantDetails.simulate('change', {target: {value: 'gate way oaks'}})
      expect(setParentStateSpy).toHaveBeenCalledWith('resource_family_name', 'gate way oaks')
    })

    it('onChange event on ssn', () => {
      let applicantDetails = componentMount.find('#ssn')
      applicantDetails.simulate('change', {target: {value: '1234'}})
      expect(setParentStateSpy).toHaveBeenCalledWith('ssn', '1234')
    })

    it('onChange event on Date Of Birth', () => {
      let applicantDetails = componentMount.find('#date_of_birth')
      applicantDetails.simulate('change', {target: {value: '11/20/1990'}})
      expect(setParentStateSpy).toHaveBeenCalledWith('date_of_birth', '1990-20-11')
    })

    it('onChange event on driver_license', () => {
      let applicantDetails = componentMount.find('#driversLicenseNumberId')
      applicantDetails.simulate('change', {target: {value: 'D12345'}})
      expect(setParentStateSpy).toHaveBeenCalledWith('driver_license', 'D12345')
    })

    it('onChange event on driver_license_state', () => {
      let applicantDetails = componentMount.find('#driversLicenseStateId')
      applicantDetails.simulate('change', {target: {options: {'17': {value: '17', text: 'Illinois'}, selectedIndex: 17}}})
      expect(setParentStateSpy).toHaveBeenCalledWith('driver_license_state', {id: '17', value: 'Illinois'})
    })

    it('onChange event on street address', () => {
      let applicantDetails = componentMountNoResidence.find('#zip').hostNodes()
      spyOn(componentMountNoResidence.instance(), 'onAddressChange').and.callThrough()
      componentMountNoResidence.update()
      applicantDetails.simulate('change', {target: {value: '95823'}})
      expect(componentMountNoResidence.instance().onAddressChange).toHaveBeenCalledWith('zip', '95823')
    })
  })
})
