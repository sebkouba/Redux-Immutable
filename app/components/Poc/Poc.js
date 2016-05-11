import React, { PropTypes } from 'react'

export default function Poc (props) {
  return (
    <div>
      <h1>Poc</h1>
      <input
        value={props.inputText}
        onChange={(e) => props.handleInputChange(e.target.value)}/>
    </div>
  )
}

Poc.propTypes = {
  inputText: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired
}
