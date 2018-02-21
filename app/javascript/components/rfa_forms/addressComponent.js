import React from 'react'
import PropTypes from 'prop-types'
import {CommonAddressComponent} from 'react-wood-duck'
import {physicalAddressType, mailingAddressType} from 'constants/rfaConstants'
import {blankPhysicalAddress, blankMailingAddress} from 'constants/defaultFields'
import {fetchRequest} from 'helpers/http'
import Immutable from 'immutable'

export default class AddressComponent extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      suggestions: []
    }
    this.onSuggestionSelected = this.onSuggestionSelected.bind(this)
    this.onSelectionUpdateProp = this.onSelectionUpdateProp.bind(this)
    this.onInvalidAddressSelection = this.onInvalidAddressSelection.bind(this)
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this)
    this.onSelection = this.onSelection.bind(this)
  }

  onSelection (parentStateKey, addressType, autoFillData) {
    const blankAddressFields = (addressType === physicalAddressType)
      ? blankPhysicalAddress : blankMailingAddress

    autoFillData.type = blankAddressFields.type

    let addresses = addressType === physicalAddressType
      ? Immutable.List([autoFillData, this.props.mailingAddress].filter(n => n))
      : Immutable.List([this.props.physicalAddress, autoFillData].filter(n => n))

    addresses.size === 1
      ? this.props.setParentState(parentStateKey, addresses.toObject()[0])
      : this.props.setParentState(parentStateKey, addresses.toJS())
  }

  onInvalidAddressSelection (updateSuggetions) {
    if (updateSuggetions) {
      updateSuggetions.city = ''
      updateSuggetions.state = null
      updateSuggetions.zip = ''
      let addressObj = Immutable.fromJS(this.props.addressFields)
      addressObj = addressObj.update(x => updateSuggetions)
      this.onSelection(this.props.parentStateKey, this.props.addressType, addressObj)
    }
  }

  onSuggestionsFetchRequested ({value, reason}) {
    let current = this
    if (this.fetchTimeout) {
      clearTimeout(this.fetchTimeout)
    }
    this.fetchTimeout = setTimeout(function () {
      let url = '/geoservice/'
      let params = encodeURIComponent(value)
      fetchRequest(url, 'POST', params).then(
        response => response.json()).then((response) => {
        return current.setState({
          suggestions: response
        })
      }).catch(() => {
        return current.setState({
          suggestions: []
        })
      })
    }, 300)
  }

  onSelectionUpdateProp (updateSuggetions) {
    let addressObj = Immutable.fromJS(this.props.addressFields)
    updateSuggetions.state = this.props.stateTypes.find(x => x.id === updateSuggetions.state)
    addressObj = addressObj.update(x => updateSuggetions)
    this.onSelection(this.props.parentStateKey, this.props.addressType, addressObj)
  }

  onSuggestionSelected (event, {suggestion, suggestionValue, suggestionIndex, sectionIndex, method}) {
    let url = '/geoservice/validate'
    let params = suggestion
    let updateSuggetions
    fetchRequest(url, 'POST', params).then(
      response => response.json()).then((response) => {
      updateSuggetions = Array.isArray(response) ? this.onSelectionUpdateProp(response[0]) : this.onInvalidAddressSelection(suggestion)
    }).catch(() => {
      updateSuggetions = suggestion
      this.onInvalidAddressSelection(updateSuggetions)
    })
  }

  render () {
    return (
      <CommonAddressComponent
        addressTitle={this.props.addressTitle}
        addressType={this.props.addressType}
        id={this.props.id}
        suggestions={this.state.suggestions}
        addressFields={this.props.addressFields}
        stateTypes={this.props.stateTypes}
        onChange={this.props.onChange}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionSelected={this.onSuggestionSelected}
      />
    )
  }
}

AddressComponent.propTypes = {
  addressType: PropTypes.string,
  id: PropTypes.string,
  addressTitle: PropTypes.string.isRequired,
  addressFields: PropTypes.object.isRequired,
  stateTypes: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  suggestions: PropTypes.array.isRequired
}

AddressComponent.defaultProps = {
  addressType: physicalAddressType,
  placeholder: '',
  addressTitle: 'Physical Address',
  suggestions: [],
  parentStateKey: ''
}
