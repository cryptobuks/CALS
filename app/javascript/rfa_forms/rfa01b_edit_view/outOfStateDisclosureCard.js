import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import YesNoRadioComponent from 'components/common/yesNoFields'
import CardLayout from 'components/common/cardLayout'
import MultiSelect from 'components/common/multiSelect'
import {Rfa01bOutOfStateDisclosureCardText} from 'constants/rfaText'
import {getDictionaryId, dictionaryNilSelect} from 'helpers/commonHelper.jsx'

const otherStatesOfLivingDefaults = Object.freeze({
  'other_states_of_living': [
    {
      'value': 'string',
      'id': 'string'
    }
  ]})

export default class OutOfStateDisclosureCard extends React.Component {
  render () {
    const livedInOtherState = this.props.livedInOtherState

    return (
      <CardLayout
        idClassName='out_of_state_disclosure_card'
        id='outOfStateDisclosureCard'
        textAlignment='left'
        label='This section applies only to applicants and adults residing in the home'
        handleOnClick={() => this.props.setFocusState('outOfStateDisclosureCard')}
        focusClassName={this.props.getFocusClassName('outOfStateDisclosureCard') + ' ' + 'card phone-section double-gap-top'}>
        <div>{Rfa01bOutOfStateDisclosureCardText.lived5years}</div>
        <div>
          <YesNoRadioComponent
            idPrefix='outOfStateDisclosureCard'
            value={livedInOtherState}
            onFieldChange={(event) => this.props.setParentState('lived_in_other_state', !livedInOtherState)} />
        </div>
        {livedInOtherState
          ? <div>
            <MultiSelect
              label={Rfa01bOutOfStateDisclosureCardText.identifyStates}
              values={this.props.otherStatesOfLiving}
              optionList={this.props.stateTypes}
              classNameId='outOfStateDisclosureCard'
              onChange={(event) => this.props.setParentState('other_states_of_living', event.map((e) => ({id: e.id, value: e.value})))} />
          </div>
          : null
        }
      </CardLayout>
    )
  }
}

OutOfStateDisclosureCard.propTypes = {
  livedInOtherState: PropTypes.bool,
  otherStatesOfLiving: PropTypes.array,
  getFocusClassName: PropTypes.func,
  setFocusState: PropTypes.func,
  setParentState: PropTypes.func,
  stateTypes: PropTypes.array,
  errors: PropTypes.array
}
OutOfStateDisclosureCard.defaultProps = {
  livedInOtherState: false,
  otherStatesOfLiving: [],
  errors: []
}
