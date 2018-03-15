import React from 'react'
import SearchApp from '../../../app/javascript/search/search'
import {shallow, mount} from 'enzyme'

describe('Verify Search component', function () {
  let handleToggleSpy, searchComp, handleChangeSpy, handleInputChangeSpy, changePageSpy, searchApiCallSpy

  beforeEach(() => {
    const props = {
      total: 0,
      pageNumber: 1,
      from: 0,
      size: 5,
      inputData: {},
      facilityTypes: [
        {
          id: '',
          value: ''
        }
      ],
      user: {
        county_name: 'Los Angeles'
      },
      countyTypes: [
        {
          id: '',
          value: ''
        }
      ]
    }

    handleToggleSpy = spyOn(SearchApp.prototype, 'handleToggle').and.callThrough()
    searchApiCallSpy = spyOn(SearchApp.prototype, 'searchApiCall').and.callThrough()
    handleInputChangeSpy = spyOn(SearchApp.prototype, 'handleInputChange').and.callThrough()
    changePageSpy = spyOn(SearchApp.prototype, 'changePage').and.callThrough()

    searchComp = mount(<SearchApp {...props}
    />)
    searchComp.setState({
      searchResults: [
        {
          assigned_worker: 'Kari Gutierrez',
          county: 'Marin',
          district_office: 'NO. CAL SC/RES',
          fac_capacity: 7,
          fac_email_address: null,
          fac_last_visit_date: '1991-12-10',
          fac_lic_eff_date: '1992-02-22',
          fac_licensee_name: 'TERRIER PROGRAMS, INC.',
          fac_licensee_type: 'C',
          fac_mail_city: 'MODESTO',
          fac_mail_state: 'CA',
          fac_mail_street_addr: '767 GLEN EAGLES DRIVE',
          fac_mail_zip_code: '95350',
          fac_name: "DEPUTY DOG'S GROUP HOME",
          fac_nbr: 193600008,
          fac_orig_appl_rec_date: '1983-02-02',
          fac_res_city: 'MODESTO',
          fac_res_state: 'CA',
          fac_res_street_addr: '767 GLEN EAGLES DRIVE',
          fac_res_zip_code: '95350',
          facility_telephone: '8183366556',
          last_visit_reason: "Renewal (Fac.'s w/Expir.)",
          status: 'Licensed',
          type: 'Foster Family Home (Confidential - Do not release)'
        }
      ]

    })
  })

  it('Verify Search component render', () => {
    expect(searchComp.length).toBe(1)
  })

  it('verify onclick for toggle button', () => {
    let searchFacility = searchComp.find('.btn-primary')
    searchFacility.simulate('submit')
    let handleToggleButton = searchComp.find('#toggle_button')
    expect(searchComp.instance().state.isToggled).toBe(true)
    handleToggleButton.simulate('click')
    expect(handleToggleSpy).toHaveBeenCalled()
    expect(searchComp.instance().state.isToggled).toBe(false)
  })

  it('verify dropDown value change number of facilities', () => {
    let dropdownForfacilitiesCount = searchComp.find('#dropdownFacilities')
    dropdownForfacilitiesCount.simulate('change', {target: {options: {'5': {id: '5', value: '5'}, selectedIndex: 5}}})
    expect(searchApiCallSpy).toHaveBeenCalledWith(0, 5)
  })

  it('verify county dropdown value change ', () => {
    let countyDropDownChange = searchComp.find('#county_select')
    countyDropDownChange.simulate('change', {target: {options: {'19': {id: '19', value: 'Los Angeles'}, selectedIndex: 19}}})
    expect(handleInputChangeSpy).toHaveBeenCalledWith('countyValue', 'Los Angeles')
  })
})
