import React, { PropTypes } from 'react'

export default function Parent (props) {
  return (
    <div><h2>ParentX</h2></div>
  )
}

Parent.propTypes = {
  name: PropTypes.string.isRequired
}
