import React from 'react'
import InputDataBlock from './common/inputDataBlock.js'
import {InputComponent} from 'components/common/inputFields'
import {dictionaryNilSelectValue} from 'helpers/commonHelper.jsx'
import PropTypes from 'prop-types'

const SearchInput = ({
  resetForm,
  handleOnSubmit,
  handleInputChange,
  countyList,
  facilityTypes,
  countyValue,
  facilityTypeValue,
  facilityIdValue,
  facilityNameValue,
  facilityAddressValue

}) => (
  <div className='search_input col-xs-12 col-sm-12 col-md-12 col-lg-12'>
    <form onSubmit={handleOnSubmit}>
      <div className='field_input col-xs-12 col-sm-10 col-md-10 col-lg-10'>
        <div className='input_data col-xs-12 col-sm-2 col-md-2 col-lg-2'>
          <div>
            <span>County</span>
          </div>
          <div>
            <select className='searchSelect' id='county_select' value={countyValue} onChange={(event) => handleInputChange('countyValue', dictionaryNilSelectValue(event.target.options))}>
              <option value=' ' />
              {countyList.map((county) =>
                <option key={county.id} id={county.id} value={county.value}>{county.value}</option>
              )}
            </select>
          </div>
        </div>
        <div className='input_data col-xs-12 col-sm-2 col-md-2 col-lg-2'>
          <div>
            <span>Facility Type</span>
          </div>
          <div>
            <select className='searchSelect' id='facility_select' value={facilityTypeValue} onChange={(event) => handleInputChange('facilityTypeValue', dictionaryNilSelectValue(event.target.options))}>
              <option value='' />
              {facilityTypes.map((facilityType) =>
                <option key={facilityType.id} id={facilityType.id} value={facilityType.value}>{facilityType.value}</option>
              )}
            </select>
          </div>
        </div>
        <InputDataBlock
          title='Facility ID #'
          columnWidth={2}>
          <InputComponent id='facilityIdValue'
            fieldClassName='form-control'
            value={facilityIdValue}
            placeholder='Enter Facility ID #'
            type='text'
            onChange={(event) => handleInputChange('facilityIdValue', event.target.value)}/>
        </InputDataBlock>
        <InputDataBlock
          title='Facility Name'
          columnWidth={3}>
          <InputComponent id='facilityNameValue'
            fieldClassName='form-control'
            value={facilityNameValue}
            placeholder='Enter Facility Name'
            type='text'
            onChange={(event) => handleInputChange('facilityNameValue', event.target.value)} />
        </InputDataBlock>
        <InputDataBlock
          title='Facility Address'
          columnWidth={3}>
          <InputComponent id='facilityAddressValue'
            fieldClassName='form-control'
            value={facilityAddressValue}
            placeholder='Enter Facility Address'
            type='text'
            onChange={(event) => handleInputChange('facilityAddressValue', event.target.value)} />
        </InputDataBlock>
      </div>
      <div className='field_search col-xs-12 col-sm-2 col-md-2 col-lg-2'>
        <div className='search_block '>
          <button id='search' type='submit' className= 'btn btn-primary'>Search</button>
        </div>
        <div className='search_block '>
          <button id='reset' type='button' onClick= {resetForm} className= 'btn btn-primary'>Reset</button>
        </div>
      </div>
    </form>
  </div>
)

SearchInput.propTypes = {
  countyValue: PropTypes.string,
  facilityTypeValue: PropTypes.string,
  facilityIdValue: PropTypes.string,
  facilityNameValue: PropTypes.string,
  facilityAddressValue: PropTypes.string,
  sizeValue: PropTypes.number,
  handleInputChange: PropTypes.func,
  resetForm: PropTypes.func,
  handleOnSubmit: PropTypes.func
}
SearchInput.defaultProps = {
  countyValue: '',
  facilityTypeValue: '',
  facilityIdValue: '',
  facilityNameValue: '',
  facilityAddressValue: ''
}

export default SearchInput
