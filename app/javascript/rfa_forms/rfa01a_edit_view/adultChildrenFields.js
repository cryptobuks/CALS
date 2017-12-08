import React from 'react'
import {InputComponent} from 'components/common/inputFields'
import {DropDownField} from 'components/common/dropDownField'
import {DateField} from 'components/common/dateFields'
import CompleteNameFields from './completeNameField.jsx'
import {yesNo} from 'constants/constants'
import {getDictionaryId, dictionaryNilSelect, FormatDateForDisplay, FormatDateForPersistance} from 'helpers/commonHelper.jsx'
import {handleRelationshipTypeToApplicant, setToWhomOptionList, handleToWhomValue} from 'helpers/cardsHelper.jsx'

export default class AdultChildrenFields extends React.Component {
  render () {
    const adultChild = this.props.adultChild
    const livesInHome = adultChild.lives_in_home === 'true'

    return (
      <form>
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
        <div className='row '>
          <div className='col-md-12'>
            <CompleteNameFields
              index={this.props.index}
              namePrefixId='name_prefix'
              nameSuffixId='name_suffix'
              firstNameId='first_name'
              middleNameId='middle_name'
              lastNameId='last_name'
              firstName={adultChild.first_name}
              middleName={adultChild.middle_name}
              lastName={adultChild.last_name}
              nameSuffix={adultChild.name_suffix}
              namePrefix={adultChild.name_prefix}
              onChange={this.props.changeAdultChild}
              suffixTypes={this.props.suffixTypes}
              prefixTypes={this.props.prefixTypes} />
          </div>
        </div>
        <DropDownField
          gridClassName='col-md-4'
          selectClassName='reusable-select'
          label={'Lives in home?'}
          id={this.props.idPrefix + 'lives_in_home'}
          optionList={yesNo.items}
          value={adultChild.lives_in_home}
          onChange={(event) => this.props.changeAdultChild('lives_in_home',
            event.target.value, this.props.index)} />

        { livesInHome ? (<div />)
          : (<div>
            <InputComponent
              gridClassName='col-md-12'
              label='Physical Address'
              id={this.props.idPrefix + 'street_address'}
              value={adultChild.address.street_address}
              onChange={(event) => this.props.changeAdultHistoryAddress('street_address',
                event.target.value, this.props.index)} />
            <InputComponent
              gridClassName='col-md-4'
              label='Zip Code'
              id={this.props.idPrefix + 'zip'}
              value={adultChild.address.zip}
              onChange={(event) => this.props.changeAdultHistoryAddress('zip',
                event.target.value, this.props.index)} />
            <InputComponent
              gridClassName='col-md-4'
              label='City'
              id={this.props.idPrefix + 'city'}
              value={adultChild.address.city}
              onChange={(event) => this.props.changeAdultHistoryAddress('city',
                event.target.value, this.props.index)} />
            <DropDownField
              gridClassName='col-md-4'
              selectClassName='reusable-select'
              label='State'
              id={this.props.idPrefix + 'state'}
              optionList={this.props.stateTypes}
              value={getDictionaryId(adultChild.address.state)}
              onChange={(event) => this.props.changeAdultHistoryAddress('state',
                dictionaryNilSelect(event.target.options), this.props.index)} />
          </div>)
        }
      </form>
    )
  }
}
