import React from 'react'
import PropTypes from 'prop-types'
import {resultsPerPage} from './common/commonUtils'
import {dictionaryNilSelectValue, floatToNextInt, getFromValue} from 'helpers/commonHelper.jsx'

export default class SearchDetails extends React.Component {
  render () {
    const searchCount = this.props.totalNoOfFacilities
    const noOfPages = floatToNextInt(searchCount, this.props.sizeValue)
    const fromValue = getFromValue(this.props.sizeValue, this.props.pageNumber)
    let disableNext = fromValue + this.props.sizeValue >= searchCount
    let disablePrevious = fromValue - this.props.sizeValue < 0
    let searchFacilityId = null
    if (this.props.inputData.facilityIdValue) {
      searchFacilityId = (
        <p>Facility ID:
        <span>{this.props.inputData.facilityIdValue}</span>
        <span id='rm_criteria' onClick={() => { this.props.removeCriteria('facilityIdValue') }} alt='cross-icon' className='cross-icon' />
        </p>
      )
    }
    let searchFacilityName = null
    if (this.props.inputData.facilityNameValue) {
      searchFacilityName = (
        <p>Facility Name:
        <span>{this.props.inputData.facilityNameValue}</span>
        <span onClick={() => { this.props.removeCriteria('facilityNameValue') }} alt='cross-icon' className='cross-icon' />
        </p>
      )
    }
    const facilityIterate = resultsPerPage.map((noOfResults) =>
      <option key={noOfResults} value={noOfResults}>{noOfResults}</option>
    )
    // Below code for future reference of UX changes
    // const searchedCriteria = this.state.searchData.map((item) => {
    //   return (
    //     <p onClick={this.removeCriteria.bind(this, item)}>
    //       {item}
    //     </p>
    //   )
    // });
    return (
      <div className='search-toggle col-xs-12 col-sm-12 col-md-12 col-lg-12'>
        <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
          <span className='glyphicon glyphicon-triangle-right' />
          <span>Advanced Search</span>
        </div>
        <div className='search_details col-xs-12 col-sm-9 col-md-9 col-lg-9'>
          <p>Search Results:</p>
          <select
            className='search_dropdown'
            id='dropdownFacilities'
            value={this.props.sizeValue}
            onChange={(event) => this.props.searchApiCall(0, parseInt(dictionaryNilSelectValue(event.target.options)))}>
            {facilityIterate}
          </select>
          <button disabled={disablePrevious} onClick={() => this.props.changePage(this.props.pageNumber - 1)} className='previous btn btn-default'><p>&#8249;</p></button>
          <span className='page_number'>{this.props.pageNumber}</span>
          <span>of</span>
          <span className='noOfPages'>{noOfPages}</span>
          <button id='next_button' disabled={disableNext} onClick={() => this.props.changePage(this.props.pageNumber + 1)} className='next btn btn-default'><p>&#8250;</p></button>
          {searchFacilityId}
          {searchFacilityName}
        </div>
        <div className='toggle_result col-xs-12 col-sm-3 col-md-3 col-lg-3'>
          <div className='pull-right'>
            <div id='toggle_button' onClick={this.props.handleToggle} className={(this.props.toggeledResult ? 'line_off-icon' : 'line_on-icon') + ' ' + 'navbar-brand'} alt={'list'} />
            <div onClick={this.props.handleToggle} className={(this.props.toggeledResult ? 'grid_on-icon' : 'grid_off-icon') + ' ' + 'navbar-brand'} alt={'grid'} />
          </div>
        </div>
      </div>
    )
  }
}

SearchDetails.propTypes = {
  totalNoOfFacilities: PropTypes.number,
  sizeValue: PropTypes.number,
  pageNumber: PropTypes.number,
  handleToggle: PropTypes.func,
  toggeledResult: PropTypes.bool,
  removeCriteria: PropTypes.func,
  searchApiCall: PropTypes.func,
  changePage: PropTypes.func
}
SearchDetails.defaultProps = {
  totalNoOfFacilities: 0,
  pageNumber: 1,
  toggeledResult: true,
  sizeValue: 10
}
