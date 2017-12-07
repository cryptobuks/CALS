import React from 'react'
import Select from 'react-select'
import PropTypes from 'prop-types'

const MultiSelect = ({
  label,
  values,
  optionList,
  classNameId,
  placeholder,
  onChange
}) => {
  return (
    <div className='col-md-12'>
      <label>{label}</label>
      <Select
        className={classNameId}
        tabSelectsValue={false}
        multi
        searchable={false}
        value={values.map((val) => val.value)}
        options={optionList.map((type) => ({label: type.value, value: type.value, id: type.id}))}
        onChange={onChange}
        clearable={false}
        placeholder={placeholder}
      />
    </div>
  )
}

MultiSelect.propTypes = {
  label: PropTypes.string,
  values: PropTypes.array,
  optionList: PropTypes.array,
  classNameId: PropTypes.string,
  onChange: PropTypes.func
}

MultiSelect.defaultProps = {
  placeholder: ''
}

export default MultiSelect
