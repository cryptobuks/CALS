import React from 'react'
import PropTypes from 'prop-types'
import {InputComponent} from 'components/common/inputFields'
import {DropDownField} from 'components/common/dropDownField'
import {DateField} from 'components/common/dateFields'
import CompleteNameFields from './completeNameField.jsx'
import YesNoRadioComponent from 'components/common/yesNoFields'
import {yesNo} from 'constants/constants'
import {getDictionaryId, dictionaryNilSelect, FormatDateForDisplay, FormatDateForPersistance} from 'helpers/commonHelper.jsx'
import {handleRelationshipTypeToApplicant, setToWhomOptionList, handleToWhomValue} from 'helpers/cardsHelper.jsx'
import AddressComponent from 'components/rfa_forms/addressComponent.js'
import {addressDefaults} from 'constants/defaultFields'
export default class AdultChildrenFields extends React.Component {
  render () {
    const adultChild = this.props.adultChild
    const livesInHome = adultChild.lives_in_home === 'true'

    return (
      <form>
        <div className='col-md-12'>
          <DropDownField
            gridClassName='col-md-4'
            id={this.props.idPrefix + 'relationship_type'}
            selectClassName='reusable-select'
            optionList={this.props.relationshipToApplicantTypes}
            label='Relationship Type'
            value={getDictionaryId(adultChild.relationship_to_applicants[0].relationship_to_applicant)}
            onChange={(event) => this.props.handleRelationshipTypeToApplicant(this.props.index,
              dictionaryNilSelect(event.target.options), 'relationship_to_applicant')} />
          <DropDownField
            gridClassName='col-md-4'
            selectClassName='reusable-select'
            label='To Whom'
            id={this.props.idPrefix + 'available_applicants'}
            optionList={setToWhomOptionList(this.props.applicants)}
            value={handleToWhomValue(adultChild.relationship_to_applicants[0].applicant_id, this.props.applicants).id}
            onChange={(event) => this.props.handleRelationshipTypeToApplicant(this.props.index,
              event.target.value, 'applicant_id')} />
        </div>
        <div>
          <CompleteNameFields
            index={this.props.index}
            firstName={adultChild.first_name}
            middleName={adultChild.middle_name}
            lastName={adultChild.last_name}
            nameSuffix={adultChild.name_suffix}
            namePrefix={adultChild.name_prefix}
            onChange={this.props.changeAdultChild}
            suffixTypes={this.props.suffixTypes}
            prefixTypes={this.props.prefixTypes} />
        </div>
        <div className='col-md-12'>
          <YesNoRadioComponent
            label='Lives in home?'
            idPrefix={this.props.idPrefix + 'lives_in_home'}
            value={adultChild.lives_in_home}
            onFieldChange={(event) => this.props.handleClearOnConditionalChange('lives_in_home', 'address', event.target.value, addressDefaults, this.props.index)} />

          { livesInHome
            ? null
            : <AddressComponent
              index={this.props.index}
              stateTypes={this.props.stateTypes}
              addressTitle='Physical Address'
              id='street_address'
              addressFields={adultChild.address}
              parentStateKey='address'
              setParentState={(fieldId, event) => this.props.changeAdultHistoryAddress(fieldId, event, this.props.index)}
              onChange={(fieldId, event) => this.props.changeAdultHistoryAddress(fieldId, event, this.props.index)} />
          }
        </div>
      </form>
    )
  }
}

AdultChildrenFields.propTypes = {
  handleClearOnConditionalChange: PropTypes.func
}
