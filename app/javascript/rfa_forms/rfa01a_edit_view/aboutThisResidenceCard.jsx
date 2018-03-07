import React from 'react'
import Immutable from 'immutable'
import {DropDownField} from 'components/common/dropDownField'
import {TextAreaComponent} from 'components/common/textArea'
import {yesNo} from 'constants/constants'
import {InputComponent} from 'components/common/inputFields'
import {getDictionaryId, dictionaryNilSelectValue, dictionaryNilSelect} from 'helpers/commonHelper.jsx'
import MultiSelect from 'components/common/multiSelect'
import PropTypes from 'prop-types'
import YesNoRadioComponent from 'components/common/yesNoFields'
import {othersUsingAddressMailing} from 'constants/defaultFields'

export default class AboutThisResidenceCard extends React.Component {
  constructor (props) {
    super(props)
    this.onChange = this.onChange.bind(this)
  }

  onChange (key, value) {
    let othersMailing = Immutable.fromJS(this.props.aboutResidence.other_people_using_residence_as_mailing || [othersUsingAddressMailing])
    othersMailing = othersMailing.update(0, x => x.set(key, value))
    this.props.setParentState('other_people_using_residence_as_mailing', othersMailing.toJS())
  }

  render () {
    const aboutResidence = this.props.aboutResidence
    const othersMailing = aboutResidence.other_people_using_residence_as_mailing || [othersUsingAddressMailing]

    const hiddenBodyOfWater = (aboutResidence.body_of_water_exist !== undefined && aboutResidence.body_of_water_exist.toString() === 'true') ? '' : 'hidden'
    const hiddenUseAsMailingAddress = (aboutResidence.others_using_residence_as_mailing !== undefined && aboutResidence.others_using_residence_as_mailing.toString() === 'true') ? '' : 'hidden'

    return (
      <div className='card-body'>
        <div className='row'>
          <form>
            <DropDownField id='residenceTypes' gridClassName='col-md-7'
              selectClassName={'reusable-select'}
              value={getDictionaryId(aboutResidence.residence_ownership)}
              optionList={this.props.residenceTypes}
              label={'Do you own, rent or lease the residence? (required)'}
              onChange={(event) => this.props.setParentState('residence_ownership', dictionaryNilSelect(event.target.options))}
            />
            <div>
              <YesNoRadioComponent
                label='Weapons in home? (required)'
                idPrefix='weapons'
                value={aboutResidence.weapon_in_home}
                onFieldChange={(event) => this.props.setParentState('weapon_in_home', event.target.value)} />
            </div>
            <div>
              <YesNoRadioComponent
                label='Body of Water? (required)'
                idPrefix='body_of_water_exist'
                value={aboutResidence.body_of_water_exist}
                onFieldChange={(event) => this.props.handleClearOnConditionalChange('body_of_water_exist', 'body_of_water_description', event.target.value, '')} />
            </div>
            <div className={hiddenBodyOfWater}>
              <TextAreaComponent gridClassName='col-md-12' id='body_of_water_description'
                value={aboutResidence.body_of_water_description}
                label='Please Describe the location of the body of water and its size.' placeholder=''
                onChange={(event) => this.props.setParentState('body_of_water_description', event.target.value)} />
            </div>
            <div>
              <YesNoRadioComponent
                label='Does any person not listed in this document use the residence as their mailing address? (required)'
                idPrefix='others_using_residence_as_mailing'
                value={(aboutResidence.others_using_residence_as_mailing)}
                onFieldChange={(event) => this.props.handleClearOnConditionalChange('others_using_residence_as_mailing', 'other_people_using_residence_as_mailing', event.target.value, [othersUsingAddressMailing])} />
            </div>
            <div className={hiddenUseAsMailingAddress} >
              <InputComponent gridClassName='col-md-4' id='firstName' value={othersMailing[0]['first_name']}
                label='First Name' placeholder='Enter First Name'
                onChange={(event) => this.onChange('first_name', event.target.value)} />
              <InputComponent gridClassName='col-md-4' id='middleName' value={othersMailing[0]['middle_name']}
                label='Middle Name' placeholder='Enter Middle Name'
                onChange={(event) => this.onChange('middle_name', event.target.value)} />
              <InputComponent gridClassName='col-md-4' id='lastName' value={othersMailing[0]['last_name']}
                label='Last Name' placeholder='Enter Last Name'
                onChange={(event) => this.onChange('last_name', event.target.value)} />
            </div>

            <TextAreaComponent gridClassName='col-md-12' id='directions'
              optionList={this.props.directions}
              value={aboutResidence.directions_to_home}
              label='Please provide directions, including major cross-street information, to your physical address.' placeholder=''
              onChange={(event) => this.props.setParentState('directions_to_home', event.target.value)} />

            <MultiSelect
              label='Language(s) spoken in the home (required)'
              values={aboutResidence.home_languages}
              className='languages'
              optionList={this.props.languageTypes}
              onChange={(event) => this.props.setParentState('home_languages', event.map((e) => ({id: e.id, value: e.value})))} />
          </form>
        </div>
      </div>
    )
  }
}

AboutThisResidenceCard.propTypes = {
  aboutResidence: PropTypes.object.isRequired,
  handleClearOnConditionalChange: PropTypes.func
}

AboutThisResidenceCard.defaultProps = {
  aboutResidence: [othersUsingAddressMailing]
}
