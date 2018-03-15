import React from 'react'
import PropTypes from 'prop-types'
import {SmallInnerBlockDetails} from './smallInnerBlockDetails.js'
import {checkForNA, checkforDateOrNa, checkNameorNA, handleLicenseEffectiveDate} from 'search/common/commonUtils'

const FacilityDetails = ({facilityData}) => (
  <div className='facility-details grid_view col-xs-12 col-sm-12 col-md-12 col-lg-12'>
    <div>
      <div>
        <h3>
                      FACILITY TYPE : {' ' + checkForNA(facilityData.type)}
        </h3>
      </div>
    </div>
    <div className='headliner col-xs-12 col-sm-12 col-md-12 col-lg-12' />
    <div className='facility_blocks col-xs-12 col-sm-12 col-md-12 col-lg-12'>
      <div className='col-xs-12 col-sm-4 col-md-4 col-lg-4'>
        <div className='inner_block'>
          <SmallInnerBlockDetails
            title='NAME OF LICENSEE / PARENTS'
            value={facilityData.licensee_name} />
          <SmallInnerBlockDetails
            title='APPROVAL / LICENSING WORKER'
            value={checkForNA(facilityData.assigned_worker)} />
          <SmallInnerBlockDetails
            title='ASSIGNED OVERSIGHT AGENCY'
            value={checkNameorNA(facilityData.district_office)} />
        </div>
      </div>
      <div className='col-xs-12 col-sm-4 col-md-4 col-lg-4'>
        <div className='inner_block'>
          <SmallInnerBlockDetails
            title='FACILITY LICENSE NUMBER'
            value={facilityData.license_number} />
          <SmallInnerBlockDetails
            title='LICENSE STATUS'
            value={checkForNA(facilityData.status)} />
          <SmallInnerBlockDetails
            title='CAPACITY / CAPACITY LAST CHANGED'
            value={facilityData.capacity + ' / ' + checkforDateOrNa(facilityData.capacity_last_changed)} />
        </div>
      </div>
      <div className='col-xs-12 col-sm-4 col-md-4 col-lg-4'>
        <div className='inner_block'>
          <SmallInnerBlockDetails
            title='LICENSE EFFECTIVE DATE'
            value={handleLicenseEffectiveDate(facilityData)} />
          <SmallInnerBlockDetails
            title='APPLICATION RECEIVED DATE'
            value={checkforDateOrNa(facilityData.original_application_recieved_date)} />
        </div>
      </div>
    </div>
  </div>

)

FacilityDetails.propTypes = {
  facilityData: PropTypes.object.isRequired
}

FacilityDetails.defaultProps = {
  facilityData: {}
}

export default FacilityDetails
