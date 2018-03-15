import React from 'react'
import PropTypes from 'prop-types'
import {urlPrefixHelper} from 'helpers/url_prefix_helper.js.erb'

const BreadCrumb = ({
  breadCrumbSign,
  children
}) => (
  <div className='container'>
    <div className='row'>
      <div className='col-xs-7'>
        <h5>Back to: <span><a href={urlPrefixHelper('/')}>Main Menu</a> {breadCrumbSign} {children}</span></h5>
      </div>
    </div>
  </div>
)

BreadCrumb.propTypes = {
  children: PropTypes.node,
  breadCrumbSign: PropTypes.string
}

BreadCrumb.defaultProps = {
  children: '',
  breadCrumbSign: ''
}

export default BreadCrumb
