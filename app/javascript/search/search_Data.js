import React from 'react'
import PropTypes from 'prop-types'
import {resultsPerPage} from './common/commonUtils'
import {dictionaryNilSelectValue, floatToNextInt, getFromValue} from 'helpers/commonHelper.jsx'

const SearchDetails = ({
  totalNoOfFacilities,
  toggeledResult,
  sizeValue,
  pageNumber,
  searchApiCall,
  handleToggle,
  changePage
}) => (
  <div className='search-toggle col-xs-12 col-sm-12 col-md-12 col-lg-12'>
    <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
    </div>
    <div className='search_details col-xs-12 col-sm-9 col-md-9 col-lg-9'>
      <p>Search Results:</p>
      <select
        className='search_dropdown'
        id='dropdownFacilities'
        value={sizeValue}
        onChange={(event) => searchApiCall(0, parseInt(dictionaryNilSelectValue(event.target.options)))}>
        {resultsPerPage.map((noOfResults) =>
          <option key={noOfResults} value={noOfResults}>{noOfResults}</option>
        )}
      </select>
      <button
        id='previous_button'
        disabled={getFromValue(sizeValue, pageNumber) - sizeValue < 0}
        onClick={() => changePage(pageNumber - 1)}
        className='previous btn btn-default'>
        <p>&#8249;</p>
      </button>
      <span className='page_number'>{pageNumber}</span>
      <span>of</span>
      <span className='noOfPages'>{floatToNextInt(totalNoOfFacilities, sizeValue)}</span>
      <button
        id='next_button'
        disabled={getFromValue(sizeValue, pageNumber) + sizeValue >= totalNoOfFacilities}
        onClick={() => changePage(pageNumber + 1)}
        className='next btn btn-default'>
        <p>&#8250;</p>
      </button>
    </div>
    <div className='toggle_result col-xs-12 col-sm-3 col-md-3 col-lg-3'>
      <div className='pull-right'>
        <div id='toggle_button' onClick={handleToggle} className={(toggeledResult ? 'line_off-icon' : 'line_on-icon') + ' ' + 'navbar-brand'} alt={'list'} />
        <div onClick={handleToggle} className={(toggeledResult ? 'grid_on-icon' : 'grid_off-icon') + ' ' + 'navbar-brand'} alt={'grid'} />
      </div>
    </div>
  </div>
)

SearchDetails.propTypes = {
  totalNoOfFacilities: PropTypes.number,
  sizeValue: PropTypes.number,
  pageNumber: PropTypes.number,
  handleToggle: PropTypes.func,
  toggeledResult: PropTypes.bool,
  searchApiCall: PropTypes.func,
  changePage: PropTypes.func
}
SearchDetails.defaultProps = {
  totalNoOfFacilities: 0,
  pageNumber: 1,
  toggeledResult: true,
  sizeValue: 10,
  facilityNameValue: '',
  facilityIdValue: ''
}

export default SearchDetails
