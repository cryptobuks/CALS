import React from 'react'

const SearchNotFound = () => (
  <div className='grid_view col-xs-12 col-sm-12 col-md-12 col-lg-12'>
    <div className='grid_view_inner no_results col-xs-12 col-sm-12 col-md-12 col-lg-12'>
      <div className='col-xs-12 col-sm-1 col-md-1 col-lg-1'>
        <div className='error-icon' />
      </div>
      <div className='col-xs-12 col-sm-11 col-md-11 col-lg-11'>
        <p className='error_message'>
              No result found with the selected search criteria,
              Please refine your search and try again
        </p>
      </div>
    </div>
  </div>
)
export default SearchNotFound
