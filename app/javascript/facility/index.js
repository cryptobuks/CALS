import React, { Component } from 'react'
import FacilityDetails from './details.jsx'
import FacilityAddress from './address.jsx'
import FacilityChildren from './children.jsx'
import FacilityComplaints from './complaints.jsx'
import {PageHeader} from 'react-wood-duck'
import Button from 'components/common/button'
import {urlPrefixHelper} from 'helpers/url_prefix_helper.js.erb'
import BreadCrumb from 'components/common/breadCrumb'
import './stylesheets/facility.scss'

export default class Facility extends React.Component {
  render () {
    const propsData = this.props.facility
    const childrenResults = this.props.children
    const complaintsResults = this.props.complaints
    return (
      <div className='main_page'>
        <PageHeader
          pageTitle={this.props.facility.name}
          button={null}
        />
        <BreadCrumb
          navigationElements={[<a href={urlPrefixHelper('/search')}>Facility Search</a>]}
        />
        <div className='header_cwds col-xs-12 col-sm-12 col-md-12 col-lg-12'>
          <div className='header-logo' />
        </div>
        <div className='body_cwds col-xs-12 col-sm-12 col-md-12 col-lg-12'>
          <FacilityDetails facilityData={propsData} />
          <FacilityAddress facilityData={propsData} />
          {childrenResults && <FacilityChildren facilityData={childrenResults} />}
          {complaintsResults && <FacilityComplaints facilityData={complaintsResults} />}
        </div>
      </div>
    )
  }
}
