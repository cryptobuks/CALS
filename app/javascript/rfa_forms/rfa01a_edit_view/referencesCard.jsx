import React from 'react'
import Immutable from 'immutable'
import {InputComponent} from 'components/common/inputFields'
import CompleteNameFields from './completeNameField'
import PropTypes from 'prop-types'
import CleaveInputField from 'components/common/cleaveInputField.jsx'
import {fieldErrorsAsImmutableSet} from 'helpers/validationHelper.jsx'
import AddressComponent from 'components/rfa_forms/addressComponent.js'
import {fetchRequest} from 'helpers/http'

const phoneNumberRule = {rule: 'is10digits', message: 'Invalid Phone Number'}

export default class ReferencesCard extends React.Component {
  constructor (props) {
    super(props)
    this.handleAddressChange = this.handleAddressChange.bind(this)
    this.handleFullAddressChange = this.handleFullAddressChange.bind(this)
    this.state = {
      suggestions: []
    }
    this.props.validator.addFieldValidation(this.props.idPrefix + 'phone_number', phoneNumberRule)
  }
  handleAddressChange (key, value) {
    let mailingAddressObj = Immutable.fromJS(this.props.reference.mailing_address)
    mailingAddressObj = mailingAddressObj.set(key, value)
    this.props.setParentState('mailing_address', mailingAddressObj.toJS(), this.props.index)
  }

  handleFullAddressChange (key, value) {
    let reference = Immutable.fromJS(this.props.reference)
    reference = reference.set(key, value)
    this.props.setParentState('mailing_address', reference.get(key), this.props.index)
  }

  render () {
    const phoneNumberId = this.props.idPrefix + 'phone_number'
    const reference = this.props.reference
    return (
      <div>
        <CompleteNameFields
          index={this.props.index}
          firstName={reference.first_name}
          middleName={reference.middle_name}
          lastName={reference.last_name}
          nameSuffix={reference.name_suffix}
          namePrefix={reference.name_prefix}
          suffixTypes={this.props.suffixTypes}
          prefixTypes={this.props.prefixTypes}
          onChange={this.props.setParentState} />
        <div className='col-md-12'>
          <AddressComponent
            index={this.props.index}
            stateTypes={this.props.stateTypes}
            addressTitle='Physical Address'
            id='street_address'
            parentStateKey='mailing_address'
            setParentState={this.handleFullAddressChange}
            addressFields={this.props.reference.mailing_address}
            onChange={(fieldId, event) => this.handleAddressChange(fieldId, event)}
          />
        </div>
        <div className='col-md-12'>
          <CleaveInputField
            gridClassName='col-md-4'
            id={phoneNumberId}
            value={this.props.reference.phone_number}
            label='Phone Number'
            placeholder=''
            blurPlaceholder=''
            focusPlaceholder='(___)___-____'
            options={{
              delimiters: ['(', ')', '-'],
              blocks: [0, 3, 3, 4],
              numericOnly: true}}
            type='text'
            errors={fieldErrorsAsImmutableSet(this.props.errors.phone_number)}
            onChange={(event) => this.props.setParentState('phone_number', event.target.rawValue, this.props.index)}
            onBlur={(event) => this.props.validator.validateFieldSetErrorState(phoneNumberId, event.target.rawValue)} />

          <InputComponent gridClassName='col-md-4' id='email'
            value={this.props.reference.email}
            label='Email (optional)' placeholder=''
            type='text' onChange={(event) => this.props.setParentState('email',
              event.target.value, this.props.index)} />
        </div>
      </div>
    )
  }
}

ReferencesCard.propTypes = {
  index: PropTypes.number,
  suffixTypes: PropTypes.array.isRequired,
  reference: PropTypes.object.isRequired,
  prefixTypes: PropTypes.array.isRequired,
  nameTypes: PropTypes.array.isRequired,
  stateTypes: PropTypes.array.isRequired,
  setParentState: PropTypes.func.isRequired
}

ReferencesCard.defaultProps = {
  index: 0,
  idPrefix: '',
  errors: {}
}
