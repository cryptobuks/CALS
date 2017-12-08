import React from 'react'
import PropTypes from 'prop-types'
import {InputComponent} from '../common/inputFields'
import {DropDownField} from '../common/dropDownField'
import {getDictionaryId, dictionaryNilSelect} from 'helpers/commonHelper.jsx'
import ReactAutosuggest from 'react-autosuggest'

export default class CommonAddressFields extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      suggestions: this.props.suggestions
    }

    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this)
    this.getSuggestionValue = this.getSuggestionValue.bind(this)
    this.renderSuggestion = this.renderSuggestion.bind(this)
    this.onStreetAddressChange = this.onStreetAddressChange.bind(this)
  }

  getSuggestionValue (suggestion) {
    return suggestion.street_address
  }
  onSuggestionsClearRequested () {
    // this.props.onSelection(suggestion)
  }

  renderSuggestion (suggestion) {
    return (
      <div>
        {suggestion.street_address}, {suggestion.city}, {suggestion.state}
      </div>
    )
  }
  onStreetAddressChange (event, {newValue}) {
    this.props.onChange(this.props.id, newValue)
  }
  render () {
    const addressFields = this.props.addressFields
    const inputProps = {
      id: this.props.addressType + this.props.id,
      placeholder: this.props.placeholder,
      value: addressFields.street_address,
      onChange: this.onStreetAddressChange
    }
    return (
      <div>
        <div className='col-md-12'>
          <label>{this.props.addressTitle}</label>
          <ReactAutosuggest
            suggestions={this.props.suggestions}
            inputProps={inputProps}
            renderSuggestion={this.renderSuggestion}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={this.getSuggestionValue}
            onSuggestionsFetchRequested={this.props.onSuggestionsFetchRequested}
            onSuggestionSelected={this.props.onSuggestionSelected}
          />
        </div>
        <InputComponent gridClassName='col-md-4' id={this.props.addressType + 'zip'}
          value={addressFields.zip}
          label='Zip' placeholder=''
          type='text' onChange={(event) => this.props.onChange('zip', event.target.value)} />
        <InputComponent gridClassName='col-md-4' id={this.props.addressType + 'city'}
          value={addressFields.city}
          label='City' placeholder=''
          type='text' onChange={(event) => this.props.onChange('city', event.target.value)} />
        <DropDownField gridClassName='col-md-4' id={this.props.addressType + 'state_type'}
          selectClassName='reusable-select'
          value={getDictionaryId(addressFields.state)}
          optionList={this.props.stateTypes}
          label='State'
          onChange={(event) => this.props.onChange('state', dictionaryNilSelect(event.target.options))} />
      </div>
    )
  }
}
CommonAddressFields.propTypes = {
  addressType: PropTypes.string,
  id: PropTypes.string,
  // index: PropTypes.number,
  addressTitle: PropTypes.string.isRequired,
  suggestions: PropTypes.array.isRequired,
  addressFields: PropTypes.object.isRequired,
  stateTypes: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  onSelection: PropTypes.func,
  onSuggestionsFetchRequested: PropTypes.func,
  onSuggestionSelected: PropTypes.func
}

CommonAddressFields.defaultProps = {
  addressType: '',
  placeholder: '',
  suggestions: [],
  onSuggestionsFetchRequested: () => { console.log('Please provide fetch method as prop') },
  onSuggestionSelected: () => { console.log('Please provide suggestion method as prop') }
}
