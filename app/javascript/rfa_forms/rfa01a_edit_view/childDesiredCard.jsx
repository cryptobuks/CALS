import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import {InputComponent} from 'components/common/inputFields'
import {TextAreaComponent} from 'components/common/textArea'
import {DropDownField} from 'components/common/dropDownField'
import CheckboxGroup from 'components/common/checkboxGroup'
import {dictionaryNilSelect, getDictionaryId, dictionaryNilSelectValue} from 'helpers/commonHelper.jsx'
import {arrayLastToFirst} from 'helpers/cardsHelper.jsx'
import {yesNo} from 'constants/constants'
import {BinarySelectorField} from 'components/common/binarySelectorField'

export default class ChildDesiredCard extends React.Component {
  constructor (props) {
    super(props)
    this.onChange = this.onChange.bind(this)
  }

  onChange (key, value, index) {
    let newData = Immutable.fromJS(this.props.desiredChildSection)
    newData = newData.set(key, value)
    this.props.setParentState(key, newData.toJS()[key])
  }
  render () {
    const childCurrentlyInHomeVisible = this.props.desiredChildSection.child_identified === true || this.props.desiredChildSection.child_identified === 'true'
    return (
      <form>

        <DropDownField id='child_identified' gridClassName='col-md-12'
          selectClassName='reusable-select col-md-4'
          value={(this.props.desiredChildSection.child_identified)}
          optionList={yesNo.items}
          label={'Has the child been identified?'}
          onChange={(event) => this.props.setParentState('child_identified', dictionaryNilSelectValue(event.target.options))} />
        {childCurrentlyInHomeVisible && <DropDownField id='child_in_home' gridClassName='col-md-12 '
          selectClassName='reusable-select col-md-4'
          value={(this.props.desiredChildSection.child_in_home)}
          optionList={yesNo.items}
          label={'Is the child currently in your home?'}
          onChange={(event) => this.props.setParentState('child_in_home', dictionaryNilSelectValue(event.target.options))} />}

        <CheckboxGroup name='age'
          gridClassName='col-md-12 age'
          selectClassName='reusable-select'
          agePreferences={this.props.desiredChildSection.preferred_ages}
          optionList={arrayLastToFirst(this.props.ageGroups)}
          label='Age'
          sectionDesc='If a child has not been identified, or if you are open to caring for
          additional children, please indicate your preferences:'
          onChange={this.onChange}
        />
        <div className='col-md-12 sibling'>
          <p>Sibiling (Group of)</p>
          {
            this.props.siblingGroups.map((sibling, index) => {
              return (
                <BinarySelectorField gridClassName={'col-md-4'}
                  key={index}
                  id={'sibling-' + index}
                  label={sibling.value}
                  type='radio'
                  value={getDictionaryId(this.props.desiredChildSection.preferred_sibling_group_up_to) === sibling.id}
                  checked={getDictionaryId(this.props.desiredChildSection.preferred_sibling_group_up_to) === sibling.id}
                  onChange={(event) => this.onChange('preferred_sibling_group_up_to', sibling)}
                />
              )
            })
          }
        </div>

      </form>
    )
  }
}

ChildDesiredCard.propTypes = {
  desiredChildSection: PropTypes.object.isRequired,
  ageGroups: PropTypes.array.isRequired,
  siblingGroups: PropTypes.array.isRequired,
  setParentState: PropTypes.func.isRequired
}
