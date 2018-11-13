import React from 'react'
import PropTypes from 'prop-types'

const Checkbox = ({ type = 'checkbox', name, checked = false, onChange, label }) => {
  return (
    <label htmlFor={name}>
      {label && <span>{label}</span>}
      <input type={type} name={name} checked={checked} onChange={onChange}/>
    </label>
  )
}

Checkbox.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
}

export default Checkbox
