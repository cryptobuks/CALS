import React from 'react'
import PropTypes from 'prop-types'
import LogoHeader from 'components/common/logoHeader'
import PageHeader from 'components/common/pageHeader'
import RfaSideBar from 'rfa_forms/rfa_sidebar/index'
import Button from 'components/common/button'
import ApiErrorMessages from 'components/common/errors/apiErrorMessages'

const PageTemplate = ({
  headerLabel,
  buttonId,
  buttonLabel,
  buttonTextAlignment,
  onButtonClick,
  applicants,
  rfa01aApplicationId,
  rfa01cForms,
  otherAdults,
  onRfa01AForm,
  childIdentified,
  isNavLinkActive,
  handleNavLinkClick,
  errors,
  children
}) => (
  <div className='main_page'>
    <LogoHeader />
    <div className='form-section col-xs-12 col-sm-12 col-md-12 col-lg-12'>
      <div className='left-content col-xs-3 col-sm-3 col-md-3 col-lg-3'>
        <RfaSideBar
          rfa01aApplicationId={rfa01aApplicationId}
          rfa01cForms={rfa01cForms}
          otherAdults={otherAdults}
          applicants={applicants}
          onRfa01AForm={onRfa01AForm}
          childIdentified={childIdentified}
          isNavLinkActive={isNavLinkActive}
          handleNavLinkClick={handleNavLinkClick} />
      </div>
      <div className='col-xs-9 col-sm-9 col-md-9 col-lg-9'>
        <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
          <PageHeader headerLabel={headerLabel} />
          <Button
            id={buttonId}
            label={buttonLabel}
            textAlignment={buttonTextAlignment}
            onClick={onButtonClick} />
        </div>
        <ApiErrorMessages errors={errors}/>
        {children}
      </div>
    </div>
  </div>
)

PageTemplate.propTypes = {
  headerLabel: PropTypes.string,
  buttonId: PropTypes.string,
  buttonLabel: PropTypes.string,
  buttonTextAlignment: PropTypes.string,
  onButtonClick: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

PageTemplate.defaultProps = {
  headerLabel: 'To implement'
}

export default PageTemplate
