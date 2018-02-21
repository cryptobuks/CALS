import PropTypes from 'prop-types'
import React from 'react'

const ApiErrorMessages = ({errors}) => (
  errors.map((error, index) =>
    <div key={'error' + '[' + index + ']'} >
      <span className='input-error-message' role='alert'>Type: {error.type}</span>
      <span className='input-error-message' role='alert'>Message: {error.user_message}</span>
      {error.type === 'business_validation' ? (
        <span className='input-error-message' role='alert'>Technical Message: {error.technical_message}</span>
      ) : (
        <div>
          <span className='input-error-message' role='alert'>Property: {error.property}</span>
          <span className='input-error-message' role='alert'>Invalid Value : {error.invalid_value.id}</span>
        </div>
      )
      }
    </div>
  )
)

ApiErrorMessages.propTypes = {
  errors: PropTypes.array
}

ApiErrorMessages.defaultProps = {
  errors: []
}
export default ApiErrorMessages
