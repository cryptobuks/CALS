import React from 'react'
import PageTemplate from 'components/common/pageTemplate'
import {shallow, mount} from 'enzyme'

describe('Verify PageTemplate', () => {
  let pageTemplateMount
  let rfaA01ApplicationId = 242
  let handleNavLinkClickSpy = jasmine.createSpy('handleNavLinkClick')
  let isNavLinkActiveSpy = jasmine.createSpy('isNavLinkActive')
  let saveProgressSpy = jasmine.createSpy('saveProgress')
  let submitSpy = jasmine.createSpy('submit')
  let applicants = [
    {
      'id': 242,
      'first_name': 'Kimberley',
      'middle_name': 'k',
      'last_name': 'RReily',
      'other_names': [],
      'date_of_birth': '2001-01-01',
      'driver_license_number': '',
      'email': '',
      'employment': {
        'employer_name': '',
        'occupation': '',
        'income_type': {
          'value': 'yearly',
          'id': 1
        },
        'physical_address': {
          'street_address': '123 W Main St',
          'city': 'Alhambra',
          'state': {
            'value': 'California',
            'id': 'CA'
          },
          'zip': '91801'
        }
      },
      'phones': [
        {
          'phone_type': {
            'value': 'Home',
            'id': 2
          },
          'number': '9292929299',
          'preferred': false
        }
      ]
    }
  ]
  let rfa1cForms = []
  let otherAdults = []
  let childIdentified = {}

  beforeEach(() => {
    pageTemplateMount = mount(
      <PageTemplate
        headerLabel='Resource Family Application - Confidential (RFA 01B)'
        saveProgressId='saveProgress'
        onSaveProgressClick={saveProgressSpy}
        disableSave={false}
        submitId={'submitApplication' + rfaA01ApplicationId}
        disableSubmit={false}
        onSubmitClick={submitSpy}
        rfa01aApplicationId={rfaA01ApplicationId}
        rfa01cForms={rfa1cForms}
        applicants={applicants}
        otherAdults={otherAdults}
        childIdentified={childIdentified}
        isNavLinkActive={isNavLinkActiveSpy}
        handleNavLinkClick={handleNavLinkClickSpy}
        errors={[]} >

        <br />
      </PageTemplate>)
  })
  it('tests pageTemplate render', () => {
    expect(pageTemplateMount.find('.left-content').length).toEqual(1)
  })
})
