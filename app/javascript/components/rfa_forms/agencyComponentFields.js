import React from 'react'
import {InputComponent} from 'components/common/inputFields'
import {DropDownField} from 'components/common/dropDownField'
import {getDictionaryId, dictionaryNilSelect} from 'helpers/commonHelper.jsx'

export class AgencyComponent extends React.Component {
  render () {
    return (
      <div className='row list-item'>
        <span onClick={(event) => { this.props.removeAgencyCard(event, this.props.agencies, this.props.index, this.props.defKey, this.props.subKey) }}
          className={'pull-right glyphicon glyphicon-remove  agency' + this.props.index} />

        <InputComponent gridClassName='col-md-7' id={this.props.inputId}
          value={this.props.inputValue}
          label={this.props.label} placeholder={this.props.placeholder}
          type={'text'}
          onChange={(event) => { this.props.onAgencyChange(event, this.props.agencies, this.props.index, 'name', this.props.defKey, this.props.subKey, event.target.value) }} />

        <DropDownField gridClassName='col-md-4' id={this.props.dropDownId}
          value={getDictionaryId(this.props.dropDownValue)}
          selectClassName={'reusable-select'}
          optionList={this.props.optionList}
          label={this.props.dropdownLabel}
          onChange={(event, id) => this.props.onAgencyChange(event, this.props.agencies, this.props.index, 'type', this.props.defKey, this.props.subKey, dictionaryNilSelect(event.target.options))} />
      </div>
    )
  }
}
