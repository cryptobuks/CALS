import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'

import {InputComponent} from 'components/common/inputFields'
import {TextAreaComponent} from 'components/common/textArea'
import {Rfa01bCriminalFieldsCardText} from 'constants/rfaText'
import Button from 'components/common/button'

export default class CriminalFields extends React.Component {
  render () {
    const crime = this.props.crime
    return (
      <div>
        <div>
          <span onClick={() => this.props.clickClose(this.props.index)} className='pull-right glyphicon glyphicon-remove' />
        </div>
        <div><b>{Rfa01bCriminalFieldsCardText.details}</b></div>
        <InputComponent
          gridClassName='col-md-12'
          id={this.props.idPrefix + 'offenseReason'}
          value={crime.offense}
          label='What was the offense?'
          onChange={(event) => this.props.onFieldChange(this.props.index, 'offense', event.target.value)} />
        <InputComponent
          gridClassName='col-md-12'
          id={this.props.idPrefix + 'offenseCity'}
          value={crime.offense_city}
          label='Where did the offense happen? (City, State, Country or other location information)'
          onChange={(event) => this.props.onFieldChange(this.props.index, 'offense_city', event.target.value)} />
        <InputComponent
          gridClassName='col-md-12'
          id={this.props.idPrefix + 'OffenseDate'}
          value={crime.when_offense_happen}
          label='When did the offense happen?'
          onChange={(event) => this.props.onFieldChange(this.props.index, 'when_offense_happen', event.target.value)} />
        <TextAreaComponent
          gridClassName='col-md-12'
          id={this.props.idPrefix + 'offenseDetails'}
          value={crime.offense_details}
          label='Explain what happened.'
          placeholder=''
          onChange={(event) => this.props.onFieldChange(this.props.index, 'offense_details', event.target.value)} />
      </div>
    )
  }
}

CriminalFields.propTypes = {
  errors: PropTypes.array,
  idPrefix: PropTypes.string
}

CriminalFields.defaultProps = {
  errors: []
}
