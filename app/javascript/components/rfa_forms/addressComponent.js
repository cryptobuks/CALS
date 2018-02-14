import React from 'react'
import PropTypes from 'prop-types'
import {CommonAddressComponent} from 'react-wood-duck'
import {fetchRequest} from 'helpers/http'
import Immutable from 'immutable'

export default class AddressComponent extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      suggestions: [],
      timeout: null
    }
    this.onSuggestionSelected = this.onSuggestionSelected.bind(this)
    this.onSelectionUpdateProp = this.onSelectionUpdateProp.bind(this)
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this)
  }

  onInvalidAddressSelection (updateSuggetions) {
    updateSuggetions.city = ''
    updateSuggetions.state = null
    // updateSuggetions.state = this.props.stateTypes.find(x => x.id === updateSuggetions.state)
    // TODO: Have to find a fix for state to see why invalid address is causing an issue
    updateSuggetions.zip = ''

    let addressObj = Immutable.fromJS(this.props.addressFields)
    addressObj = addressObj.update(x => updateSuggetions)
    this.props.onSelection(addressObj)
  }

  onSuggestionsFetchRequested ({value, reason}) {
    let current = this;
    if(this.state.timeout) {
      clearTimeout(this.state.timeout);
    }
    let timeout = setTimeout(function () {
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
    }, 300);
    this.setState({timeout:timeout});
  }

  onSelectionUpdateProp (updateSuggetions) {
    let addressObj = Immutable.fromJS(this.props.addressFields)
    updateSuggetions.state = this.props.stateTypes.find(x => x.id === updateSuggetions.state)
    addressObj = addressObj.update(x => updateSuggetions)
    this.props.onSelection(addressObj)
  }

  onSuggestionSelected (event, {suggestion, suggestionValue, suggestionIndex, sectionIndex, method}, addressType) {
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
  addressType: '',
  placeholder: '',
  addressTitle: 'Physical Address',
  suggestions: []
}
