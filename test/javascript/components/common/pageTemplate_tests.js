import React from 'react'
import PageTemplate from 'components/common/pageTemplate'
import {shallow, mount} from 'enzyme'

describe('Verify PageTemplate', () => {
  let pageTemplateMount,
    rfa_a01_application_id = 242
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
  let rfa1c_forms = []
  let otherAdults = []
  let childIdentified = {}

  beforeEach(() => {
    pageTemplateMount = mount(
      <PageTemplate
        headerLabel='Resource Family Application - Confidential (RFA 01B)'
        saveProgressId='saveProgress'
        onSaveProgressClick={saveProgressSpy}
        disableSave={false}
        submitId={'submitApplication' + rfa_a01_application_id}
        disableSubmit={false}
        onSubmitClick={submitSpy}
        rfa01aApplicationId={rfa_a01_application_id}
        rfa01cForms={rfa1c_forms}
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
    expect(pageTemplateMount.find('.page-header').length).toEqual(1)
    expect(pageTemplateMount.find('.button').length).toEqual(2)
  })
})
