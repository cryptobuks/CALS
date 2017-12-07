import React from 'react'
import PropTypes from 'prop-types'
import FormField from './formField'
import moment from 'moment'
import momentLocalizer from 'react-widgets-moment'
import DateTimePicker from 'react-widgets/lib/DateTimePicker'
import Cleave from 'cleave.js/react'

// import 'react-widgets/dist/css/react-widgets.css'
// import '../../../../node_modules/font-awesome/css/font-awesome.css'

moment.locale('en')
momentLocalizer()

let formatter = 'mm/dd/yyyy'
let placeholder = 'mm/dd/yyyy'

const DateField = ({
  value,
  errors,
  onBlur,
  onChange,
  gridClassName,
  id,
  label,
  disabled,
  labelClassName,
  required
}) => {
  const formFieldProps = {
    disabled: disabled,
    errors: errors,
    gridClassName: gridClassName,
    id: id,
    label: label,
    labelClassName: labelClassName,
    required: required
  }
  return (
    <FormField {...formFieldProps}>
      <Cleave
        value={value}
        placeholder='mm/dd/yyyy'
        options={{
          date: true,
          datePattern: ['m', 'd', 'Y']}}
        onChange={onChange}
        onBlur={onBlur} />
    </FormField>
  )
}

DateField.propTypes = {
  onChange: PropTypes.func.isRequired
}

export {DateField}
