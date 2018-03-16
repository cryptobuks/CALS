import Immutable from 'immutable'
import React from 'react'
import Collapsible from 'react-collapsible'
import Affix from 'react-overlays/lib/AutoAffix'
import PropTypes from 'prop-types'
import {NavLinks} from 'react-wood-duck'
import {urlPrefixHelper} from 'helpers/url_prefix_helper.js.erb'
import A01SideBar from './a01SideBar'
import B01SideBar from './b01SideBar'
import C01SideBar from './c01SideBar'

export default class RfaSideBar extends React.Component {
  render () {
    const showRelationshipBetweenApplicants = (this.props.applicants !== null && this.props.applicants.length === 2)
    let rfa01cForms = Array.isArray(this.props.rfa01cForms) ? this.props.rfa01cForms[0] : this.props.rfa01cForms

    return (

      <div className='col-sm-12'>
        <div className='nav-menu col-sm-10'>
          {/* affixStyles are in PX by default */}
          <Affix affixStyle={{top: 80}}>
            <div className='nav-menu'>
              <A01SideBar
                isNavLinkActive={this.props.isNavLinkActive}
                handleNavLinkClick={this.props.handleNavLinkClick}
                onRfa01AForm={this.props.onRfa01AForm}
                rfa01aApplicationId={this.props.rfa01aApplicationId}
                showRelationshipBetweenApplicants={showRelationshipBetweenApplicants} />

              <B01SideBar
                isNavLinkActive={this.props.isNavLinkActive}
                handleNavLinkClick={this.props.handleNavLinkClick}
                applicants={this.props.applicants}
                otherAdults={this.props.otherAdults}
                rfa01aApplicationId={this.props.rfa01aApplicationId} />

              <C01SideBar
                isNavLinkActive={this.props.isNavLinkActive}
                handleNavLinkClick={this.props.handleNavLinkClick}
                rfa01aApplicationId={this.props.rfa01aApplicationId}
                childIdentified={this.props.childIdentified}
                rfa01cForm={rfa01cForms} />
            </div>
          </Affix>
        </div>

        <div className='col-sm-2'>
          <Affix>
            <hr className='vertical' />
          </Affix>
        </div>
      </div>
    )
  }
}
