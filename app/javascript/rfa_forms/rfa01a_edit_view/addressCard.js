import React from 'react'
import Immutable from 'immutable'
import PropTypes from 'prop-types'
import YesNoRadioComponent from 'components/common/yesNoFields'
import {physicalAddressType, mailingAddressType} from 'constants/rfaConstants'
import {getDictionaryId, dictionaryNilSelect, dictionaryNilSelectValue, findArrayValueByMethod} from 'helpers/commonHelper.jsx'
import AddressComponent from 'components/rfa_forms/addressComponent'
import {blankPhysicalAddress, blankMailingAddress} from 'constants/defaultFields'
import {fetchRequest} from 'helpers/http'

export default class AddressCard extends React.Component {
  constructor (props) {
    super(props)
    this.onMailingAddressChange = this.onMailingAddressChange.bind(this)
    this.onPhysicalAddressChange = this.onPhysicalAddressChange.bind(this)
  }

  onMailingAddressChange (key, value) {
    let mailingAddress = Immutable.fromJS(this.props.mailingAddress)
    mailingAddress = mailingAddress.set(key, value)
    let addresses = Immutable.List([this.props.physicalAddress, mailingAddress])
    this.props.setParentState('addresses', addresses.toJS())
  }

  onPhysicalAddressChange (key, value) {
    let physicalAddress = Immutable.fromJS(this.props.physicalAddress)
    physicalAddress = physicalAddress.set(key, value)
    let addresses = Immutable.List([physicalAddress, this.props.mailingAddress])
    this.props.setParentState('addresses', addresses.toJS())
  }

  render () {
    return (
      <div className='card-body'>
        <div className='row'>
          <AddressComponent
            stateTypes={this.props.stateTypes}
            addressTitle='Physical Address (required)'
            id='street_address'
            addressType={physicalAddressType}
            addressFields={this.props.physicalAddress}
            mailingAddress={this.props.mailingAddress}
            setParentState={this.props.setParentState}
            parentStateKey='addresses'
            onChange={(fieldId, event) => this.onPhysicalAddressChange(fieldId, event)} />
          <YesNoRadioComponent
            label='Mailing address the same as Physical Address? (required)'
            idPrefix='mailing_similar'
            value={this.props.physicalMailingSimilar}
            onFieldChange={(event) => this.props.handleClearOnConditionalChange(
              'physical_mailing_similar', 'addresses', event.target.value, blankMailingAddress)} />
          {
            this.props.physicalMailingSimilar.toString() === 'false'
              ? <AddressComponent
                stateTypes={this.props.stateTypes}
                addressTitle='Mailing Address (required)'
                id='street_address'
                parentStateKey='addresses'
                addressType={mailingAddressType}
                addressFields={this.props.mailingAddress}
                physicalAddress={this.props.physicalAddress}
                setParentState={this.props.setParentState}
                onChange={(fieldId, event) => this.onMailingAddressChange(fieldId, event)} />
              : null
          }
        </div>
      </div>
    )
  }
}

AddressCard.propTypes = {
  handleClearOnConditionalChange: PropTypes.func
}

AddressCard.defaultProps = {
  physicalMailingSimilar: '',
  suggestions: [],
  mailingAddress: blankMailingAddress,
  physicalAddress: blankPhysicalAddress
}
