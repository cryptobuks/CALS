import React from 'react'
import FacilityDetails from 'facility/details.jsx'
import {shallow} from 'enzyme'

describe('Verify Facility Details', function () {
  const props = {
    facilityData: {
      'href': 'facilities/300665437',
      'id': '300665437',
      'type': {
        'id': '726',
        'value': 'TRANSITIONAL HOUSING PLACEMENT PROGRAM'
      },
      'name': 'Lederhouse Transitions',
      'licensee_name': 'Lederhouse Transitions Inc.',
      'license_type': 'A',
      'assigned_worker': {
        'value': 'Something'
      },
      'district_office': {
        'number': '19',
        'name': 'PACIFIC INLAND CR'
      },
      'license_number': '300665437',
      'status': {
        'id': '5',
        'value': 'PROBATIONARY LICENSE'
      },
      'capacity': 10,
      'capacity_last_changed': '2012-10-01',
      'license_effective_date': '2012-10-01',
      'original_application_recieved_date': '2012-07-18',
      'last_visit_date': '2017-04-14 00:00:00',
      'last_visit_reason': {
        'id': '10',
        'value': 'CASELOAD MANAGEMENT'
      },
      'county': {
        'id': '30',
        'value': 'ORANGE'
      },
      'phones': [
        {
          'relation': 'primary',
          'type': 'Cell',
          'number': '9494480118'
        }
      ],
      'addresses': [
        {
          'type': 'Residential',
          'address': {
            'street_address': '36 Sequoia Dr',
            'city': 'Aliso Viejo',
            'state': 'CA',
            'zip_code': '92656'
          }
        },
        {
          'type': 'Mailing',
          'address': {
            'street_address': '36 Sequoia Dr',
            'city': 'Aliso Viejo',
            'state': 'CA',
            'zip_code': '92656'
          }
        }
      ],
      'visits': [
        {
          'approval': '',
          'visit_type': 'Annual 10 month',
          'visit_date': '2011-10-28'
        },
        {
          'approval': '',
          'visit_type': 'Annual 22 month'
        },
        {
          'approval': '',
          'visit_type': 'Post Licensing',
          'visit_deferred_date': '1991-11-06'
        },
        {
          'approval': '',
          'visit_type': 'Renewal'
        }
      ],
      'annual_visit_year': 12
    }
  }
  let detailsCompShallow = shallow(<FacilityDetails {...props} />)
  it('verify Facility Details fields', function () {
    expect(detailsCompShallow.find('.grid_view').length).toEqual(1)
  })
  it('Assigned Worker Value', function () {
    let assignedWorkerValue = detailsCompShallow.props().children[2].props.children[0].props.children.props.children[1].props.value
    expect(assignedWorkerValue).toBe('Something')
  })
  it('Original Application Recieved Date', function () {
    let originalApplicationRecievedDate = detailsCompShallow.props().children[2].props.children[2].props.children.props.children[1].props.value
    expect(originalApplicationRecievedDate).toBe('2012-07-18')
  })
  it(' verify capacity last changed', function () {
    let verifyCapacityAndCapacityLastChanged = detailsCompShallow.props().children[2].props.children[1].props.children.props.children[2].props.value
    expect(verifyCapacityAndCapacityLastChanged).toBe('10 / 2012-10-01')
  })
})

describe('Verify Facility Details Null Value', function () {
  const props = {
    facilityData: {
      'href': 'facilities/300665437',
      'id': '300665437',
      'type': {
        'id': '726',
        'value': 'TRANSITIONAL HOUSING PLACEMENT PROGRAM'
      },
      'name': 'Lederhouse Transitions',
      'licensee_name': 'Lederhouse Transitions Inc.',
      'license_type': 'A',
      'assigned_worker': {},
      'district_office': {
        'number': '19',
        'name': 'PACIFIC INLAND CR'
      },
      'license_number': '300665437',
      'status': {
        'id': '5',
        'value': 'PROBATIONARY LICENSE'
      },
      'capacity': 10,
      'capacity_last_changed': null,
      'license_effective_date': '2012-10-01',
      'original_application_recieved_date': null,
      'last_visit_date': '2017-04-14 00:00:00',
      'last_visit_reason': {
        'id': '10',
        'value': 'CASELOAD MANAGEMENT'
      },
      'county': {
        'id': '30',
        'value': 'ORANGE'
      },
      'phones': [
        {
          'relation': 'primary',
          'type': 'Cell',
          'number': '9494480118'
        }
      ],
      'addresses': [
        {
          'type': 'Residential',
          'address': {
            'street_address': '36 Sequoia Dr',
            'city': 'Aliso Viejo',
            'state': 'CA',
            'zip_code': '92656'
          }
        },
        {
          'type': 'Mailing',
          'address': {
            'street_address': '36 Sequoia Dr',
            'city': 'Aliso Viejo',
            'state': 'CA',
            'zip_code': '92656'
          }
        }
      ],
      'visits': [
        {
          'approval': '',
          'visit_type': 'Annual 10 month',
          'visit_date': '2011-10-28'
        },
        {
          'approval': '',
          'visit_type': 'Annual 22 month'
        },
        {
          'approval': '',
          'visit_type': 'Post Licensing',
          'visit_deferred_date': '1991-11-06'
        },
        {
          'approval': '',
          'visit_type': 'Renewal'
        }
      ],
      'annual_visit_year': 12
    }
  }
  let detailsCompShallow = shallow(<FacilityDetails {...props} />)
  it('verify Facility Details fields', function () {
    expect(detailsCompShallow.find('.grid_view').length).toEqual(1)
  })
  it('Assigned Worker Value', function () {
    let assignedWorkerValue = detailsCompShallow.props().children[2].props.children[0].props.children.props.children[1].props.value
    expect(assignedWorkerValue).toBe('N/A')
  })
  it('Original Application Recieved Date', function () {
    let originalApplicationRecievedDate = detailsCompShallow.props().children[2].props.children[2].props.children.props.children[1].props.value
    expect(originalApplicationRecievedDate).toBe('N/A')
  })
  it(' verify capacity last changed', function () {
    let verifyCapacityAndCapacityLastChanged = detailsCompShallow.props().children[2].props.children[1].props.children.props.children[2].props.value
    expect(verifyCapacityAndCapacityLastChanged).toBe('10 / N/A')
  })
})
