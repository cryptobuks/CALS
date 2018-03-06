import React from 'react'
import PropTypes from 'prop-types'
import {resultsPerPage} from './common/commonUtils'
import {dictionaryNilSelectValue, floatToNextInt} from 'helpers/commonHelper.jsx'

export default class SearchDetails extends React.Component {
  render () {
    const searchCount = this.props.totalNoOfFacilities
    const noOfPages = floatToNextInt(searchCount, this.props.sizeValue)
    let searchFacilityId = null
    if (this.props.inputData.facilityIdValue) {
      searchFacilityId = (
        <p>Facility ID:
        <span>{this.props.inputData.facilityIdValue}</span>
        <span id='rm_criteria' onClick={() => { this.props.handleInputChange('facilityIdValue', ''); this.props.searchApiCall(this.props.fromValue, this.props.sizeValue) }} alt='cross-icon' className='cross-icon' />
        </p>
      )
    }
    let searchFacilityName = null
    if (this.props.inputData.facilityNameValue) {
      searchFacilityName = (
        <p>Facility Name:
        <span>{this.props.inputData.facilityNameValue}</span>
        <span onClick={() => { this.props.handleInputChange('facilityNameValue', ''); this.props.searchApiCall(this.props.fromValue, this.props.sizeValue) }} alt='cross-icon' className='cross-icon' />
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
            onChange={(event) => this.props.handleChange(dictionaryNilSelectValue(event.target.options))}>
            {facilityIterate}
          </select>
          <button disabled={this.props.disablePrevious} onClick={() => this.props.backToPreviousPage(this.props.fromValue, this.props.sizeValue, this.props.pageNumber)} className='previous btn btn-default'><p>&#8249;</p></button>
          <span className='page_number'>{this.props.pageNumber}</span>
          <span>of</span>
          <span className='noOfPages'>{noOfPages}</span>
          <button id='next_button' disabled={this.props.disableNext} onClick={() => this.props.changeToNextPage(this.props.fromValue, this.props.sizeValue, this.props.pageNumber)} className='next btn btn-default'><p>&#8250;</p></button>
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
  state: PropTypes.object
}
