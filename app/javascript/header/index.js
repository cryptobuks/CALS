import React from 'react'
import PropTypes from 'prop-types'
import {GlobalHeader} from 'react-wood-duck'

export default class HeaderComponent extends React.Component {
  constructor (props) {
    super(props)
    this.logoutCallback = this.logoutCallback.bind(this)
  }

  logoutCallback () {
    window.location.href = this.props.logoutUrl
  }

  render () {
    return (
      <div>
        <GlobalHeader
          profileName='Profile Name'
          profileAvatar='PN'
          logoutCallback={this.logoutCallback} />
      </div>
    )
  }
}

HeaderComponent.propTypes = {
  logoutUrl: PropTypes.string
}
