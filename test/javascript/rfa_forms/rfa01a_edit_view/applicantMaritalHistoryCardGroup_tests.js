import React from 'react'
import ApplicantMaritalHistoryCardGroup from 'rfa_forms/rfa01a_edit_view/applicantMaritalHistoryCardGroup'
import {addressDefaults, formerSpousesDefaults, relationshipToAdultsDefaults, adultChildrenDefaults, applicantsHistoryDefaults} from 'constants/defaultFields'
import applicantMaritalHistoryCard from 'rfa_forms/rfa01a_edit_view/applicantMaritalHistoryCard'
import AdultChildrenFields from 'rfa_forms/rfa01a_edit_view/adultChildrenFields'
import {shallow, mount} from 'enzyme'
import {relationshipTypes, suffixTypes, prefixTypes, nameTypes, stateTypes, marriageTerminationReasons, relationshipToApplicantTypes} from '../../helpers/constants'
import Validator from 'helpers/validator'

describe('foster care card tests', function () {
  let applicantMaritalHistoryCardGroupComponent

  let setParentStateSpy
  let setFocusStateSpy
  let getFocusClassNameSpy

  let addMaritalHistoryCardSpy
  let onMaritalHistoryClickCloseSpy

  let addAdultChildCardSpy
  let onAdultChildClickCloseSpy

  let changeAdultChildSpy
  let changeMaritalHistorySpy
  let changeAdultHistoryAddressSpy

  let handleRelationshipTypeToApplicantFormerSpouseSpy
  let handleRelationshipTypeToApplicantAdultChildSpy

  let maritalUpdateFields

  describe('Verify Shallow -', () => {
    beforeEach(() => {
      setParentStateSpy = jasmine.createSpy('setParentState')
      setFocusStateSpy = jasmine.createSpy('setFocusState')
      getFocusClassNameSpy = jasmine.createSpy('getFocusClassName')

      addMaritalHistoryCardSpy = jasmine.createSpy('addMaritalHistoryCard')
      onMaritalHistoryClickCloseSpy = jasmine.createSpy('onMaritalHistoryClickClose')

      addAdultChildCardSpy = jasmine.createSpy('addAdultChildCard')
      onAdultChildClickCloseSpy = jasmine.createSpy('onAdultChildClickClose')

      changeAdultChildSpy = jasmine.createSpy('changeAdultChild')
      changeMaritalHistorySpy = jasmine.createSpy('changeMaritalHistory')
      changeAdultHistoryAddressSpy = jasmine.createSpy('changeAdultHistoryAddress')

      handleRelationshipTypeToApplicantFormerSpouseSpy = jasmine.createSpy('handleRelationshipTypeToApplicantFormerSpouse')
      handleRelationshipTypeToApplicantAdultChildSpy = jasmine.createSpy('handleRelationshipTypeToApplicantAdultChild')

      maritalUpdateFields = {
        first_name: 'keith',
        middle_name: '',
        last_name: '',
        name_suffix: {
          id: 0,
          value: ''
        }
      }

      applicantMaritalHistoryCardGroupComponent = shallow(
        <ApplicantMaritalHistoryCardGroup
          getFocusClassName={getFocusClassNameSpy}
          applicants={[]}
          applicantsHistory={applicantsHistoryDefaults}
          setFocusState={setFocusStateSpy}
          setParentState={setParentStateSpy}
          relationshipToApplicantTypes={relationshipToApplicantTypes.items}
          relationshipTypes={relationshipTypes}
          suffixTypes={suffixTypes.items}
          prefixTypes={prefixTypes.items}
          nameTypes={nameTypes.items}
          stateTypes={stateTypes.items}
          marriageTerminationReasons={marriageTerminationReasons.items}
          validator={new Validator({})}
          errors={undefined}
        />)
    })

    it('verify default layout', () => {
      expect(applicantMaritalHistoryCardGroupComponent.findWhere(n => n.type() === 'div').length).toEqual(11)
      expect(applicantMaritalHistoryCardGroupComponent.find('#applicant_marital_history_cards').children.length).toEqual(1)
      expect(applicantMaritalHistoryCardGroupComponent.find('button').length).toEqual(2)
    })
    it('verify add Marital History Card', () => {
      let addCardButton = applicantMaritalHistoryCardGroupComponent.find('button.btn').at(0)
      spyOn(applicantMaritalHistoryCardGroupComponent.instance(), 'addMaritalHistoryCard').and.callThrough()
      addCardButton.simulate('click')
      expect(applicantMaritalHistoryCardGroupComponent.instance().addMaritalHistoryCard).toHaveBeenCalledWith([formerSpousesDefaults])
    })
    it('verify add Adult Child Card', () => {
      let addCardButton = applicantMaritalHistoryCardGroupComponent.find('button.btn').at(1)
      spyOn(applicantMaritalHistoryCardGroupComponent.instance(), 'addAdultChildCard').and.callThrough()
      addCardButton.simulate('click')
      expect(applicantMaritalHistoryCardGroupComponent.instance().addAdultChildCard).toHaveBeenCalledWith([adultChildrenDefaults])
    })

    it('verify remove Marital History Card', () => {
      let removeCardBtn = applicantMaritalHistoryCardGroupComponent.find('a.remove-btn').at(0)
      spyOn(applicantMaritalHistoryCardGroupComponent.instance(), 'onMaritalHistoryClickClose').and.callThrough()
      removeCardBtn.simulate('click')
      expect(applicantMaritalHistoryCardGroupComponent.instance().onMaritalHistoryClickClose).toHaveBeenCalledWith(0)
    })
    it('verify remove Adult Child Card', () => {
      let removeCardBtn = applicantMaritalHistoryCardGroupComponent.find('a.remove-btn').at(1)
      spyOn(applicantMaritalHistoryCardGroupComponent.instance(), 'onAdultChildClickClose').and.callThrough()
      removeCardBtn.simulate('click')
      expect(applicantMaritalHistoryCardGroupComponent.instance().onAdultChildClickClose).toHaveBeenCalledWith(0)
    })
  })

  describe('Verify Mount -', () => {
    let changeMaritalHistorySpy

    beforeEach(() => {
      setParentStateSpy = jasmine.createSpy('setParentState')
      setFocusStateSpy = jasmine.createSpy('setFocusState')
      getFocusClassNameSpy = jasmine.createSpy('getFocusClassName')

      maritalUpdateFields = {
        first_name: 'keith',
        middle_name: '',
        last_name: '',
        name_suffix: {
          id: 0,
          value: ''
        }
      }

      changeMaritalHistorySpy = spyOn(ApplicantMaritalHistoryCardGroup.prototype, 'changeMaritalHistory').and.callThrough()
      changeAdultChildSpy = spyOn(ApplicantMaritalHistoryCardGroup.prototype, 'changeAdultChild').and.callThrough()
      changeAdultHistoryAddressSpy = spyOn(ApplicantMaritalHistoryCardGroup.prototype, 'changeAdultHistoryAddress').and.callThrough()
      handleRelationshipTypeToApplicantFormerSpouseSpy = spyOn(ApplicantMaritalHistoryCardGroup.prototype, 'handleRelationshipTypeToApplicantFormerSpouse').and.callThrough()
      handleRelationshipTypeToApplicantAdultChildSpy = spyOn(ApplicantMaritalHistoryCardGroup.prototype, 'handleRelationshipTypeToApplicantAdultChild').and.callThrough()

      applicantMaritalHistoryCardGroupComponent = mount(
        <ApplicantMaritalHistoryCardGroup
          getFocusClassName={getFocusClassNameSpy}
          focusComponentName='otherAdultsSection'
          applicants={[]}
          applicantsHistory={applicantsHistoryDefaults}
          setFocusState={setFocusStateSpy}
          setParentState={setParentStateSpy}
          relationshipToApplicantTypes={relationshipToApplicantTypes.items}
          relationshipTypes={relationshipTypes}
          suffixTypes={suffixTypes.items}
          prefixTypes={prefixTypes.items}
          nameTypes={nameTypes.items}
          stateTypes={stateTypes.items}
          marriageTerminationReasons={marriageTerminationReasons.items}
          validator={new Validator({})}
          errors={undefined}
        />)
    })

    it('verify Change Marital History', () => {
      let marriageCityField = applicantMaritalHistoryCardGroupComponent.find(
        'input[type="text"]').findWhere(n => n.props().id === 'applicantsHistory.former_spouses[0].place_of_marriage_city')
      marriageCityField.simulate('change', {target: {value: 'sacramento'}})
      expect(changeMaritalHistorySpy).toHaveBeenCalledWith('place_of_marriage_city', 'sacramento', 0)
    })
    it('verify set focus state is called', () => {
      let marriageCityField = applicantMaritalHistoryCardGroupComponent.find(
        'input[type="text"]').findWhere(n => n.props().id === 'applicantsHistory.former_spouses[0].place_of_marriage_city')
      marriageCityField.simulate('change', {target: {value: 'sacramento'}})
      expect(getFocusClassNameSpy).toHaveBeenCalledWith('ApplicantMaritalHistoryCardGroup')
      let componentSection = applicantMaritalHistoryCardGroupComponent.find('#ApplicantMaritalHistoryCardGroup')
      componentSection.simulate('click')
      expect(setFocusStateSpy).toHaveBeenCalled()
    })
    it('verify change Adult History is called', () => {
      let firstNameField = applicantMaritalHistoryCardGroupComponent.find(
        'input[type="text"]').findWhere(n => n.props().id === 'first_name').hostNodes().last()
      firstNameField.simulate('change', {target: {value: 'sacramento'}})
      expect(changeAdultChildSpy).toHaveBeenCalledWith('first_name', 'sacramento', 0)
    })
    it('verify change Adult History Address is called', () => {
      let firstNameField = applicantMaritalHistoryCardGroupComponent.find(
        'input[type="text"]').findWhere(n => n.props().id === 'Residentialstreet_address').hostNodes().last()
      firstNameField.simulate('change', {target: {value: 'sacramento'}})
      expect(changeAdultHistoryAddressSpy).toHaveBeenCalledWith('street_address', 'sacramento', 0)
    })
    it('verify handleRelationship Type To Applicant Former Spouse is called', () => {
      expect(1).toBe(2)
    })
    it('verify handle Relationship Type To Applicant Adult Child is called', () => {
      expect(1).toBe(2)
    })
    it('verify handle Clear On Conditional Change is called', () => {
      expect(1).toBe(2)
    })
  })
})
