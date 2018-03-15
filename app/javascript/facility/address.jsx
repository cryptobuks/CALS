import React from 'react'
import PropTypes from 'prop-types'
import {SmallInnerBlockDetails} from './smallInnerBlockDetails.js'
import {InnerBlockAddressTitles} from './innerBlockAddressTitles.js'
import {checkForNA, checkforDateOrNa, cityStateZipOfRespectiveAddressOrNA, respectiveNumberOrNA, respectiveStreetAddressOrNA,
  primaryPhoneRelation, alternativePhoneRelation, physicalAddressType, mailingAddressType} from 'search/common/commonUtils'
import {facilityDataDefaults} from 'constants/defaultFields'

const FacilityAddress = ({
  facilityData
}) => (
  <div className='facility-address col-xs-12 col-sm-12 col-md-12 col-lg-12'>
    <div className='facility-address-block col-xs-12 col-sm-12 col-md-12 col-lg-12'>
      <div className='facility-address-details col-xs-12 col-sm-4 col-md-4 col-lg-4'>
        <div className='inner_block'>
          <InnerBlockAddressTitles
            title='PHYSICAL ADDRESS'
            streetApt={respectiveStreetAddressOrNA(facilityData.addresses, physicalAddressType)}
            cityCountry={cityStateZipOfRespectiveAddressOrNA(facilityData.addresses, physicalAddressType)} />
          <SmallInnerBlockDetails
            title='COUNTY NAME'
            value={checkForNA(facilityData.county)} />
          <SmallInnerBlockDetails
            title='PRIMARY PHONE'
            value={respectiveNumberOrNA(facilityData.phones, primaryPhoneRelation)} />
        </div>
      </div>
      <div className='col-xs-12 col-sm-4 col-md-4 col-lg-4'>
        <div className='inner_block'>
          <InnerBlockAddressTitles
            title='POSTAL ADDRESS'
            streetApt={respectiveStreetAddressOrNA(facilityData.addresses, mailingAddressType)}
            cityCountry={cityStateZipOfRespectiveAddressOrNA(facilityData.addresses, mailingAddressType)} />
          <SmallInnerBlockDetails
            classNameTitle=''
            title='ALTERNATIVE PHONE'
            value={respectiveNumberOrNA(facilityData.phones, alternativePhoneRelation)} />
        </div>
      </div>
      <div className='col-xs-12 col-sm-4 col-md-4 col-lg-4'>
        <div className='inner_block'>
          <SmallInnerBlockDetails
            title='LAST VISIT DATE'
            value={checkforDateOrNa(facilityData.last_visit_date)} />
          <SmallInnerBlockDetails
            title='LAST VISIT REASON'
            value={checkForNA(facilityData.last_visit_reason)} />
        </div>
      </div>
    </div>
  </div>
)

FacilityAddress.propTypes = {
  facilityData: PropTypes.object.isRequired
}

FacilityAddress.defaultProps = {
  facilityData: facilityDataDefaults
}

export default FacilityAddress
