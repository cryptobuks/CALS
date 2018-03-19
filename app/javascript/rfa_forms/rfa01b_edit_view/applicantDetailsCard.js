import React from 'react'
import Immutable from 'immutable'
import PropTypes from 'prop-types'
import CompleteNameFields from 'rfa_forms/rfa01a_edit_view/completeNameField.jsx'
import {InputComponent} from 'components/common/inputFields'
import {fieldErrorsAsImmutableSet} from 'helpers/validationHelper.jsx'
import InputField from 'components/common/inputField.jsx'
import {DropDownFormField} from 'components/common/dropDownFormField.jsx'
import {BinarySelectorField} from 'components/common/binarySelectorField'
import CardLayout from 'components/common/cardLayout'
import AddressComponent from 'components/rfa_forms/addressComponent.js'
import {Rfa01bApplicantDetailsCardText, RfaCommon} from 'constants/rfaText'
import {residenceAddressValueDefaults, rfa01BapplicantDefaults} from 'constants/defaultFields'
import {DateField} from 'components/common/dateFields'

import {getDictionaryId, dictionaryNilSelect, FormatDateForDisplay, FormatDateForPersistance} from 'helpers/commonHelper.jsx'
import Validator from 'helpers/validator'

const dateValidator = {rule: 'isValidDate', message: 'date is invalid'}

export default class ApplicantDetailsCard extends React.Component {
  constructor (props) {
    super(props)
    //  this.validateDLcombo = this.validateDLcombo.bind(this)
    this.props.validator.addFieldValidation('date_of_birth', dateValidator)
  }

  onAddressChange (key, value) {
    let residenceAddress = Immutable.fromJS(this.props.application.residence_address || residenceAddressValueDefaults)
    residenceAddress = residenceAddress.set(key, value)
    this.props.setParentState('residence_address', residenceAddress.toJS())
  }

  render () {
    let application = this.props.application
    let residenceAddress = this.props.application.residence_address || residenceAddressValueDefaults

    let residenceAddressValues = {
      'street_address': residenceAddress.street_address,
      'zip': residenceAddress.zip,
      'city': residenceAddress.city,
      'state': residenceAddress.state,
      'type': residenceAddress.type
    }

    return (
      <CardLayout
        idClassName='appliant_details_card'
        id='applicantDetailsCard'
        textAlignment='left'
        label='Applicant or Other Adult Information'
        handleOnClick={() => this.props.setFocusState('applicantDetailsCard')}
        focusClassName={this.props.getFocusClassName('applicantDetailsCard') + ' ' + 'card phone-section double-gap-top active-bar'}>
        <div><p>{Rfa01bApplicantDetailsCardText.perjury}</p></div>
        <div className='col-lg-12'>
          <InputComponent
            gridClassName='col-md-12'
            id='NameOfResourceFamily'
            value={application.resource_family_name}
            label={'Name of Resource Family' + RfaCommon.requiredIndicator}
            type='text'
            onChange={(event) => this.props.setParentState('resource_family_name', event.target.value)} />
        </div>
        <CompleteNameFields
          index={0}
          idPrefix='applicant_'
          onChangePrefix='applicant_'
          firstName={application.applicant_first_name}
          middleName={application.applicant_middle_name}
          lastName={application.applicant_last_name}
          nameSuffix={application.applicant_name_suffix}
          namePrefix={application.applicant_name_prefix}
          suffixTypes={this.props.nameSuffixTypes}
          prefixTypes={this.props.namePrefixTypes}
          onChange={this.props.setParentState} />
        <div className='col-lg-12'>
          <AddressComponent
            index={0}
            stateTypes={this.props.stateTypes}
            addressTitle={'Residence Address' + RfaCommon.requiredIndicator}
            id='street_address'
            addressFields={residenceAddressValues}
            parentStateKey='residence_address'
            setParentState={this.props.setParentState}
            //  onSelection={(autofillData) => this.props.setParentState('residence_address', autofillData)}
            onChange={(key, value) => this.onAddressChange(key, value)}
          /></div>
        <div className='col-lg-12'>
          <InputComponent
            gridClassName='col-md-4'
            id='ssn'
            value={application.ssn}
            label='SSN'
            type='text'
            onChange={(event) => this.props.setParentState('ssn', event.target.value)} />

          <DateField
            gridClassName='col-md-4'
            label={'Date of Birth' + RfaCommon.requiredIndicator}
            id='date_of_birth'
            value={FormatDateForDisplay(application.date_of_birth)}
            errors={fieldErrorsAsImmutableSet(this.props.errors.date_of_birth)}
            onChange={(event) => this.props.setParentState('date_of_birth',
              FormatDateForPersistance(event.target.value))}
            onBlur={(event) => this.props.validator.validateFieldSetErrorState(
              'date_of_birth', event.target.value)} />
        </div><div className='col-lg-12'>
          <InputField
            gridClassName='col-md-4'
            id='driversLicenseNumberId'
            value={application.driver_license}
            label='Driver License number'
            placeholder=''
            type='text'
            onChange={(event) => this.props.setParentState('driver_license', event.target.value)}
            errors={fieldErrorsAsImmutableSet()}
            //    onBlur={(event) => this.validateDLcombo()}
          />
          <DropDownFormField
            gridClassName='col-md-4'
            id='driversLicenseStateId'
            selectClassName='reusable-select'
            value={getDictionaryId(application.driver_license_state)}
            optionList={this.props.stateTypes}
            label={application.driver_license ? 'Driver License State' + RfaCommon.requiredIndicator : 'Driver License State'}
            onChange={(event) => this.props.setParentState('driver_license_state', dictionaryNilSelect(event.target.options))}
            errors={fieldErrorsAsImmutableSet()}
          //  onBlur={(event) => this.validateDLcombo()}
          />
        </div>
      </CardLayout>
    )
  }
}
ApplicantDetailsCard.propTypes = {
  focusComponentName: PropTypes.string,
  getFocusClassName: PropTypes.func,
  setFocusState: PropTypes.func,
  setParentState: PropTypes.func,
  stateTypes: PropTypes.array,
  namePrefixTypes: PropTypes.array,
  nameSuffixTypes: PropTypes.array
}
ApplicantDetailsCard.defaultProps = {
  application: rfa01BapplicantDefaults,
  errors: []
}
