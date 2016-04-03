import React, { PropTypes } from 'react'
import { button } from './styles.css'

export default function FacebookAuthButton ({onAuth, isFetching}) {
  return (
    <button onClick={onAuth} className={button}>
      {isFetching === true
        ? 'Loading'
        : 'Login with facebook'}
    </button>
  )
}

FacebookAuthButton.propTypes = {
  onAuth: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
}
