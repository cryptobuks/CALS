import React from 'react'
import Immutable from 'immutable'
import {DropDownField} from 'components/common/dropDownField'
import {TextAreaComponent} from 'components/common/textArea'
import {yesNo} from 'constants/constants'
import {InputComponent} from 'components/common/inputFields'
import {getDictionaryId, dictionaryNilSelect2, dictionaryNilSelect} from 'helpers/commonHelper.jsx'
import MultiSelect from 'components/common/multiSelect'
import PropTypes from 'prop-types'

const othersUsingAddressMailing = Object.freeze({
  first_name: '',
  middle_name: '',
  last_name: ''
})

export default class AboutThisResidenceCard extends React.Component {
  constructor (props) {
    super(props)
    this.onChange = this.onChange.bind(this)
    // this.onSelectChange = this.onSelectChange.bind(this)
  }

  onChange (key, value) {
    let othersMailing = Immutable.fromJS(this.props.aboutResidence.other_people_using_residence_as_mailing || [othersUsingAddressMailing])
    othersMailing = othersMailing.update(0, x => x.set(key, value))
    this.props.setParentState('other_people_using_residence_as_mailing', othersMailing.toJS())
  }

  // onSelectChange (event) {
  // this.props.setParentState('residence_ownership', ({id: event.target.options[event.target.options.selectedIndex].value, value: event.target.options[event.target.options.selectedIndex].text}))
  //  this.props.setParentState('residence_ownership', dictionaryNilSelect2(event.target.options))
  // }

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
              label={'Do you own, rent or lease the residence?'}
              onChange={(event) => this.props.setParentState('residence_ownership', dictionaryNilSelect2(event.target.options))}
            />
            <DropDownField id='weapons' gridClassName='col-md-7'
              selectClassName={'reusable-select'}
              text={aboutResidence.weapon_in_home}
              value={(aboutResidence.weapon_in_home)}
              optionList={yesNo.items}
              label={'Weapons in home?'}
              onChange={(event) => this.props.setParentState('weapon_in_home', event.target.selectedOptions[0].value)} />

            <DropDownField id='body_of_water_exist' gridClassName='col-md-7'
              selectClassName={'reusable-select'}
              value={(aboutResidence.body_of_water_exist)}
              text={aboutResidence.body_of_water_exist}
              optionList={yesNo.items}
              label={'Body of Water?'}
              onChange={(event) => this.props.setParentState('body_of_water_exist', event.target.selectedOptions[0].value)} />

            <div className={hiddenBodyOfWater}>
              <TextAreaComponent gridClassName='col-md-12' id='body_of_water_description'
                value={aboutResidence.body_of_water_description}
                label='Please Describe the location of the body of water and its size.' placeholder=''
                onChange={(event) => this.props.setParentState('body_of_water_description', event.target.value)} />
            </div>

            <DropDownField id='others_using_residence_as_mailing' gridClassName='col-md-9'
              selectClassName={'reusable-select'}
              text={aboutResidence.others_using_residence_as_mailing}
              value={(aboutResidence.others_using_residence_as_mailing)}
              optionList={yesNo.items}
              label={'Does any person not listed in this document use the residence as their mailing address?'}
              onChange={(event) => this.props.setParentState('others_using_residence_as_mailing', event.target.selectedOptions[0].value)} />

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
              label='Please provide directions, including major cross-street information, to your physical adress.' placeholder=''
              onChange={(event) => this.props.setParentState('directions_to_home', event.target.value)} />

            <MultiSelect
              label='Language(s) spoken in the home'
              values={aboutResidence.home_languages}
              classNameId='languages'
              optionList={this.props.languageTypes}
              onChange={(event) => this.props.setParentState('home_languages', event.map((e) => ({id: e.id, value: e.value})))} />
          </form>
        </div>
      </div>
    )
  }
}

AboutThisResidenceCard.propTypes = {
  aboutResidence: PropTypes.object.isRequired
}

AboutThisResidenceCard.defaultProps = {
  aboutResidence: [othersUsingAddressMailing]
}
