import React, { PropTypes } from 'react'
import { button } from './styles.css'

export default function FacebookAuthButton ({onAuth}) {
  return (
    <button onClick={onAuth} className={button}>Login with facebook</button>
  )
}

FacebookAuthButton.propTypes = {
  onAuth: PropTypes.func.isRequired,
}