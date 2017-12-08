import React from 'react'
import PropTypes from 'prop-types'
import {urlPrefixHelper} from 'helpers/url_prefix_helper.js.erb'

const Rfa01bEditLink = ({
  adult,
  apiUrlPath,
  rfa01bId,
  applicationId,
  index

}) => {
  return (
    <div id={'rfa01B' + adult.id}>
      <a href={urlPrefixHelper('/rfa/b01/' + rfa01bId + '/edit?application_id=' + applicationId)} className='btn btn-default'>
        <p>Edit RFA 01 B for {adult.first_name}</p>
      </a>
    </div>
  )
}

Rfa01bEditLink.propTypes = {
  rfa01bId: PropTypes.number,
  applicationId: PropTypes.string,
  apiUrlPath: PropTypes.string,
  adult: PropTypes.object,
  index: PropTypes.number
}

export default Rfa01bEditLink
