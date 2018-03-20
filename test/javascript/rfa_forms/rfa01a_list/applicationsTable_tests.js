import React from 'react'
import ApplicationTable from 'rfa_forms/rfa01a_list/applicationsTable.jsx'
import ShallowRenderer from 'react-test-renderer/shallow'

describe('Verify Application List View', () => {
  const applicants = [{
    to_delete: true,
    first_name: 'test',
    middle_name: '',
    last_name: 'ing',
    other_names: [],
    date_of_birth: '',
    driver_license_number: '',
    email: '',
    phones: null
  }]

  let applications = [
    {
      applicants: undefined,
      id: 43,
      is_initial_application: false,
      is_other_type: false,
      minor_children: [],
      other_adults: [],
      rfa1b_forms: [],
      rfa1c_forms: []
    },
    {

      applicants: applicants,
      id: 44,
      is_initial_application: false,
      is_other_type: false,
      minor_children: [],
      other_adults: [],
      rfa1b_forms: [],
      rfa1c_forms: []
    }
  ]
  const AppListViewCard = new ShallowRenderer()
  const listRendered = AppListViewCard.render(<ApplicationTable applications={applications} />)
  it('To Load table', () => {
    expect(listRendered.props.children.props.className).toBe('table')
  })
  it('To have array of Items', () => {
    let applicationTable = listRendered.props.children.props
    expect(applicationTable.children[1].length).toEqual(2)
  })
})
