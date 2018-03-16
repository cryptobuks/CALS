import React from 'react'
import PropTypes from 'prop-types'
import Button from 'components/common/button'
import Affix from 'react-overlays/lib/AutoAffix'

const PageHeader = ({
  headerLabel,
  buttonId,
  buttonLabel,
  buttonTextAlignment,
  onButtonClick,
  disableSave
}) => (
  <div className='page-header-container'>
    <Affix>
      <div className="page-header-mast">
        <div className="container">
          <div className="row">
            <div className="col-xs-7">
              <div className="page-title text-left">
                {headerLabel}
              </div>
            </div>
            <div className="col-xs-5">
              <Button
                buttonId='saveProgress'
                disabled={disableSave}
                label={buttonLabel}
                textAlignment={buttonTextAlignment}
                onClick={onButtonClick}/>
            </div>
          </div>
        </div>
      </div>
    </Affix>
  </div>
)

PageHeader.propTypes = {
  headerLabel: PropTypes.string,
  buttonId: PropTypes.string,
  buttonLabel: PropTypes.string,
  buttonTextAlignment: PropTypes.string,
  onButtonClick: PropTypes.func
}

PageHeader.defaultProps = {
  headerLabel: 'To implement',
  disableSave: false
}

export default PageHeader
