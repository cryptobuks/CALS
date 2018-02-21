import React from 'react'
import Immutable from 'immutable'
import AddressCard from './addressCard'
import AboutThisResidenceCard from './aboutThisResidenceCard.jsx'
import PropTypes from 'prop-types'
import {blankResidenceFields} from 'constants/defaultFields'
import {physicalAddressType, mailingAddressType} from 'constants/rfaConstants'
import CardLayout from 'components/common/cardLayout'

export default class ResidenceCards extends React.Component {
  constructor (props) {
    super(props)
    this.setResidenceState = this.setResidenceState.bind(this)
    this.handleClearOnConditionalChange = this.handleClearOnConditionalChange.bind(this)
  }

  setResidenceState (key, value) {
    let newData = Immutable.fromJS(this.props.residence)
    newData = newData.set(key, value)
    this.props.setParentState('residence', newData.toJS())
  }

  handleClearOnConditionalChange (key, hiddenKey, value, hiddenDefaultValue) {
    if (value === 'true') {
      let residence = Immutable.fromJS(this.props.residence)
      residence = residence.set(key, value)
      if (hiddenKey === 'addresses') {
        // if value from the conditional is true, we want to clear the entered data
        // in Mailing address. need to set the key/value from  regardless.
        const index = this.props.residence.addresses.findIndex(o => o.type.value === 'Mailing')
        residence = residence.setIn([hiddenKey, index], hiddenDefaultValue)
        this.props.setParentState('residence', residence.toJS())
      } else {
        residence = residence.set(hiddenKey, hiddenDefaultValue)
        this.props.setParentState('residence', residence.toJS())
      }
    } else {
      this.setResidenceState(key, value)
    }
  }

  render () {
    let residenceData = this.props.residence
    return (
      <div>
        <CardLayout
          idClassName='residence_address_cards'
          id='residentAddress'
          textAlignment='left'
          label='Address'
          handleOnClick={() => this.props.setFocusState('residentAddress')}
          focusClassName={this.props.getFocusClassName('residentAddress') + ' ' +
          'card phone-section double-gap-top active-bar'}>

          <AddressCard
            stateTypes={this.props.stateTypes}
            physicalAddress={residenceData.addresses.find(o => o.type.value === physicalAddressType)}
            mailingAddress={residenceData.addresses.find(o => o.type.value === mailingAddressType)}
            physicalMailingSimilar={residenceData.physical_mailing_similar}
            setParentState={this.setResidenceState}
            handleClearOnConditionalChange={this.handleClearOnConditionalChange} />
        </CardLayout>

        <CardLayout
          idClassName='residence_about_cards'
          id='aboutResidence'
          textAlignment='left'
          label='About This Residence'
          handleOnClick={() => this.props.setFocusState('aboutResidence')}
          focusClassName={this.props.getFocusClassName('aboutResidence') + ' ' +
          'card phone-section double-gap-top active-bar'}>

          <AboutThisResidenceCard
            residenceTypes={this.props.residenceTypes}
            languageTypes={this.props.languageTypes}
            aboutResidence={residenceData}
            setParentState={this.setResidenceState}
            handleClearOnConditionalChange={this.handleClearOnConditionalChange} />
        </CardLayout>
      </div>
    )
  }
}

ResidenceCards.propTypes = {
  residence: PropTypes.object
}

ResidenceCards.defaultProps = {
  residence: blankResidenceFields
}
