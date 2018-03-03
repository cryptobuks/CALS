import React from 'react'
import PropTypes from 'prop-types'

import Waypoint from 'react-waypoint'

export default class ScrollSpy extends React.Component {
  render () {
    return (
      <Waypoint
        fireOnRapidScroll = {false}
        scrollableAncestor={window}
        onEnter={this.props.onEnter}
        bottomOffset='90%' >
        {this.props.children}
      </Waypoint>
    )
  }
}

ScrollSpy.propTypes = {
  onEnter: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}
