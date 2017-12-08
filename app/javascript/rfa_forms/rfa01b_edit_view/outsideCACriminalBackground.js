import React from 'react'
import PropTypes from 'prop-types'

import {DropDownField} from 'components/common/dropDownField'
import CriminalFields from './criminalFields'
import {BinarySelectorField} from 'components/common/binarySelectorField'
import CardLayout from 'components/common/cardLayout'
import Button from 'components/common/button'
import YesNoRadioComponent from 'components/common/yesNoFields'
import {Rfa01bOutsideCACriminalBackgroundCardText} from 'constants/rfaText'
import {addCardAsJS, removeCard} from 'helpers/cardsHelper.jsx'

const disclosureDefaults = Object.freeze({
  'offense': '',
  'offense_city': '',
  'offense_state': {},
  'offense_date': '',
  'when_offense_happen': '',
  'offense_details': ''
})
export default class OutsideCACriminalBackground extends React.Component {
  constructor (props) {
    super(props)
    this.addCard = this.addCard.bind(this)
    this.clickClose = this.clickClose.bind(this)
    this.onFieldChange = this.onFieldChange.bind(this)
  }

  addCard (event) {
    this.props.setParentState('disclosures', addCardAsJS(this.props.disclosures, disclosureDefaults))
  }
  clickClose (cardIndex) {
    this.props.setParentState('disclosures', removeCard(this.props.disclosures, cardIndex, disclosureDefaults))
  }
  onFieldChange (key, value) {
    this.props.setParentState(key, value)
    // TODO: when api is fixed we need this method to set disclosures properply -
    // TODO: depending on the api contract layout i may be able to refactor this method to index.
  }

  render () {
    const convictedInAnotherState = this.props.convicted_in_another_state
    const disclosures = this.props.disclosures
    return (
      <CardLayout
        idClassName='outside_ca_criminal_background'
        id='OutsideCACriminalBackgroundCard'
        textAlignment='left'
        label='Disclosure of Criminal Background - Outside of California'
        handleOnClick={() => this.props.setFocusState('OutsideCACriminalBackgroundCard')}
        focusClassName={this.props.getFocusClassName('OutsideCACriminalBackgroundCard') + ' ' + 'card phone-section double-gap-top'}>
        <div>
          <div>{Rfa01bOutsideCACriminalBackgroundCardText.otherStateConviction}</div>
          <div>{Rfa01bOutsideCACriminalBackgroundCardText.californiaConviction}</div>
          <div>
            <YesNoRadioComponent
              idPrefix='outsideCACriminalBackground'
              value={convictedInAnotherState}
              onFieldChange={(event) => this.props.setParentState('convicted_in_another_state', !convictedInAnotherState)} />
          </div>
        </div>
        {convictedInAnotherState
          ? disclosures.map((crime, index) => {
            return (
              <div key={'outsideCaliforniaCriminalBackground' + index}>
                <CriminalFields
                  index={index}
                  crime={crime}
                  idPrefix='outsideCaliforniaCriminalBackground'
                  clickClose={this.props.removeCard}
                  onFieldChange={this.onFieldChange} />
              </div>
            )
          })
          : null
        }
        {convictedInAnotherState
          ? <div>
            <Button
              id='outsideCACrimeAdd'
              label='Add Another Offense - Outside of California +'
              onClick={this.props.addCard} />
          </div>
          : null }
      </CardLayout>
    )
  }
}

OutsideCACriminalBackground.propTypes = {
  convictedInAnotherState: PropTypes.bool,
  disclosures: PropTypes.array,
  getFocusClassName: PropTypes.func,
  setFocusState: PropTypes.func,
  setParentState: PropTypes.func,
  stateTypes: PropTypes.array,
  namePrefixTypes: PropTypes.array,
  nameSuffixTypes: PropTypes.array,
  errors: PropTypes.array
}
OutsideCACriminalBackground.defaultProps = {
  convictedInAnotherState: false,
  disclosures: [disclosureDefaults],
  errors: []
}
