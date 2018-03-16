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
      residence_address: {
        street_address: '1702 Redoak Ct.',
        zip: '98123',
        zip_extension: '123',
        city: 'Rocklin',
        state: {
          value: 'Los Angeles',
          id: 'string'
        }
      },
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

  let setParentStateSpy, setDisplayStateSpy, shallowMount, shallowMountNoResidence,
    setFocusStateSpy, getFocusClassNameSpy, onChangeSpy, validator, shallowMountNoLicenseNumber

  beforeEach(() => {
    setParentStateSpy = jasmine.createSpy('setApplicationState')
    onChangeSpy = jasmine.createSpy('onChange')
    setDisplayStateSpy = jasmine.createSpy('setDisplayState')
    getFocusClassNameSpy = jasmine.createSpy('getFocusClassName')
    setFocusStateSpy = jasmine.createSpy('setFocusState')
    validator = new Validator({})

    shallowMount = shallow(<ApplicantDetailsCard
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

    shallowMountNoResidence = mount(<ApplicantDetailsCard
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
      expect(shallowMount.length).toEqual(1)
    })

    it('onChange event on Name Of Resource Family', () => {
      let applicantDetails = shallowMount.find('#NameOfResourceFamily')
      applicantDetails.simulate('change', {target: {value: 'gate way oaks'}})
      expect(setParentStateSpy).toHaveBeenCalledWith('resource_family_name', 'gate way oaks')
    })

    it('onChange event on ssn', () => {
      let applicantDetails = shallowMount.find('#ssn')
      applicantDetails.simulate('change', {target: {value: '1234'}})
      expect(setParentStateSpy).toHaveBeenCalledWith('ssn', '1234')
    })

    it('onChange event on Date Of Birth', () => {
      let applicantDetails = shallowMount.find('#date_of_birth')
      applicantDetails.simulate('change', {target: {value: '11/20/1990'}})
      expect(setParentStateSpy).toHaveBeenCalledWith('date_of_birth', '1990-11-20')
    })

    it('onChange event on driver_license', () => {
      let applicantDetails = shallowMount.find('#driversLicenseNumberId')
      applicantDetails.simulate('change', {target: {value: 'D12345'}})
      expect(setParentStateSpy).toHaveBeenCalledWith('driver_license', 'D12345')
    })

    it('onChange event on driver_license_state', () => {
      let applicantDetails = shallowMount.find('#driversLicenseStateId')
      applicantDetails.simulate('change', {target: {options: {'17': {value: '17', text: 'Illinois'}, selectedIndex: 17}}})
      expect(setParentStateSpy).toHaveBeenCalledWith('driver_license_state', {id: '17', value: 'Illinois'})
    })

    it('onChange event on street address', () => {
      let applicantDetails = shallowMountNoResidence.find('#Residentialzip').hostNodes()
      spyOn(shallowMountNoResidence.instance(), 'onAddressChange').and.callThrough()
      shallowMountNoResidence.update()
      applicantDetails.simulate('change', {target: {value: '95823'}})
      expect(shallowMountNoResidence.instance().onAddressChange).toHaveBeenCalledWith('zip', '95823')
    })
  })

  describe('Verify required fields', () => {
    const applicationNoLicenseNumber =
        {
          resource_family_name: 'Peterson',
          applicant_name_prefix: {},
          applicant_first_name: 'Anna',
          applicant_middle_name: 'M.',
          applicant_last_name: 'Peterson',
          applicant_name_suffix: {},
          residence_address: {
            street_address: '1702 Redoak Ct.',
            zip: '98123',
            zip_extension: '123',
            city: 'Rocklin',
            state: {
              value: 'Los Angeles',
              id: 'string'
            }
          },
          ssn: '464942323',
          date_of_birth: '1981-12-26',
          driver_license: '',
          driver_license_state: {}
        }

    beforeEach(() => {
      setParentStateSpy = jasmine.createSpy('setApplicationState')
      onChangeSpy = jasmine.createSpy('onChange')
      setDisplayStateSpy = jasmine.createSpy('setDisplayState')
      getFocusClassNameSpy = jasmine.createSpy('getFocusClassName')
      setFocusStateSpy = jasmine.createSpy('setFocusState')
      validator = new Validator({})

      shallowMountNoLicenseNumber = shallow(<ApplicantDetailsCard
        validator={validator}
        application={applicationNoLicenseNumber}
        setDisplayState={setDisplayStateSpy}
        focusComponentName={blankValues.focusComponentName}
        getFocusClassName={getFocusClassNameSpy}
        setFocusState={setFocusStateSpy}
        setParentState={setParentStateSpy}
        stateTypes={stateTypes.items}
        namePrefixTypes={prefixTypes.items}
        nameSuffixTypes={suffixTypes.items} />)
    })

    it('check required fields indicators', () => {
      let componentHtml = shallowMount.html()
      expect(componentHtml).toContain('Name of Resource Family (required)')
      expect(componentHtml).toContain('First Name (required)')
      expect(componentHtml).toContain('Last Name (required)')
      expect(componentHtml).toContain('Residence Address (required)')
      expect(componentHtml).toContain('Zip (required)')
      expect(componentHtml).toContain('City (required')
      expect(componentHtml).toContain('State (required)')
      expect(componentHtml).toContain('Date of Birth (required)')
      expect(componentHtml).toContain('Driver License State (required)')
    })

    it('driver license State not required if driver license is empty', () => {
      expect(shallowMountNoLicenseNumber.html()).not.toContain('Driver License State (required)')
    })
  })
})
