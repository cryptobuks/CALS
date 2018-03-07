import React from 'react'
import PropTypes from 'prop-types'
import {SmallInnerBlockDetails} from './smallInnerBlockDetails.js'
import {checkForNA, checkforDateOrNa, checkNameorNA, handleLicenseEffectiveDate} from 'search/common/commonUtils'

export default class FacilityDetails extends React.Component {
  render () {
    const result = this.props.facilityData
    return (
      <div className='facility-details grid_view col-xs-12 col-sm-12 col-md-12 col-lg-12'>
        <div>
          <div>
            <h3>
                      FACILITY TYPE : {' ' + checkForNA(result.type)}
            </h3>
          </div>
        </div>
        <div className='headliner col-xs-12 col-sm-12 col-md-12 col-lg-12' />
        <div className='facility_blocks col-xs-12 col-sm-12 col-md-12 col-lg-12'>
          <div className='col-xs-12 col-sm-4 col-md-4 col-lg-4'>
            <div className='inner_block'>
              <SmallInnerBlockDetails
                title='NAME OF LICENSEE / PARENTS'
                value={result.licensee_name} />
              <SmallInnerBlockDetails
                title='APPROVAL / LICENSING WORKER'
                value={checkForNA(result.assigned_worker)} />
              <SmallInnerBlockDetails
                title='ASSIGNED OVERSIGHT AGENCY'
                value={checkNameorNA(result.district_office)} />
            </div>
          </div>
          <div className='col-xs-12 col-sm-4 col-md-4 col-lg-4'>
            <div className='inner_block'>
              <SmallInnerBlockDetails
                title='FACILITY LICENSE NUMBER'
                value={result.license_number} />
              <SmallInnerBlockDetails
                title='LICENSE STATUS'
                value={checkForNA(result.status)} />
              <SmallInnerBlockDetails
                title='CAPACITY / CAPACITY LAST CHANGED'
                value={result.capacity + ' / ' + checkforDateOrNa(result.capacity_last_changed)} />
            </div>
          </div>
          <div className='col-xs-12 col-sm-4 col-md-4 col-lg-4'>
            <div className='inner_block'>
              <SmallInnerBlockDetails
                title='LICENSE EFFECTIVE DATE'
                value={handleLicenseEffectiveDate(result)} />
              <SmallInnerBlockDetails
                title='APPLICATION RECEIVED DATE'
                value={checkforDateOrNa(result.original_application_recieved_date)} />
            </div>
          </div>
        </div>
      </div>

    )
  }
}

FacilityDetails.propTypes = {
  facilityData: PropTypes.object.isRequired
}

FacilityDetails.defaultProps = {
  facilityData: {}
}
