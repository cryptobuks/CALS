import React from 'react'
import PropTypes from 'prop-types'
import {urlPrefixHelper} from 'helpers/url_prefix_helper.js.erb'

const BreadCrumb = ({
  navigationElements
}) => (
  <div className='container'>
    <div className='row'>
      <div className='col-xs-7'>
        <h5>Back to: <span><a href={urlPrefixHelper('/')}>Main Menu</a> {navigationElements.map((nav, index) => (<span key={index}> > {nav}</span>))}</span></h5>
      </div>
    </div>
  </div>
)

BreadCrumb.propTypes = {
  navigationElements: PropTypes.array
}

BreadCrumb.defaultProps = {
  navigationElements: []
}

export default BreadCrumb
