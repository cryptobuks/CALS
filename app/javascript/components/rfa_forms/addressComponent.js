import React from 'react'
import PropTypes from 'prop-types'
import {CommonAddressComponent} from 'react-wood-duck'
import {fetchRequest} from 'helpers/http'

export default class AddressComponent extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      suggestions: []
    }
    this.onSuggestionSelected = this.onSuggestionSelected.bind(this)
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this)
  }
  onSuggestionsFetchRequested ({value, reason}) {
    let url = '/geoservice/'
    let params = encodeURIComponent(value)
    fetchRequest(url, 'POST', params).then(
      response => response.json()).then((response) => {
      return this.setState({
        suggestions: response
      })
    }).catch(() => {
      return this.setState({
        suggestions: []
      })
    })
  }
  onSuggestionSelected (event, {suggestion, suggestionValue, suggestionIndex, sectionIndex, method}, addressType) {
    let url = '/geoservice/validate'
    let params = suggestion
    let updateSuggetions
    fetchRequest(url, 'POST', params).then(
      response => response.json()).then((response) => {
      updateSuggetions = Array.isArray(response) ? response[0] : suggestion
      this.props.onSelection(updateSuggetions)
    }).catch(() => {
      updateSuggetions = suggestion
      this.props.onSelection(updateSuggetions)
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
