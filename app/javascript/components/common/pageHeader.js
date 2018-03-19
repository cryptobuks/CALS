import React from 'react'
import PropTypes from 'prop-types'
import Button from 'components/common/button'
import Affix from 'react-overlays/lib/AutoAffix'

const PageHeader = ({
  headerLabel,
  disableSave,
  onSaveProgressClick,
  disableSubmit,
  onSubmitClick,
  buttonTextAlignment
}) => (
  <div className='page-header-container'>
    <Affix affixStyle={{zIndex: 100}}>
      <div className='page-header-mast'>
        <div className='container'>
          <div className='row'>
            <div className='col-xs-7'>
              <div className='page-title text-left'>
                {headerLabel}
              </div>
            </div>
            <div className='col-xs-5'>
              <div className='col-xs-7'>
                <Button
                  buttonId='saveProgress'
                  disabled={disableSave}
                  label='Save Progress'
                  textAlignment={buttonTextAlignment}
                  onClick={onSaveProgressClick} />
              </div>
              <div className='col-xs-5'>
                <Button
                  buttonId='submitApplication'
                  disabled={disableSubmit}
                  label='Submit'
                  textAlignment={buttonTextAlignment}
                  onClick={onSubmitClick} />
              </div>
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
  buttonTextAlignment: PropTypes.string,
  onButtonClick: PropTypes.func
}

PageHeader.defaultProps = {
  headerLabel: 'To implement',
  buttonTextAlignment: 'center',
  disableSave: false,
  disableSubmit: false
}

export default PageHeader
