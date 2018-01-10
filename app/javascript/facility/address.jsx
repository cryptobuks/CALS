import React from 'react'
import PropTypes from 'prop-types'
import {SmallInnerBlockDetails} from './smallInnerBlockDetails.js'
import {InnerBlockAddressTitles} from './innerBlockAddressTitles.js'
import {checkForNA, checkValueForNull, checkforDateOrNa, cityStateZipOfRespectiveAddressOrNA, respectiveNumberOrNA, respectiveStreetAddressOrNA} from '../search/common/commonUtils'
import {facilityDataDefaults} from 'constants/defaultFields'

export default class FacilityAddress extends React.Component {
  render () {
    let result = this.props.facilityData
    const primaryPhoneRelation = 'primary'
    const alternativePhoneRelation = 'Alternative'
    const physicalAddressType = 'Residential'
    const mailingAddressType = 'Mailing'
    return (
      <div className='facility-address col-xs-12 col-sm-12 col-md-12 col-lg-12'>
        <div className='facility-address-block col-xs-12 col-sm-12 col-md-12 col-lg-12'>
          <div className='facility-address-details col-xs-12 col-sm-4 col-md-4 col-lg-4'>
            <div className='inner_block'>
              <InnerBlockAddressTitles
                classNameTitle=''
                title='PHYSICAL ADDRESS'
                streetApt={respectiveStreetAddressOrNA(result.addresses, physicalAddressType)}
                cityCountry={cityStateZipOfRespectiveAddressOrNA(result.addresses, physicalAddressType)} />
              <SmallInnerBlockDetails
                classNameTitle=''
                title='COUNTY NAME'
                value={result.county.value} />
              <div>
                <SmallInnerBlockDetails
                  classNameTitle='phone_primary'
                  title='PRIMARY PHONE'
                  value={respectiveNumberOrNA(result.phones, primaryPhoneRelation)} />
                <SmallInnerBlockDetails
                  classNameTitle='phone_alt'
                  title='ALTERNATIVE PHONE'
                  value={respectiveNumberOrNA(result.phones, alternativePhoneRelation)} />
              </div>
            </div>
          </div>
          <div className='col-xs-12 col-sm-4 col-md-4 col-lg-4'>
            <div className='inner_block'>
              <InnerBlockAddressTitles
                classNameTitle='postal_address'
                title='POSTAL ADDRESS'
                streetApt={respectiveStreetAddressOrNA(result.addresses, mailingAddressType)}
                cityCountry={cityStateZipOfRespectiveAddressOrNA(result.addresses, mailingAddressType)} />
            </div>
          </div>
          <div className='col-xs-12 col-sm-4 col-md-4 col-lg-4'>
            <div className='inner_block'>
              <SmallInnerBlockDetails
                classNameTitle='last_visit'
                title='LAST VISIT DATE'
                value={checkforDateOrNa(result.last_visit_date)} />
              <SmallInnerBlockDetails
                classNameTitle='visit_reason'
                title='LAST VISIT REASON'
                value={checkForNA(result.last_visit_reason)} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

FacilityAddress.propTypes = {
  facilityData: PropTypes.object.isRequired
}

FacilityAddress.defaultProps = {
  facilityData: facilityDataDefaults
}
