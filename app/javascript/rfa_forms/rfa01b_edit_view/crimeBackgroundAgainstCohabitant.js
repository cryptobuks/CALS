import React from 'react'
import PropTypes from 'prop-types'

import {DropDownField} from 'components/common/dropDownField'
import CriminalFields from './criminalFields'
import YesNoRadioComponent from 'components/common/yesNoFields'

import CardLayout from 'components/common/cardLayout'
import Button from 'components/common/button'
import {Rfa01bCrimeBackGroundAgainstCohabCardText} from 'constants/rfaText'
import {addCardAsJS, removeCard} from 'helpers/cardsHelper.jsx'

const disclosureDefaults = Object.freeze({
  'offense': '',
  'offense_city': '',
  'offense_state': {},
  'offense_date': '',
  'when_offense_happen': '',
  'offense_details': ''
})
export default class CrimeBackgroundAgainstCohabitant extends React.Component {
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
    const arrestedForCrime = this.props.arrestedForCrime
    const disclosures = this.props.disclosures

    return (
      <CardLayout
        idClassName='crime_background_against_cohabitant_card'
        id='crimeBackgroundAgainstCohabitantCard'
        textAlignment='left'
        label='Disclosure of Criminal Background - Against Child / Spouse / Cohabitant'
        handleOnClick={() => this.props.setFocusState('crimeBackgroundAgainstCohabitantCard')}
        focusClassName={this.props.getFocusClassName('crimeBackgroundAgainstCohabitantCard') + ' ' + 'card phone-section double-gap-top'}>
        <div>
          <div>{Rfa01bCrimeBackGroundAgainstCohabCardText.abuse}</div>
          <div>
            <YesNoRadioComponent
              idPrefix='crimeBackgroundAgainstCohabitantRadio'
              value={arrestedForCrime}
              onFieldChange={(event) => this.props.setParentState('arrested_for_crime', !arrestedForCrime)} />
          </div>
        </div>
        { arrestedForCrime
          ? disclosures.map((crime, index) => {
            return (
              <div key={'crimeBackgroundAgainstCohabitant' + index} >
                <CriminalFields
                  index={index}
                  crime={crime}
                  idPrefix='crimeBackgroundAgainstCohabitant'
                  clickClose={this.props.removeCard}
                  onFieldChange={this.onFieldChange} />
              </div>
            )
          })
          : null
        }

        {arrestedForCrime
          ? <div>
            <Button
              id='CrimeAgainstCohabAdd'
              label='Add Another Offense - Against Child / Spouse / Cohabitant +'
              onClick={this.props.addCard} />
          </div>
          : null }

      </CardLayout>
    )
  }
}

CrimeBackgroundAgainstCohabitant.propTypes = {
  arrestedForCrime: PropTypes.bool,
  disclosures: PropTypes.array,
  getFocusClassName: PropTypes.func,
  setFocusState: PropTypes.func,
  setParentState: PropTypes.func,
  stateTypes: PropTypes.array,
  namePrefixTypes: PropTypes.array,
  nameSuffixTypes: PropTypes.array,
  errors: PropTypes.array
}
CrimeBackgroundAgainstCohabitant.defaultProps = {
  arrestedForCrime: false,
  disclosures: [disclosureDefaults],
  errors: []
}
