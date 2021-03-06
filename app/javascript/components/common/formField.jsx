import ClassNames from 'classnames'
import ErrorMessages from './errorMessages.jsx'
import PropTypes from 'prop-types'
import React from 'react'

const FormField = ({children, errors, gridClassName, labelClassName, id, label, required}) => {
  const hasErrors = errors && !errors.isEmpty()
  const gridClassNames = ClassNames(gridClassName, {'input-error': hasErrors})
  const labelClassNames =
    ClassNames(labelClassName, {'input-error-label': hasErrors}, {required: required})
  return (
    <div className={gridClassNames}>
      <label htmlFor={id} className={labelClassNames}>
        {label}
      </label>
      {children}
      <ErrorMessages id={id} errors={errors} />
    </div>
  )
}

FormField.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  errors: PropTypes.object,
  gridClassName: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string.isRequired,
  labelClassName: PropTypes.string,
  required: PropTypes.bool
}
export default FormField
