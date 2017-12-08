import React from 'react'

const BinarySelectorField = ({gridClassName, type, label, id, value, checked, disabled, onChange}) => (
  <div className={gridClassName}>
    <input
      type={type}
      id={id}
      value={value}
      label={label}
      checked={checked}
      disabled={disabled}
      onChange={onChange} />
    <label htmlFor={id}>{label}</label>
  </div>
)
BinarySelectorField.defaultProps = {
  type: 'checkbox'
}
export {BinarySelectorField}
