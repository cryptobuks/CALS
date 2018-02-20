import React from 'react'
import PropTypes from 'prop-types'
import {InputComponent} from '../../components/common/inputFields'
import {DropDownField} from '../../components/common/dropDownField'
import NameCommonFields from '../../components/common/nameCommonFields'
import {getDictionaryId, dictionaryNilSelect} from 'helpers/commonHelper.jsx'

const CompleteNameFields = ({
  index,
  idPrefix,
  onChangePrefix,
  firstName,
  middleName,
  lastName,
  nameSuffix,
  namePrefix,
  nameType,
  onChange,
  suffixTypes,
  prefixTypes,
  nameTypes,
  validator
}) => {
  return (
    <div>
      {
        prefixTypes && <div className='col-md-12'>
          <DropDownField gridClassName='col-md-4'
            id={idPrefix + 'name_prefix'} value={getDictionaryId(namePrefix)}
            selectClassName={'reusable-select'}
            optionList={prefixTypes}
            label={'Prefix'}
            onChange={(event, id) => onChange(onChangePrefix + 'name_prefix', dictionaryNilSelect(event.target.options), index)} />
        </div>
      }
      <div className='col-md-12'>
        <NameCommonFields
          index={index}
          onChangePrefix={onChangePrefix}
          idPrefix={idPrefix}
          firstName={firstName}
          middleName={middleName}
          lastName={lastName}
          onChange={onChange}
          validator={validator} />
      </div>
      <div className='col-md-12'>
        <DropDownField
          gridClassName='col-md-4'
          id={idPrefix + 'name_suffix'}
          value={getDictionaryId(nameSuffix)}
          selectClassName={'reusable-select'}
          optionList={suffixTypes}
          label={'Suffix'}
          onChange={(event, id) => onChange(onChangePrefix + 'name_suffix', dictionaryNilSelect(event.target.options), index)} />
      </div>
      {
        nameTypes && <div className='col-md-12'>
          <DropDownField
            gridClassName='col-md-4'
            id={idPrefix + 'name_type'}
            value={getDictionaryId(nameType)}
            selectClassName={'reusable-select'}
            optionList={nameTypes}
            label={'Name Type'}
            onChange={(event, id) => onChange(onChangePrefix + 'name_type', dictionaryNilSelect(event.target.options), index)} />
        </div>
      }
    </div>)
}

CompleteNameFields.propTypes = {
  firstNameId: PropTypes.string,
  middleNameId: PropTypes.string,
  lastNameId: PropTypes.string,
  nameSuffixId: PropTypes.string,
  namePrefixId: PropTypes.string,
  firstName: PropTypes.string,
  middleName: PropTypes.string,
  lastName: PropTypes.string,
  nameSuffix: PropTypes.object,
  namePrefix: PropTypes.object,
  nameType: PropTypes.object,
  nameTypeId: PropTypes.string,
  nameTypes: PropTypes.array,
  prefixTypes: PropTypes.array,
  suffixTypes: PropTypes.array,
  onChange: PropTypes.func.isRequired
}

CompleteNameFields.defaultProps = {
  suffixTypes: [],
  idPrefix: '',
  onChangePrefix: ''
}

export default CompleteNameFields
